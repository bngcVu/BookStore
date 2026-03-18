package com.bookstore.service;

import com.bookstore.domain.entity.AdminEntity;
import com.bookstore.domain.entity.CustomerTierEntity;
import com.bookstore.domain.entity.OtpCodeEntity;
import com.bookstore.domain.entity.UserEntity;
import com.bookstore.domain.entity.UserStatus;
import com.bookstore.domain.repository.CustomerTierRepository;
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
    private final AuditLogger auditLogger;

    public AuthService(
            UserRepository userRepository,
            CustomerTierRepository customerTierRepository,
            RefreshTokenRepository refreshTokenRepository,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil,
            UserMapper userMapper,
            OtpService otpService,
            AuditLogger auditLogger
    ) {
        this.userRepository = userRepository;
        this.customerTierRepository = customerTierRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
        this.userMapper = userMapper;
        this.otpService = otpService;
        this.auditLogger = auditLogger;
    }

    @Transactional
    public UserResponse register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new AppException(ErrorCode.EMAIL_ALREADY_EXISTS);
        }
        if (StringUtils.hasText(request.getPhone()) && userRepository.existsByPhone(request.getPhone())) {
            throw new AppException(ErrorCode.PHONE_ALREADY_EXISTS);
        }

        PasswordPolicy.validate(request.getPassword());

        UserEntity user = new UserEntity();
        user.setEmail(request.getEmail());
        user.setPhone(request.getPhone());
        user.setFullName(request.getFullName());
        user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        user.setStatus(UserStatus.inactive);
        user.setRewardPoints(0);
        user.setTotalSpent(BigDecimal.ZERO);

        CustomerTierEntity tier = customerTierRepository
                .findTopByMinSpentLessThanEqualOrderByMinSpentDesc(BigDecimal.ZERO)
                .orElse(null);
        user.setTier(tier);

        UserEntity saved = userRepository.save(user);
        auditLogger.log("user_registered", String.valueOf(saved.getId()), null, null, Map.of("email", saved.getEmail()));
        return userMapper.toUserResponse(saved);
    }

    @Transactional
    public void verifyRegisterOtp(String email, String code) {
        OtpCodeEntity otp = otpService.validateOtp(email, code, com.bookstore.domain.entity.OtpType.register);
        UserEntity user = userRepository.findByEmail(email)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        user.setEmailVerifiedAt(LocalDateTime.now());
        user.setStatus(UserStatus.active);
        userRepository.save(user);
        otpService.markUsed(otp);
        auditLogger.log("email_verified", String.valueOf(user.getId()), null, null, Map.of("email", email));
    }

    @Transactional
    public AuthResponse login(LoginRequest request) {
        UserEntity user = userRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_CREDENTIALS));

        if (!passwordEncoder.matches(request.getPassword(), user.getPasswordHash())) {
            throw new AppException(ErrorCode.INVALID_CREDENTIALS);
        }

        if (user.getStatus() == UserStatus.inactive) {
            throw new AppException(ErrorCode.ACCOUNT_INACTIVE);
        }

        if (user.getStatus() == UserStatus.banned) {
            throw new AppException(ErrorCode.ACCOUNT_BANNED);
        }

        if (user.getEmailVerifiedAt() == null) {
            throw new AppException(ErrorCode.EMAIL_NOT_VERIFIED);
        }

        user.setLastLoginAt(LocalDateTime.now());
        userRepository.save(user);

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
                });
    }

    @Transactional
    public void forgotPassword(String email) {
        otpService.sendForgotPasswordOtp(email);
    }

    public void verifyForgotPasswordOtp(String email, String code) {
        otpService.validateOtp(email, code, com.bookstore.domain.entity.OtpType.reset_password);
    }

    @Transactional
    public void resetPassword(ResetPasswordRequest request) {
        OtpCodeEntity otp = otpService.validateOtp(request.getEmail(), request.getCode(),
                com.bookstore.domain.entity.OtpType.reset_password);
        UserEntity user = userRepository.findByEmail(request.getEmail())
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
