package com.bookstore.domain.repository;

import com.bookstore.domain.entity.CustomerTierEntity;
import java.math.BigDecimal;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerTierRepository extends JpaRepository<CustomerTierEntity, Long> {
    Optional<CustomerTierEntity> findTopByMinSpentLessThanEqualOrderByMinSpentDesc(BigDecimal minSpent);
}
