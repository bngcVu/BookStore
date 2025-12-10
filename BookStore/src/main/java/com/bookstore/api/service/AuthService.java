package com.bookstore.api.service;

import com.bookstore.api.dto.LoginRequest;
import com.bookstore.api.repository.UserRepository;
import com.bookstore.api.security.JwtService;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.stereotype.Service;

import java.util.HashMap;

@Service
public class AuthService {
    private final UserRepository userRepo;
    private final JwtService jwtService;

    public AuthService(UserRepository userRepo, JwtService jwtService) {
        this.userRepo = userRepo;
        this.jwtService = jwtService;
    }

    public String[] login(LoginRequest req) {
        var user = req.getEmailOrPhone().contains("@")
                ? userRepo.findByEmail(req.getEmailOrPhone()).orElse(null)
                : userRepo.findByPhone(req.getEmailOrPhone()).orElse(null);
        if (user == null) throw new RuntimeException("User not found");
        if (!BCrypt.checkpw(req.getPassword(), user.getPasswordHash())) {
            throw new RuntimeException("Invalid credentials");
        }
        var claims = new HashMap<String, Object>();
        claims.put("role", "ROLE_USER");
        claims.put("uid", user.getId());
        String access = jwtService.createAccessToken(String.valueOf(user.getId()), claims);
        String refresh = jwtService.createRefreshToken(String.valueOf(user.getId()));
        return new String[]{access, refresh};
    }
}
