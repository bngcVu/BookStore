package com.bookstore.service;

import com.bookstore.domain.entity.CategoryEntity;
import com.bookstore.domain.repository.CategoryRepository;
import com.bookstore.dto.request.CategoryCreateRequest;
import com.bookstore.dto.response.CategoryResponse;
import com.bookstore.exception.AppException;
import com.bookstore.exception.ErrorCode;
import com.bookstore.mapper.CatalogMapper;
import com.bookstore.util.SlugUtil;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Slf4j
@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final CatalogMapper catalogMapper;

    /** Lấy toàn bộ cây danh mục (root → children) */
    @Transactional(readOnly = true)
    public List<CategoryResponse> getCategoryTree() {
        List<CategoryEntity> roots = categoryRepository
                .findByParentIsNullAndIsActiveTrueOrderBySortOrderAsc();

        return roots.stream()
                .map(this::buildTree)
                .collect(Collectors.toList());
    }

    /** Lấy danh mục theo slug */
    @Transactional(readOnly = true)
    public CategoryResponse getBySlug(String slug) {
        CategoryEntity entity = categoryRepository.findBySlug(slug)
                .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND,
                        "Không tìm thấy danh mục: " + slug));
        return catalogMapper.toCategoryResponse(entity);
    }

    /** Tạo danh mục mới (admin) */
    @Transactional
    public CategoryResponse create(CategoryCreateRequest request) {
        String slug = generateUniqueSlug(request.getName(), null);

        CategoryEntity entity = new CategoryEntity();
        entity.setName(request.getName());
        entity.setSlug(slug);
        entity.setSortOrder(request.getSortOrder() != null ? request.getSortOrder() : 0);
        entity.setImageUrl(request.getImageUrl());

        if (request.getParentId() != null) {
            CategoryEntity parent = categoryRepository.findById(request.getParentId())
                    .orElseThrow(() -> new AppException(ErrorCode.CATEGORY_NOT_FOUND,
                            "Danh mục cha không tồn tại"));
            entity.setParent(parent);
            entity.setLevel(parent.getLevel() + 1);
        } else {
            entity.setLevel(0);
        }

        CategoryEntity saved = categoryRepository.save(entity);
        log.info("Đã tạo danh mục: id={}, name={}", saved.getId(), saved.getName());
        return catalogMapper.toCategoryResponse(saved);
    }

    // ---- private helpers ----

    private CategoryResponse buildTree(CategoryEntity root) {
        CategoryResponse response = catalogMapper.toCategoryResponse(root);
        List<CategoryEntity> children = categoryRepository
                .findByParentIdAndIsActiveTrueOrderBySortOrderAsc(root.getId());
        if (!children.isEmpty()) {
            response.setChildren(children.stream()
                    .map(this::buildTree)
                    .collect(Collectors.toList()));
        }
        return response;
    }

    private String generateUniqueSlug(String name, Long excludeId) {
        String base = SlugUtil.toSlug(name);
        String slug = base;
        int counter = 1;
        while (categoryRepository.existsBySlug(slug)) {
            slug = SlugUtil.toSlugWithSuffix(name, counter++);
        }
        return slug;
    }
}
