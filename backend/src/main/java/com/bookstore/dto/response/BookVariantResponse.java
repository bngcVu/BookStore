package com.bookstore.dto.response;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookVariantResponse {
    private Long id;
    private String sku;
    private String coverType;
    private String edition;
    private BigDecimal price;
    private BigDecimal compareAtPrice;
    private String coverImageUrl;
    private String thumbnailUrl;
    private Boolean isActive;
    private Integer availableQuantity;
    private LocalDateTime createdAt;
}
