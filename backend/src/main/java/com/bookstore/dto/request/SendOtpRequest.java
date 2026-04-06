package com.bookstore.dto.request;

import com.bookstore.domain.entity.enums.OtpType;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SendOtpRequest {
    @Email
    @NotNull
    private String email;

    @NotNull
    private OtpType type;
}
