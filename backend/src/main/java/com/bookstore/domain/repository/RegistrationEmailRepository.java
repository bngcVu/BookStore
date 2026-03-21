package com.bookstore.domain.repository;

import com.bookstore.domain.entity.UserEntity;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RegistrationEmailRepository extends JpaRepository<UserEntity, Long> {
    Optional<UserEntity> findByEmailAndEmailVerifiedAtIsNotNull(String email);
}
