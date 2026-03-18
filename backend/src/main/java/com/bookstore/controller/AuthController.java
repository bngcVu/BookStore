package com.bookstore.controller;

import com.bookstore.api.response.ApiResponse;
import com.bookstore.dto.request.ForgotPasswordRequest;
import com.bookstore.dto.request.LoginRequest;
import com.bookstore.dto.request.RefreshTokenRequest;
import com.bookstore.dto.request.RegisterRequest;
import com.bookstore.dto.request.ResetPasswordRequest;
import com.bookstore.dto.request.SendOtpRequest;
import com.bookstore.dto.request.VerifyOtpRequest;
import com.bookstore.dto.response.AuthResponse;
import com.bookstore.dto.response.UserResponse;
import com.bookstore.service.AuthService;
import com.bookstore.service.OtpService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {
    private final AuthService authService;
    private final OtpService otpService;

    public AuthController(AuthService authService, OtpService otpService) {
        this.authService = authService;
        this.otpService = otpService;
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<UserResponse>> register(@Valid @RequestBody RegisterRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Register success", authService.register(request)));
    }

    @PostMapping("/register/send-otp")
    public ResponseEntity<ApiResponse<Void>> sendRegisterOtp(@Valid @RequestBody SendOtpRequest request) {
        if (request.getType() != com.bookstore.domain.entity.OtpType.register) {
            throw new com.bookstore.exception.AppException(
                    com.bookstore.exception.ErrorCode.INVALID_OTP,
                    "Invalid OTP type for register"
            );
        }
        otpService.sendRegisterOtp(request.getEmail());
        return ResponseEntity.ok(ApiResponse.success("OTP sent", null));
    }

    @PostMapping("/register/verify-otp")
    public ResponseEntity<ApiResponse<Void>> verifyRegisterOtp(@Valid @RequestBody VerifyOtpRequest request) {
        if (request.getType() != com.bookstore.domain.entity.OtpType.register) {
            throw new com.bookstore.exception.AppException(
                    com.bookstore.exception.ErrorCode.INVALID_OTP,
                    "Invalid OTP type for register"
            );
        }
        authService.verifyRegisterOtp(request.getEmail(), request.getCode());
        return ResponseEntity.ok(ApiResponse.success("OTP verified", null));
    }

    @PostMapping("/register/resend-otp")
    public ResponseEntity<ApiResponse<Void>> resendRegisterOtp(@Valid @RequestBody SendOtpRequest request) {
        if (request.getType() != com.bookstore.domain.entity.OtpType.register) {
            throw new com.bookstore.exception.AppException(
                    com.bookstore.exception.ErrorCode.INVALID_OTP,
                    "Invalid OTP type for register"
            );
        }
        otpService.sendRegisterOtp(request.getEmail());
        return ResponseEntity.ok(ApiResponse.success("OTP resent", null));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody LoginRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Login success", authService.login(request)));
    }

    @PostMapping("/refresh")
    public ResponseEntity<ApiResponse<AuthResponse>> refresh(@Valid @RequestBody RefreshTokenRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Refresh success", authService.refresh(request.getRefreshToken())));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<Void>> logout(@Valid @RequestBody RefreshTokenRequest request) {
        authService.logout(request.getRefreshToken());
        return ResponseEntity.ok(ApiResponse.success("Logout success", null));
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<ApiResponse<Void>> forgotPassword(@Valid @RequestBody ForgotPasswordRequest request) {
        authService.forgotPassword(request.getEmail());
        return ResponseEntity.ok(ApiResponse.success("OTP sent", null));
    }

    @PostMapping("/forgot-password/verify-otp")
    public ResponseEntity<ApiResponse<Void>> verifyForgotPasswordOtp(@Valid @RequestBody VerifyOtpRequest request) {
        if (request.getType() != com.bookstore.domain.entity.OtpType.reset_password) {
            throw new com.bookstore.exception.AppException(
                    com.bookstore.exception.ErrorCode.INVALID_OTP,
                    "Invalid OTP type for reset password"
            );
        }
        authService.verifyForgotPasswordOtp(request.getEmail(), request.getCode());
        return ResponseEntity.ok(ApiResponse.success("OTP verified", null));
    }

    @PostMapping("/reset-password")
    public ResponseEntity<ApiResponse<Void>> resetPassword(@Valid @RequestBody ResetPasswordRequest request) {
        authService.resetPassword(request);
        return ResponseEntity.ok(ApiResponse.success("Password reset", null));
    }
}
