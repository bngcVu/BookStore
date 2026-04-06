package com.bookstore.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.bookstore.api.response.ApiResponse;
import com.bookstore.dto.request.CartItemAddRequest;
import com.bookstore.dto.request.CartItemUpdateRequest;
import com.bookstore.dto.response.CartResponse;
import com.bookstore.service.CartService;
import com.bookstore.util.SecurityUtil;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/v1/cart")
@RequiredArgsConstructor
public class CartController {

    private final CartService cartService;

    @GetMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<CartResponse>> getCart() {
        return ResponseEntity.ok(ApiResponse.success("Lấy giỏ hàng thành công", cartService.getCart(SecurityUtil.currentUserId())));
    }

    @PostMapping("/items")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<CartResponse>> addToCart(@Valid @RequestBody CartItemAddRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Thêm vào giỏ hàng thành công", cartService.addToCart(SecurityUtil.currentUserId(), request)));
    }

    @PatchMapping("/items/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<CartResponse>> updateCartItem(
            @PathVariable Long id,
            @Valid @RequestBody CartItemUpdateRequest request) {
        return ResponseEntity.ok(ApiResponse.success("Cập nhật giỏ hàng thành công", cartService.updateCartItem(SecurityUtil.currentUserId(), id, request)));
    }

    @DeleteMapping("/items/{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<CartResponse>> removeCartItem(@PathVariable Long id) {
        return ResponseEntity.ok(ApiResponse.success("Xóa sản phẩm thành công", cartService.removeCartItem(SecurityUtil.currentUserId(), id)));
    }

    @DeleteMapping
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<ApiResponse<Void>> clearCart() {
        cartService.clearCart(SecurityUtil.currentUserId());
        return ResponseEntity.ok(ApiResponse.success("Xóa giỏ hàng thành công", null));
    }
}
