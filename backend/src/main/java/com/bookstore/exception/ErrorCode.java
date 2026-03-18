package com.bookstore.exception;

import org.springframework.http.HttpStatus;

public enum ErrorCode {
    USER_NOT_FOUND(HttpStatus.NOT_FOUND, "User not found"),
    EMAIL_ALREADY_EXISTS(HttpStatus.CONFLICT, "Email already exists"),
    PHONE_ALREADY_EXISTS(HttpStatus.CONFLICT, "Phone already exists"),
    INVALID_CREDENTIALS(HttpStatus.UNAUTHORIZED, "Invalid credentials"),
    ACCOUNT_INACTIVE(HttpStatus.FORBIDDEN, "Account is inactive"),
    ACCOUNT_BANNED(HttpStatus.FORBIDDEN, "Account is banned"),
    EMAIL_NOT_VERIFIED(HttpStatus.FORBIDDEN, "Email is not verified"),
    OTP_EXPIRED(HttpStatus.BAD_REQUEST, "OTP has expired"),
    INVALID_OTP(HttpStatus.BAD_REQUEST, "Invalid OTP"),
    PASSWORD_POLICY_VIOLATION(HttpStatus.BAD_REQUEST, "Password policy violation"),
    REFRESH_TOKEN_REVOKED(HttpStatus.UNAUTHORIZED, "Refresh token is revoked"),
    INVALID_TOKEN(HttpStatus.UNAUTHORIZED, "Invalid token"),
    VALIDATION_ERROR(HttpStatus.BAD_REQUEST, "Validation failed"),
    ACCESS_DENIED(HttpStatus.FORBIDDEN, "Access denied"),
    INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "Internal server error");

    private final HttpStatus status;
    private final String defaultMessage;

    ErrorCode(HttpStatus status, String defaultMessage) {
        this.status = status;
        this.defaultMessage = defaultMessage;
    }

    public HttpStatus status() {
        return status;
    }

    public String defaultMessage() {
        return defaultMessage;
    }
}
