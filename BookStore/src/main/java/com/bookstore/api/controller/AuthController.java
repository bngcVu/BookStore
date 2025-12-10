package com.bookstore.api.controller;

import com.bookstore.api.dto.LoginRequest;
import com.bookstore.api.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest req) {
        String[] tokens = authService.login(req);
        return ResponseEntity.ok(Map.of(
                "success", true,
                "message", "Login successful",
                "data", Map.of("accessToken", tokens[0], "refreshToken", tokens[1])
        ));
    }
}
