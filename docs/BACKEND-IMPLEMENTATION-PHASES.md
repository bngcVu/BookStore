# Backend Implementation Phases — BookStore

> Chia phase dựa trên **phân tích FE đã code** (`bookstore-frontend/src/app/`) và DB trong thư mục `backend/sql/database` (`create_tables.sql`, `refresh_tokens.sql`, `registration_pending.sql`, `wishlist_enhancements.sql`, `database_optimizations.sql`)  
> Thứ tự ưu tiên: phụ thuộc FK → luồng mua hàng → admin → tính năng nâng cao

---

## 🗺️ Tổng Quan Mapping: FE Page → DB Tables → API cần có

| FE Page (đã code) | DB Tables cần | Priority |
|---|---|---|
| `/login`, `/register` | `customer_tiers`, `users`, `otp_codes`, `refresh_tokens`, `registration_pending` | P0 |
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

> Dependency phải chảy vào trong: Controller → Service → Repository. Controller **không được** gọi thẳng Repository, Service **không được** trả về JPA Entity ra ngoài (phải qua Mapper).

```
com/bookstore/
├── domain/entity/          # JPA Entities mapping với DB (chỉ dùng trong service trở xuống)
├── domain/repository/      # Spring Data JPA interfaces
├── service/                # Business logic (@Transactional đặt tại đây)
├── controller/             # REST Controllers (chỉ xử lý HTTP concern)
├── dto/request/            # Request bodies (validated với @Valid)
├── dto/response/           # Response bodies (không bao giờ expose Entity trực tiếp)
├── mapper/                 # MapStruct mappers: Entity ↔ DTO (KHÔNG dùng manual mapping)
├── config/                 # Spring configs (Security, CORS, Redis, Cache...)
├── security/               # JWT, filters, UserDetailsService
├── exception/              # Global handler, AppException, ErrorCode
├── event/                  # Domain Events (ApplicationEvent) cho cross-cutting concerns
└── util/                   # Helpers, constants
```

> **⚠️ Quy tắc `@Transactional`**: Đặt `@Transactional` tại layer **Service**, không đặt ở Controller hay Repository. Method write cần `@Transactional`, method read có thể dùng `@Transactional(readOnly = true)` để tối ưu. Các flow phức tạp (order creation) cần `@Transactional` bao toàn bộ steps để đảm bảo rollback khi lỗi.

### 0.2 Các class cần tạo

- [ ] `ApiResponse<T>` — wrapper response chuẩn `{ status, message, data, timestamp }`
- [ ] `GlobalExceptionHandler` — `@ControllerAdvice` xử lý tất cả exceptions
- [ ] `AppException`, `ErrorCode` — custom exception với mã lỗi rõ ràng (định nghĩa cụ thể: `USER_NOT_FOUND`, `EMAIL_ALREADY_EXISTS`, `OTP_EXPIRED`, `INVALID_TOKEN`...)
- [ ] `SecurityConfig` — Spring Security, CORS cho `localhost:3000`; thêm Secure Headers: `HSTS`, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Content-Security-Policy`
- [ ] `JwtUtil` — generate/validate Access Token (15 phút, RS256) + Refresh Token (7 ngày)
- [ ] `JwtAuthenticationFilter` — filter đọc Bearer token từ header; validate đầy đủ: signature, exp, iss, aud
- [ ] `RequestLoggingFilter` — structured logging: `traceId`, `userId`, `method`, `path`, `statusCode`, `durationMs` (dùng MDC)
- [ ] `AuditLogger` — utility ghi audit log cho các sự kiện nhạy cảm: login, logout, password change, token revoke

### 0.3 Dependency cần thêm vào `pom.xml`

```xml
<!-- Security -->
spring-boot-starter-security
jjwt-api + jjwt-impl + jjwt-jackson (io.jsonwebtoken 0.12.x)

<!-- Validation -->
spring-boot-starter-validation

<!-- Cache / Redis -->
spring-boot-starter-data-redis
spring-boot-starter-cache

<!-- Utilities -->
lombok
mapstruct
mapstruct-processor

<!-- API Documentation -->
springdoc-openapi-starter-webmvc-ui  (swagger-ui tại /swagger-ui.html)

<!-- Database Migration -->
flyway-core  (org.flywaydb — zero-downtime schema migration)
# SQL files đặt tại src/main/resources/db/migration/V{n}__{mô-tả}.sql
# Zero-downtime pattern: Expand (thêm cột nullable) trước, Contract (xóa cột cũ) sau
# Không bao giờ sửa migration file đã chạy ở production

<!-- Testing -->
spring-boot-starter-test (JUnit 5, Mockito)
testcontainers + testcontainers-postgresql  (integration test với DB thật)
```

### 0.4 Testing baseline (bắt buộc từ Phase 0)

> Skill `backend-dev-guidelines` yêu cầu: không phase nào được hoàn thành mà thiếu test coverage cho business logic.

- **Unit test**: Test từng Service method với Mockito mock (Repository, external services)
- **Integration test**: Test từng Repository với `@DataJpaTest` + Testcontainers (PostgreSQL thật)
- **Controller test**: Test từng Controller với `@WebMvcTest` + MockMvc (không cần full Spring context)
- Mỗi Phase Verify phải bao gồm kiểm tra unit test coverage cho các service vừa viết

**Verify**: Project build thành công, `GET /api/health` trả về `200 OK`, Swagger UI load được tại `/swagger-ui.html`

---

## 🔐 Phase 1 — Auth & User Profile

> **Mục tiêu**: Unblock FE pages `/login`, `/register`, `/account`  
> **DB Tables**: `customer_tiers`, `users`, `admins`, `otp_codes`, `refresh_tokens`, `registration_pending`  
> **Thời gian**: 3-4 ngày  
> **Skill tham khảo**: [`.antigravity/skills/007/references/api-security-patterns.md`](../.antigravity/skills/007/references/api-security-patterns.md)

### 1.0 SQL prerequisite cho Phase 1 (DB hiện tại)

Chạy theo đúng thứ tự sau trước khi test API auth:

1. `backend/sql/database/create_tables.sql`
2. `backend/sql/database/refresh_tokens.sql`
3. `backend/sql/database/registration_pending.sql`

Quy ước cập nhật SQL: luôn tạo file SQL mới trong `backend/sql/database`, không ghi đè file cũ đã tồn tại.

### 1.1 JPA Entities

- [ ] `CustomerTierEntity` → bảng `customer_tiers`
- [ ] `UserEntity` → bảng `users` (FK: `tier_id` → `CustomerTierEntity`)
- [ ] `AdminEntity` → bảng `admins`
- [ ] `OtpCodeEntity` → bảng `otp_codes`
- [ ] `RefreshTokenEntity` → bảng `refresh_tokens`
- [ ] `RegistrationPendingEntity` → bảng `registration_pending`

### 1.2 Repositories

- [ ] `UserRepository` — `findByEmail()`, `findByPhone()`, `existsByEmail()`
- [ ] `AdminRepository` — `findByEmail()`
- [ ] `CustomerTierRepository` — `findByMinSpentLessThanEqualOrderByMinSpentDesc()`
- [ ] `RefreshTokenRepository` — quản lý refresh token (rotate/revoke/list active)
- [ ] `RegistrationPendingRepository` — `findByEmail()`, `existsByEmail()`, cleanup pending hết hạn

### 1.3 APIs cần implement

```
# Customer Auth
POST   /api/v1/auth/register          → Đăng ký (FE: /register)
POST   /api/v1/auth/register/send-otp → Gửi OTP xác thực email khi đăng ký
POST   /api/v1/auth/register/verify-otp → Xác thực email bằng OTP
POST   /api/v1/auth/register/resend-otp → Gửi lại OTP xác thực email
POST   /api/v1/auth/login             → Đăng nhập (FE: /login)
POST   /api/v1/auth/refresh           → Refresh access token
POST   /api/v1/auth/logout            → Blacklist refresh token
POST   /api/v1/auth/forgot-password   → Gửi OTP reset password qua email
POST   /api/v1/auth/forgot-password/verify-otp → Xác thực OTP reset password
POST   /api/v1/auth/reset-password    → Đặt mật khẩu mới sau khi xác thực OTP

# Customer Profile (yêu cầu JWT)
GET    /api/v1/users/me               → Lấy thông tin user (FE: /account)
PATCH  /api/v1/users/me               → Cập nhật profile (FE: /account - edit)
PATCH  /api/v1/users/me/password      → Đổi mật khẩu

# Admin Auth
POST   /api/v1/admin/auth/login       → Admin login (FE: /admin/login)
```

### 1.4 Admin RBAC — Phân quyền Admin

> `admins` table cần thêm field `role` để phân quyền. Không phải mọi admin đều có quyền như nhau.

| Role | Quyền | FE page có thể truy cập |
|------|-------|--------------------------|
| `SUPER_ADMIN` | Toàn bộ — bao gồm cấu hình tiers, xóa dữ liệu, export finance | Tất cả admin pages |
| `WAREHOUSE_STAFF` | Quản lý tồn kho, cập nhật trạng thái đơn đến `shipping`, nhập hàng | `/admin/inventory`, `/admin/orders` |
| `CUSTOMER_SERVICE` | Xem đơn hàng, duyệt/từ chối refund, xem và reply review, ban/unban user | `/admin/orders`, `/admin/crm`, `/admin/content/reviews` |
| `MARKETING` | Quản lý flash sale, voucher, promotion | `/admin/marketing/*` |

- JWT payload của admin phải chứa `role`: `{ adminId, email, role, iss, aud }`
- Dùng `@PreAuthorize("hasRole('SUPER_ADMIN')")` Spring Security annotation tại method level
- API `PATCH /admin/refunds/{id}/approve` chỉ cho `CUSTOMER_SERVICE` hoặc `SUPER_ADMIN`
- API `POST /admin/payments/export` chỉ cho `SUPER_ADMIN`

### 1.5 Business logic quan trọng

- Password: BCrypt `strength=12`; **password complexity**: tối thiểu 8 ký tự, phải có chữ hoa, chữ thường, số
- Access Token: JWT RS256, expire 15 phút; validate đầy đủ: signature, `exp`, `iss`, `aud` — không tin header `alg` từ token
- Refresh Token: lưu DB (bảng `refresh_tokens`), expire 7 ngày, rotate mỗi lần dùng (old token bị blacklist ngay lập tức)
- **Token storage guidance cho FE**: Khuyến nghị lưu Access Token trong memory (JS variable), Refresh Token trong `httpOnly; Secure; SameSite=Strict` cookie — tránh `localStorage` vì dễ bị XSS đọc
- Register: tự động gắn `customer_tiers` lowest tier (Bronze/Bạc)
- Register (DB-mode): chưa tạo record trong `users` ở bước đầu; lưu tạm vào `registration_pending`, chỉ tạo `users` sau khi verify OTP thành công
- OTP email: TTL 5 phút, mỗi mã chỉ dùng 1 lần (`is_used = true`), **max 5 lần nhập sai / session → lock**, cooldown resend 60 giây, **max 5 lần resend / ngày / email**
- OTP type: tách rõ `register_verify_email`, `forgot_password`, `change_password_confirm` để tránh dùng nhầm luồng
- Login: không cho customer đăng nhập nếu email chưa được xác thực hoặc tài khoản đang `inactive` / `banned`
- **Rate limiting auth endpoints** (chống brute force): `POST /auth/login` → max 5 requests/phút/IP; `POST /auth/register/verify-otp` → max 5 requests/session; implement với Spring `bucket4j` hoặc custom filter + Redis counter
- Forgot password: chỉ cho reset bằng OTP email; không yêu cầu user đang đăng nhập
- Change password: yêu cầu `currentPassword`; với action nhạy cảm có thể yêu cầu thêm OTP email
- Change password / reset password: revoke tất cả refresh token cũ, cập nhật `updated_at`, **ghi audit log bắt buộc** (event type, userId, IP, userAgent, timestamp)
- OTP cleanup: cần `@Scheduled` job dọn OTP hết hạn mỗi giờ hoặc query chỉ lấy OTP chưa dùng và chưa hết hạn
- **Admin account**: Cân nhắc bắt buộc TOTP/MFA (Google Authenticator) cho admin login — admin có quyền cao nhất
- **Audit events phải log**: `user_registered`, `email_verified`, `user_login_success`, `user_login_failed`, `password_changed`, `password_reset`, `token_revoked`, `admin_login`

### 1.6 DTOs

```java
// Request
RegisterRequest  { email, password, fullName, phone }
SendOtpRequest   { email, type }
VerifyOtpRequest { email, code, type }
LoginRequest     { email, password }
ForgotPasswordRequest { email }
ResetPasswordRequest  { email, code, newPassword }

// Response
AuthResponse     { accessToken, refreshToken, user: UserResponse }
UserResponse     { id, email, fullName, avatarUrl, tier, rewardPoints, totalSpent }
```

**Verify**: Đăng ký (tạo `registration_pending`) → Gửi OTP → Xác thực OTP (tạo `users`) → Đăng nhập → Lấy profile `/users/me` thành công

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

> **⚠️ N+1 Query Warning**: `BookDetailResponse` trả về `authors[]`, `images[]`, `variants[]` từ nhiều bảng. Bắt buộc dùng `@EntityGraph` hoặc JOIN FETCH để tải eager trong 1-2 queries, không để Hibernate lazy-load từng item thành N+1 queries.

### 2.2.1 Search Backend — Lựa chọn kỹ thuật

> `GET /api/v1/books/search` cần xác định backend implementation trước khi code.

| Approach | Khi nào dùng | Ưu điểm | Nhược điểm |
|----------|-------------|----------|-----------|
| **PostgreSQL FTS** (`tsvector` / `tsquery`) | ≤ 100k sách, không cần autocomplete | Không cần service thêm, dễ setup | Relevance ranking kém, không hỗ trợ typo tolerance |
| **LIKE / ILIKE `%q%`** | Prototype nhanh | 0 setup | Full table scan, không scale |
| **Elasticsearch / OpenSearch** | > 100k sách, cần relevance, autocomplete, suggestion | Best UX, blazing fast | Phức tạp, hạ tầng thêm |

**Khuyến nghị cho BookStore**: Bắt đầu với **PostgreSQL FTS** (`to_tsvector('simple', title || ' ' || authors)` + GIN index). Nếu sau scale cần thì migrate sang Elasticsearch mà không ảnh hưởng API shape.

```sql
-- Index cần tạo (trong Flyway migration)
CREATE INDEX idx_books_search ON books USING GIN (to_tsvector('simple', title || ' ' || coalesce(description, '')));
```

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

# Search
GET    /api/v1/books/search           → Tìm kiếm full-text (FE: thanh search header)
  Query: ?q=clean+code&page=0&size=20
```

### 2.3.1 Caching strategy cho Catalog APIs (Redis)

> Catalog data là read-heavy, ít thay đổi — caching là bắt buộc trước khi go production.

```yaml
GET /api/v1/categories:          TTL 6h   (thay đổi rất ít)
GET /api/v1/books/featured:      TTL 1h
GET /api/v1/books/best-sellers:  TTL 30min
GET /api/v1/books/{slug}:        TTL 1h   (invalidate khi admin update book)
GET /api/v1/books/search:        TTL 5min (dynamic, không nên cache quá lâu)
```

Dùng Spring Cache `@Cacheable` + Redis. Evict cache khi admin PATCH/DELETE book/category.

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

**Verify**: Homepage load được sách, `/category/ky-nang-song` filter được, `/product/[slug]` load đủ thông tin; không có N+1 query (check Hibernate SQL logs); cache hit trên lần gọi 2+

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
  Header: Idempotency-Key: <uuid-v4>  ← BẮT BUỘC để tránh tạo 2 đơn khi client retry
  Body: { addressId, carrierId, paymentMethod, voucherId?, usePoints, note, items[] }

GET    /api/v1/orders                 → DS đơn hàng của user (FE: /account/orders)
  Query: ?status=shipping&page=0&size=10

GET    /api/v1/orders/{id}            → Chi tiết đơn hàng (FE: /account/orders detail)
GET    /api/v1/orders/{id}/tracking   → Thông tin vận chuyển: carrier, tracking_number, estimated_delivery, current_status
PATCH  /api/v1/orders/{id}/cancel     → Hủy đơn { reason }

# Payment flow cho online payment
POST   /api/v1/orders/{id}/payments/init         → Khởi tạo thanh toán VNPAY/MoMo, trả paymentUrl / deeplink
GET    /api/v1/orders/{id}/payments/status       → Kiểm tra trạng thái thanh toán của đơn
GET    /api/v1/payments/callback                 → Return URL xử lý redirect từ cổng thanh toán
POST   /api/v1/payments/webhook                  → Webhook/IPN cập nhật trạng thái thanh toán
```

### 3.6 Business logic quan trọng khi tạo đơn

1. **Validate stock**: kiểm tra `inventory.quantity - inventory.reserved_quantity >= requested_qty`
2. **Lock inventory**: tăng `reserved_quantity` (prevent oversell); dùng `SELECT ... FOR UPDATE` hoặc Optimistic Locking (`@Version`) để tránh race condition khi nhiều user cùng mua sách cuối cùng
3. **Calculate total**: `subtotal + shipping_fee - discount_amount - points_discount`
4. **Save** `OrderEntity` với status `pending_payment`
5. **Clear cart** sau khi tạo đơn thành công
6. **Create** `OrderStatusHistoryEntity` → trạng thái đầu tiên
7. **Order number**: Tạo `orderCode` dạng `BS` + yyyyMMdd + 6 chữ số random (ví dụ: `BS20260313001234`) — unique, dễ đọc cho customer service
8. **Idempotency**: Lưu `Idempotency-Key` vào DB (Redis TTL 24h); nếu key đã tồn tại thì trả lại response cũ thay vì tạo mới
9. **Payment idempotency**: callback/webhook từ gateway phải xử lý idempotent, không tạo 2 payment records hoặc update order lặp
10. **Inventory release**: nếu payment fail / order timeout / order cancel thì giảm `reserved_quantity`; chỉ trừ kho thật khi đơn được xác nhận xử lý theo policy hệ thống
11. **Order timeout**: đơn online payment ở trạng thái `pending_payment` cần auto-cancel sau X phút nếu chưa thanh toán
12. **Snapshot data**: lưu `shipping_address`, `recipient_name`, `recipient_phone`, `unit_price`, `discount_amount` ngay tại thời điểm tạo đơn để tránh lệ thuộc dữ liệu hiện tại
13. **Re-validate at submit**: voucher, shipping fee, flash sale price, reward points phải được tính lại tại thời điểm submit order
14. **State machine**: định nghĩa rõ chuyển trạng thái hợp lệ `pending_payment -> paid -> processing -> shipping -> delivered -> completed` và các nhánh `cancelled`, `payment_failed`, `refund_pending`, `refunded`
15. **Cancellation rule**: chỉ cho user hủy đơn ở các trạng thái cho phép; nếu đã thanh toán online thì cần xác định có tạo refund hay hoàn tác payment hay không

### 3.6.1 Payment business rules thực tế

- `cod`: có thể tạo đơn trực tiếp với `payment_status = pending`
- `vnpay` / `momo`: chỉ đánh dấu `payment_status = paid` khi callback/webhook hợp lệ từ gateway
- `installment`: DB đã có `payments.installment_months` (INT) và `payments.installment_bank` (VARCHAR). Khi user chọn trả góp, request `POST /api/v1/orders/{id}/payments/init` phải include `{ paymentMethod: "installment", installmentMonths: 6, installmentBank: "VCB" }`. Validate `installmentMonths` theo whitelist ngân hàng hỗ trợ trước khi tạo bản ghi `payments`
- **Webhook HMAC verification** (bắt buộc, từ skill `api-security-patterns`):
  1. Đọc `X-Webhook-Signature` và `X-Webhook-Timestamp` từ header
  2. Reject nếu timestamp cách hiện tại quá 5 phút (chống replay attack)
  3. Tính HMAC-SHA256 của `timestamp.payload` với signing secret
  4. So sánh bằng `MessageDigest.isEqual()` (constant-time, chống timing attack)
  5. Reject nếu signature không khớp
- Verify chữ ký callback/IPN và đối chiếu `amount`, `orderCode`, `transaction_id` trước khi update DB
- **Webhook HTTP response**: Handler phải trả `200 OK` ngay trong vòng **200ms** — TRƯỚC KHI xử lý logic nặng. Dùng `@Async` hoặc message queue để process payment update ở background; không xử lý inline trong request thread (VNPAY/MoMo sẽ retry nếu response chậm)
- **Server-to-server verification bắt buộc**: Sau khi nhận callback/IPN, phải gọi **trực tiếp** API query trạng thái của VNPAY/MoMo (server-to-server) để xác nhận lại kết quả thật — không tin hoàn toàn dữ liệu trong payload callback. Chỉ update `payment_status = paid` sau khi gateway xác nhận thành công
- Không tin tưởng hoàn toàn dữ liệu redirect từ client/browser; trạng thái cuối cùng phải ưu tiên webhook hoặc verify server-to-server
- Lưu toàn bộ `gateway_response` vào bảng `payments` để phục vụ đối soát và xử lý tranh chấp
- Khi online payment thành công: tạo record `payments`, cập nhật `orders.payment_status`, append `order_status_history`, và chuyển đơn sang bước xử lý tiếp theo
- Khi online payment thất bại hoặc bị hủy: ghi nhận `payments.status = failed/cancelled`, giữ audit trail, release inventory reservation

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

### 3.8 Background Jobs cần setup trong Phase 3

- `OrderTimeoutJob` (`@Scheduled`): Mỗi 5 phút, cancel các đơn `pending_payment` quá X phút → release inventory, rollback voucher_usage
- `CartCleanupJob` (`@Scheduled`): Mỗi ngày, xóa cart của guest/anonymous đã không hoạt động > 30 ngày

### 3.9 Order Creation Saga — Bảng Compensating Transactions

> Tạo đơn hàng là một **multi-step saga**. Nếu bất kỳ bước nào fail, phải rollback các bước trước đó để tránh data inconsistency. Toàn bộ steps 1-5 phải nằm trong cùng `@Transactional`.

| Bước | Action | Nếu fail ở bước này → Rollback |
|------|--------|-------------------------------|
| 1 | Validate stock (đọc inventory) | Không cần rollback (chưa write) |
| 2 | Lock inventory (`reserved_quantity += qty`) | Không cần rollback (bước này fail = không lock) |
| 3 | Apply voucher (check + tạm lock usage) | Release inventory reservation từ bước 2 |
| 4 | Calculate & verify total (reprice) | Release inventory, release voucher lock |
| 5 | Save `OrderEntity` + `OrderItemEntity` | Release inventory, release voucher lock |
| 6 | Clear cart | **Không rollback order** — clear cart là idempotent; nếu fail thì retry safe, không ảnh hưởng đơn đã tạo |

> **Nguyên tắc**: Steps 1–5 nằm trong `@Transactional`, nên DB rollback tự động nếu exception xảy ra trong transaction. Clear cart (step 6) có thể đặt ngoài transaction hoặc retry riêng. `OrderTimeoutJob` chịu trách nhiệm release reservation cho đơn không thanh toán đúng hạn.



**Verify**: Giỏ hàng → Chọn địa chỉ → Đặt hàng COD thành công, xem được trong `/account/orders`; Retry POST /orders với cùng Idempotency-Key không tạo đơn thứ 2

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

### 4.2.1 Business rules Voucher / Promotion cần có

- Validate voucher ở UI chỉ mang tính tham khảo; bắt buộc phải validate lại tại `POST /orders`
- Kiểm tra các điều kiện: thời gian hiệu lực, `is_active`, min order value, max discount, usage limit toàn cục, usage limit per user, danh mục hoặc SKU được áp dụng
- Khi tạo đơn thành công phải ghi `voucher_usage`; nếu đơn bị hủy hoặc thanh toán fail theo policy thì rollback usage
- Cần rule ưu tiên khi chồng nhiều giảm giá: flash sale, promotion, voucher, tier discount, reward points
- Cần cơ chế chống race condition khi voucher gần hết lượt dùng — **giải pháp**: dùng `UPDATE vouchers SET usage_count = usage_count + 1 WHERE id = ? AND usage_count < usage_limit` (atomic SQL increment); nếu affected rows = 0 thì voucher đã hết lượt → trả lỗi. Không dùng SELECT rồi UPDATE riêng lẽ (TOCTOU race)

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

### 4.3.1 Buy X Get Y — `is_gift` logic

- `promotion_books.is_gift = 1` đánh dấu sách nào là **quà tặng** (sách "Get") trong promotion
- Khi áp dụng promotion Buy X Get Y vào đơn hàng:
  1. Identify "get" items từ `promotion_books WHERE is_gift = 1`
  2. Set `order_items.is_gift = 1` và `order_items.unit_price = 0`, `order_items.discount_amount = original_price` cho gift items
  3. Gift items **không được tính vào `subtotal`** nhưng vẫn được ghi vào `order_items` để hiển thị và tracking kho
  4. Khi inventory reserve: vẫn trừ `inventory.reserved_quantity` cho cả gift items (sách thật vẫn ra khỏi kho)

### 4.4 Business logic Flash Sale

- Check `start_time <= now <= end_time` và `is_active = true`
- Check `sold_count < quantity_limit` khi user thêm vào cart
- Check `per_user_limit` — user này đã mua bao nhiêu item trong sale này
- Giá flash sale phải được re-check tại thời điểm tạo đơn, không tin giá đang lưu ở cart
- Cần policy fallback nếu flash sale hết hạn trong lúc user đang checkout
- `sold_count` chỉ nên tăng khi order được thanh toán hoặc xác nhận thành công theo quy tắc hệ thống, tránh cộng sai do abandoned cart
- **Race condition cho `sold_count` + `per_user_limit`**: Dùng Redis atomic counter `INCR flash_sale:{id}:sold` để track real-time; so sánh với `quantity_limit` trước khi admit order. Nếu không dùng Redis thì dùng `SELECT ... FOR UPDATE` trên `flash_sale_items` khi tạo đơn để lock row

### 4.5 Caching cho Flash Sale

> Flash sale data được read cực kỳ nhiều (homepage countdown, banner) nhưng cũng thay đổi theo thời gian thực.

```yaml
GET /api/v1/flash-sales/active:  TTL 2min  (balance freshness vs load)
# Flash sale item sold_count: Không cache — cần real-time để tránh oversell
```

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

#### 5.1.1b `user_book_interactions` — Write Triggers

> Bảng này là input cho recommendation engine (Phase 6+). Cần định nghĩa rõ khi nào insert.

| Sự kiện | `interaction_type` | Logic |
|---------|-------------------|-------|
| User xem trang `/product/{slug}` | `view` | Gọi async sau khi response trả về; không block API |
| User thêm vào giỏ hàng | `cart` | Tại `POST /api/v1/cart` |
| Order chuyển sang `completed` | `purchase` | Trigger trong `OrderService.completeOrder()` |

SQL mẫu (upsert):
```sql
INSERT INTO user_book_interactions (user_id, book_id, interaction_type, interaction_count, last_interaction_at)
VALUES (:userId, :bookId, :type, 1, NOW())
ON DUPLICATE KEY UPDATE
  interaction_count = interaction_count + 1,
  last_interaction_at = NOW();
```
Chỉ ghi cho **authenticated users**; guest views không ghi (không có `user_id`).

### 5.1.1 Price History — Khi nào ghi record

> `price_history` table tồn tại trong schema nhưng chưa có trigger logic rõ ràng.

- **Trigger ghi**: Mỗi khi admin `PATCH /admin/books/{id}` hoặc `PATCH /admin/flash-sales/{id}/items` làm thay đổi `sale_price` hoặc `original_price`, tự động insert một record `price_history { variantId, oldPrice, newPrice, changedBy, changedAt, reason }`
- Implement qua `@EntityListeners(PriceHistoryListener.class)` trên `BookVariantEntity` — intercept `@PreUpdate`, compare old vs new price
- Dùng để: hiện lịch sử giá trên trang product detail, trigger notify wishlist khi giá giảm (`PriceDroppedEvent`), admin analytics

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

### 5.3.1 Business rules Reviews / Wishlist cần có

- Chỉ cho review khi user đã mua SKU tương ứng và đơn ở trạng thái `completed` hoặc ít nhất `delivered`
- Mỗi `order_item` chỉ được review 1 lần; sau khi review thành công phải update `order_items.is_reviewed = true`
- Cần rule cho edit review, soft delete review, và moderation trước hoặc sau publish
- `helpful` vote phải chống spam: một user chỉ vote 1 lần cho mỗi review
- Wishlist nên chống thêm trùng sách hoặc trùng variant theo rule đã chọn
- Nếu bật notify giảm giá trong wishlist, cần trigger notification khi giá giảm hoặc có flash sale phù hợp

### 5.3.2 APIs còn thiếu cho Refund từ phía customer

``` 
POST   /api/v1/orders/{id}/refund-requests       → User tạo yêu cầu hoàn tiền / đổi trả
GET    /api/v1/orders/{id}/refund-requests       → User xem trạng thái yêu cầu hoàn tiền
``` 

- Chỉ cho tạo refund request trong thời hạn cho phép sau khi giao hàng (**mặc định 30 ngày kể từ `delivered_at`** — cần chốt business rule Q11)
- Refund phải gắn tới `order_item` cụ thể, số lượng, lý do, ảnh minh chứng, và số tiền hoàn tối đa
  - **Mã RMA (Return Merchandise Authorization) bắt buộc**: Khi tạo refund request thành công, hệ thống sinh `rma_number` (ví dụ `RMA-20260313-0012`) để customer dùng khi gửi hàng về; lưu vào bảng `refunds.rma_number`
  > ⚠️ **Schema gap**: Bảng `refunds` hiện tại **chưa có** cột `rma_number` và `inspection_grade`. Bắt buộc tạo Flyway migration trước khi implement:
  > ```sql
  > ALTER TABLE refunds
  >   ADD COLUMN rma_number VARCHAR(30) NULL COMMENT 'Mã RMA tự sinh khi tạo yêu cầu hoàn trả',
  >   ADD COLUMN inspection_grade ENUM('A','B','C','D') NULL COMMENT 'Kết quả kiểm tra hàng hoàn';
  > ```
- **Điều kiện tạo refund**: order đạt trạng thái `delivered` hoặc `completed`; `refund_request_count` chưa vượt limit per order; item chưa bị refund trùng
- Khi refund được duyệt: hoàn lại tiền, hoàn hoặc thu hồi points theo policy, cập nhật tồn kho nếu hàng hoàn nhập kho

### 5.3.3 Quy trình kiểm tra hàng hoàn trả (Inspection Workflow)

> Áp dụng khi customer gửi sách vật lý về kho. Admin/warehouse nhân viên phải grading trước khi quyết định disposition.

| Grade | Mô tả | Disposition |
|-------|-------|-------------|
| A — Nguyên vẹn | Sách còn seal hoặc như mới, không hư hỏng | Nhập lại kho (`customer_return_restock`), bán lại giá gốc |
| B — Đã qua sử dụng | Sách đọc rồi, bìa/ruột không hư | Bán giá thanh lý hoặc nhập kho đặc biệt (`discounted_stock`) |
| C — Hư hỏng nhẹ | Bìa trầy, trang torn nhẹ | Xem xét bồi thường từ carrier hoặc write-off |
| D — Không thể bán | Hư hỏng nặng, bẩn, thiếu trang | Write-off (`inventory_history.type = write_off`) |

- Sau grading, admin cập nhật `refunds.inspection_grade` và chọn `disposition`
- Nếu disposition là `restock`: tạo `inventory_history` type `customer_return_restock`, tăng `quantity`, giảm `reserved_quantity`
- Nếu disposition là `write_off`: tạo `inventory_history` type `write_off`, không tăng stock
- Kết quả grading ảnh hưởng đến quyết định approve/reject và số tiền hoàn cuối cùng

### 5.3.4 Return Fraud Detection

- Nếu user có `refund_rate > 30%` (số lần refund / số lần mua) → tự động flag tài khoản để review thủ công
- Refund request không có ảnh minh chứng cho sản phẩm > ngưỡng giá trị cần flag
  - Tính `refund_rate` qua subquery thay vì cột riêng (bảng `users` **không có** `refund_count`/`total_orders`):
  ```sql
  SELECT
      COUNT(r.id) * 1.0 / NULLIF(COUNT(DISTINCT o.id), 0) AS refund_rate
  FROM orders o
  LEFT JOIN refunds r ON r.order_id = o.id
  WHERE o.user_id = :userId AND o.status != 'cancelled'
  ```
  Nếu cần real-time thì dùng **Redis counter** (`INCR user:{id}:refund_count` và `user:{id}:order_count`); ghi audit log khi flag

### 5.4 APIs — Admin Inventory (FE: `/admin/inventory/stock`)

```
GET    /api/v1/admin/inventory                → Tồn kho toàn bộ SKU
  Query: ?lowStock=true&page=0&size=20

PATCH  /api/v1/admin/inventory/{variantId}    → Điều chỉnh tồn kho
  Body: { quantityChange, type, note }        → Tự tạo inventory_history record

GET    /api/v1/admin/inventory/{variantId}/history → Lịch sử nhập/xuất kho
```

### 5.4.1 Inventory Adjustment Types (Enum bắt buộc)

> Trường `type` trong `inventory_history` phải dùng enum cố định — không để free-text. Giúp đối soát và reporting chính xác.

| Type | Khi nào dùng |
|------|-------------|
| `purchase_receipt` | Nhập hàng mới từ nhà cung cấp |
| `customer_return_restock` | Hàng hoàn trả Grade A được nhập lại kho |
| `admin_adjustment` | Điều chỉnh thủ công bởi admin (kiểm kê, sửa lỗi) |
| `write_off` | Xóa kho do hư hỏng, mất mát, hàng hoàn Grade D |
| `reservation_placed` | Số lượng tạm giữ cho order mới tạo (tăng `reserved_quantity`) |
| `reservation_released` | Giải phóng tạm giữ khi order hủy/timeout (giảm `reserved_quantity`) |
| `sold` | Kho thực sự xuất hàng khi đơn được xử lý và giao |

### 5.4.2 Low Stock Alert Logic

- `min_stock_level` là field **per-SKU** trên bảng `inventory`, do admin cấu hình (PATCH inventory API)
- Default `min_stock_level = 5` nếu admin chưa cấu hình
- Dashboard low-stock query: `WHERE (quantity - reserved_quantity) < min_stock_level`
- **"Available stock"** (tồn kho bán được thật sự) = `quantity - reserved_quantity`; phải dùng công thức này nhất quán tại mọi điểm trong code (cart check, order create, admin dashboard)

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
- Điểm chỉ nên cộng khi đơn `completed`, không cộng tại thời điểm vừa tạo đơn
- Nếu đơn bị refund toàn phần hoặc một phần sau khi đã cộng điểm thì cần clawback points theo policy
- Cần xử lý `reward_points.expires_at` và `@Scheduled` job expire points định kỳ (hàng đêm)
- Khi user dùng điểm để giảm giá, cần ghi cả ledger `reward_points` và `loyalty_transactions` để truy vết số dư

### 6.5 Domain Events — Cơ chế trigger cross-phase

> Skill `architecture-patterns` recommend dùng **Domain Events** để tách coupling giữa order completion và các side effects (loyalty, notification, email).

Implement với `ApplicationEventPublisher` của Spring:

```java
// Khi đơn chuyển sang COMPLETED:
publisher.publishEvent(new OrderCompletedEvent(orderId, userId, totalAmount));

// Các listener (trong cùng transaction hoặc @Async):
@EventListener OrderCompletedEvent → LoyaltyService.grantPoints()
@EventListener OrderCompletedEvent → NotificationService.sendOrderCompleteNotification()
@EventListener OrderCompletedEvent → ReviewService.markEligibleForReview()

// Tương tự cho wishlist price drop:
@EventListener PriceDroppedEvent → NotificationService.notifyWishlistUsers()
```

Lợi ích: Service không phụ thuộc nhau trực tiếp, dễ thêm listener mới mà không sửa OrderService.

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

- Admin đổi trạng thái đơn phải bị ràng buộc bởi state machine; không cho nhảy trạng thái tùy ý
- Khi chuyển sang `shipping`, cần yêu cầu `tracking_number` và `carrier`
- Khi chuyển sang `completed`, cần trigger loyalty points, review eligibility, notification và đóng vòng đời order
- Khi duyệt refund, cần tách rõ refund payment, nhập lại kho, và hoàn hoặc thu hồi điểm thưởng

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
Phase 1: [ ] Register OK  [ ] OTP email OK  [ ] Verify email OK  [ ] Login → JWT OK  [ ] Forgot/reset password OK  [ ] /users/me trả đúng data
Phase 2: [ ] GET /books → list  [ ] GET /books/{slug} → detail đủ variants+images
Phase 3: [ ] Thêm giỏ → Tạo đơn COD → Xem /account/orders OK  [ ] VNPAY/MoMo callback cập nhật đúng payment_status  [ ] Cancel / timeout release inventory đúng
Phase 4: [ ] /flash-sale load đúng sản phẩm sale  [ ] Voucher validate đúng  [ ] Re-validate voucher khi submit order đúng
Phase 5: [ ] Thêm wishlist OK  [ ] Viết review sau mua OK  [ ] Mỗi order_item chỉ review 1 lần  [ ] Refund request flow hoạt động  [ ] Admin xem tồn kho OK
Phase 6: [ ] Điểm cộng sau order completed  [ ] Refund có clawback points  [ ] Notification khi lên tier
Phase 7: [ ] Dashboard stats đúng  [ ] Admin đổi status đơn hàng OK  [ ] Refund approve/reject cập nhật đúng payment, inventory, loyalty
Phase 8: [ ] Response time < 200ms  [ ] Redis cache hit > 80% cho books API
```

---

## ⚠️ Business Rules Bắt Buộc Nên Chốt Trước Khi Code

1. Customer có bắt buộc verify email trước login hay chỉ trước checkout / review?
2. OTP TTL, resend cooldown, max retry, max resend trong ngày là bao nhiêu?
3. Online payment thành công thì khi nào trừ kho thật: lúc callback `paid` hay lúc admin `processing`?
4. Timeout cho đơn `pending_payment` là bao nhiêu phút và ai xử lý auto-cancel?
5. Thứ tự áp dụng giảm giá giữa flash sale, promotion, voucher, tier discount, reward points là gì?
6. Refund partial có hoàn partial shipping fee, voucher usage và reward points hay không?
7. Điều kiện đủ để review là `delivered` hay `completed`?
8. ✅ **Đã xác nhận**: Wishlist lưu theo **`bookId`** (FK → `books.id`, không phải `variant_id`). Bảng `wishlists` có cột `added_price` (giá tại thời điểm thêm) và `notify_on_price_drop` flag. Khi giá bất kỳ variant của cuốn sách đó giảm xuống dưới `added_price` → trigger thông báo. Giá so sánh: `MIN(book_variants.price WHERE book_id = ? AND is_active = 1)` vs `wishlists.added_price`.
9. Notification gửi in-app only hay thêm email / SMS cho các sự kiện quan trọng?
10. Các thay đổi trạng thái đơn hàng, payment, refund có cần audit log riêng ngoài bảng history hiện có hay không?
11. Thời hạn đổi trả là bao nhiêu ngày kể từ `delivered_at`? (đề xuất 30 ngày; sách đặc thù: sealed vs mở cần policy riêng?)
12. Sản phẩm giá trị thấp (< threshold) có áp dụng "returnless refund" (hoàn tiền không cần gửi hàng vật lý về) hay không? Threshold là bao nhiêu?

---

## 📌 API Backlog Chi Tiết Theo Endpoint

> Mục tiêu của backlog này: chuyển phase plan thành danh sách ticket backend có thể implement tuần tự.  
> Format mỗi endpoint: **Endpoint** → **Mục tiêu** → **Validation chính** → **Side effects / dữ liệu ghi** → **Done when**

### B0. Foundation / Shared Components

#### B0.1 `GET /api/health`

- Mục tiêu: endpoint health check cho deploy, CI, monitoring
- Validation chính: không yêu cầu auth; trả trạng thái app và timestamp
- Side effects / dữ liệu ghi: không có
- Done when: trả `200 OK`; response theo `ApiResponse`; không bị security block

#### B0.2 `ApiResponse<T>`, `PageResponse<T>`, `GlobalExceptionHandler`

- Mục tiêu: chuẩn hóa response và error shape cho toàn bộ API
- Validation chính: map đúng lỗi `validation`, `not found`, `forbidden`, `business rule violation`
- Side effects / dữ liệu ghi: log lỗi có kiểm soát, không lộ stack trace ở production
- Done when: mọi endpoint dùng chung format response; FE parse error thống nhất

### B1. Auth & User Profile

#### B1.1 `POST /api/v1/auth/register`

- Mục tiêu: tạo tài khoản customer mới
- Validation chính: email unique, phone unique nếu có, password policy, fullName không rỗng
- Side effects / dữ liệu ghi: tạo `users`, gắn `customer_tiers` mặc định, set `email_verified_at = null`, sinh OTP nếu chọn auto-send
- Done when: user được tạo thành công ở trạng thái chờ verify; không tự động active sai policy

#### B1.2 `POST /api/v1/auth/register/send-otp`

- Mục tiêu: gửi OTP xác thực email cho flow đăng ký
- Validation chính: email hợp lệ, chưa verify, chống spam resend, giới hạn số lần gửi
- Side effects / dữ liệu ghi: tạo `otp_codes` với type `register_verify_email`; gửi email async hoặc sync theo thiết kế
- Done when: OTP được lưu, có TTL, không gửi quá hạn mức

#### B1.3 `POST /api/v1/auth/register/verify-otp`

- Mục tiêu: xác thực email customer sau đăng ký
- Validation chính: OTP đúng, chưa dùng, chưa hết hạn, đúng type
- Side effects / dữ liệu ghi: update `users.email_verified_at`, đổi `status` sang `active` nếu policy yêu cầu, mark `otp_codes.is_used = true`
- Done when: user verify thành công và có thể login theo policy

#### B1.4 `POST /api/v1/auth/register/resend-otp`

- Mục tiêu: gửi lại OTP verify email
- Validation chính: cooldown resend, max resend/day, account chưa verify
- Side effects / dữ liệu ghi: có thể invalidate OTP cũ hoặc giữ nhiều OTP nhưng chỉ nhận OTP mới nhất
- Done when: resend không tạo lỗ hổng spam hoặc bypass cooldown

#### B1.5 `POST /api/v1/auth/login`

- Mục tiêu: đăng nhập customer và cấp token
- Validation chính: email tồn tại, password đúng, account không `inactive` hoặc `banned`, email đã verify nếu policy bắt buộc
- Side effects / dữ liệu ghi: cập nhật `last_login_at`, cấp access token + refresh token, lưu refresh token hoặc session record
- Done when: login sai không lộ thông tin email tồn tại; login đúng trả đủ token và user profile tối thiểu

#### B1.6 `POST /api/v1/auth/refresh`

- Mục tiêu: cấp access token mới từ refresh token
- Validation chính: refresh token hợp lệ, chưa revoke, chưa hết hạn, đúng rotation policy
- Side effects / dữ liệu ghi: rotate refresh token, revoke token cũ nếu áp dụng rotating refresh token
- Done when: replay refresh token cũ bị từ chối

#### B1.7 `POST /api/v1/auth/logout`

- Mục tiêu: kết thúc session hiện tại hoặc toàn bộ session
- Validation chính: refresh token hợp lệ hoặc access token hợp lệ để xác định session
- Side effects / dữ liệu ghi: blacklist hoặc revoke refresh token
- Done when: token logout không dùng lại được

#### B1.8 `POST /api/v1/auth/forgot-password`

- Mục tiêu: khởi tạo flow reset password qua email OTP
- Validation chính: email tồn tại, account không bị khóa do policy nội bộ
- Side effects / dữ liệu ghi: tạo OTP type `forgot_password`, gửi email reset
- Done when: response không làm lộ email có tồn tại hay không theo security policy

#### B1.9 `POST /api/v1/auth/forgot-password/verify-otp`

- Mục tiêu: xác minh OTP reset password
- Validation chính: code đúng, đúng type, chưa dùng, chưa hết hạn
- Side effects / dữ liệu ghi: đánh dấu OTP hợp lệ cho bước reset tiếp theo hoặc issue short-lived reset token
- Done when: chỉ OTP hợp lệ mới qua được bước reset password

#### B1.10 `POST /api/v1/auth/reset-password`

- Mục tiêu: đặt mật khẩu mới sau quên mật khẩu
- Validation chính: OTP hoặc reset token hợp lệ, password policy đạt yêu cầu
- Side effects / dữ liệu ghi: update `password_hash`, revoke toàn bộ refresh token đang hoạt động, mark OTP đã dùng
- Done when: password cũ không dùng được nữa, refresh token cũ bị vô hiệu

#### B1.11 `PATCH /api/v1/users/me/password`

- Mục tiêu: đổi mật khẩu khi user đang đăng nhập
- Validation chính: access token hợp lệ, `currentPassword` đúng, password mới khác password cũ
- Side effects / dữ liệu ghi: update password, revoke session cũ theo policy, audit change password event
- Done when: user phải đăng nhập lại nếu policy yêu cầu

#### B1.12 `GET /api/v1/users/me` và `PATCH /api/v1/users/me`

- Mục tiêu: xem và cập nhật hồ sơ cơ bản
- Validation chính: chỉ cho sửa các field cho phép như `fullName`, `avatarUrl`, `dateOfBirth`, `gender`
- Side effects / dữ liệu ghi: update `updated_at`; nếu sửa email hoặc phone thì phải đi qua verify flow riêng
- Done when: không cho patch trực tiếp các field nhạy cảm như `reward_points`, `tier_id`, `status`

### B2. Catalog / Storefront Read APIs

#### B2.1 `GET /api/v1/categories` và `GET /api/v1/categories/{slug}`

- Mục tiêu: load menu và trang danh mục
- Validation chính: chỉ trả category active; slug phải unique
- Side effects / dữ liệu ghi: không có, nên cache
- Done when: trả được cây category hoặc category detail đủ dữ liệu FE cần

#### B2.2 `GET /api/v1/books/featured` và `GET /api/v1/books/best-sellers`

- Mục tiêu: load homepage sections
- Validation chính: chỉ lấy sách active, có variant sellable, có ảnh đại diện
- Side effects / dữ liệu ghi: không có, nên cache
- Done when: response map đúng `BookSummaryResponse`

#### B2.3 `GET /api/v1/books`

- Mục tiêu: list sách có filter, sort, pagination
- Validation chính: validate query params, giới hạn `size`, sort whitelist, category slug tồn tại nếu truyền vào
- Side effects / dữ liệu ghi: có thể ghi analytics sau, hiện tại không bắt buộc
- Done when: pagination chuẩn, filter phối hợp đúng, không N+1 query lớn

#### B2.4 `GET /api/v1/books/{slug}`

- Mục tiêu: trang chi tiết sách
- Validation chính: slug tồn tại, sách active, variant còn bán được hoặc được hiển thị theo policy
- Side effects / dữ liệu ghi: có thể ghi `user_book_interactions` view event ở phase sau
- Done when: trả đủ images, variants, price hiện hành, tồn kho sellable, metadata sách

#### B2.5 `GET /api/v1/books/{id}/related`

- Mục tiêu: hiển thị sản phẩm liên quan
- Validation chính: exclude chính sách hiện tại, ưu tiên cùng category/author/publisher
- Side effects / dữ liệu ghi: không có
- Done when: không trả item inactive hoặc hết dữ liệu hiển thị

### B3. Address / Cart / Checkout / Payment

#### B3.1 `GET /api/v1/location/provinces` và `GET /api/v1/location/provinces/{code}/districts`

- Mục tiêu: cấp dữ liệu địa lý cho address form và checkout
- Validation chính: province code hợp lệ
- Side effects / dữ liệu ghi: không có, nên cache
- Done when: dữ liệu đúng seed và ổn định

#### B3.2 `GET/POST/PATCH/DELETE /api/v1/users/me/addresses`

- Mục tiêu: quản lý sổ địa chỉ user
- Validation chính: user chỉ thao tác trên địa chỉ của mình; province/district hợp lệ; một user chỉ có một default address
- Side effects / dữ liệu ghi: update default address consistency
- Done when: create/update/delete không làm mất trạng thái default sai logic

#### B3.3 `PATCH /api/v1/users/me/addresses/{id}/set-default`

- Mục tiêu: đổi địa chỉ mặc định
- Validation chính: địa chỉ thuộc user hiện tại
- Side effects / dữ liệu ghi: clear default ở address cũ, set default ở address mới trong một transaction
- Done when: luôn chỉ còn một default address

#### B3.4 `GET /api/v1/cart`

- Mục tiêu: load giỏ hàng hiện tại
- Validation chính: gắn đúng theo user/session policy
- Side effects / dữ liệu ghi: có thể refresh cached cart
- Done when: trả được item, subtotal, stock warning, applied voucher preview nếu có

#### B3.5 `POST /api/v1/cart/items`

- Mục tiêu: thêm SKU vào giỏ
- Validation chính: variant tồn tại, quantity > 0, không vượt sellable stock, check flash sale per-user rule nếu áp dụng
- Side effects / dữ liệu ghi: tạo hoặc merge cart item, recalculate cart summary
- Done when: thêm lại cùng variant không tạo duplicate item ngoài ý muốn

#### B3.6 `PATCH /api/v1/cart/items/{id}` và `DELETE /api/v1/cart/items/{id}`

- Mục tiêu: cập nhật số lượng hoặc xóa item giỏ hàng
- Validation chính: item thuộc user hiện tại, quantity hợp lệ, không vượt stock
- Side effects / dữ liệu ghi: recalculate cart totals
- Done when: badge count và totals nhất quán

#### B3.7 `DELETE /api/v1/cart`

- Mục tiêu: xóa toàn bộ giỏ hàng
- Validation chính: cart thuộc user hiện tại
- Side effects / dữ liệu ghi: clear cart items, reset cached cart
- Done when: cart rỗng hoàn toàn

#### B3.8 `POST /api/v1/shipping/estimate` và `GET /api/v1/shipping/carriers`

- Mục tiêu: tính phí ship cho checkout
- Validation chính: province code hợp lệ, totalWeight > 0, carrier active
- **Công thức tính totalWeight**: `totalWeight = sum(orderItem.quantity × book.weight_grams)` — `weight_grams` nằm ở bảng **`books`** (không phải `book_variants`); BE JOIN qua `book_variants.book_id → books.id` để lấy giá trị; validate lại ở server khi tạo đơn
- **Công thức tính phí ship** (từ bảng `shipping_rates`):
  ```
  fee = rates.base_fee + ceil(totalWeight_grams / 500) * rates.per_500g_fee
  if (orderSubtotal >= rates.free_ship_threshold) fee = 0
  ```
  Response phải trả thêm `estimatedDaysMin`, `estimatedDaysMax` từ `shipping_rates.estimated_days_min/max`
- Side effects / dữ liệu ghi: không có; có thể cache rate lookups theo `(province_code, carrier_id)`
- Done when: fee tính đúng theo carrier/rate config; free-ship threshold hoạt động; response có ETA

#### B3.9 `POST /api/v1/orders`

- Mục tiêu: tạo đơn hàng từ cart hoặc item snapshot
- Validation chính: address hợp lệ, carrier hợp lệ, payment method hợp lệ, stock đủ, voucher và points hợp lệ, reprice toàn bộ ở server
- Side effects / dữ liệu ghi: tạo `orders`, `order_items`, `order_status_history`, reserve inventory, tạo `payments` record ban đầu nếu cần, clear cart
- Done when: order snapshot đầy đủ, không bị oversell, request idempotent nếu FE retry

#### B3.10 `GET /api/v1/orders` và `GET /api/v1/orders/{id}`

- Mục tiêu: customer xem danh sách và chi tiết đơn
- Validation chính: user chỉ xem order của chính mình
- Side effects / dữ liệu ghi: không có
- Done when: có filter theo status, paging ổn định, trả đủ paymentStatus và timeline cơ bản

#### B3.11 `PATCH /api/v1/orders/{id}/cancel`

- Mục tiêu: customer hủy đơn ở trạng thái cho phép
- Validation chính: order thuộc user, trạng thái cho phép cancel, reason hợp lệ
- Side effects / dữ liệu ghi: update order status, append history, release inventory reservation, trigger refund path nếu cần
- Done when: hủy đơn không làm lệch stock, voucher usage, payment status

#### B3.12 `POST /api/v1/orders/{id}/payments/init`

- Mục tiêu: khởi tạo thanh toán online cho đơn
- Validation chính: order thuộc user, order đang `pending_payment`, amount khớp order snapshot, payment method thuộc online gateways
- Side effects / dữ liệu ghi: tạo payment intent / transaction draft, lưu request payload tối thiểu phục vụ đối soát
- Done when: trả `paymentUrl` hoặc deeplink dùng được, không khởi tạo lặp cho cùng một order sai policy

#### B3.13 `GET /api/v1/orders/{id}/payments/status`

- Mục tiêu: FE polling trạng thái thanh toán nếu cần
- Validation chính: order thuộc user
- Side effects / dữ liệu ghi: có thể sync với gateway nếu thiết kế yêu cầu
- Done when: trả đúng trạng thái `pending`, `paid`, `failed`, `cancelled`, `expired`

#### B3.14 `GET /api/v1/payments/callback` và `POST /api/v1/payments/webhook`

- Mục tiêu: nhận kết quả từ gateway
- Validation chính: signature hợp lệ, amount đúng, transaction id chưa xử lý, order tồn tại
- Side effects / dữ liệu ghi: update `payments`, update `orders.payment_status`, chuyển trạng thái order theo state machine, append history, release reservation nếu fail
- Done when: xử lý idempotent; duplicate callback không gây sai dữ liệu

### B4. Flash Sale / Voucher / Promotion

#### B4.1 `GET /api/v1/flash-sales/active` và `GET /api/v1/flash-sales/{id}`

- Mục tiêu: load landing page flash sale và section homepage
- Validation chính: chỉ trả flash sale active theo thời gian, item còn hiệu lực
- Side effects / dữ liệu ghi: không có
- Done when: response có countdown-ready fields, progress bar fields, pricing đúng

#### B4.2 `POST /api/v1/vouchers/validate`

- Mục tiêu: preview khả năng áp dụng voucher ở checkout
- Validation chính: mã tồn tại, active, trong thời gian hiệu lực, đủ min subtotal, chưa vượt usage limit
- Side effects / dữ liệu ghi: không consume voucher thật
- Done when: trả rõ `isValid`, `discountAmount`, `message`, `failureReason` nếu có

#### B4.3 Admin CRUD `flash-sales`, `vouchers`, `promotions`

- Mục tiêu: cho admin cấu hình campaign marketing
- Validation chính: thời gian hợp lệ, item không trùng conflict sai policy, quantity limit hợp lý, discount không âm
- Side effects / dữ liệu ghi: create/update/delete campaign và mapping items
- Done when: campaign thay đổi phản ánh đúng ở storefront và không phá pricing rules hiện tại

### B5. Wishlist / Reviews / Refunds

#### B5.1 `GET/POST/DELETE/PATCH /api/v1/users/me/wishlist`

- Mục tiêu: customer quản lý wishlist và cờ notify giảm giá
- Validation chính: item tồn tại, tránh duplicate, chỉ sửa wishlist của mình
- Side effects / dữ liệu ghi: create/delete wishlist row, update notify preference, có thể trigger notification job sau này
- Done when: wishlist trả được current price và sale flags

#### B5.2 `GET /api/v1/books/{id}/reviews`

- Mục tiêu: load danh sách review cho trang chi tiết sách
- Validation chính: sort whitelist, pagination hợp lệ, ẩn review bị hidden
- Side effects / dữ liệu ghi: không có
- Done when: review list có aggregates cần thiết như rating distribution nếu FE cần

#### B5.3 `POST /api/v1/books/{id}/reviews`

- Mục tiêu: customer gửi review sau mua hàng
- Validation chính: user đã mua item, order đạt trạng thái đủ điều kiện, mỗi `order_item` chỉ review 1 lần, rating trong range hợp lệ
- Side effects / dữ liệu ghi: tạo review, review images nếu có, update `order_items.is_reviewed`
- Done when: review không thể tạo lặp cho cùng purchase record

#### B5.4 `POST /api/v1/reviews/{id}/helpful`

- Mục tiêu: vote helpful cho review
- Validation chính: review tồn tại, user không vote trùng, không self-vote nếu policy cấm
- Side effects / dữ liệu ghi: tạo interaction record hoặc increment counter qua cơ chế chống race condition
- Done when: vote idempotent theo user-review pair

#### B5.5 `POST /api/v1/orders/{id}/refund-requests` và `GET /api/v1/orders/{id}/refund-requests`

- Mục tiêu: customer tạo và theo dõi yêu cầu refund/return
- Validation chính: order thuộc user, item đủ điều kiện, trong cửa sổ đổi trả, amount không vượt tối đa cho phép
- Side effects / dữ liệu ghi: tạo `refunds`, lưu ảnh minh chứng, chờ admin xử lý
- Done when: admin xem lại được đầy đủ context từ order, item, images, amount, reason

### B6. Rewards / Notifications

#### B6.1 `GET /api/v1/users/me/rewards` và `GET /api/v1/users/me/rewards/history`

- Mục tiêu: hiển thị số dư điểm và lịch sử giao dịch
- Validation chính: user auth hợp lệ
- Side effects / dữ liệu ghi: không có
- Done when: số dư khớp ledger, có phân biệt điểm sắp hết hạn nếu FE cần

#### B6.2 `GET /api/v1/users/me/notifications`, `PATCH /read`, `PATCH /read-all`

- Mục tiêu: quản lý inbox notification của user
- Validation chính: user chỉ thao tác notification của mình
- Side effects / dữ liệu ghi: cập nhật `isRead`, `readAt` nếu schema hỗ trợ
- Done when: unread count và list nhất quán sau thao tác

#### B6.3 Background jobs loyalty / notification

- Mục tiêu: xử lý cộng điểm, expire điểm, gửi notify theo event
- Validation chính: job idempotent, không cộng điểm trùng khi order reprocessed
- Side effects / dữ liệu ghi: update `reward_points`, `loyalty_transactions`, `notifications`
- Done when: event `order completed`, `tier upgraded`, `wishlist price drop`, `payment success`, `refund result` đều có hook rõ ràng

### B7. Admin APIs

#### B7.1 `GET /api/v1/admin/dashboard/*`

- Mục tiêu: trả số liệu dashboard cho admin
- Validation chính: admin auth và permission đúng scope
- Side effects / dữ liệu ghi: không có; nên cache ngắn hạn
- Done when: KPI định nghĩa rõ time range và truy vấn không quá nặng

#### B7.2 Admin CRUD `books`, `categories`, `authors`, `publishers`

- Mục tiêu: quản lý catalog
- Validation chính: slug unique, referential integrity, không xóa cứng dữ liệu đang được tham chiếu nếu policy không cho
- Side effects / dữ liệu ghi: create/update/soft delete catalog entities; invalidate cache liên quan
- Done when: storefront phản ánh đúng thay đổi active/inactive và metadata catalog

#### B7.3 `GET /api/v1/admin/orders`, `GET /api/v1/admin/orders/{id}`, `PATCH /status`

- Mục tiêu: admin quản lý vòng đời order
- Validation chính: state transition hợp lệ, permission đúng, tracking info bắt buộc ở bước shipping
- Side effects / dữ liệu ghi: append `order_status_history`, set timestamps (`shipped_at`, `delivered_at`, `completed_at`, `cancelled_at`), trigger downstream jobs
- Done when: timeline order truy vết được đầy đủ actor, thời điểm, ghi chú

#### B7.4 `GET /api/v1/admin/orders/{id}/refunds`, `PATCH /api/v1/admin/refunds/{id}/approve`, `PATCH /reject`

- Mục tiêu: xử lý hoàn tiền / đổi trả
- Validation chính: refund tồn tại, đang ở trạng thái chờ xử lý, amount hợp lệ, admin có quyền xử lý
- Side effects / dữ liệu ghi: update `refunds.status`, refund payment nếu cần, restock inventory nếu cần, clawback reward points nếu cần
- Done when: trạng thái refund, payment, order, inventory và loyalty nhất quán sau xử lý

#### B7.5 `GET /api/v1/admin/customers*`, `PATCH /tier`, `PATCH /status`, `GET/PATCH /customer-tiers`

- Mục tiêu: admin quản trị customer và loyalty tiers
- Validation chính: không downgrade hoặc ban user trái policy, tier config không phá rule min spent
- Side effects / dữ liệu ghi: update `users`, `customer_tiers`, sinh notification nếu cần
- Done when: thay đổi tier/status phản ánh đúng ở account và checkout benefits

#### B7.6 `GET /api/v1/admin/payments*`, `POST /export`

- Mục tiêu: đối soát giao dịch thanh toán
- Validation chính: filter hợp lệ, export theo range và quyền admin
- Side effects / dữ liệu ghi: tạo file export hoặc stream CSV
- Done when: có thể đối chiếu order, payment, transaction id và gateway status

#### B7.7 `GET /api/v1/admin/reviews`, `PATCH /visibility`, `POST /reply`

- Mục tiêu: moderation review content
- Validation chính: review tồn tại, permission đúng, visibility transition hợp lệ
- Side effects / dữ liệu ghi: update review moderation status, tạo admin reply, có thể notify user
- Done when: storefront ẩn/hiện review đúng ngay sau moderation

#### B7.8 `GET/POST/PATCH /api/v1/admin/shipping/carriers` và `rates`

- Mục tiêu: cấu hình logistics
- Validation chính: carrier/rate active, province mapping hợp lệ, không tạo rate chồng chéo sai policy
- Side effects / dữ liệu ghi: update shipping config, invalidate estimate cache nếu có
- Done when: checkout estimate lấy đúng dữ liệu cấu hình mới

### B8. Cross-cutting Non-Functional Tickets

#### B8.1 Idempotency / Concurrency

- Mục tiêu: tránh duplicate create order, duplicate payment callback, duplicate refund handling
- Done when: có cơ chế request key hoặc unique constraint phù hợp ở các flow trọng yếu

#### B8.2 Audit / Observability

- Mục tiêu: log đúng business event quan trọng mà không lộ dữ liệu nhạy cảm
- Done when: có trace cho auth, payment, order transition, refund decision, OTP failures

#### B8.3 Scheduler / Background Workers

- Mục tiêu: xử lý OTP expiry, order timeout auto-cancel, reward point expiry, notification dispatch
- Done when: job chạy an toàn, idempotent, có metric theo dõi thất bại

#### B8.4 Cache / Performance hardening

- Mục tiêu: giảm tải cho catalog, category, flash sale, dashboard
- Done when: cache invalidation rõ ràng sau admin update; không cache nhầm dữ liệu user-specific

---

## 🗂️ Ticket Priority & Estimated Effort

> Mục tiêu của section này: giúp team tách backlog thành ticket sprint-ready.  
> Quy ước effort:
- `XS`: 0.5-1 ngày
- `S`: 1-2 ngày
- `M`: 2-3 ngày
- `L`: 3-5 ngày
- `XL`: 5+ ngày hoặc cần chia nhỏ thêm

### P0 — Bắt buộc để unblock auth, đọc catalog và checkout cơ bản

| Ticket ID | Scope | Priority | Effort | Depends On | Ghi chú |
|---|---|---|---|---|---|
| T0-01 | B0.2 Shared response + exception handler | P0 | S | - | Là nền cho toàn bộ API |
| T0-02 | B0.1 Health check + security allowlist | P0 | XS | T0-01 | Cần cho deploy và verify phase 0 |
| T1-01 | B1.1 Register customer | P0 | M | T0-01 | Chưa bao gồm verify OTP |
| T1-02 | B1.2 Send OTP register | P0 | M | T1-01 | Bao gồm rate limit cơ bản |
| T1-03 | B1.3 Verify OTP register | P0 | M | T1-02 | Activate account sau verify |
| T1-04 | B1.5 Login customer | P0 | M | T1-03 | Chặn unverified/inactive/banned |
| T1-05 | B1.6 Refresh token | P0 | S | T1-04 | Nên đi cùng token store/blacklist |
| T1-06 | B1.7 Logout | P0 | XS | T1-05 | Revoke refresh token |
| T1-07 | B1.12 Get/Patch profile cơ bản | P0 | S | T1-04 | Không cho sửa field nhạy cảm |
| T2-01 | B2.1 Categories list/detail | P0 | S | T0-01 | Cacheable |
| T2-02 | B2.2 Featured + best-sellers | P0 | M | T2-01 | Homepage read APIs |
| T2-03 | B2.3 Books listing with paging/filter | P0 | L | T2-01 | Dễ phát sinh query tuning |
| T2-04 | B2.4 Book detail | P0 | M | T2-01 | Bao gồm images + variants |
| T3-01 | B3.1 Provinces/districts | P0 | S | T0-01 | Cho address form |
| T3-02 | B3.2/B3.3 User addresses | P0 | M | T1-04, T3-01 | Bao gồm default address rule |
| T3-03 | B3.4 Get cart | P0 | S | T1-04 | |
| T3-04 | B3.5/B3.6/B3.7 Cart item CRUD | P0 | L | T3-03, T2-04 | Có stock validation |
| T3-05 | B3.8 Shipping estimate + carriers | P0 | M | T3-01, T3-02 | |
| T3-06 | B3.9 Create order COD path | P0 | XL | T3-02, T3-04, T3-05 | Bao gồm reserve stock + snapshot + history |
| T3-07 | B3.10 Customer order list/detail | P0 | M | T3-06 | |
| T3-08 | B3.11 Customer cancel order | P0 | M | T3-06 | Bao gồm release reservation |

### P1 — Quan trọng để productionize auth, online payment và marketing core

| Ticket ID | Scope | Priority | Effort | Depends On | Ghi chú |
|---|---|---|---|---|---|
| T1-08 | B1.4 Resend OTP register | P1 | S | T1-02 | |
| T1-09 | B1.8 Forgot password | P1 | S | T0-01 | |
| T1-10 | B1.9 Verify OTP forgot password | P1 | S | T1-09 | |
| T1-11 | B1.10 Reset password | P1 | S | T1-10 | Revoke all sessions |
| T1-12 | B1.11 Change password | P1 | S | T1-04 | |
| T3-09 | B3.12 Payment init VNPAY/MoMo | P1 | L | T3-06 | Tách gateway adapter nếu cần |
| T3-10 | B3.13 Payment status polling | P1 | S | T3-09 | |
| T3-11 | B3.14 Payment callback/webhook | P1 | XL | T3-09 | Phải idempotent và verify signature |
| T4-01 | B4.2 Voucher validate | P1 | M | T3-04, T3-06 | Chỉ preview, chưa consume |
| T4-02 | Voucher consume/release trong create order | P1 | L | T4-01, T3-06 | Nên implement chung với order service |
| T4-03 | B4.1 Flash sale active/detail | P1 | M | T2-04 | |
| T4-04 | Repricing flash sale/voucher khi submit order | P1 | M | T3-06, T4-01, T4-03 | Ticket cross-cutting |
| T6-01 | B6.2 Notifications read APIs | P1 | S | T1-04 | In-app only ở giai đoạn đầu |
| T8-01 | B8.1 Idempotency for order/payment | P1 | M | T3-06, T3-11 | Có thể làm song song cuối sprint P0-P1 |
| T8-02 | B8.3 Scheduler: OTP expiry + payment timeout | P1 | M | T1-02, T3-06 | Auto-cancel pending_payment |

### P2 — Nâng cao cho CRM, loyalty, moderation và admin full flow

| Ticket ID | Scope | Priority | Effort | Depends On | Ghi chú |
|---|---|---|---|---|---|
| T4-05 | B4.3 Admin CRUD flash-sales | P2 | L | T4-03 | |
| T4-06 | B4.3 Admin CRUD vouchers | P2 | M | T4-01 | |
| T4-07 | B4.3 Admin CRUD promotions | P2 | M | T2-04 | |
| T5-01 | B5.1 Wishlist APIs | P2 | M | T1-04, T2-04 | |
| T5-02 | B5.2 Review listing | P2 | S | T2-04 | |
| T5-03 | B5.3 Create review + order_item review guard | P2 | M | T3-07 | |
| T5-04 | B5.4 Helpful voting | P2 | S | T5-02 | |
| T5-05 | B5.5 Customer refund requests | P2 | L | T3-07 | |
| T6-02 | B6.1 Rewards balance/history | P2 | M | T3-07 | |
| T6-03 | B6.3 Loyalty accrual/clawback jobs | P2 | L | T6-02, T3-06 | |
| T7-01 | B7.1 Admin dashboard stats | P2 | M | T3-06, T2-03 | |
| T7-02 | B7.2 Admin catalog CRUD | P2 | XL | T2-01, T2-04 | Nên chia nhỏ theo entity |
| T7-03 | B7.3 Admin order management/status | P2 | L | T3-06 | |
| T7-04 | B7.4 Admin refund approve/reject | P2 | L | T5-05, T3-11 | Cross payment/inventory/loyalty |
| T7-05 | B7.5 CRM customers + tiers | P2 | M | T6-02 | |
| T7-06 | B7.6 Admin payments/export | P2 | M | T3-11 | |
| T7-07 | B7.7 Review moderation | P2 | M | T5-03 | |
| T7-08 | B7.8 Shipping config admin | P2 | M | T3-05 | |
| T8-03 | B8.2 Audit/observability | P2 | M | T1-04, T3-06 | |
| T8-04 | B8.4 Cache/performance hardening | P2 | L | T2-03, T2-04, T4-03, T7-01 | |

### Sprint đề xuất nếu team nhỏ 1-2 backend dev

#### Sprint 1

- T0-01, T0-02
- T1-01, T1-02, T1-03, T1-04
- T2-01, T2-02, T2-04

#### Sprint 2

- T1-05, T1-06, T1-07
- T2-03
- T3-01, T3-02, T3-03, T3-04

#### Sprint 3

- T3-05, T3-06, T3-07, T3-08
- T4-01

#### Sprint 4

- T1-09, T1-10, T1-11, T1-12
- T3-09, T3-10, T3-11
- T8-01, T8-02

#### Sprint 5+

- Toàn bộ P2 theo nhu cầu business: marketing, wishlist, reviews, refunds, loyalty, admin full flow

### Gợi ý chia epic

- Epic A: Foundation & Security Core
  Bao gồm T0-01 đến T1-07.
- Epic B: Storefront Read APIs
  Bao gồm T2-01 đến T2-04.
- Epic C: Cart, Checkout, Order COD
  Bao gồm T3-01 đến T3-08.
- Epic D: Online Payment & Reliability
  Bao gồm T3-09 đến T3-11, T8-01, T8-02.
- Epic E: Promotions & Pricing Rules
  Bao gồm T4-01 đến T4-04.
- Epic F: Post-purchase Experience
  Bao gồm T5-01 đến T6-03.
- Epic G: Admin Operations
  Bao gồm T7-01 đến T7-08.

---

## �️ P0 Spring Boot Implementation Checklist

> Checklist này tương ứng với Sprint 1–3 trong sprint plan ở trên.  
> Thứ tự tạo file **quan trọng** — tạo foundation trước, entity trước repository, service trước controller.  
> Package gốc: `com.bookstore`

### Cấu trúc thư mục đề xuất

```
src/main/java/com/bookstore/
├── config/           # SecurityConfig, JwtProperties, TransactionConfig
├── exception/        # AppException, GlobalExceptionHandler, ErrorCode
├── common/           # ApiResponse<T>, PageResponse<T>
├── entity/
│   └── enums/        # UserStatus, OtpType, OrderStatus, PaymentStatus, ...
├── repository/
│   └── spec/         # BookSpecification (JPA Specification)
├── service/
│   └── impl/
├── controller/
├── dto/
│   ├── request/
│   └── response/
├── security/         # JwtUtil, JwtAuthenticationFilter, UserDetailsServiceImpl
├── mapper/           # optional: MapStruct mappers
└── scheduler/        # OTP expiry, payment timeout jobs (P1)
```

---

### T0-01 — Foundation: Shared response & exception handler

> **Tạo trước tiên, không phụ thuộc gì. Mọi ticket còn lại dùng các class này.**

**`common/ApiResponse.java`**
```java
@Data @Builder
public class ApiResponse<T> {
    private int code;
    private String message;
    private T data;

    public static <T> ApiResponse<T> success(T data) { ... }
    public static <T> ApiResponse<T> error(int code, String message) { ... }
}
```

**`common/PageResponse.java`**
```java
@Data @Builder
public class PageResponse<T> {
    private List<T> items;
    private int page, size, totalPages;
    private long totalElements;
}
```

**`exception/ErrorCode.java`** — enum với code + message mặc định
```java
public enum ErrorCode {
    // Auth
    USER_NOT_FOUND(1001, "User not found"),
    EMAIL_ALREADY_EXISTS(1002, "Email already registered"),
    PHONE_ALREADY_EXISTS(1003, "Phone already registered"),
    INVALID_CREDENTIALS(1004, "Invalid email or password"),
    ACCOUNT_NOT_VERIFIED(1005, "Email not verified"),
    ACCOUNT_BANNED(1006, "Account has been banned"),
    ACCOUNT_INACTIVE(1007, "Account is inactive"),
    OTP_NOT_FOUND(1008, "OTP not found or expired"),
    OTP_ALREADY_USED(1009, "OTP already used"),
    OTP_RATE_LIMIT(1010, "Too many OTP requests, please wait"),
    TOKEN_INVALID(1011, "Token invalid or expired"),
    // Order
    CART_EMPTY(2001, "Cart is empty"),
    INSUFFICIENT_STOCK(2002, "Insufficient stock for item"),
    ORDER_NOT_FOUND(2003, "Order not found"),
    ORDER_CANNOT_CANCEL(2004, "Order cannot be cancelled at current status"),
    // Product
    BOOK_NOT_FOUND(3001, "Book not found"),
    VARIANT_NOT_FOUND(3002, "Variant not found"),
    // General
    VALIDATION_ERROR(4001, "Validation failed"),
    UNAUTHORIZED(4003, "Unauthorized"),
    FORBIDDEN(4004, "Forbidden"),
    INTERNAL_ERROR(5000, "Internal server error");

    public final int code;
    public final String message;
}
```

**`exception/AppException.java`**
```java
public class AppException extends RuntimeException {
    private final ErrorCode errorCode;
    public AppException(ErrorCode errorCode) {
        super(errorCode.message);
        this.errorCode = errorCode;
    }
}
```

**`exception/GlobalExceptionHandler.java`** — `@RestControllerAdvice`
- catch `AppException` → `ApiResponse.error(errorCode.code, errorCode.message)` + HTTP 400
- catch `MethodArgumentNotValidException` → collect field errors → HTTP 400
- catch `AccessDeniedException` → HTTP 403
- catch `Exception` → INTERNAL_ERROR + HTTP 500

---

### T0-02 — Health check + Security allowlist

**`config/SecurityConfig.java`** — `@EnableWebSecurity`
```
SecurityFilterChain:
  - CSRF disabled
  - CORS: cho phép origin frontend (lấy từ config)
  - Session: STATELESS
  - Permit: GET /api/v1/health, /api/v1/auth/**, GET /api/v1/books/**, GET /api/v1/categories/**
  - AuthenticateAll: tất cả còn lại
  - addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
```

**`controller/HealthController.java`**
```
GET /api/v1/health → ApiResponse.success("OK")
```

---

### T1-01 — Register customer

**Entities:**

`entity/enums/UserStatus.java`
```
PENDING_VERIFY, ACTIVE, INACTIVE, BANNED
```

`entity/UserEntity.java` — `@Entity @Table(name="users")`
```
id, email (unique), passwordHash, fullName, phone (unique nullable),
avatarUrl, status (UserStatus), emailVerifiedAt, phoneVerifiedAt,
createdAt, updatedAt
```
> Dùng `@CreationTimestamp` / `@UpdateTimestamp` của Hibernate hoặc `@EntityListeners(AuditingEntityListener.class)`

**`repository/UserRepository.java`**
```java
Optional<UserEntity> findByEmail(String email);
boolean existsByEmail(String email);
boolean existsByPhone(String phone);
```

**DTOs:**

`dto/request/RegisterRequest.java`
```
@NotBlank String email;        // @Email
@NotBlank @Size(min=8) String password;
@NotBlank String fullName;
String phone;                  // nullable
```

`dto/response/UserResponse.java`
```
id, email, fullName, phone, avatarUrl, status, createdAt
```

**`service/impl/UserServiceImpl.java`**

`registerCustomer(RegisterRequest req)`:
1. `existsByEmail` → throw EMAIL_ALREADY_EXISTS
2. `existsByPhone` (nếu phone không null) → throw PHONE_ALREADY_EXISTS
3. `passwordHash = passwordEncoder.encode(req.password)`
4. Save `UserEntity` với `status = PENDING_VERIFY`
5. Return `UserResponse`

**`controller/AuthController.java`**
```
POST /api/v1/auth/register → UserService.registerCustomer()
```

---

### T1-02 — Send OTP register

**Entities:**

`entity/enums/OtpType.java`
```
REGISTER_VERIFY_EMAIL, FORGOT_PASSWORD, CHANGE_PASSWORD
```

`entity/OtpCodeEntity.java` — `@Entity @Table(name="otp_codes")`
```
id, userId (FK, nullable nếu trước khi có user), email, code (6-digit),
type (OtpType), isUsed (boolean default false),
expiresAt (LocalDateTime), createdAt
```

**`repository/OtpCodeRepository.java`**
```java
Optional<OtpCodeEntity> findByEmailAndCodeAndTypeAndIsUsedFalseAndExpiresAtAfter(
    String email, String code, OtpType type, LocalDateTime now);

// Rate limit check: đếm OTP đã gửi trong 15 phút gần nhất
int countByEmailAndTypeAndCreatedAtAfter(String email, OtpType type, LocalDateTime cutoff);

// Invalidate OTP cũ
@Modifying void updateAllByEmailAndTypeAndIsUsedFalse(String email, OtpType type);
```

**`service/impl/OtpServiceImpl.java`**

`sendOtp(String email, OtpType type)`:
1. Load user theo email (nếu type = REGISTER): user phải tồn tại (do đã register)
2. Rate-limit: count OTPs trong 15 phút ≥ 3 → throw OTP_RATE_LIMIT
3. Invalidate OTP cũ cùng email+type+isUsed=false
4. Generate 6-digit random code (`SecureRandom`)
5. Save `OtpCodeEntity` với `expiresAt = now + 5 min`
6. Call `EmailService.sendOtpEmail(email, code, type)`

**`service/impl/EmailServiceImpl.java`**
- Inject `JavaMailSender` (Spring Mail)
- `sendOtpEmail(email, code, type)`: build subject + body theo type, gửi async (`@Async`)

**`dto/request/SendOtpRequest.java`**
```
@Email @NotBlank String email;
@NotNull OtpType type;
```

**`controller/AuthController.java`** — thêm endpoint:
```
POST /api/v1/auth/register/send-otp → OtpService.sendOtp(email, REGISTER_VERIFY_EMAIL)
```

---

### T1-03 — Verify OTP (activate account)

**`dto/request/VerifyOtpRequest.java`**
```
@Email @NotBlank String email;
@NotBlank @Size(min=6, max=6) String code;
@NotNull OtpType type;
```

**`OtpServiceImpl.verifyOtp(VerifyOtpRequest)`**:
1. `findByEmailAndCodeAndTypeAndIsUsedFalseAndExpiresAtAfter(email, code, type, now)`  
   → không tìm thấy → throw OTP_NOT_FOUND
2. Mark `otp.isUsed = true`, save
3. If type == REGISTER_VERIFY_EMAIL: `userService.activateAccount(email)`

**`UserServiceImpl.activateAccount(String email)`**:
- Load user → set `status = ACTIVE`, set `emailVerifiedAt = now`

**`controller/AuthController.java`**:
```
POST /api/v1/auth/register/verify-otp → OtpService.verifyOtp()
```

---

### T1-04 — Login customer

**Security classes:**

`security/JwtProperties.java` — `@ConfigurationProperties("jwt")`
```
String privateKeyPath;   # path đến private key PEM
String publicKeyPath;    # path đến public key PEM
long accessTokenExpiry;  # seconds (ví dụ: 3600)
long refreshTokenExpiry; # seconds (ví dụ: 2592000)
```

`security/JwtUtil.java`
```java
String generateAccessToken(UserEntity user);      // claims: sub=userId, email, roles
String generateRefreshToken(UserEntity user);     // claims: sub=userId, type=refresh
boolean validateToken(String token);
Long extractUserId(String token);
```
> Dùng `java-jwt` (Auth0) hoặc `jjwt`. RS256: sign bằng private key, verify bằng public key.

`security/UserDetailsServiceImpl.java` — `implements UserDetailsService`
```java
loadUserByUsername(String email) → UserRepository.findByEmail()
```

`security/JwtAuthenticationFilter.java` — `extends OncePerRequestFilter`
```
1. Extract "Bearer <token>" từ Authorization header
2. Validate token → extractUserId
3. Load UserDetails → set UsernamePasswordAuthenticationToken vào SecurityContextHolder
4. Nếu token invalid: không set SecurityContext (request sẽ bị 401 ở endpoint cần auth)
```

**Entity:**

`entity/RefreshTokenEntity.java`
```
id, userId (FK), tokenHash (SHA-256 của token string),
expiresAt, revokedAt (nullable), userAgent, ipAddress, createdAt
```

**`repository/RefreshTokenRepository.java`**
```java
Optional<RefreshTokenEntity> findByTokenHash(String hash);
void revokeAllByUserId(Long userId); // UPDATE revokedAt = now
```

**DTOs:**

`dto/request/LoginRequest.java`
```
@Email String email;
@NotBlank String password;
```

`dto/response/LoginResponse.java`
```
String accessToken, refreshToken;
long expiresIn;
UserResponse user;
```

**`service/impl/AuthServiceImpl.java`**

`login(LoginRequest)`:
1. Load user by email → throw INVALID_CREDENTIALS nếu không tìm thấy  
   *(KHÔNG phân biệt "user not found" vs "wrong password" để tránh user enumeration)*
2. `passwordEncoder.matches(req.password, user.passwordHash)` → throw INVALID_CREDENTIALS nếu sai
3. Check status:  
   - `PENDING_VERIFY` → throw ACCOUNT_NOT_VERIFIED  
   - `INACTIVE` → throw ACCOUNT_INACTIVE  
   - `BANNED` → throw ACCOUNT_BANNED
4. Generate `accessToken` + `refreshToken` (JwtUtil)
5. Save `RefreshTokenEntity` (lưu hash của refreshToken)
6. Return `LoginResponse`

**`controller/AuthController.java`**:
```
POST /api/v1/auth/login → AuthService.login()
```

---

### T1-05 — Refresh token

**`dto/request/RefreshTokenRequest.java`**: `String refreshToken`

**`dto/response/TokenResponse.java`**: `String accessToken; long expiresIn`

**`AuthServiceImpl.refreshToken(String token)`**:
1. Hash token → findByTokenHash
2. Check `revokedAt == null` và `expiresAt > now` → throw TOKEN_INVALID
3. Load user → validate status
4. Generate new accessToken
5. (Optional) rotate refreshToken: revoke cũ, issue mới
6. Return TokenResponse

**Controller**: `POST /api/v1/auth/refresh-token`

---

### T1-06 — Logout

**`AuthServiceImpl.logout(String token)`**: hash → findByTokenHash → set `revokedAt = now`

**Controller**: `POST /api/v1/auth/logout` (cần auth, lấy token từ body hoặc Authorization header)

---

### T1-07 — Get/Patch profile cơ bản

**`dto/request/UpdateProfileRequest.java`**
```
String fullName;    // nullable = không thay đổi
String phone;       // nullable
String avatarUrl;   // nullable
// KHÔNG cho phép sửa email, password qua endpoint này
```

**`dto/response/ProfileResponse.java`**
```
id, email, fullName, phone, avatarUrl, status, emailVerifiedAt, createdAt
```

**`UserServiceImpl`**:
- `getProfile(Long userId)` → load → map sang ProfileResponse
- `updateProfile(Long userId, UpdateProfileRequest)` → partial update (chỉ set field không null)

**Controller** (thêm vào `ProfileController` hoặc `UserController`):
```
GET  /api/v1/me    → UserService.getProfile(currentUserId)
PATCH /api/v1/me   → UserService.updateProfile(currentUserId, req)
```
> Helper lấy `currentUserId`: tạo `SecurityUtils.getCurrentUserId()` extract từ `SecurityContextHolder`

---

### T2-01 — Categories list/detail

**`entity/CategoryEntity.java`**
```
id, name, slug (unique), parentId (nullable, self-ref),
imageUrl, sortOrder, isActive, level (1 hoặc 2), createdAt
```

**`repository/CategoryRepository.java`**
```java
List<CategoryEntity> findAllByParentIdIsNullAndIsActiveTrueOrderBySortOrder();
List<CategoryEntity> findAllByParentIdAndIsActiveTrue(Long parentId);
Optional<CategoryEntity> findBySlug(String slug);
```

**`dto/response/CategoryResponse.java`**
```
id, name, slug, imageUrl, level,
List<CategoryResponse> children  // chỉ populate ở getTree()
```

**`service/impl/CategoryServiceImpl.java`**
- `getTree()`: lấy tất cả active → group by parentId → build tree 2 cấp in-memory
- `getBySlug(slug)`: load + load children

**Controller**: `GET /api/v1/categories` + `GET /api/v1/categories/{slug}`

---

### T2-02 — Featured & Best-sellers

**Entities:**

`entity/BookEntity.java` — `@Entity @Table(name="books")`
```
id, title, slug (unique), isbn, description, publisherId (FK),
publishedAt, pageCount, language, basePrice, status (ACTIVE/INACTIVE/DRAFT)
```

`entity/AuthorEntity.java` — `id, name, bio, avatarUrl`

`entity/BookAuthorEntity.java` — `@Table(name="book_authors")`: bookId, authorId, role

`entity/BookVariantEntity.java` — `id, bookId, format (PAPERBACK/EBOOK/HARDCOVER), price, stock, sku (unique)`

`entity/BookImageEntity.java` — `id, bookId, url, isPrimary, sortOrder`

**`repository/BookRepository.java`**
```java
// Featured: có thể dùng field isFeatured hoặc JOIN với promo
List<BookEntity> findTop{n}ByStatusOrderByCreatedAtDesc(...);

// Best-sellers: JOIN order_items → GROUP BY book → ORDER BY SUM(qty) DESC
// Dùng @Query JPQL nếu cần
@Query("SELECT b FROM BookEntity b JOIN ... ORDER BY SUM(...) DESC")
List<BookEntity> findBestSellers(Pageable pageable);
```

**`dto/response/BookSummaryResponse.java`**
```
id, title, slug, coverImageUrl, authorNames (join), price,
discountPercent, avgRating, reviewCount, format
```

**Controller** (`BookController`):
```
GET /api/v1/books/featured
GET /api/v1/books/best-sellers
```

---

### T2-03 — Books listing with paging/filter

**`dto/request/BookFilterRequest.java`**
```
String categorySlug;
Long authorId;
BigDecimal minPrice, maxPrice;
String language;
String format;          // PAPERBACK, EBOOK, HARDCOVER
String sortBy;          // PRICE_ASC, PRICE_DESC, RATING, NEWEST, RELEVANCE
String keyword;
int page = 0, size = 20;
```

**`repository/spec/BookSpecification.java`**  
Xây `Specification<BookEntity>` dynamic từ filter:
```java
public static Specification<BookEntity> withFilter(BookFilterRequest f) {
    return Specification.where(hasCategory(f.categorySlug))
        .and(hasAuthor(f.authorId))
        .and(priceBetween(f.minPrice, f.maxPrice))
        .and(hasKeyword(f.keyword))
        .and(isActive());
}
```

**Controller**: `GET /api/v1/books?categorySlug=&keyword=&minPrice=&page=0&size=20`

---

### T2-04 — Book detail

**`dto/response/BookDetailResponse.java`**
```
// Tất cả field của BookSummaryResponse, plus:
String description;
String language;
int pageCount;
LocalDate publishedAt;
String publisherName;
List<AuthorResponse> authors;
List<BookVariantResponse> variants;  // price, stock, format, sku
List<String> imageUrls;             // sorted by sortOrder, primary first
List<CategoryResponse> categories;
BookStatsResponse stats;            // avgRating, reviewCount, soldCount
```

**`dto/response/BookVariantResponse.java`** (bắt buộc include `compareAtPrice`):
```java
Long id;
String sku;
String coverType;   // "hard_cover" | "soft_cover" | "digital"
String edition;
BigDecimal price;
BigDecimal compareAtPrice;  // book_variants.compare_at_price — giá gốc để hiện gạch ngang trên FE
int stockQuantity;          // inventory.quantity - inventory.reserved_quantity
boolean isActive;
```
> `compareAtPrice` là giá gốc trước khi giảm; nếu `price < compareAtPrice` → FE hiện badge "Tiết kiệm X%". Null nếu không có giá gốc so sánh.

**`BookServiceImpl.getBySlug(String slug)`**:
- `@EntityGraph` hoặc JPQL JOIN FETCH để load variants, images, authors, categories trong 1 query
- Throw BOOK_NOT_FOUND nếu không tìm thấy hoặc status != ACTIVE

**Controller**: `GET /api/v1/books/{slug}`

---

### T3-01 — Provinces/Districts/Wards

**Entities:**  
`entity/ProvinceEntity.java` — `id, name, code, type, sortOrder`  
`entity/DistrictEntity.java` — `id, provinceId, name, code, type`  
`entity/WardEntity.java` — `id, districtId, name, code, type`

**Controller** (`ShippingController`):
```
GET /api/v1/shipping/provinces
GET /api/v1/shipping/provinces/{provinceId}/districts
GET /api/v1/shipping/districts/{districtId}/wards
```
> Cache response bằng `@Cacheable` (P0 có thể dùng in-memory Caffeine hoặc ConcurrentHashMap)

---

### T3-02 — User Addresses

**`entity/UserAddressEntity.java`**
```
id, userId (FK), recipientName, phone, provinceId, districtId, wardId,
streetAddress, label (HOME/WORK/OTHER), isDefault, createdAt, updatedAt
```

**`service/impl/AddressServiceImpl.java`**

`setDefault(userId, addressId)`:
```
@Transactional:
  1. UPDATE SET is_default=false WHERE userId=... AND is_default=true
  2. UPDATE SET is_default=true WHERE id=addressId AND userId=...
```

**Controller** (`AddressController`):
```
GET    /api/v1/me/addresses
POST   /api/v1/me/addresses
PUT    /api/v1/me/addresses/{id}
DELETE /api/v1/me/addresses/{id}
PATCH  /api/v1/me/addresses/{id}/set-default
```

---

### T3-03 — Get Cart & T3-04 — Cart CRUD

**Entities:**

`entity/CartEntity.java` — `id, userId (unique FK), updatedAt`

`entity/CartItemEntity.java` — `id, cartId (FK), variantId (FK), quantity, addedAt`

**`service/impl/CartServiceImpl.java`**

`getCart(Long userId)`:
- Load cart + items + JOIN variant → book info + price
- Return CartResponse với từng item: variantId, bookTitle, format, unitPrice, qty, subtotal, coverImageUrl
- Cộng dồn `cartTotal`

`addItem(userId, variantId, qty)`:
1. Load variant → check status active + stock >= qty
2. Load/create cart for user
3. Nếu cartItem với variantId đã tồn tại: `qty += qty`, re-check stock cap
4. Save CartItemEntity

`updateItem(userId, cartItemId, qty)`:
1. Load cartItem, verify belongs to user's cart
2. Load variant → check stock >= qty
3. Update quantity (qty=0 → remove)

`removeItem(userId, cartItemId)`: delete

`clearCart(userId)`: delete all items of user's cart

**Controller** (`CartController`):
```
GET    /api/v1/me/cart
POST   /api/v1/me/cart/items
PUT    /api/v1/me/cart/items/{id}
DELETE /api/v1/me/cart/items/{id}
DELETE /api/v1/me/cart
```

---

### T3-05 — Shipping estimate

**`dto/request/ShippingEstimateRequest.java`**
```
Long addressId;
List<{variantId, quantity}> items;
```

**`dto/response/ShippingOptionResponse.java`**
```
String carrierId, carrierName;
BigDecimal fee;
int estimatedDays;
```

**`service/impl/ShippingServiceImpl.java`**:
- P0: implement rule-based (flat fee + weight-based zone table) thay vì gọi external API
- Inject `ShippingCarrierRepository` nếu carriers được lưu DB

**Controller**: `POST /api/v1/shipping/estimate`

---

### T3-06 — Create Order (COD path) ⭐ Phức tạp nhất P0

**Entities:**

`entity/enums/OrderStatus.java`
```
PENDING_PAYMENT, PROCESSING, CONFIRMED, SHIPPING,
DELIVERED, COMPLETED, CANCELLED, REFUNDED
```

`entity/enums/PaymentMethod.java` — `COD, VNPAY, MOMO`

`entity/enums/PaymentStatus.java` — `UNPAID, PENDING, PAID, FAILED, REFUNDED`

`entity/OrderEntity.java` — `@Table(name="orders")`
```
id, userId (FK), status (OrderStatus), paymentMethod, paymentStatus,
shippingFee, subtotal, discountAmount, total,
shippingAddressSnapshot (TEXT/JSON — snapshot tại thời điểm tạo),
carrierId, carrierName, estimatedDays,
notes, cancelReason,
createdAt, updatedAt
```

`entity/OrderItemEntity.java` — `@Table(name="order_items")`
```
id, orderId (FK), variantId (FK), bookTitle (snapshot),
sku (snapshot), unitPrice (snapshot — KHÔNG dùng live price),
quantity, subtotal, isReviewed (boolean default false)
```

`entity/OrderStatusHistoryEntity.java` — `@Table(name="order_status_history")`
```
id, orderId (FK), status (OrderStatus), note, changedBy (userId or 'system'),
changedAt
```

**`dto/request/CreateOrderRequest.java`**
```
Long addressId;
String carrierId;
List<OrderItemRequest> items;   // {variantId, quantity}
String notes;
PaymentMethod paymentMethod;    // COD hoặc ONLINE
Long voucherId;                 // nullable
```

**`service/impl/OrderServiceImpl.java`**

`createOrder(Long userId, CreateOrderRequest req)` — `@Transactional(isolation = REPEATABLE_READ)`:

```
1. Load + validate address (phải thuộc userId)
2. For each item in req.items:
   a. Lock variant: SELECT * FROM book_variants WHERE id=? FOR UPDATE
   b. Check variant.stock >= req.quantity → throw INSUFFICIENT_STOCK nếu thiếu
3. Load user để snapshot email/name nếu cần
4. Snapshot address → JSON string (ObjectMapper.writeValueAsString)
5. For each item: snapshot title, sku, unitPrice từ variant (KHÔNG gọi live price sau khi lock)
6. Tính subtotal = Σ(unitPrice × qty)
7. Tính shippingFee từ ShippingService
8. Áp dụng voucher nếu có (validate → tính discountAmount; consume ở T4-02)
9. total = subtotal + shippingFee - discountAmount
10. Save OrderEntity (status = PROCESSING nếu COD, PENDING_PAYMENT nếu ONLINE)
11. Save List<OrderItemEntity>
12. Save OrderStatusHistoryEntity (status = trạng thái ban đầu, changedBy = userId)
13. Deduct stock: variant.stock -= qty cho từng item (đã lock ở bước 2)
14. Clear cart: CartService.removeItemsByVariantIds(userId, variantIds)
15. Return OrderResponse
```

**`service/impl/InventoryServiceImpl.java`**:
- `releaseReservation(Long variantId, int qty)`: `variant.stock += qty` (gọi khi cancel)
- Dùng `@Transactional` và lock khi cần

**Repositories:**
```java
OrderRepository: findByIdAndUserId(), findByUserIdOrderByCreatedAtDesc()
OrderItemRepository: findByOrderId()
OrderStatusHistoryRepository: findByOrderIdOrderByChangedAtAsc()
```

**Controller**: `POST /api/v1/orders`

---

### T3-07 — Customer Order list/detail

**`dto/response/OrderDetailResponse.java`**
```
// Tất cả field OrderSummaryResponse, plus:
List<OrderItemDetailResponse> items;   // bookTitle, sku, unitPrice, qty, subtotal, isReviewed
List<OrderStatusHistoryResponse> history;
String shippingAddressSnapshot;        // JSON string hoặc parse ra AddressDTO
```

**`OrderServiceImpl`**:
- `getOrders(userId, Pageable)` → `PageResponse<OrderSummaryResponse>`
- `getOrderDetail(userId, orderId)` → load order + verify userId match + load items + history

**Controller**:
```
GET /api/v1/me/orders          ?page=0&size=10&status=
GET /api/v1/me/orders/{id}
```

---

### T3-08 — Cancel Order

**`OrderServiceImpl.cancelOrder(Long userId, Long orderId, String reason)`** — `@Transactional`:
```
1. Load order → verify userId match → throw ORDER_NOT_FOUND nếu không khớp
2. Check status IN [PROCESSING, CONFIRMED] → throw ORDER_CANNOT_CANCEL nếu đã SHIPPING/DELIVERED/COMPLETED
3. Update order.status = CANCELLED, order.cancelReason = reason
4. Add OrderStatusHistory entry (changedBy = userId)
5. For each OrderItem: InventoryService.releaseReservation(variantId, quantity)
6. If order.paymentStatus == PAID (online payment): queue refund job (P1 topic)
```

**`dto/request/CancelOrderRequest.java`**: `@NotBlank String reason`

**Controller**: `POST /api/v1/me/orders/{id}/cancel`

---

### Thứ tự tạo entity an toàn (tránh FK violation khi JPA DDL)

```
1.  UserEntity               (không FK nào)
2.  OtpCodeEntity            (FK → users)
3.  RefreshTokenEntity       (FK → users)
4.  CategoryEntity           (self-ref parentId)
5.  AuthorEntity             (không FK)
6.  BookEntity               (FK → publisher nếu có)
7.  BookVariantEntity        (FK → books)
8.  BookImageEntity          (FK → books)
9.  BookAuthorEntity         (FK → books + authors)
10. ProvinceEntity, DistrictEntity, WardEntity
11. UserAddressEntity        (FK → users + provinces + districts + wards)
12. CartEntity               (FK → users)
13. CartItemEntity           (FK → carts + book_variants)
14. OrderEntity              (FK → users)
15. OrderItemEntity          (FK → orders + book_variants)
16. OrderStatusHistoryEntity (FK → orders)
```

---

### Config cần bổ sung trong `application.yaml`

```yaml
# JWT
jwt:
  private-key-path: classpath:keys/private.pem
  public-key-path: classpath:keys/public.pem
  access-token-expiry: 3600        # 1 hour
  refresh-token-expiry: 2592000    # 30 days

# Spring Mail
spring:
  mail:
    host: smtp.gmail.com
    port: 587
    username: ${MAIL_USERNAME}
    password: ${MAIL_PASSWORD}
    properties.mail.smtp:
      auth: true
      starttls.enable: true

# Async (cho EmailService)
spring:
  task:
    execution:
      pool:
        core-size: 5
        max-size: 20
```

---

### Annotations quan trọng cần nhớ

| Situation | Annotation |
|---|---|
| Mỗi method ghi DB | `@Transactional` |
| Tạo order + deduct stock | `@Transactional(isolation = Isolation.REPEATABLE_READ)` |
| Gửi email async | `@Async` trên method EmailService |
| Config async | `@EnableAsync` trên `@Configuration` class |
| Audit createdAt/updatedAt | `@EnableJpaAuditing` + `@EntityListeners(AuditingEntityListener.class)` |
| Lock row khỏi race condition | `@Lock(LockModeType.PESSIMISTIC_WRITE)` trên repository method |
| Cache tỉnh/thành | `@Cacheable("provinces")` + `@EnableCaching` |

---

## �📁 File Liên Quan

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
