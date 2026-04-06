package com.bookstore.dto.response;

import java.math.BigDecimal;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookDetailResponse {
    private Long id;
    private String slug;
    private String title;
    private List<AuthorResponse> authors;
    private CategoryResponse category;
    private String imageUrl;
    private BigDecimal originalPrice;
    private BigDecimal salePrice;
    private BigDecimal avgRating;
    private Integer reviewCount;
    private Integer soldCount;
    private Boolean isFlashSale;
    private Boolean isFeatured;
    private Integer totalQuantity;
    private Integer soldQuantity;
    
    private PublisherResponse publisher;
    private String isbn;
    private String description;
    private String language;
    private Integer pages;
    private Integer weightGrams; // weight
    private Integer publicationYear;
    
    private List<BookImageResponse> images;
    private List<BookVariantResponse> variants;
}
