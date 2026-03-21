package com.bookstore.controller;

import com.bookstore.api.response.ApiResponse;
import com.bookstore.dto.request.RegistrationSuccessEmailRequest;
import com.bookstore.service.RegistrationEmailService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping({"/api/auth/register", "/api/v1/auth/register", "/v1/auth/register"})
public class RegistrationEmailController {
    private final RegistrationEmailService registrationEmailService;

    public RegistrationEmailController(RegistrationEmailService registrationEmailService) {
        this.registrationEmailService = registrationEmailService;
    }

    @PostMapping("/resend-success-email")
    public ResponseEntity<ApiResponse<Void>> resendSuccessEmail(
            @Valid @RequestBody RegistrationSuccessEmailRequest request
    ) {
        registrationEmailService.resendRegistrationSuccessEmail(request.getEmail());
        return ResponseEntity.ok(ApiResponse.success("Đã gửi email xác nhận đăng ký thành công", null));
    }
}
