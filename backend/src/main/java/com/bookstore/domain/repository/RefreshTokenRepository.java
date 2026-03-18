package com.bookstore.domain.repository;

import com.bookstore.domain.entity.RefreshTokenEntity;
import java.time.LocalDateTime;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface RefreshTokenRepository extends JpaRepository<RefreshTokenEntity, Long> {
    Optional<RefreshTokenEntity> findByTokenHashAndRevokedAtIsNull(String tokenHash);

    @Modifying
    @Query("update RefreshTokenEntity r set r.revokedAt = :revokedAt where r.user.id = :userId and r.revokedAt is null")
    void revokeAllForUser(@Param("userId") Long userId, @Param("revokedAt") LocalDateTime revokedAt);
}
