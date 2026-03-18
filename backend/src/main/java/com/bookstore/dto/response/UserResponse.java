package com.bookstore.dto.response;

import java.math.BigDecimal;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserResponse {
    private Long id;
    private String email;
    private String fullName;
    private String avatarUrl;
    private TierResponse tier;
    private Integer rewardPoints;
    private BigDecimal totalSpent;
}
