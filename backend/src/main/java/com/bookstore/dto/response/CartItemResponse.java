package com.bookstore.dto.response;

import java.math.BigDecimal;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class CartItemResponse {
    private Long id;
    private Long variantId;
    private String title;
    private String coverImageUrl;
    private String coverType;
    private BigDecimal price;
    private Integer quantity;
    private BigDecimal subtotal;
}
