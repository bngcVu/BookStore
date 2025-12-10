package com.bookstore.api.dto;

import lombok.*;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class LoginRequest {
    private String emailOrPhone;
    private String password;
}

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
class TokenResponse {
    private String accessToken;
    private String refreshToken;
}
