package com.bookstore.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class CategoryCreateRequest {

    @NotBlank(message = "Tên danh mục không được để trống")
    private String name;

    private Long parentId;
    private String imageUrl;
    private Integer sortOrder = 0;
}
