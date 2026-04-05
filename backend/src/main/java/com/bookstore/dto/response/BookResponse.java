package com.bookstore.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookResponse {
    private Long id;
    private String title;
    private String slug;
    private String isbn;
    private String description;
    private BigDecimal basePrice;
    private BigDecimal avgRating;
    private Integer reviewCount;
    private Integer soldCount;
    private Integer viewCount;
    private Boolean isActive;
    private Boolean isFeatured;
    private Integer publicationYear;
    private Integer pages;
    private String dimensions;
    private Integer weightGrams;
    private String coverType;
    private String language;
    private LocalDateTime createdAt;

    // Nested objects
    private CategoryResponse category;
    private PublisherResponse publisher;
    private List<AuthorResponse> authors;
    private List<BookImageResponse> images;
    private List<BookVariantResponse> variants;
}
