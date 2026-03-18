package com.bookstore.service;

import com.bookstore.domain.entity.UserEntity;
import com.bookstore.domain.repository.RefreshTokenRepository;
import com.bookstore.domain.repository.UserRepository;
import com.bookstore.dto.request.UpdatePasswordRequest;
import com.bookstore.dto.request.UpdateProfileRequest;
import com.bookstore.dto.response.UserResponse;
import com.bookstore.exception.AppException;
import com.bookstore.exception.ErrorCode;
import com.bookstore.logging.AuditLogger;
import com.bookstore.mapper.UserMapper;
import com.bookstore.util.PasswordPolicy;
import com.bookstore.util.SecurityUtil;
import java.time.LocalDateTime;
import java.util.Map;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final AuditLogger auditLogger;

    public UserService(
            UserRepository userRepository,
            RefreshTokenRepository refreshTokenRepository,
            UserMapper userMapper,
            PasswordEncoder passwordEncoder,
            AuditLogger auditLogger
    ) {
        this.userRepository = userRepository;
        this.refreshTokenRepository = refreshTokenRepository;
        this.userMapper = userMapper;
        this.passwordEncoder = passwordEncoder;
        this.auditLogger = auditLogger;
    }

    @Transactional(readOnly = true)
    public UserResponse getCurrentUser() {
        Long userId = SecurityUtil.currentUserId();
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));
        return userMapper.toUserResponse(user);
    }

    @Transactional
    public UserResponse updateProfile(UpdateProfileRequest request) {
        Long userId = SecurityUtil.currentUserId();
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        if (request.getFullName() != null) {
            user.setFullName(request.getFullName());
        }
        if (request.getAvatarUrl() != null) {
            user.setAvatarUrl(request.getAvatarUrl());
        }
        if (request.getDateOfBirth() != null) {
            user.setDateOfBirth(request.getDateOfBirth());
        }
        if (request.getGender() != null) {
            user.setGender(request.getGender());
        }

        UserEntity saved = userRepository.save(user);
        return userMapper.toUserResponse(saved);
    }

    @Transactional
    public void changePassword(UpdatePasswordRequest request) {
        Long userId = SecurityUtil.currentUserId();
        UserEntity user = userRepository.findById(userId)
                .orElseThrow(() -> new AppException(ErrorCode.USER_NOT_FOUND));

        if (!passwordEncoder.matches(request.getCurrentPassword(), user.getPasswordHash())) {
            throw new AppException(ErrorCode.INVALID_CREDENTIALS, "Current password is incorrect");
        }

        PasswordPolicy.validate(request.getNewPassword());
        user.setPasswordHash(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);
        refreshTokenRepository.revokeAllForUser(userId, LocalDateTime.now());
        auditLogger.log("password_changed", String.valueOf(userId), null, null, Map.of());
    }
}
