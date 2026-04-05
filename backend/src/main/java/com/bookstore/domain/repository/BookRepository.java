package com.bookstore.domain.repository;

import com.bookstore.domain.entity.BookEntity;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepository extends JpaRepository<BookEntity, Long> {

    Optional<BookEntity> findBySlug(String slug);

    Optional<BookEntity> findByIsbn(String isbn);

    boolean existsBySlug(String slug);

    boolean existsByIsbn(String isbn);

    /** Tìm sách active theo category */
    Page<BookEntity> findByCategoryIdAndIsActiveTrue(Long categoryId, Pageable pageable);

    /** Tìm sách nổi bật */
    Page<BookEntity> findByIsFeaturedTrueAndIsActiveTrue(Pageable pageable);

    /** Full-text search theo title */
    @Query("SELECT b FROM BookEntity b WHERE b.isActive = true AND " +
           "LOWER(b.title) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    Page<BookEntity> searchByTitle(String keyword, Pageable pageable);

    /** Sách bán chạy nhất */
    @Query("SELECT b FROM BookEntity b WHERE b.isActive = true ORDER BY b.soldCount DESC")
    Page<BookEntity> findBestSellers(Pageable pageable);

    /** Sách mới nhất */
    @Query("SELECT b FROM BookEntity b WHERE b.isActive = true ORDER BY b.createdAt DESC")
    Page<BookEntity> findNewest(Pageable pageable);
}
