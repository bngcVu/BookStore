package com.bookstore.dto.response;

import java.math.BigDecimal;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class TierResponse {
    private Long id;
    private String name;
    private Integer discountPercent;
    private BigDecimal minSpent;
}
