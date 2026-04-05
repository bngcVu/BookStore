package com.bookstore.domain.repository;

import com.bookstore.domain.entity.PublisherEntity;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface PublisherRepository extends JpaRepository<PublisherEntity, Long> {

    Optional<PublisherEntity> findBySlug(String slug);

    boolean existsBySlug(String slug);

    @Query("SELECT p FROM PublisherEntity p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<PublisherEntity> searchByName(String keyword, Pageable pageable);
}
