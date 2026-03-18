package com.bookstore.domain.repository;

import com.bookstore.domain.entity.AdminEntity;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdminRepository extends JpaRepository<AdminEntity, Long> {
    Optional<AdminEntity> findByEmail(String email);
}
