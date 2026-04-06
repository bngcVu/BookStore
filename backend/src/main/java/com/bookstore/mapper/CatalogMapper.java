package com.bookstore.mapper;

import com.bookstore.domain.entity.AuthorEntity;
import com.bookstore.domain.entity.BookAuthorEntity;
import com.bookstore.domain.entity.BookEntity;
import com.bookstore.domain.entity.BookImageEntity;
import com.bookstore.domain.entity.BookVariantEntity;
import com.bookstore.domain.entity.CategoryEntity;
import com.bookstore.domain.entity.PublisherEntity;
import com.bookstore.dto.response.AuthorResponse;
import com.bookstore.dto.response.BookImageResponse;
import com.bookstore.dto.response.BookSummaryResponse;
import com.bookstore.dto.response.BookDetailResponse;
import com.bookstore.dto.response.BookVariantResponse;
import com.bookstore.dto.response.CategoryResponse;
import com.bookstore.dto.response.PublisherResponse;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.stereotype.Component;

@Component
public class CatalogMapper {

    // ---- Category ----

    public CategoryResponse toCategoryResponse(CategoryEntity entity) {
        if (entity == null) return null;
        return CategoryResponse.builder()
                .id(entity.getId())
                .name(entity.getName())
                .slug(entity.getSlug())
                .parentId(entity.getParent() != null ? entity.getParent().getId() : null)
                .level(entity.getLevel())
                .imageUrl(entity.getImageUrl())
                .sortOrder(entity.getSortOrder())
                .isActive(entity.getIsActive())
                .createdAt(entity.getCreatedAt())
                .build();
    }

    // ---- Author ----

    public AuthorResponse toAuthorResponse(AuthorEntity entity) {
        if (entity == null) return null;
        return AuthorResponse.builder()
                .id(entity.getId())
                .name(entity.getName())
                .slug(entity.getSlug())
                .biography(entity.getBiography())
                .imageUrl(entity.getImageUrl())
                .build();
    }

    // ---- Publisher ----

    public PublisherResponse toPublisherResponse(PublisherEntity entity) {
        if (entity == null) return null;
        return PublisherResponse.builder()
                .id(entity.getId())
                .name(entity.getName())
                .slug(entity.getSlug())
                .logoUrl(entity.getLogoUrl())
                .build();
    }

    // ---- BookImage ----

    public BookImageResponse toBookImageResponse(BookImageEntity entity) {
        if (entity == null) return null;
        return BookImageResponse.builder()
                .id(entity.getId())
                .imageUrl(entity.getImageUrl())
                .altText(entity.getAltText())
                .isPrimary(entity.getIsPrimary())
                .sortOrder(entity.getSortOrder())
                .build();
    }

    // ---- BookVariant ----

    public BookVariantResponse toBookVariantResponse(BookVariantEntity entity) {
        if (entity == null) return null;
        int available = entity.getInventory() != null
                ? entity.getInventory().getAvailableQuantity()
                : 0;
        return BookVariantResponse.builder()
                .id(entity.getId())
                .sku(entity.getSku())
                .coverType(entity.getCoverType() != null ? entity.getCoverType().name() : null)
                .edition(entity.getEdition())
                .price(entity.getPrice())
                .compareAtPrice(entity.getCompareAtPrice())
                .coverImageUrl(entity.getCoverImageUrl())
                .thumbnailUrl(entity.getThumbnailUrl())
                .isActive(entity.getIsActive())
                .availableQuantity(available)
                .createdAt(entity.getCreatedAt())
                .build();
    }

    // ---- Book ----
    public BookSummaryResponse toBookSummaryResponse(BookEntity entity) {
        if (entity == null) return null;

        List<AuthorResponse> authors = entity.getBookAuthors() == null
                ? Collections.emptyList()
                : entity.getBookAuthors().stream()
                        .map(ba -> toAuthorResponse(ba.getAuthor()))
                        .collect(Collectors.toList());

        String defaultImageUrl = entity.getImages() != null && !entity.getImages().isEmpty() 
                ? entity.getImages().get(0).getImageUrl() : null;

        return BookSummaryResponse.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .slug(entity.getSlug())
                .originalPrice(entity.getBasePrice())
                .salePrice(entity.getBasePrice())
                .avgRating(entity.getAvgRating())
                .reviewCount(entity.getReviewCount())
                .soldCount(entity.getSoldCount())
                .isFeatured(entity.getIsFeatured())
                .category(toCategoryResponse(entity.getCategory()))
                .authors(authors)
                .imageUrl(defaultImageUrl)
                .build();
    }

    public BookDetailResponse toBookDetailResponse(BookEntity entity) {
        if (entity == null) return null;

        List<AuthorResponse> authors = entity.getBookAuthors() == null
                ? Collections.emptyList()
                : entity.getBookAuthors().stream()
                        .map(ba -> toAuthorResponse(ba.getAuthor()))
                        .collect(Collectors.toList());

        List<BookImageResponse> images = entity.getImages() == null
                ? Collections.emptyList()
                : entity.getImages().stream()
                        .map(this::toBookImageResponse)
                        .collect(Collectors.toList());

        List<BookVariantResponse> variants = entity.getVariants() == null
                ? Collections.emptyList()
                : entity.getVariants().stream()
                        .filter(v -> Boolean.TRUE.equals(v.getIsActive()))
                        .map(this::toBookVariantResponse)
                        .collect(Collectors.toList());
                        
        String defaultImageUrl = images.isEmpty() ? null : images.get(0).getImageUrl();

        return BookDetailResponse.builder()
                .id(entity.getId())
                .title(entity.getTitle())
                .slug(entity.getSlug())
                .isbn(entity.getIsbn())
                .description(entity.getDescription())
                .originalPrice(entity.getBasePrice())
                .salePrice(entity.getBasePrice())
                .avgRating(entity.getAvgRating())
                .reviewCount(entity.getReviewCount())
                .soldCount(entity.getSoldCount())
                .isFeatured(entity.getIsFeatured())
                .publicationYear(entity.getPublicationYear())
                .pages(entity.getPages())
                .weightGrams(entity.getWeightGrams())
                .language(entity.getLanguage())
                .imageUrl(defaultImageUrl)
                .category(toCategoryResponse(entity.getCategory()))
                .publisher(toPublisherResponse(entity.getPublisher()))
                .authors(authors)
                .images(images)
                .variants(variants)
                .build();
    }
}
