package com.bookstore.service;

import com.bookstore.domain.entity.AdminEntity;
import com.bookstore.domain.repository.AdminRepository;
import com.bookstore.dto.request.LoginRequest;
import com.bookstore.dto.response.AuthResponse;
import com.bookstore.dto.response.UserResponse;
import com.bookstore.exception.AppException;
import com.bookstore.exception.ErrorCode;
import com.bookstore.security.JwtUtil;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AdminAuthService {
    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    public AdminAuthService(
            AdminRepository adminRepository,
            PasswordEncoder passwordEncoder,
            JwtUtil jwtUtil
    ) {
        this.adminRepository = adminRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtUtil = jwtUtil;
    }

    @Transactional
    public AuthResponse login(LoginRequest request) {
        String normalizedEmail = request.getEmail().trim().toLowerCase();
        AdminEntity admin = adminRepository.findByEmail(normalizedEmail)
                .orElseThrow(() -> new AppException(ErrorCode.INVALID_CREDENTIALS));

        if (!passwordEncoder.matches(request.getPassword(), admin.getPasswordHash())) {
            throw new AppException(ErrorCode.INVALID_CREDENTIALS);
        }

        if (admin.getIsActive() != null && !admin.getIsActive()) {
            throw new AppException(ErrorCode.ACCESS_DENIED, "Admin account is inactive");
        }

        admin.setLastLoginAt(LocalDateTime.now());
        adminRepository.save(admin);

        String roleClaim = admin.getRole() == null ? "ROLE_ADMIN" : "ROLE_" + admin.getRole().name().toUpperCase();
        String accessToken = jwtUtil.generateAccessToken(String.valueOf(admin.getId()), Map.of("roles", List.of(roleClaim)));
        String refreshToken = jwtUtil.generateRefreshToken(String.valueOf(admin.getId()));

        AuthResponse response = new AuthResponse();
        response.setAccessToken(accessToken);
        response.setRefreshToken(refreshToken);

        UserResponse userResponse = new UserResponse();
        userResponse.setId(admin.getId());
        userResponse.setEmail(admin.getEmail());
        userResponse.setFullName(admin.getFullName());
        userResponse.setAvatarUrl(admin.getAvatarUrl());
        response.setUser(userResponse);
        return response;
    }
}
