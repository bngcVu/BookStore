package com.bookstore.domain.repository;

import com.bookstore.domain.entity.AuthorEntity;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorRepository extends JpaRepository<AuthorEntity, Long> {

    Optional<AuthorEntity> findBySlug(String slug);

    boolean existsBySlug(String slug);

    @Query("SELECT a FROM AuthorEntity a WHERE LOWER(a.name) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<AuthorEntity> searchByName(String keyword, Pageable pageable);
}
