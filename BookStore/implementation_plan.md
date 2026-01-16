# Spring Boot Backend - Roadmap 4 Tuần

Xây dựng REST API backend **từng bước** cho hệ thống BookStore, mỗi tuần tập trung vào một nhóm chức năng cụ thể với các bảng liên quan.

## Technology Stack

- **Spring Boot**: 3.2.x
- **Java**: 17 (LTS) - *có thể đổi sang 21*
- **Build Tool**: Maven - *có thể đổi sang Gradle*
- **Database**: MySQL 8.0+
- **Security**: Spring Security + JWT
- **Documentation**: Swagger/OpenAPI

> [!NOTE]
> Bạn có thể chọn Java 21 hoặc Gradle nếu muốn. Mặc định tôi sẽ dùng **Java 17 + Maven**.

## User Review Required

> [!IMPORTANT]
> **Xác nhận trước khi bắt đầu:**
> 1. Database `bookstore` đã được tạo và import đủ 3 file SQL chưa?
>    - `create_tables.sql`
>    - `database_optimizations.sql`
>    - `scripts/seed_data_tiki.sql`
> 2. Bạn muốn bắt đầu từ **Tuần nào**? (Tuần 1-4)
> 3. Có cần tôi tạo **toàn bộ project skeleton** trước, rồi làm từng tuần sau?

## 📅 Roadmap 4 Tuần

### 🗓️ TUẦN 1: Core Foundation - Catalog & Products (Ngày 1-7)

**Mục tiêu:** Tạo project structure và hoàn thành hệ thống quản lý sách

**Bảng liên quan:**
- ✅ `books`, `categories`, `authors`, `publishers`
- ✅ `book_authors`, `book_variants`, `book_images`
- ✅ `inventory`, `price_history`

**Chi tiết từng ngày:**

#### **Ngày 1-2: Project Setup**
- [NEW] Project structure với Maven
- [NEW] `pom.xml` - Dependencies cơ bản
- [NEW] `application.yml` - Database config
- [NEW] Base package structure
- [NEW] Exception handling foundation
- **Test:** Project chạy được, connect database thành công

#### **Ngày 3-4: Catalog Entities & Repositories**
- [NEW] `Category.java`, `Author.java`, `Publisher.java`
- [NEW] `Book.java` với relationships
- [NEW] `BookVariant.java`, `BookImage.java`
- [NEW] `Inventory.java`, `PriceHistory.java`
- [NEW] Repository interfaces cho tất cả entities trên
- **Test:** JPA mapping đúng, chạy được basic CRUD

#### **Ngày 5-6: Book Service & APIs**
- [NEW] `BookService` - Business logic
- [NEW] DTOs: `BookListDTO`, `BookDetailDTO`
- [NEW] `BookController` - REST endpoints
  - `GET /api/books` - Listing với pagination
  - `GET /api/books/{id}` - Chi tiết sách
  - `GET /api/books/slug/{slug}` - Tìm theo slug
  - `GET /api/books/search?q=` - Full-text search
  - `GET /api/books/bestsellers` - Sách bán chạy
- **Test:** Postman test tất cả endpoints

#### **Ngày 7: Category & Search**
- [NEW] `CategoryController`
  - `GET /api/categories` - Danh sách categories
  - `GET /api/categories/{id}/books` - Sách theo category
- [NEW] Stored procedure integration: `sp_get_bestsellers`
- [NEW] Swagger documentation setup
- **Deliverable:** API catalog hoàn chỉnh, test được qua Swagger UI

---

### 🗓️ TUẦN 2: User Management & Authentication (Ngày 8-14)

**Mục tiêu:** Hệ thống đăng ký, đăng nhập, quản lý user

**Bảng liên quan:**
- ✅ `users`, `customer_tiers`, `user_addresses`
- ✅ `admins`, `admin_activity_logs`
- ✅ `user_book_interactions`

**Chi tiết từng ngày:**

#### **Ngày 8-9: User Entities & Security Foundation**
- [NEW] `User.java` implements `UserDetails`
- [NEW] `CustomerTier.java`, `UserAddress.java`
- [NEW] `Admin.java`
- [NEW] Spring Security config
- [NEW] `JwtUtil` - JWT helper
- [NEW] `JwtAuthenticationFilter`
- **Test:** Security config hoạt động

#### **Ngày 10-11: Authentication Service & APIs**
- [NEW] `AuthService` - Register, Login, Validate token
- [NEW] `UserService` - Profile management
- [NEW] DTOs: `RegisterRequest`, `LoginRequest`, `UserDTO`
- [NEW] `AuthController`
  - `POST /api/auth/register` - Đăng ký
  - `POST /api/auth/login` - Đăng nhập → JWT token
  - `GET /api/auth/me` - Current user info
- **Test:** Register → Login → Access protected endpoint

#### **Ngày 12-13: User Profile & Tier System**
- [NEW] `UserController`
  - `GET /api/users/profile` - Xem profile
  - `PUT /api/users/profile` - Cập nhật profile
  - `GET /api/users/addresses` - Danh sách địa chỉ
  - `POST /api/users/addresses` - Thêm địa chỉ
- [NEW] Stored procedure: `sp_update_user_tier`
- [NEW] Tier upgrade logic
- **Test:** User tier tự động upgrade khi `total_spent` tăng

#### **Ngày 14: Admin Authentication**
- [NEW] `AdminController` - Basic endpoints
- [NEW] Role-based access: `@PreAuthorize("hasRole('ADMIN')")`
- [NEW] Admin login flow riêng biệt
- **Deliverable:** Auth system hoàn chỉnh với JWT, role-based access

---

### 🗓️ TUẦN 3: Shopping Cart & Orders (Ngày 15-21)

**Mục tiêu:** Giỏ hàng và quy trình đặt hàng

**Bảng liên quan:**
- ✅ `carts`
- ✅ `orders`, `order_items`, `order_status_history`
- ✅ `vouchers`, `voucher_usage`
- ✅ `payments`, `refunds`
- ✅ `provinces`, `shipping_carriers`, `shipping_rates`

**Chi tiết từng ngày:**

#### **Ngày 15-16: Cart System**
- [NEW] `Cart.java` entity
- [NEW] `CartService`
- [NEW] `CartController`
  - `GET /api/cart` - Xem giỏ hàng
  - `POST /api/cart/items` - Thêm vào giỏ
  - `PUT /api/cart/items/{id}` - Cập nhật số lượng
  - `DELETE /api/cart/items/{id}` - Xóa khỏi giỏ
- [NEW] Stock validation khi add to cart
- **Test:** Add to cart, update quantity, remove

#### **Ngày 17-18: Order Creation**
- [NEW] `Order.java`, `OrderItem.java`
- [NEW] `OrderService.createOrder()`
  - Validate stock: `sp_check_stock_availability`
  - Calculate shipping: `sp_calculate_shipping_fee`
  - Apply voucher discount
  - Create order + order_items
  - Clear cart
- [NEW] DTOs: `CreateOrderRequest`, `OrderDTO`
- [NEW] `OrderController`
  - `POST /api/orders` - Tạo đơn hàng
  - `GET /api/orders` - Lịch sử đơn hàng
  - `GET /api/orders/{id}` - Chi tiết đơn
- **Test:** Create order → Verify inventory reserved (trigger)

#### **Ngày 19: Vouchers & Shipping**
- [NEW] `Voucher.java`, `VoucherUsage.java`
- [NEW] `VoucherService.validateVoucher()`
- [NEW] `VoucherController`
  - `GET /api/vouchers/active` - Voucher đang active
  - `POST /api/vouchers/validate` - Validate voucher code
- [NEW] `ShippingService` - Calculate shipping fee
- **Test:** Apply voucher, tính phí ship đúng

#### **Ngày 20-21: Order Status & Payment**
- [NEW] `Payment.java`, `Refund.java`
- [NEW] Order status update flow
  - `PUT /api/orders/{id}/status` - Admin update status
  - `POST /api/orders/{id}/cancel` - User hủy đơn
- [NEW] Trigger testing:
  - Order completed → `sold_count` tăng
  - Order cancelled → inventory released
- [NEW] Payment integration skeleton (chưa integrate gateway thật)
- **Deliverable:** Hoàn chỉnh flow từ cart → checkout → order → payment

---

### 🗓️ TUẦN 4: Reviews, Promotions & Advanced Features (Ngày 22-28)

**Mục tiêu:** Đánh giá, khuyến mãi, flash sale

**Bảng liên quan:**
- ✅ `reviews`, `review_images`
- ✅ `flash_sales`, `flash_sale_items`
- ✅ `promotions`, `promotion_books`
- ✅ `notifications`
- ✅ `inventory_history`

**Chi tiết từng ngày:**

#### **Ngày 22-23: Review System**
- [NEW] `Review.java`, `ReviewImage.java`
- [NEW] `ReviewService`
  - Create review (chỉ user đã mua)
  - Update, delete review
  - Moderate review (admin)
- [NEW] `ReviewController`
  - `POST /api/reviews` - Tạo đánh giá
  - `GET /api/books/{id}/reviews` - Reviews của sách
  - `PUT /api/reviews/{id}` - Sửa review
- [NEW] Trigger test: Review created → `avg_rating` tự động cập nhật
- **Test:** Create review → avg_rating thay đổi

#### **Ngày 24-25: Flash Sales**
- [NEW] `FlashSale.java`, `FlashSaleItem.java`
- [NEW] `FlashSaleService`
  - Get active flash sales
  - Check flash sale availability
  - Apply flash sale price
- [NEW] `FlashSaleController`
  - `GET /api/flash-sales/active` - Flash sale đang diễn ra
  - `GET /api/flash-sales/{id}/items` - Items trong flash sale
- [NEW] Scheduled task: Auto activate/deactivate flash sales
- **Test:** Flash sale price override normal price

#### **Ngày 26: Promotions**
- [NEW] `Promotion.java`, `PromotionBook.java`
- [NEW] `PromotionService`
- [NEW] `PromotionController`
  - `GET /api/promotions/active` - Khuyến mãi đang active
- **Test:** Bundle deals, combo pricing

#### **Ngày 27: Notifications & Admin Dashboard**
- [NEW] `Notification.java`
- [NEW] `NotificationService` - Send notification to users
- [NEW] Admin statistics endpoints
  - `GET /api/admin/dashboard` - Revenue, orders, users stats
  - `GET /api/admin/low-stock` - Sử dụng view `vw_low_stock_products`
- **Test:** Dashboard hiển thị thống kê đúng

#### **Ngày 28: Testing & Documentation**
- [NEW] Unit tests cho Services
- [NEW] Integration tests cho Controllers
- [NEW] Swagger documentation hoàn chỉnh
- [NEW] README.md với API usage examples
- [NEW] Postman collection export
- **Deliverable:** Backend hoàn chỉnh, test coverage > 70%, documentation đầy đủ

---

## Proposed Changes (Tổng Hợp Files)

### **Tuần 1: Files Cần Tạo**

#### Project Setup
- [NEW] [pom.xml](file:///d:/BookStore/backend/pom.xml) - Maven dependencies
- [NEW] [application.yml](file:///d:/BookStore/backend/src/main/resources/application.yml) - Configuration
- [NEW] [BookStoreApplication.java](file:///d:/BookStore/backend/src/main/java/vn/bookstore/BookStoreApplication.java) - Main class

#### Exception Handling (Tuần 1)
- [NEW] [GlobalExceptionHandler.java](file:///d:/BookStore/backend/src/main/java/vn/bookstore/exception/GlobalExceptionHandler.java) - Centralized error handling
- [NEW] [ErrorResponse.java](file:///d:/BookStore/backend/src/main/java/vn/bookstore/dto/ErrorResponse.java) - Error response DTO
- [NEW] [ResourceNotFoundException.java](file:///d:/BookStore/backend/src/main/java/vn/bookstore/exception/ResourceNotFoundException.java)
- [NEW] [InsufficientStockException.java](file:///d:/BookStore/backend/src/main/java/vn/bookstore/exception/InsufficientStockException.java)
- [NEW] [InvalidVoucherException.java](file:///d:/BookStore/backend/src/main/java/vn/bookstore/exception/InvalidVoucherException.java)
- [NEW] [DuplicateResourceException.java](file:///d:/BookStore/backend/src/main/java/vn/bookstore/exception/DuplicateResourceException.java)
- [NEW] [UnauthorizedException.java](file:///d:/BookStore/backend/src/main/java/vn/bookstore/exception/UnauthorizedException.java)
- [NEW] [BusinessException.java](file:///d:/BookStore/backend/src/main/java/vn/bookstore/exception/BusinessException.java)

#### Entities (Tuần 1)
- [NEW] [Category.java](file:///d:/BookStore/backend/src/main/java/vn/bookstore/entity/Category.java)
- [NEW] [Author.java](file:///d:/BookStore/backend/src/main/java/vn/bookstore/entity/Author.java)
- [NEW] [Publisher.java](file:///d:/BookStore/backend/src/main/java/vn/bookstore/entity/Publisher.java)
- [NEW] [Book.java](file:///d:/BookStore/backend/src/main/java/vn/bookstore/entity/Book.java)
- [NEW] [BookVariant.java](file:///d:/BookStore/backend/src/main/java/vn/bookstore/entity/BookVariant.java)
- [NEW] [BookImage.java](file:///d:/BookStore/backend/src/main/java/vn/bookstore/entity/BookImage.java)
- [NEW] [Inventory.java](file:///d:/BookStore/backend/src/main/java/vn/bookstore/entity/Inventory.java)

#### Services & Controllers (Tuần 1)
- [NEW] [BookService.java](file:///d:/BookStore/backend/src/main/java/vn/bookstore/service/BookService.java)
- [NEW] [BookController.java](file:///d:/BookStore/backend/src/main/java/vn/bookstore/controller/BookController.java)
- [NEW] [CategoryController.java](file:///d:/BookStore/backend/src/main/java/vn/bookstore/controller/CategoryController.java)

---

### **Tuần 2: Files Cần Tạo**

#### Entities (Tuần 2)
- [NEW] [User.java](file:///d:/BookStore/backend/src/main/java/vn/bookstore/entity/User.java) - Implements UserDetails
- [NEW] [CustomerTier.java](file:///d:/BookStore/backend/src/main/java/vn/bookstore/entity/CustomerTier.java)
- [NEW] [UserAddress.java](file:///d:/BookStore/backend/src/main/java/vn/bookstore/entity/UserAddress.java)
- [NEW] [Admin.java](file:///d:/BookStore/backend/src/main/java/vn/bookstore/entity/Admin.java)

#### Security
- [NEW] [SecurityConfig.java](file:///d:/BookStore/backend/src/main/java/vn/bookstore/config/SecurityConfig.java)
- [NEW] [JwtUtil.java](file:///d:/BookStore/backend/src/main/java/vn/bookstore/security/JwtUtil.java)
- [NEW] [JwtAuthenticationFilter.java](file:///d:/BookStore/backend/src/main/java/vn/bookstore/security/JwtAuthenticationFilter.java)

#### Services & Controllers (Tuần 2)
- [NEW] [AuthService.java](file:///d:/BookStore/backend/src/main/java/vn/bookstore/service/AuthService.java)
- [NEW] [UserService.java](file:///d:/BookStore/backend/src/main/java/vn/bookstore/service/UserService.java)
- [NEW] [AuthController.java](file:///d:/BookStore/backend/src/main/java/vn/bookstore/controller/AuthController.java)
- [NEW] [UserController.java](file:///d:/BookStore/backend/src/main/java/vn/bookstore/controller/UserController.java)

---

### **Tuần 3: Files Cần Tạo**

#### Entities (Tuần 3)
- [NEW] [Cart.java](file:///d:/BookStore/backend/src/main/java/vn/bookstore/entity/Cart.java)
- [NEW] [Order.java](file:///d:/BookStore/backend/src/main/java/vn/bookstore/entity/Order.java)
- [NEW] [OrderItem.java](file:///d:/BookStore/backend/src/main/java/vn/bookstore/entity/OrderItem.java)
- [NEW] [Voucher.java](file:///d:/BookStore/backend/src/main/java/vn/bookstore/entity/Voucher.java)
- [NEW] [Payment.java](file:///d:/BookStore/backend/src/main/java/vn/bookstore/entity/Payment.java)
- [NEW] [ShippingRate.java](file:///d:/BookStore/backend/src/main/java/vn/bookstore/entity/ShippingRate.java)

#### Services & Controllers (Tuần 3)
- [NEW] [CartService.java](file:///d:/BookStore/backend/src/main/java/vn/bookstore/service/CartService.java)
- [NEW] [OrderService.java](file:///d:/BookStore/backend/src/main/java/vn/bookstore/service/OrderService.java)
- [NEW] [VoucherService.java](file:///d:/BookStore/backend/src/main/java/vn/bookstore/service/VoucherService.java)
- [NEW] [CartController.java](file:///d:/BookStore/backend/src/main/java/vn/bookstore/controller/CartController.java)
- [NEW] [OrderController.java](file:///d:/BookStore/backend/src/main/java/vn/bookstore/controller/OrderController.java)
- [NEW] [DatabaseProcedureService.java](file:///d:/BookStore/backend/src/main/java/vn/bookstore/service/DatabaseProcedureService.java) - Stored procedures

---

### **Tuần 4: Files Cần Tạo**

#### Entities (Tuần 4)
- [NEW] [Review.java](file:///d:/BookStore/backend/src/main/java/vn/bookstore/entity/Review.java)
- [NEW] [FlashSale.java](file:///d:/BookStore/backend/src/main/java/vn/bookstore/entity/FlashSale.java)
- [NEW] [FlashSaleItem.java](file:///d:/BookStore/backend/src/main/java/vn/bookstore/entity/FlashSaleItem.java)
- [NEW] [Promotion.java](file:///d:/BookStore/backend/src/main/java/vn/bookstore/entity/Promotion.java)
- [NEW] [Notification.java](file:///d:/BookStore/backend/src/main/java/vn/bookstore/entity/Notification.java)

#### Services & Controllers (Tuần 4)
- [NEW] [ReviewService.java](file:///d:/BookStore/backend/src/main/java/vn/bookstore/service/ReviewService.java)
- [NEW] [FlashSaleService.java](file:///d:/BookStore/backend/src/main/java/vn/bookstore/service/FlashSaleService.java)
- [NEW] [ReviewController.java](file:///d:/BookStore/backend/src/main/java/vn/bookstore/controller/ReviewController.java)
- [NEW] [AdminController.java](file:///d:/BookStore/backend/src/main/java/vn/bookstore/controller/AdminController.java)

#### Testing & Documentation
- [NEW] [BookServiceTest.java](file:///d:/BookStore/backend/src/test/java/vn/bookstore/service/BookServiceTest.java)
- [NEW] [BookControllerTest.java](file:///d:/BookStore/backend/src/test/java/vn/bookstore/controller/BookControllerTest.java)
- [NEW] [README.md](file:///d:/BookStore/backend/README.md) - API documentation

---

## Global Exception Handling

### Architecture Overview

Hệ thống xử lý lỗi toàn cục sử dụng `@RestControllerAdvice` để bắt và xử lý tất cả exceptions trong application một cách nhất quán.

### **Files Cần Tạo**

#### Exception Handler

##### [NEW] [GlobalExceptionHandler.java](file:///d:/BookStore/backend/src/main/java/vn/bookstore/exception/GlobalExceptionHandler.java)

Centralized exception handling cho toàn bộ application:

```java
package vn.bookstore.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {
    
    // 1. Resource Not Found (404)
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleResourceNotFound(
        ResourceNotFoundException ex, 
        WebRequest request
    ) {
        ErrorResponse error = ErrorResponse.builder()
            .timestamp(LocalDateTime.now())
            .status(HttpStatus.NOT_FOUND.value())
            .error("Not Found")
            .message(ex.getMessage())
            .path(request.getDescription(false).replace("uri=", ""))
            .build();
        
        return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
    }
    
    // 2. Validation Errors (400)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidationErrors(
        MethodArgumentNotValidException ex,
        WebRequest request
    ) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach(error -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        
        ErrorResponse error = ErrorResponse.builder()
            .timestamp(LocalDateTime.now())
            .status(HttpStatus.BAD_REQUEST.value())
            .error("Validation Failed")
            .message("Invalid input data")
            .path(request.getDescription(false).replace("uri=", ""))
            .validationErrors(errors)
            .build();
        
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }
    
    // 3. Insufficient Stock (400)
    @ExceptionHandler(InsufficientStockException.class)
    public ResponseEntity<ErrorResponse> handleInsufficientStock(
        InsufficientStockException ex,
        WebRequest request
    ) {
        ErrorResponse error = ErrorResponse.builder()
            .timestamp(LocalDateTime.now())
            .status(HttpStatus.BAD_REQUEST.value())
            .error("Insufficient Stock")
            .message(ex.getMessage())
            .path(request.getDescription(false).replace("uri=", ""))
            .build();
        
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }
    
    // 4. Invalid Voucher (400)
    @ExceptionHandler(InvalidVoucherException.class)
    public ResponseEntity<ErrorResponse> handleInvalidVoucher(
        InvalidVoucherException ex,
        WebRequest request
    ) {
        ErrorResponse error = ErrorResponse.builder()
            .timestamp(LocalDateTime.now())
            .status(HttpStatus.BAD_REQUEST.value())
            .error("Invalid Voucher")
            .message(ex.getMessage())
            .path(request.getDescription(false).replace("uri=", ""))
            .build();
        
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }
    
    // 5. Duplicate Resource (409)
    @ExceptionHandler(DuplicateResourceException.class)
    public ResponseEntity<ErrorResponse> handleDuplicateResource(
        DuplicateResourceException ex,
        WebRequest request
    ) {
        ErrorResponse error = ErrorResponse.builder()
            .timestamp(LocalDateTime.now())
            .status(HttpStatus.CONFLICT.value())
            .error("Duplicate Resource")
            .message(ex.getMessage())
            .path(request.getDescription(false).replace("uri=", ""))
            .build();
        
        return new ResponseEntity<>(error, HttpStatus.CONFLICT);
    }
    
    // 6. Authentication Failed (401)
    @ExceptionHandler({BadCredentialsException.class, UnauthorizedException.class})
    public ResponseEntity<ErrorResponse> handleUnauthorized(
        Exception ex,
        WebRequest request
    ) {
        ErrorResponse error = ErrorResponse.builder()
            .timestamp(LocalDateTime.now())
            .status(HttpStatus.UNAUTHORIZED.value())
            .error("Unauthorized")
            .message("Invalid credentials or authentication required")
            .path(request.getDescription(false).replace("uri=", ""))
            .build();
        
        return new ResponseEntity<>(error, HttpStatus.UNAUTHORIZED);
    }
    
    // 7. Access Denied (403)
    @ExceptionHandler(AccessDeniedException.class)
    public ResponseEntity<ErrorResponse> handleAccessDenied(
        AccessDeniedException ex,
        WebRequest request
    ) {
        ErrorResponse error = ErrorResponse.builder()
            .timestamp(LocalDateTime.now())
            .status(HttpStatus.FORBIDDEN.value())
            .error("Forbidden")
            .message("You don't have permission to access this resource")
            .path(request.getDescription(false).replace("uri=", ""))
            .build();
        
        return new ResponseEntity<>(error, HttpStatus.FORBIDDEN);
    }
    
    // 8. Business Logic Exception (400)
    @ExceptionHandler(BusinessException.class)
    public ResponseEntity<ErrorResponse> handleBusinessException(
        BusinessException ex,
        WebRequest request
    ) {
        ErrorResponse error = ErrorResponse.builder()
            .timestamp(LocalDateTime.now())
            .status(HttpStatus.BAD_REQUEST.value())
            .error("Business Rule Violation")
            .message(ex.getMessage())
            .path(request.getDescription(false).replace("uri=", ""))
            .build();
        
        return new ResponseEntity<>(error, HttpStatus.BAD_REQUEST);
    }
    
    // 9. Generic Exception (500)
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGlobalException(
        Exception ex,
        WebRequest request
    ) {
        // Log the error for debugging
        ex.printStackTrace();
        
        ErrorResponse error = ErrorResponse.builder()
            .timestamp(LocalDateTime.now())
            .status(HttpStatus.INTERNAL_SERVER_ERROR.value())
            .error("Internal Server Error")
            .message("An unexpected error occurred")
            .path(request.getDescription(false).replace("uri=", ""))
            .build();
        
        return new ResponseEntity<>(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
```

---

### **Error Response DTO**

##### [NEW] [ErrorResponse.java](file:///d:/BookStore/backend/src/main/java/vn/bookstore/dto/ErrorResponse.java)

Cấu trúc response lỗi chuẩn:

```java
package vn.bookstore.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Map;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ErrorResponse {
    private LocalDateTime timestamp;
    private int status;
    private String error;
    private String message;
    private String path;
    
    // Optional: for validation errors
    private Map<String, String> validationErrors;
}
```

**Example Response:**
```json
{
  "timestamp": "2026-01-14T22:30:00",
  "status": 404,
  "error": "Not Found",
  "message": "Book with ID 999 not found",
  "path": "/api/books/999"
}
```

---

### **Custom Exceptions**

#### [NEW] [ResourceNotFoundException.java](file:///d:/BookStore/backend/src/main/java/vn/bookstore/exception/ResourceNotFoundException.java)

```java
package vn.bookstore.exception;

public class ResourceNotFoundException extends RuntimeException {
    public ResourceNotFoundException(String message) {
        super(message);
    }
    
    public ResourceNotFoundException(String resourceName, String fieldName, Object fieldValue) {
        super(String.format("%s not found with %s: %s", resourceName, fieldName, fieldValue));
    }
}
```

**Usage:**
```java
Book book = bookRepository.findById(id)
    .orElseThrow(() -> new ResourceNotFoundException("Book", "id", id));
```

---

#### [NEW] [InsufficientStockException.java](file:///d:/BookStore/backend/src/main/java/vn/bookstore/exception/InsufficientStockException.java)

```java
package vn.bookstore.exception;

public class InsufficientStockException extends RuntimeException {
    private final Long variantId;
    private final int requestedQuantity;
    private final int availableQuantity;
    
    public InsufficientStockException(Long variantId, int requestedQuantity, int availableQuantity) {
        super(String.format("Insufficient stock for variant %d. Requested: %d, Available: %d", 
            variantId, requestedQuantity, availableQuantity));
        this.variantId = variantId;
        this.requestedQuantity = requestedQuantity;
        this.availableQuantity = availableQuantity;
    }
    
    // Getters
}
```

---

#### [NEW] [InvalidVoucherException.java](file:///d:/BookStore/backend/src/main/java/vn/bookstore/exception/InvalidVoucherException.java)

```java
package vn.bookstore.exception;

public class InvalidVoucherException extends RuntimeException {
    public InvalidVoucherException(String message) {
        super(message);
    }
}
```

**Common messages:**
- "Voucher code does not exist"
- "Voucher has expired"
- "Voucher usage limit exceeded"
- "Order total does not meet minimum requirement"

---

#### [NEW] [DuplicateResourceException.java](file:///d:/BookStore/backend/src/main/java/vn/bookstore/exception/DuplicateResourceException.java)

```java
package vn.bookstore.exception;

public class DuplicateResourceException extends RuntimeException {
    public DuplicateResourceException(String message) {
        super(message);
    }
    
    public DuplicateResourceException(String resourceName, String fieldName, Object fieldValue) {
        super(String.format("%s already exists with %s: %s", resourceName, fieldName, fieldValue));
    }
}
```

**Usage:**
```java
if (userRepository.existsByEmail(email)) {
    throw new DuplicateResourceException("User", "email", email);
}
```

---

#### [NEW] [UnauthorizedException.java](file:///d:/BookStore/backend/src/main/java/vn/bookstore/exception/UnauthorizedException.java)

```java
package vn.bookstore.exception;

public class UnauthorizedException extends RuntimeException {
    public UnauthorizedException(String message) {
        super(message);
    }
}
```

---

#### [NEW] [BusinessException.java](file:///d:/BookStore/backend/src/main/java/vn/bookstore/exception/BusinessException.java)

```java
package vn.bookstore.exception;

public class BusinessException extends RuntimeException {
    public BusinessException(String message) {
        super(message);
    }
}
```

**Usage examples:**
- "Cannot delete category with existing books"
- "Cannot cancel order that has already been shipped"
- "Review can only be created for purchased items"

---

### **Exception Handling Best Practices**

1. **Service Layer Throws Custom Exceptions:**
```java
@Service
public class BookService {
    public BookDTO getBookById(Long id) {
        Book book = bookRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Book", "id", id));
        return mapToDTO(book);
    }
    
    public void addToCart(Long variantId, int quantity) {
        Inventory inventory = inventoryRepository.findByVariantId(variantId)
            .orElseThrow(() -> new ResourceNotFoundException("Inventory", "variantId", variantId));
        
        int available = inventory.getQuantity() - inventory.getReservedQuantity();
        if (available < quantity) {
            throw new InsufficientStockException(variantId, quantity, available);
        }
        
        // Add to cart logic...
    }
}
```

2. **Controller Không Cần Try-Catch:**
```java
@RestController
@RequestMapping("/api/books")
public class BookController {
    
    @GetMapping("/{id}")
    public ResponseEntity<BookDTO> getBookById(@PathVariable Long id) {
        // No try-catch needed, GlobalExceptionHandler will handle it
        BookDTO book = bookService.getBookById(id);
        return ResponseEntity.ok(book);
    }
}
```

3. **Validation Annotations:**
```java
public class CreateBookRequest {
    @NotBlank(message = "Title is required")
    private String title;
    
    @NotBlank(message = "ISBN is required")
    @Pattern(regexp = "^\\d{13}$", message = "ISBN must be 13 digits")
    private String isbn;
    
    @NotNull(message = "Price is required")
    @Min(value = 0, message = "Price must be positive")
    private BigDecimal price;
}
```

---

### **Testing Exception Handling**

```java
@SpringBootTest
@AutoConfigureMockMvc
class BookControllerTest {
    
    @Test
    void getBookById_NotFound_ShouldReturn404() throws Exception {
        mockMvc.perform(get("/api/books/999"))
            .andExpect(status().isNotFound())
            .andExpect(jsonPath("$.status").value(404))
            .andExpect(jsonPath("$.error").value("Not Found"))
            .andExpect(jsonPath("$.message").value("Book not found with id: 999"));
    }
    
    @Test
    void createBook_ValidationError_ShouldReturn400() throws Exception {
        CreateBookRequest request = new CreateBookRequest(); // Empty request
        
        mockMvc.perform(post("/api/books")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
            .andExpect(status().isBadRequest())
            .andExpect(jsonPath("$.status").value(400))
            .andExpect(jsonPath("$.validationErrors").exists());
    }
}
```

## Verification Plan

### Automated Tests

```bash
# 1. Unit tests (Service layer)
mvn test -Dtest=BookServiceTest
mvn test -Dtest=OrderServiceTest

# 2. Integration tests (API endpoints)
mvn test -Dtest=BookControllerIntegrationTest
mvn test -Dtest=AuthControllerIntegrationTest

# 3. Test coverage report
mvn jacoco:report
```

### Manual Verification

**Test Cases:**

1. **Authentication Flow**
   - Register user mới → Verify trong database
   - Login → Nhận JWT token
   - Access protected endpoint với token

2. **Book API**
   - GET `/api/books` → Pagination, filtering hoạt động
   - GET `/api/books/{id}` → Chi tiết đầy đủ (authors, variants, images)
   - Search `/api/books/search?q=harry` → Full-text search

3. **Order Flow**
   - Add to cart → Check database `carts` table
   - Create order → Verify:
     - Order created trong `orders` table
     - Order items trong `order_items`
     - Inventory `reserved_quantity` tăng (trigger)
     - Voucher `used_count` tăng
   - Complete order → Verify:
     - Order status = 'completed'
     - Books `sold_count` tăng (trigger)
     - User `total_spent` tăng (trigger)
     - Inventory `quantity` giảm (trigger)

4. **Admin Features**
   - Create book với JWT admin token
   - Upload book images
   - View dashboard statistics

5. **Stored Procedures**
   - Bestsellers API gọi `sp_get_bestsellers` đúng
   - Shipping fee tính đúng với `sp_calculate_shipping_fee`

**Tools:**
- Postman/Insomnia để test API
- Swagger UI tại `http://localhost:8080/swagger-ui.html`
- MySQL Workbench để verify database changes

### Performance Tests

- Load test với JMeter (100 concurrent users)
- Query performance với EXPLAIN
- Response time < 200ms cho danh sách sách
