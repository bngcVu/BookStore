package com.bookstore.service;

import com.bookstore.domain.entity.AdminEntity;
import com.bookstore.domain.entity.CustomerTierEntity;
import com.bookstore.domain.entity.OtpCodeEntity;
import com.bookstore.domain.entity.RegistrationPendingEntity;
import com.bookstore.domain.entity.UserEntity;
import com.bookstore.domain.entity.enums.OtpType;
import com.bookstore.domain.entity.enums.UserStatus;
import com.bookstore.domain.repository.CustomerTierRepository;
import com.bookstore.domain.repository.RegistrationPendingRepository;
import com.bookstore.domain.repository.RefreshTokenRepository;
import com.bookstore.domain.repository.UserRepository;
import com.bookstore.dto.request.LoginRequest;
import com.bookstore.dto.request.RegisterRequest;
import com.bookstore.dto.request.ResetPasswordRequest;
import com.bookstore.dto.response.AuthResponse;
import com.bookstore.dto.response.UserResponse;
import com.bookstore.exception.AppException;
import com.bookstore.exception.ErrorCode;
import com.bookstore.logging.AuditLogger;
import com.bookstore.mapper.UserMapper;
import com.bookstore.security.JwtUtil;
import com.bookstore.util.PasswordPolicy;
import com.bookstore.util.TokenHasher;
import io.jsonwebtoken.Claims;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

@Service
public class AuthService {
    private final UserRepository userRepository;
    private final CustomerTierRepository customerTierRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final UserMapper userMapper;
    private final OtpService otpService;
    private final RegistrationEmailService registrationEmailService;
    private final RegistrationPendingRepository registrationPendingRepository;
    private final AuditLogger auditLogger;
    private final int otpTtlMinutes;

    public AuthService(
            UserRepository userRepository,
            CustomerTierRepository customerTierRepository,
            RefreshTokenRepository refreshTokenRepository,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil,
            UserMapper userMapper,
            OtpService otpService,
            RegistrationEmailService registrationEmailService,
            RegistrationPendingRepository registrationPendingRepository,
            AuditLogger auditLogger,
            @org.springframework.beans.factory.annotation.Value("${app.otp.ttl-minutes:5}") int otpTtlMinutes
    ) {
        this.userRepository = userRepository;
        this.customerTierRepository = customerTierRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.userMapper = userMapper;
        this.otpService = otpService;
        this.registrationEmailService = registrationEmailService;
        this.registrationPendingRepository = registrationPendingRepository;
        this.auditLogger = auditLogger;
        this.otpTtlMinutes = otpTtlMinutes;
    }

    @Transactional
    public UserResponse register(RegisterRequest request) {
        String normalizedEmail = request.getEmail().trim().toLowerCase();

        userRepository.findByEmail(normalizedEmail).ifPresent(existingUser -> {
            if (existingUser.getEmailVerifiedAt() != null || existingUser.getStatus() == UserStatus.active) {
                throw new AppException(ErrorCode.EMAIL_ALREADY_EXISTS);
            }
            userRepository.delete(existingUser);
        });

        registrationPendingRepository.findByEmail(normalizedEmail)
            .ifPresent(existing -> registrationPendingRepository.deleteByEmail(normalizedEmail));

        if (StringUtils.hasText(request.getPhone())) {
            UserEntity phoneOwner = userRepository.findByPhone(request.getPhone()).orElse(null);
            if (phoneOwner != null) {
                throw new AppException(ErrorCode.PHONE_ALREADY_EXISTS);
            }
            if (registrationPendingRepository.existsByPhoneAndEmailNot(request.getPhone(), normalizedEmail)) {
                throw new AppException(ErrorCode.PHONE_ALREADY_EXISTS);
            }
        }

        PasswordPolicy.validate(request.getPassword());

        RegistrationPendingEntity pending = new RegistrationPendingEntity();
        pending.setEmail(normalizedEmail);
        pending.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        pending.setFullName(request.getFullName());
        pending.setPhone(request.getPhone());
        pending.setExpiresAt(LocalDateTime.now().plusMinutes(otpTtlMinutes));
        registrationPendingRepository.save(pending);
        otpService.sendRegisterOtp(normalizedEmail);

        UserResponse response = new UserResponse();
        response.setEmail(normalizedEmail);
        response.setFullName(request.getFullName());
        response.setRewardPoints(0);
        response.setTotalSpent(BigDecimal.ZERO);
        auditLogger.log("user_registered_pending", "pending", null, null, Map.of("email", normalizedEmail));
        return response;
    }

    @Transactional
    public void verifyRegisterOtp(String email, String code) {
        String normalizedEmail = email.trim().toLowerCase();
        OtpCodeEntity otp = otpService.validateOtp(normalizedEmail, code, com.bookstore.domain.entity.enums.OtpType.register);
        RegistrationPendingEntity pending = registrationPendingRepository.findByEmail(normalizedEmail)
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_OTP, "No pending registration found"));

        if (pending.getExpiresAt().isBefore(LocalDateTime.now())) {
            registrationPendingRepository.deleteByEmail(normalizedEmail);
            throw new AppException(ErrorCode.OTP_EXPIRED, "Pending registration has expired");
        }

        if (StringUtils.hasText(pending.getPhone())) {
            UserEntity phoneOwner = userRepository.findByPhone(pending.getPhone()).orElse(null);
            if (phoneOwner != null) {
                throw new AppException(ErrorCode.PHONE_ALREADY_EXISTS);
            }
        }

        UserEntity user = new UserEntity();
        user.setEmail(normalizedEmail);
        user.setPhone(pending.getPhone());
        user.setFullName(pending.getFullName());
        user.setPasswordHash(pending.getPasswordHash());
        user.setStatus(UserStatus.active);
        user.setEmailVerifiedAt(LocalDateTime.now());
        user.setRewardPoints(0);
        user.setTotalSpent(BigDecimal.ZERO);

        CustomerTierEntity tier = customerTierRepository
                .findTopByMinSpentLessThanEqualOrderByMinSpentDesc(BigDecimal.ZERO)
                .orElse(null);
        user.setTier(tier);

        UserEntity saved = userRepository.save(user);
        otpService.markUsed(otp);
        registrationPendingRepository.deleteByEmail(normalizedEmail);
        registrationEmailService.sendRegistrationSuccessEmail(saved);
        auditLogger.log("email_verified", String.valueOf(saved.getId()), null, null, Map.of("email", normalizedEmail));
    }

    @Transactional
    public AuthResponse login(LoginRequest request) {
        String normalizedEmail = request.getEmail().trim().toLowerCase();
        UserEntity user = userRepository.findByEmail(normalizedEmail)
                .orElseThrow(() -> {
                    auditLogger.log("user_login_failed", normalizedEmail, null, null, Map.of("reason", "user_not_found"));
                    return new AppException(ErrorCode.INVALID_CREDENTIALS);
                });

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            auditLogger.log("user_login_failed", String.valueOf(user.getId()), null, null, Map.of("reason", "invalid_password"));
            throw new AppException(ErrorCode.INVALID_CREDENTIALS);
        }

        if (user.getStatus() == UserStatus.inactive) {
            auditLogger.log("user_login_failed", String.valueOf(user.getId()), null, null, Map.of("reason", "inactive"));
            throw new AppException(ErrorCode.ACCOUNT_INACTIVE);
        }

        if (user.getStatus() == UserStatus.banned) {
            auditLogger.log("user_login_failed", String.valueOf(user.getId()), null, null, Map.of("reason", "banned"));
            throw new AppException(ErrorCode.ACCOUNT_BANNED);
        }

        if (user.getEmailVerifiedAt() == null) {
            auditLogger.log("user_login_failed", String.valueOf(user.getId()), null, null, Map.of("reason", "email_not_verified"));
            throw new AppException(ErrorCode.EMAIL_NOT_VERIFIED);
        }

        user.setLastLoginAt(LocalDateTime.now());
        userRepository.save(user);
        auditLogger.log("user_login_success", String.valueOf(user.getId()), null, null, Map.of("email", user.getEmail()));

        return buildAuthResponse(user, List.of("ROLE_USER"));
    }

    @Transactional
    public AuthResponse refresh(String refreshToken) {
        Claims claims = jwtUtil.parseAndValidate(refreshToken);
        if (!"refresh".equals(claims.get("type"))) {
            throw new AppException(ErrorCode.INVALID_TOKEN);
        }

        String tokenHash = TokenHasher.sha256(refreshToken);
        var tokenEntity = refreshTokenRepository.findByTokenHashAndRevokedAtIsNull(tokenHash)
                .orElseThrow(() -> new AppException(ErrorCode.REFRESH_TOKEN_REVOKED));

        if (tokenEntity.getExpiresAt() != null && tokenEntity.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new AppException(ErrorCode.INVALID_TOKEN);
        }

        tokenEntity.setRevokedAt(LocalDateTime.now());
        refreshTokenRepository.save(tokenEntity);

        UserEntity user = tokenEntity.getUser();
        return buildAuthResponse(user, List.of("ROLE_USER"));
    }

    @Transactional
    public void logout(String refreshToken) {
        Claims claims = jwtUtil.parseAndValidate(refreshToken);
        if (!"refresh".equals(claims.get("type"))) {
            throw new AppException(ErrorCode.INVALID_TOKEN);
        }
        String tokenHash = TokenHasher.sha256(refreshToken);
        refreshTokenRepository.findByTokenHashAndRevokedAtIsNull(tokenHash)
                .ifPresent(token -> {
                    token.setRevokedAt(LocalDateTime.now());
                    refreshTokenRepository.save(token);
                    auditLogger.log("token_revoked", String.valueOf(token.getUser().getId()), null, null, Map.of());
                });
    }

    @Transactional
    public void forgotPassword(String email) {
        String normalizedEmail = email.trim().toLowerCase();
        otpService.sendForgotPasswordOtp(normalizedEmail);
    }

    public void verifyForgotPasswordOtp(String email, String code) {
        otpService.validateOtp(email, code, com.bookstore.domain.entity.enums.OtpType.reset_password);
    }

    @Transactional
    public void resetPassword(ResetPasswordRequest request) {
        String normalizedEmail = request.getEmail().trim().toLowerCase();
        OtpCodeEntity otp = otpService.validateOtp(normalizedEmail, request.getCode(),
                com.bookstore.domain.entity.enums.OtpType.reset_password);
        UserEntity user = userRepository.findByEmail(normalizedEmail)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        PasswordPolicy.validate(request.getNewPassword());
        user.setPasswordHash(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
        otpService.markUsed(otp);
        refreshTokenRepository.revokeAllForUser(user.getId(), LocalDateTime.now());
        auditLogger.log("password_reset", String.valueOf(user.getId()), null, null, Map.of("email", user.getEmail()));
    }

    private AuthResponse buildAuthResponse(UserEntity user, List<String> roles) {
        String accessToken = jwtUtil.generateAccessToken(String.valueOf(user.getId()), Map.of("roles", roles));
        String refreshToken = jwtUtil.generateRefreshToken(String.valueOf(user.getId()));

        com.bookstore.domain.entity.RefreshTokenEntity refreshEntity = new com.bookstore.domain.entity.RefreshTokenEntity();
        refreshEntity.setUser(user);
        refreshEntity.setTokenHash(TokenHasher.sha256(refreshToken));
        refreshEntity.setExpiresAt(LocalDateTime.now().plusDays(jwtUtil.getRefreshTokenExpDays()));
        refreshTokenRepository.save(refreshEntity);

        AuthResponse response = new AuthResponse();
        response.setAccessToken(accessToken);
        response.setRefreshToken(refreshToken);
        response.setUser(userMapper.toUserResponse(user));
        return response;
    }
}
