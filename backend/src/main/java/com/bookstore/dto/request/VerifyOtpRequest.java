package com.bookstore.dto.request;

import com.bookstore.domain.entity.enums.OtpType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VerifyOtpRequest {
    @Email
    @NotNull
    private String email;

    @NotBlank
    private String code;

    @NotNull
    private OtpType type;
}
