package com.bookstore.api.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "otp_codes")
public class OtpCode {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    private String email;
    private String phone;
    private String code;

    @Enumerated(EnumType.STRING)
    private Type type;

    @Column(name = "expires_at")
    private LocalDateTime expiresAt;

    @Column(name = "is_used")
    private Integer isUsed;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    public enum Type { register, reset_password, verify_email, verify_phone }
}
