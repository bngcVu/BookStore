package com.bookstore.controller;

import com.bookstore.api.response.ApiResponse;
import com.bookstore.dto.request.BookCreateRequest;
import com.bookstore.dto.response.BookSummaryResponse;
import com.bookstore.dto.response.BookDetailResponse;
import com.bookstore.service.BookService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/books")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;

    /**
     * GET /api/v1/books/{slug}
     * Lấy chi tiết sách theo slug (public).
     */
    @GetMapping("/{slug}")
    public ResponseEntity<ApiResponse<BookDetailResponse>> getBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(ApiResponse.success("Lấy chi tiết sách thành công", bookService.getBySlug(slug)));
    }

    /**
     * GET /api/v1/books?categoryId=&page=&size=
     * Lấy danh sách sách theo danh mục (public, phân trang).
     */
    @GetMapping
    public ResponseEntity<ApiResponse<Page<BookSummaryResponse>>> getByCategory(
            @RequestParam(required = false) Long categoryId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {

        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<BookSummaryResponse> result = (categoryId != null)
                ? bookService.getByCategory(categoryId, pageable)
                : bookService.getNewest(pageable);
        return ResponseEntity.ok(ApiResponse.success("Lấy danh sách sách thành công", result));
    }

    /**
     * GET /api/v1/books/featured
     * Sách nổi bật (public).
     */
    @GetMapping("/featured")
    public ResponseEntity<ApiResponse<Page<BookSummaryResponse>>> getFeatured(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(ApiResponse.success("Lấy sách nổi bật thành công", bookService.getFeatured(pageable)));
    }

    /**
     * GET /api/v1/books/bestsellers
     * Sách bán chạy (public).
     */
    @GetMapping("/bestsellers")
    public ResponseEntity<ApiResponse<Page<BookSummaryResponse>>> getBestSellers(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(ApiResponse.success("Lấy sách bán chạy thành công", bookService.getBestSellers(pageable)));
    }

    /**
     * GET /api/v1/books/search?keyword=&page=&size=
     * Tìm kiếm sách (public).
     */
    @GetMapping("/search")
    public ResponseEntity<ApiResponse<Page<BookSummaryResponse>>> search(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        Pageable pageable = PageRequest.of(page, size);
        return ResponseEntity.ok(ApiResponse.success("Tìm kiếm sách thành công", bookService.search(keyword, pageable)));
    }

    /**
     * POST /api/v1/books
     * Tạo sách mới (chỉ ADMIN).
     */
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<BookDetailResponse>> create(@Valid @RequestBody BookCreateRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(ApiResponse.success("Tạo sách thành công", bookService.create(request)));
    }

    /**
     * PATCH /api/v1/books/{id}/toggle-active
     * Bật/tắt hiển thị sách (chỉ ADMIN).
     */
    @PatchMapping("/{id}/toggle-active")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse<Void>> toggleActive(@PathVariable Long id) {
        bookService.toggleActive(id);
        return ResponseEntity.ok(ApiResponse.success("Cập nhật trạng thái sách thành công", null));
    }
}
