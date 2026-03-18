package com.bookstore.domain.repository;

import com.bookstore.domain.entity.RegistrationPendingEntity;
import java.time.LocalDateTime;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegistrationPendingRepository extends JpaRepository<RegistrationPendingEntity, Long> {
    Optional<RegistrationPendingEntity> findByEmail(String email);

    boolean existsByPhone(String phone);

    boolean existsByPhoneAndEmailNot(String phone, String email);

    void deleteByEmail(String email);

    void deleteByExpiresAtBefore(LocalDateTime threshold);
}
