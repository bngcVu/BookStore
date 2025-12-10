package com.bookstore.api.repository;

import com.bookstore.api.entity.OtpCode;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface OtpCodeRepository extends JpaRepository<OtpCode, Long> {
    Optional<OtpCode> findTopByEmailAndTypeOrderByCreatedAtDesc(String email, OtpCode.Type type);
    Optional<OtpCode> findTopByPhoneAndTypeOrderByCreatedAtDesc(String phone, OtpCode.Type type);
}
