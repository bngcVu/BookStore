package com.bookstore.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResetPasswordRequest {
    @Email
    @NotNull
    private String email;

    @NotBlank
    private String code;

    @NotBlank
    @Size(min = 8, max = 64)
    private String newPassword;
}
