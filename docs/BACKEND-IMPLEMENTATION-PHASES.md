# Backend Implementation Phases — BookStore

> Chia phase dựa trên **phân tích FE đã code** (`bookstore-frontend/src/app/`) và **38 bảng DB** (`database_schema.md`)  
> Thứ tự ưu tiên: phụ thuộc FK → luồng mua hàng → admin → tính năng nâng cao

---

## 🗺️ Tổng Quan Mapping: FE Page → DB Tables → API cần có

| FE Page (đã code) | DB Tables cần | Priority |
|---|---|---|
| `/login`, `/register` | `users`, `customer_tiers`, `otp_codes` | P0 |
| `/` (homepage) | `books`, `book_variants`, `categories`, `flash_sales` | P1 |
| `/category/[slug]` | `categories`, `books`, `authors`, `publishers` | P1 |
| `/product/[slug]` | `books`, `book_variants`, `book_images`, `inventory`, `reviews` | P1 |
| `/cart` | `carts`, `book_variants`, `inventory` | P2 |
| `/checkout` | `orders`, `order_items`, `payments`, `user_addresses`, `vouchers`, `shipping_rates` | P2 |
| `/flash-sale` | `flash_sales`, `flash_sale_items`, `book_variants` | P3 |
| `/account` | `users`, `customer_tiers` | P1 |
| `/account/orders` | `orders`, `order_items`, `order_status_history` | P2 |
| `/account/addresses` | `user_addresses`, `provinces`, `districts` | P2 |
| `/account/wishlist` | `wishlists`, `books`, `book_variants` | P3 |
| `/account/notifications` | `notifications` | P4 |
| `/admin/dashboard` | `orders`, `books`, `users`, `inventory` | P3 |
| `/admin/catalog` | `books`, `categories`, `authors`, `publishers`, `book_variants` | P3 |
| `/admin/inventory/stock` | `inventory`, `inventory_history` | P3 |
| `/admin/orders` | `orders`, `order_items`, `order_status_history`, `refunds` | P3 |
| `/admin/crm` | `users`, `customer_tiers`, `loyalty_transactions` | P4 |
| `/admin/marketing/flash-sales` | `flash_sales`, `flash_sale_items` | P3 |
| `/admin/marketing/promotions` | `vouchers`, `promotions`, `promotion_books` | P3 |
| `/admin/finance/payments` | `payments`, `refunds`, `orders` | P4 |
| `/admin/content/reviews` | `reviews`, `review_images` | P4 |
| `/admin/shipping` | `shipping_carriers`, `shipping_rates` | P3 |

---

## ⚙️ Phase 0 — Foundation (Nền tảng kỹ thuật)

> **Mục tiêu**: Setup cấu trúc project, security, exception handling. Không liên quan đến business logic.  
> **Thời gian**: 2-3 ngày  
> **Skill tham khảo**: [`.antigravity/skills/architecture-patterns/SKILL.md`](../.antigravity/skills/architecture-patterns/SKILL.md)

### 0.1 Cấu trúc thư mục Clean Architecture

```
com/bookstore/
├── domain/entity/          # JPA Entities mapping với DB
├── domain/repository/      # Spring Data JPA interfaces
├── service/                # Business logic
├── controller/             # REST Controllers
├── dto/request/            # Request bodies
├── dto/response/           # Response bodies
├── config/                 # Spring configs
├── security/               # JWT, filters
├── exception/              # Global handler
└── util/                   # Helpers
```

### 0.2 Các class cần tạo

- [ ] `ApiResponse<T>` — wrapper response chuẩn `{ status, message, data, timestamp }`
- [ ] `GlobalExceptionHandler` — `@ControllerAdvice` xử lý tất cả exceptions
- [ ] `AppException`, `ErrorCode` — custom exception với mã lỗi rõ ràng
- [ ] `SecurityConfig` — Spring Security, CORS cho `localhost:3000`
- [ ] `JwtUtil` — generate/validate Access Token (15 phút) + Refresh Token (7 ngày)
- [ ] `JwtAuthenticationFilter` — filter đọc Bearer token từ header

### 0.3 Dependency cần thêm vào `pom.xml`

```xml
<!-- Security -->
spring-boot-starter-security
jjwt-api + jjwt-impl + jjwt-jackson (io.jsonwebtoken)

<!-- Validation -->
spring-boot-starter-validation

<!-- Utilities -->
lombok
mapstruct
```

**Verify**: Project build thành công, `GET /api/health` trả về `200 OK`

---

## 🔐 Phase 1 — Auth & User Profile

> **Mục tiêu**: Unblock FE pages `/login`, `/register`, `/account`  
> **DB Tables**: `customer_tiers`, `users`, `admins`, `otp_codes`  
> **Thời gian**: 3-4 ngày  
> **Skill tham khảo**: [`.antigravity/skills/007/references/api-security-patterns.md`](../.antigravity/skills/007/references/api-security-patterns.md)

### 1.1 JPA Entities

- [ ] `CustomerTierEntity` → bảng `customer_tiers`
- [ ] `UserEntity` → bảng `users` (FK: `tier_id` → `CustomerTierEntity`)
- [ ] `AdminEntity` → bảng `admins`
- [ ] `OtpCodeEntity` → bảng `otp_codes`

### 1.2 Repositories

- [ ] `UserRepository` — `findByEmail()`, `findByPhone()`, `existsByEmail()`
- [ ] `AdminRepository` — `findByEmail()`
- [ ] `CustomerTierRepository` — `findByMinSpentLessThanEqualOrderByMinSpentDesc()`

### 1.3 APIs cần implement

```
# Customer Auth
POST   /api/v1/auth/register          → Đăng ký (FE: /register)
POST   /api/v1/auth/login             → Đăng nhập (FE: /login)
POST   /api/v1/auth/refresh           → Refresh access token
POST   /api/v1/auth/logout            → Blacklist refresh token

# Customer Profile (yêu cầu JWT)
GET    /api/v1/users/me               → Lấy thông tin user (FE: /account)
PATCH  /api/v1/users/me               → Cập nhật profile (FE: /account - edit)
PATCH  /api/v1/users/me/password      → Đổi mật khẩu

# Admin Auth
POST   /api/v1/admin/auth/login       → Admin login (FE: /admin/login)
```

### 1.4 Business logic quan trọng

- Password: BCrypt `strength=12`
- Access Token: JWT RS256, expire 15 phút
- Refresh Token: lưu DB hoặc Redis, expire 7 ngày, rotate mỗi lần dùng
- Register: tự động gắn `customer_tiers` lowest tier (Bronze/Bạc)

### 1.5 DTOs

```java
// Request
RegisterRequest  { email, password, fullName, phone }
LoginRequest     { email, password }

// Response
AuthResponse     { accessToken, refreshToken, user: UserResponse }
UserResponse     { id, email, fullName, avatarUrl, tier, rewardPoints, totalSpent }
```

**Verify**: Đăng ký → Đăng nhập → Lấy profile `/users/me` thành công

---

## 📚 Phase 2 — Product Catalog (Storefront Read APIs)

> **Mục tiêu**: Unblock FE pages `/` (homepage), `/category/[slug]`, `/product/[slug]`  
> **DB Tables**: `categories`, `authors`, `publishers`, `books`, `book_authors`, `book_images`, `book_variants`  
> **Thời gian**: 4-5 ngày  
> **Skill tham khảo**: [`.antigravity/skills/api-design-principles/resources/implementation-playbook.md`](../.antigravity/skills/api-design-principles/resources/implementation-playbook.md)

### 2.1 JPA Entities

- [ ] `CategoryEntity` → bảng `categories` (self-join: `parentId`)
- [ ] `AuthorEntity` → bảng `authors`
- [ ] `PublisherEntity` → bảng `publishers`
- [ ] `BookEntity` → bảng `books`
- [ ] `BookAuthorEntity` → bảng `book_authors` (composite PK)
- [ ] `BookImageEntity` → bảng `book_images`
- [ ] `BookVariantEntity` → bảng `book_variants`

### 2.2 Repositories

- [ ] `BookRepository` — `findBySlug()`, `findByCategoryId()`, `findByIsActiveAndIsFeatureTrue()`
- [ ] `CategoryRepository` — `findByParentIdIsNull()`, `findBySlug()`
- [ ] `BookVariantRepository` — `findByBookId()`

### 2.3 APIs cần implement

```
# Categories
GET    /api/v1/categories             → List danh mục (FE: Header nav, /category)
GET    /api/v1/categories/{slug}      → Chi tiết danh mục

# Books — Homepage
GET    /api/v1/books/featured         → Sách nổi bật (FE: Homepage hero)
GET    /api/v1/books/best-sellers     → Sách bán chạy (FE: Homepage section)

# Books — Category page
GET    /api/v1/books                  → Danh sách có filter + phân trang (FE: /category/[slug])
  Query params:
    ?categorySlug=ky-nang-song
    ?authorId=1
    ?publisherId=1
    ?minPrice=50000&maxPrice=500000
    ?sort=price_asc|price_desc|best_seller|newest
    ?page=0&size=20

# Books — Product detail page
GET    /api/v1/books/{slug}           → Chi tiết sách + variants + images (FE: /product/[slug])
GET    /api/v1/books/{id}/related     → Sách liên quan (FE: /product/[slug] bottom)
```

### 2.4 Response shape (theo đúng mockData.ts FE đang dùng)

```java
BookSummaryResponse {
    id, slug, title, authors[], category,
    imageUrl, originalPrice, salePrice,
    avgRating, reviewCount, soldCount,
    isFlashSale, totalQuantity, soldQuantity   // cho flash sale progress bar
}

BookDetailResponse {
    ...BookSummaryResponse,
    publisher, isbn, description, language,
    pages, weight, publicationYear,
    images[],          // book_images
    variants[],        // book_variants + inventory.quantity
    reviews[]          // Phase 5
}
```

### 2.5 Quan trọng — Pagination chuẩn

```java
PageResponse<T> {
    content[], totalElements, totalPages,
    number (currentPage), size, first, last
}
```

**Verify**: Homepage load được sách, `/category/ky-nang-song` filter được, `/product/[slug]` load đủ thông tin

---

## 🛒 Phase 3 — Address + Cart + Order (Luồng mua hàng)

> **Mục tiêu**: Unblock FE pages `/cart`, `/checkout`, `/account/orders`, `/account/addresses`  
> **DB Tables**: `provinces`, `districts`, `user_addresses`, `carts`, `orders`, `order_items`, `order_status_history`, `payments`, `shipping_carriers`, `shipping_rates`  
> **Thời gian**: 5-6 ngày  
> **Skill tham khảo**: [`.antigravity/skills/architecture-patterns/resources/implementation-playbook.md`](../.antigravity/skills/architecture-patterns/resources/implementation-playbook.md)

### 3.1 JPA Entities

- [ ] `ProvinceEntity`, `DistrictEntity` → bảng địa lý (seed data từ `seed_data_tiki.sql`)
- [ ] `UserAddressEntity` → bảng `user_addresses`
- [ ] `CartEntity` → bảng `carts`
- [ ] `InventoryEntity` → bảng `inventory` (cần cho check stock khi thêm vào cart)
- [ ] `ShippingCarrierEntity`, `ShippingRateEntity`
- [ ] `OrderEntity`, `OrderItemEntity`, `OrderStatusHistoryEntity`
- [ ] `PaymentEntity`

### 3.2 APIs — Địa chỉ

```
GET    /api/v1/location/provinces                 → Danh sách tỉnh thành
GET    /api/v1/location/provinces/{code}/districts → Quận huyện theo tỉnh

GET    /api/v1/users/me/addresses                 → DS địa chỉ (FE: /account/addresses, /checkout)
POST   /api/v1/users/me/addresses                 → Thêm địa chỉ mới
PATCH  /api/v1/users/me/addresses/{id}            → Sửa địa chỉ
DELETE /api/v1/users/me/addresses/{id}            → Xóa địa chỉ
PATCH  /api/v1/users/me/addresses/{id}/set-default → Đặt mặc định
```

### 3.3 APIs — Giỏ hàng

```
GET    /api/v1/cart                   → Lấy giỏ hàng (FE: /cart, header badge count)
POST   /api/v1/cart/items             → Thêm sản phẩm { variantId, quantity }
PATCH  /api/v1/cart/items/{id}        → Cập nhật số lượng { quantity }
DELETE /api/v1/cart/items/{id}        → Xóa 1 item
DELETE /api/v1/cart                   → Xóa toàn bộ giỏ hàng
```

### 3.4 APIs — Tính phí ship (cho checkout page)

```
POST   /api/v1/shipping/estimate      → Tính phí ship { provinceCode, totalWeight }
GET    /api/v1/shipping/carriers      → Danh sách nhà vận chuyển
```

### 3.5 APIs — Đơn hàng

```
POST   /api/v1/orders                 → Tạo đơn hàng (FE: /checkout submit)
  Body: { addressId, carrierId, paymentMethod, voucherId?, usePoints, note, items[] }

GET    /api/v1/orders                 → DS đơn hàng của user (FE: /account/orders)
  Query: ?status=shipping&page=0&size=10

GET    /api/v1/orders/{id}            → Chi tiết đơn hàng (FE: /account/orders detail)
PATCH  /api/v1/orders/{id}/cancel     → Hủy đơn { reason }
```

### 3.6 Business logic quan trọng khi tạo đơn

1. **Validate stock**: kiểm tra `inventory.quantity - inventory.reserved_quantity >= requested_qty`
2. **Lock inventory**: tăng `reserved_quantity` (prevent oversell)
3. **Calculate total**: `subtotal + shipping_fee - discount_amount - points_discount`
4. **Save** `OrderEntity` với status `pending_payment`
5. **Clear cart** sau khi tạo đơn thành công
6. **Create** `OrderStatusHistoryEntity` → trạng thái đầu tiên

### 3.7 DTOs cho Checkout (match theo FE `/checkout/page.tsx`)

```java
OrderRequest {
    addressId, carrierId,
    paymentMethod,           // "cod" | "vnpay" | "momo"
    voucherId,               // nullable
    usePoints,               // boolean
    note
}

OrderResponse {
    id, orderCode, status, totalAmount,
    items[], shippingAddress,
    paymentMethod, paymentStatus,
    createdAt
}
```

**Verify**: Giỏ hàng → Chọn địa chỉ → Đặt hàng COD thành công, xem được trong `/account/orders`

---

## ⚡ Phase 4 — Flash Sale + Promotions + Vouchers

> **Mục tiêu**: Unblock FE pages `/flash-sale`, áp dụng voucher trong `/checkout`, admin marketing pages  
> **DB Tables**: `flash_sales`, `flash_sale_items`, `vouchers`, `voucher_usage`, `promotions`, `promotion_books`  
> **Thời gian**: 3-4 ngày

### 4.1 JPA Entities

- [ ] `FlashSaleEntity`, `FlashSaleItemEntity`
- [ ] `VoucherEntity`, `VoucherUsageEntity`
- [ ] `PromotionEntity`, `PromotionBookEntity`

### 4.2 APIs — Storefront

```
GET    /api/v1/flash-sales/active     → Flash sale đang chạy + sản phẩm (FE: homepage + /flash-sale)
GET    /api/v1/flash-sales/{id}       → Chi tiết 1 flash sale + items

POST   /api/v1/vouchers/validate      → Kiểm tra voucher hợp lệ với giỏ hàng (FE: /checkout)
  Body: { code, orderSubtotal, userId }
  Response: { isValid, discountAmount, message }
```

### 4.3 APIs — Admin

```
# Flash Sale management (FE: /admin/marketing/flash-sales)
GET    /api/v1/admin/flash-sales               → List flash sales
POST   /api/v1/admin/flash-sales               → Tạo flash sale mới
PATCH  /api/v1/admin/flash-sales/{id}          → Cập nhật
DELETE /api/v1/admin/flash-sales/{id}          → Xóa
POST   /api/v1/admin/flash-sales/{id}/items    → Thêm sản phẩm vào flash sale

# Voucher management (FE: /admin/marketing/promotions - tab Vouchers)
GET    /api/v1/admin/vouchers                  → List vouchers
POST   /api/v1/admin/vouchers                  → Tạo voucher
PATCH  /api/v1/admin/vouchers/{id}             → Cập nhật
DELETE /api/v1/admin/vouchers/{id}             → Xóa

# Promotion management (FE: /admin/marketing/promotions - tab Buy X Get Y)
GET    /api/v1/admin/promotions                → List promotions
POST   /api/v1/admin/promotions                → Tạo promotion
```

### 4.4 Business logic Flash Sale

- Check `start_time <= now <= end_time` và `is_active = true`
- Check `sold_count < quantity_limit` khi user thêm vào cart
- Check `per_user_limit` — user này đã mua bao nhiêu item trong sale này

**Verify**: Trang `/flash-sale` load được sản phẩm sale, áp voucher giảm giá trong checkout

---

## 📦 Phase 5 — Inventory + Wishlist + Reviews

> **Mục tiêu**: Unblock `/account/wishlist`, review trên `/product/[slug]`, admin inventory  
> **DB Tables**: `inventory`, `inventory_history`, `wishlists`, `price_history`, `reviews`, `review_images`, `user_book_interactions`  
> **Thời gian**: 3-4 ngày

### 5.1 JPA Entities

- [ ] `WishlistEntity`
- [ ] `InventoryHistoryEntity`, `PriceHistoryEntity`
- [ ] `ReviewEntity`, `ReviewImageEntity`
- [ ] `UserBookInteractionEntity`

### 5.2 APIs — Wishlist (FE: `/account/wishlist`)

```
GET    /api/v1/users/me/wishlist              → Danh sách wishlist (kèm giá hiện tại)
POST   /api/v1/users/me/wishlist              → Thêm vào wishlist { bookId }
DELETE /api/v1/users/me/wishlist/{id}         → Xóa khỏi wishlist
PATCH  /api/v1/users/me/wishlist/{id}/notify  → Toggle bật/tắt thông báo giảm giá
```

### 5.3 APIs — Reviews (FE: `/product/[slug]` tab Reviews)

```
GET    /api/v1/books/{id}/reviews             → Danh sách review + phân trang
  Query: ?sort=newest|helpful&page=0&size=10

POST   /api/v1/books/{id}/reviews             → Viết review (phải đã mua sách)
  Body: { rating, title, comment, pros[], cons[] }

POST   /api/v1/reviews/{id}/helpful           → Vote helpful
```

### 5.4 APIs — Admin Inventory (FE: `/admin/inventory/stock`)

```
GET    /api/v1/admin/inventory                → Tồn kho toàn bộ SKU
  Query: ?lowStock=true&page=0&size=20

PATCH  /api/v1/admin/inventory/{variantId}    → Điều chỉnh tồn kho
  Body: { quantityChange, type, note }        → Tự tạo inventory_history record

GET    /api/v1/admin/inventory/{variantId}/history → Lịch sử nhập/xuất kho
```

**Verify**: `/account/wishlist` load được, viết review sau khi đã mua sách, admin thấy tồn kho

---

## 🏆 Phase 6 — Loyalty, Rewards & Notifications

> **Mục tiêu**: Unblock điểm thưởng trong `/checkout`, `/account`, `/admin/crm`, notifications  
> **DB Tables**: `reward_points`, `loyalty_transactions`, `notifications`  
> **Thời gian**: 2-3 ngày

### 6.1 JPA Entities

- [ ] `RewardPointEntity`, `LoyaltyTransactionEntity`
- [ ] `NotificationEntity`

### 6.2 APIs — Điểm thưởng

```
GET    /api/v1/users/me/rewards                → Tổng điểm + lịch sử (FE: /account)
GET    /api/v1/users/me/rewards/history        → Lịch sử giao dịch điểm
```

### 6.3 APIs — Notifications (FE: `/account/notifications`)

```
GET    /api/v1/users/me/notifications          → Danh sách thông báo
  Query: ?isRead=false&page=0

PATCH  /api/v1/users/me/notifications/{id}/read → Đánh dấu đã đọc
PATCH  /api/v1/users/me/notifications/read-all  → Đánh dấu tất cả đã đọc
```

### 6.4 Business logic tích điểm (trigger sau khi đơn hàng completed)

```
earned_points = floor(total_amount / 1000) * tier.discount_percent
```

- Tự động cập nhật `users.reward_points` và `users.total_spent`
- Tự động check và upgrade `customer_tier` nếu đủ điều kiện
- Tạo `notification` khi được lên hạng tier

---

## 🖥️ Phase 7 — Admin APIs (Full)

> **Mục tiêu**: Toàn bộ admin pages hoạt động được  
> **Thời gian**: 5-6 ngày  
> **Skill tham khảo**: [`.antigravity/skills/api-design-principles/SKILL.md`](../.antigravity/skills/api-design-principles/SKILL.md)

### 7.1 Dashboard (FE: `/admin/dashboard`)

```
GET    /api/v1/admin/dashboard/stats          → KPIs: revenue today, new orders, new users, low stock count
GET    /api/v1/admin/dashboard/low-stock      → DS SKU sắp hết hàng (threshold < min_stock_level)
GET    /api/v1/admin/dashboard/recent-orders  → 10 đơn hàng mới nhất
GET    /api/v1/admin/dashboard/top-books      → Top 5 sách bán chạy (FE: bảng "Top sản phẩm")
```

### 7.2 Catalog Management (FE: `/admin/catalog`)

```
# Books (tab "Sách (SKUs)")
GET/POST/PATCH/DELETE  /api/v1/admin/books
PATCH  /api/v1/admin/books/{id}/toggle-status    → Bật/tắt hiển thị

# Categories (tab "Danh mục")
GET/POST/PATCH/DELETE  /api/v1/admin/categories

# Authors (tab "Tác giả")
GET/POST/PATCH/DELETE  /api/v1/admin/authors

# Publishers (tab "Nhà xuất bản")
GET/POST/PATCH/DELETE  /api/v1/admin/publishers
```

### 7.3 Order Management (FE: `/admin/orders`)

```
GET    /api/v1/admin/orders                        → List tất cả đơn hàng (có filter)
  Query: ?status=processing&search=BS888201&page=0

GET    /api/v1/admin/orders/{id}                   → Chi tiết đơn
PATCH  /api/v1/admin/orders/{id}/status            → Cập nhật trạng thái { newStatus, note }
  (pending→processing→shipping→completed | cancelled)

# Refunds (FE: admin order detail)
GET    /api/v1/admin/orders/{id}/refunds           → DS yêu cầu hoàn tiền
PATCH  /api/v1/admin/refunds/{id}/approve          → Duyệt hoàn tiền
PATCH  /api/v1/admin/refunds/{id}/reject           → Từ chối
```

### 7.4 CRM (FE: `/admin/crm`)

```
GET    /api/v1/admin/customers                     → DS khách hàng (filter theo tier, status)
GET    /api/v1/admin/customers/{id}                → Chi tiết customer + order history
PATCH  /api/v1/admin/customers/{id}/tier           → Thay đổi tier thủ công
PATCH  /api/v1/admin/customers/{id}/status         → Ban/unban user

# Tier config
GET/PATCH  /api/v1/admin/customer-tiers            → Cấu hình các hạng thành viên
```

### 7.5 Finance (FE: `/admin/finance/payments`)

```
GET    /api/v1/admin/payments                      → DS giao dịch thanh toán
  Query: ?status=success|failed|pending&method=vnpay|momo|cod

GET    /api/v1/admin/payments/{id}                 → Chi tiết giao dịch (gateway_response)
POST   /api/v1/admin/payments/export               → Xuất CSV đối soát
```

### 7.6 Content/Reviews (FE: `/admin/content/reviews`)

```
GET    /api/v1/admin/reviews                       → DS reviews cần moderation
  Query: ?status=visible|hidden&hasImages=true

PATCH  /api/v1/admin/reviews/{id}/visibility       → Ẩn/hiện review { isVisible }
POST   /api/v1/admin/reviews/{id}/reply            → Admin reply review
```

### 7.7 Shipping (FE: `/admin/shipping`)

```
GET/POST/PATCH  /api/v1/admin/shipping/carriers    → Quản lý nhà vận chuyển
GET/POST/PATCH  /api/v1/admin/shipping/rates       → Cấu hình bảng giá ship theo tỉnh
```

---

## 🚀 Phase 8 — Performance & Production Hardening

> **Mục tiêu**: Caching, rate limiting, tối ưu queries  
> **Thời gian**: 3-4 ngày  
> **Skill tham khảo**: [`.antigravity/skills/application-performance-performance-optimization/SKILL.md`](../.antigravity/skills/application-performance-performance-optimization/SKILL.md)

### 8.1 Caching với Redis

```yaml
# Cache strategy
book_details:     TTL 1h     # Ít thay đổi
categories:       TTL 6h
bestsellers:      TTL 30min
flash_sale:       TTL 5min   # Thay đổi thường xuyên
dashboard_stats:  TTL 5min
user_cart:        TTL 15min
```

### 8.2 Rate Limiting (Spring bucket4j hoặc filter custom)

```yaml
login:            5 req/hour/IP
register:         10 req/hour/IP
add_to_cart:      60 req/min/user
place_order:      10 req/min/user
write_review:     5 req/hour/user
```

### 8.3 Query Optimization

- [ ] Thêm `@EntityGraph` cho lazy loading phù hợp (tránh N+1)
- [ ] Index check: `slug`, `category_id`, `is_active`, `created_at` trên bảng `books`
- [ ] Pagination với `Pageable` trên tất cả list endpoints
- [ ] Dùng projections/DTO mapping thay vì load toàn bộ entity khi list

---

## ✅ Checklist Verify Từng Phase

```
Phase 0: [ ] Project build OK  [ ] /api/health → 200  [ ] Security config không block tất cả
Phase 1: [ ] Register OK  [ ] Login → JWT OK  [ ] /users/me trả đúng data
Phase 2: [ ] GET /books → list  [ ] GET /books/{slug} → detail đủ variants+images
Phase 3: [ ] Thêm giỏ → Tạo đơn COD → Xem /account/orders OK
Phase 4: [ ] /flash-sale load đúng sản phẩm sale  [ ] Voucher validate đúng
Phase 5: [ ] Thêm wishlist OK  [ ] Viết review sau mua OK  [ ] Admin xem tồn kho OK
Phase 6: [ ] Điểm cộng sau order completed  [ ] Notification khi lên tier
Phase 7: [ ] Dashboard stats đúng  [ ] Admin đổi status đơn hàng OK
Phase 8: [ ] Response time < 200ms  [ ] Redis cache hit > 80% cho books API
```

---

## 📁 File Liên Quan

| File | Mô tả |
|------|-------|
| [`database_schema.md`](../backend/sql/database/database_schema.md) | 38 bảng DB — tham chiếu chính |
| [`create_tables.sql`](../backend/sql/database/create_tables.sql) | DDL tạo bảng |
| [`seed_data_tiki.sql`](../backend/sql/scripts/seed_data_tiki.sql) | Dữ liệu seed tỉnh thành |
| [`BACKEND-ARCHITECTURE-RECOMMENDATION.md`](./BACKEND-ARCHITECTURE-RECOMMENDATION.md) | Kiến trúc tổng quan |
| [`application.yaml`](../backend/src/main/resources/application.yaml) | Config Spring Boot (MySQL port 3306) |

## 🔗 Skill References

| Phase | Skill |
|-------|-------|
| 0 — Foundation | [Architecture Patterns](../.antigravity/skills/architecture-patterns/SKILL.md) |
| 1 — Auth | [007 Security / JWT](../.antigravity/skills/007/references/api-security-patterns.md) |
| 2, 3, 4 — APIs | [API Design Principles](../.antigravity/skills/api-design-principles/resources/implementation-playbook.md) |
| 7 — Admin | [REST Best Practices](../.antigravity/skills/api-design-principles/references/rest-best-practices.md) |
| 8 — Perf | [Performance Optimization](../.antigravity/skills/application-performance-performance-optimization/SKILL.md) |

---

*Cập nhật: March 12, 2026 — dựa trên FE commit hiện tại và 38 bảng database_schema.md*
