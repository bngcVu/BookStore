package com.bookstore.util;

import com.bookstore.exception.AppException;
import com.bookstore.exception.ErrorCode;
import java.util.regex.Pattern;

public final class PasswordPolicy {
    private static final Pattern POLICY = Pattern.compile("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{8,}$");

    private PasswordPolicy() {
    }

    public static void validate(String password) {
        if (password == null || !POLICY.matcher(password).matches()) {
            throw new AppException(ErrorCode.PASSWORD_POLICY_VIOLATION, "Password does not meet complexity requirements");
        }
    }
}
