package com.bookstore.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import java.math.BigDecimal;
import java.util.List;
import lombok.Data;

@Data
public class BookCreateRequest {

    @NotBlank(message = "Tiêu đề sách không được để trống")
    private String title;

    @NotNull(message = "Danh mục không được để trống")
    private Long categoryId;

    @NotNull(message = "Nhà xuất bản không được để trống")
    private Long publisherId;

    private String isbn;
    private Integer publicationYear;
    private Integer pages;
    private String dimensions;
    private Integer weightGrams;
    private String coverType;
    private String language;
    private String description;

    @NotNull(message = "Giá cơ bản không được để trống")
    @Positive(message = "Giá phải lớn hơn 0")
    private BigDecimal basePrice;

    private Boolean isFeatured = false;

    /** Danh sách ID tác giả */
    private List<Long> authorIds;
    private Long primaryAuthorId;
}
