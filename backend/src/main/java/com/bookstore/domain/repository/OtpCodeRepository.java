package com.bookstore.domain.repository;

import com.bookstore.domain.entity.OtpCodeEntity;
import com.bookstore.domain.entity.OtpType;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OtpCodeRepository extends JpaRepository<OtpCodeEntity, Long> {
    Optional<OtpCodeEntity> findTopByEmailAndTypeAndIsUsedFalseOrderByCreatedAtDesc(String email, OtpType type);
}
