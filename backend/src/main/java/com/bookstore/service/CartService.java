package com.bookstore.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.bookstore.domain.entity.BookVariantEntity;
import com.bookstore.domain.entity.CartEntity;
import com.bookstore.domain.repository.BookVariantRepository;
import com.bookstore.domain.repository.CartRepository;
import com.bookstore.dto.request.CartItemAddRequest;
import com.bookstore.dto.request.CartItemUpdateRequest;
import com.bookstore.dto.response.CartItemResponse;
import com.bookstore.dto.response.CartResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CartService {
    private final CartRepository cartRepository;
    private final BookVariantRepository bookVariantRepository;

    @Transactional(readOnly = true)
    public CartResponse getCart(Long userId) {
        List<CartEntity> cartItems = cartRepository.findByUserId(userId);
        
        List<CartItemResponse> itemResponses = cartItems.stream()
            .map(item -> {
                BookVariantEntity variant = item.getVariant();
                BigDecimal subtotal = variant.getPrice().multiply(BigDecimal.valueOf(item.getQuantity()));
                
                return CartItemResponse.builder()
                    .id(item.getId())
                    .variantId(item.getVariantId())
                    .title(variant.getBook().getTitle())
                    .coverImageUrl(variant.getCoverImageUrl())
                    .coverType(variant.getCoverType() != null ? variant.getCoverType().name() : null)
                    .price(variant.getPrice())
                    .quantity(item.getQuantity())
                    .subtotal(subtotal)
                    .build();
            })
            .collect(Collectors.toList());

        BigDecimal totalPrice = itemResponses.stream()
            .map(CartItemResponse::getSubtotal)
            .reduce(BigDecimal.ZERO, BigDecimal::add);

        Integer totalItems = itemResponses.stream()
            .mapToInt(CartItemResponse::getQuantity)
            .sum();

        return CartResponse.builder()
            .items(itemResponses)
            .totalItems(totalItems)
            .totalPrice(totalPrice)
            .build();
    }

    @Transactional
    public CartResponse addToCart(Long userId, CartItemAddRequest request) {
        BookVariantEntity variant = bookVariantRepository.findById(request.getVariantId())
            .orElseThrow(() -> new RuntimeException("Book variant not found"));
            
        CartEntity cartItem = cartRepository.findByUserIdAndVariantId(userId, request.getVariantId())
            .orElse(CartEntity.builder()
                .userId(userId)
                .variantId(request.getVariantId())
                .quantity(0)
                .build());
                
        cartItem.setQuantity(cartItem.getQuantity() + request.getQuantity());
        cartRepository.save(cartItem);
        
        return getCart(userId);
    }

    @Transactional
    public CartResponse updateCartItem(Long userId, Long itemId, CartItemUpdateRequest request) {
        CartEntity cartItem = cartRepository.findByIdAndUserId(itemId, userId)
            .orElseThrow(() -> new RuntimeException("Cart item not found"));
            
        cartItem.setQuantity(request.getQuantity());
        cartRepository.save(cartItem);
        
        return getCart(userId);
    }

    @Transactional
    public CartResponse removeCartItem(Long userId, Long itemId) {
        CartEntity cartItem = cartRepository.findByIdAndUserId(itemId, userId)
            .orElseThrow(() -> new RuntimeException("Cart item not found"));
            
        cartRepository.delete(cartItem);
        
        return getCart(userId);
    }

    @Transactional
    public void clearCart(Long userId) {
        cartRepository.deleteByUserId(userId);
    }
}
