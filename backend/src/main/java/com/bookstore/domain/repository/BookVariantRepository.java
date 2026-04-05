package com.bookstore.domain.repository;

import com.bookstore.domain.entity.BookVariantEntity;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface BookVariantRepository extends JpaRepository<BookVariantEntity, Long> {

    Optional<BookVariantEntity> findBySku(String sku);

    boolean existsBySku(String sku);

    List<BookVariantEntity> findByBookIdAndIsActiveTrueOrderByPriceAsc(Long bookId);

    /** Lấy variant đầu tiên (giá thấp nhất) của sách */
    @Query("SELECT v FROM BookVariantEntity v WHERE v.book.id = :bookId AND v.isActive = true ORDER BY v.price ASC LIMIT 1")
    Optional<BookVariantEntity> findCheapestVariant(Long bookId);
}
