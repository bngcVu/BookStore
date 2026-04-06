package com.bookstore.domain.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.bookstore.domain.entity.CartEntity;

@Repository
public interface CartRepository extends JpaRepository<CartEntity, Long> {
    List<CartEntity> findByUserId(Long userId);
    
    Optional<CartEntity> findByUserIdAndVariantId(Long userId, Long variantId);
    
    Optional<CartEntity> findByIdAndUserId(Long id, Long userId);
    
    void deleteByUserId(Long userId);
}
