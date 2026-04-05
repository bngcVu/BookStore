package com.bookstore.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class BookImageResponse {
    private Long id;
    private String imageUrl;
    private String altText;
    private Boolean isPrimary;
    private Integer sortOrder;
}
