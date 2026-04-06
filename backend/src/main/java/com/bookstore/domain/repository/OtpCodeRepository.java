package com.bookstore.domain.repository;

import com.bookstore.domain.entity.OtpCodeEntity;
import com.bookstore.domain.entity.enums.OtpType;
import java.time.LocalDateTime;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OtpCodeRepository extends JpaRepository<OtpCodeEntity, Long> {
    Optional<OtpCodeEntity> findTopByEmailAndTypeAndIsUsedFalseOrderByCreatedAtDesc(String email, OtpType type);

    Optional<OtpCodeEntity> findTopByEmailAndTypeOrderByCreatedAtDesc(String email, OtpType type);

    long countByEmailAndTypeAndCreatedAtAfter(String email, OtpType type, LocalDateTime threshold);

    void deleteByExpiresAtBefore(LocalDateTime threshold);
}
