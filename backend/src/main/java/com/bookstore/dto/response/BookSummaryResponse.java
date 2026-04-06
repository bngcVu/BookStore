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
public class BookSummaryResponse {
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
}
