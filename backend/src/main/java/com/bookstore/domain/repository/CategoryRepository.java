package com.bookstore.domain.repository;

import com.bookstore.domain.entity.CategoryEntity;
import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@Repository
public interface CategoryRepository extends JpaRepository<CategoryEntity, Long> {

    Optional<CategoryEntity> findBySlug(String slug);

    boolean existsBySlug(String slug);

    /** Lấy toàn bộ danh mục gốc (không có parent) theo thứ tự sort */
    List<CategoryEntity> findByParentIsNullAndIsActiveTrueOrderBySortOrderAsc();

    /** Lấy danh mục con của một parent */
    List<CategoryEntity> findByParentIdAndIsActiveTrueOrderBySortOrderAsc(Long parentId);

    /** Đếm số sách active trong category */
    @Query("SELECT COUNT(b) FROM BookEntity b WHERE b.category.id = :categoryId AND b.isActive = true")
    long countActiveBooksByCategoryId(Long categoryId);
}
