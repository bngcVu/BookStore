package com.bookstore.util;

import com.bookstore.exception.AppException;
import com.bookstore.exception.ErrorCode;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public final class SecurityUtil {
    private SecurityUtil() {
    }

    public static Long currentUserId() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new AppException(ErrorCode.ACCESS_DENIED, "Unauthenticated");
        }
        try {
            return Long.parseLong(authentication.getName());
        } catch (NumberFormatException ex) {
            throw new AppException(ErrorCode.ACCESS_DENIED, "Invalid authentication subject");
        }
    }
}
