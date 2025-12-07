# Tài liệu Database BookStore

## Tổng quan

Database BookStore gồm **26 bảng** được thiết kế cho website TMĐT bán sách online, chia thành 12 nhóm chức năng.

---

## 1. User Management (4 bảng)

### `customer_tiers`
**Chức năng**: Quản lý cấp bậc thành viên VIP (Bạc, Vàng, Kim cương)

| Cột | Mô tả |
|-----|-------|
| `min_spent` | Tổng chi tiêu tối thiểu để đạt cấp |
| `discount_percent` | % giảm giá cho cấp bậc |
| `benefits` | Mô tả quyền lợi |

---

### `users`
**Chức năng**: Lưu thông tin khách hàng đăng ký

| Cột quan trọng | Mô tả |
|----------------|-------|
| `email` / `phone` | Đăng nhập bằng email hoặc SĐT |
| `tier_id` | Cấp bậc VIP hiện tại |
| `total_spent` | Tổng chi tiêu (để tính tier) |
| `reward_points` | Điểm thưởng tích lũy |
| `status` | active / inactive / banned |

**Quan hệ**:
- `tier_id` → `customer_tiers.id`

---

### `admins`
**Chức năng**: Quản lý tài khoản admin và nhân viên

| Cột quan trọng | Mô tả |
|----------------|-------|
| `role` | super_admin / admin / staff |
| `permissions` | JSON chứa quyền chi tiết |

---

### `otp_codes`
**Chức năng**: Lưu mã OTP xác thực (đăng ký, quên mật khẩu, xác thực email/phone)

| Cột quan trọng | Mô tả |
|----------------|-------|
| `type` | register / reset_password / verify_email / verify_phone |
| `expires_at` | Thời điểm hết hạn |
| `is_used` | Đã sử dụng chưa |

**Quan hệ**:
- `user_id` → `users.id`

---

## 2. Product Catalog (8 bảng)

### `categories`
**Chức năng**: Danh mục sách đa cấp (cha → con → cháu)

| Cột quan trọng | Mô tả |
|----------------|-------|
| `parent_id` | Self-reference đến danh mục cha |
| `level` | 0 = gốc, 1 = con, 2 = cháu |
| `slug` | URL-friendly name |

**Quan hệ**:
- `parent_id` → `categories.id` (self-reference)

---

### `authors`
**Chức năng**: Lưu thông tin tác giả sách

| Cột quan trọng | Mô tả |
|----------------|-------|
| `biography` | Tiểu sử tác giả |
| `slug` | URL-friendly name |

---

### `publishers`
**Chức năng**: Lưu thông tin nhà xuất bản

| Cột quan trọng | Mô tả |
|----------------|-------|
| `name` | Tên NXB (unique) |
| `address`, `phone`, `email` | Thông tin liên hệ |

---

### `books`
**Chức năng**: Thông tin sách chính (master data)

| Cột quan trọng | Mô tả |
|----------------|-------|
| `title`, `isbn` | Tiêu đề và mã ISBN |
| `pages`, `dimensions`, `weight_grams` | Thông số vật lý |
| `cover_type` | soft / hard |
| `description` | Mô tả chi tiết (FULLTEXT search) |
| `base_price` | Giá gốc |
| `avg_rating`, `review_count` | Thống kê đánh giá |
| `sold_count` | Số lượng đã bán |

**Quan hệ**:
- `category_id` → `categories.id`
- `publisher_id` → `publishers.id`

---

### `book_authors`
**Chức năng**: Quan hệ N-N giữa sách và tác giả (1 sách có nhiều tác giả)

| Cột quan trọng | Mô tả |
|----------------|-------|
| `is_primary` | Đánh dấu tác giả chính |

**Quan hệ**:
- `book_id` → `books.id`
- `author_id` → `authors.id`

---

### `book_variants`
**Chức năng**: Variant sách (mỗi SKU riêng cho bìa/NXB/giá khác nhau)

| Cột quan trọng | Mô tả |
|----------------|-------|
| `sku` | Mã SKU duy nhất |
| `cover_type` | soft / hard |
| `edition` | Phiên bản (Tái bản lần X) |
| `price` | Giá bán |
| `compare_at_price` | Giá gốc (để gạch) |

**Quan hệ**:
- `book_id` → `books.id`
- `publisher_id` → `publishers.id`

---

### `book_images`
**Chức năng**: Nhiều ảnh cho mỗi sách

| Cột quan trọng | Mô tả |
|----------------|-------|
| `is_primary` | Ảnh chính hiển thị |
| `sort_order` | Thứ tự sắp xếp |

**Quan hệ**:
- `book_id` → `books.id`

---

### `price_history`
**Chức năng**: Lịch sử thay đổi giá theo variant

| Cột quan trọng | Mô tả |
|----------------|-------|
| `old_price`, `new_price` | Giá trước/sau |
| `changed_by` | Admin thực hiện |
| `reason` | Lý do thay đổi |

**Quan hệ**:
- `variant_id` → `book_variants.id`
- `changed_by` → `admins.id`

---

## 3. Inventory (2 bảng)

### `inventory`
**Chức năng**: Tồn kho theo từng variant

| Cột quan trọng | Mô tả |
|----------------|-------|
| `quantity` | Số lượng tồn kho |
| `reserved_quantity` | Số lượng đã đặt (chờ thanh toán) |
| `min_stock_level` | Mức tồn kho tối thiểu (cảnh báo) |

**Quan hệ**:
- `variant_id` → `book_variants.id` (1-1)

---

### `inventory_history`
**Chức năng**: Lịch sử nhập/xuất/điều chỉnh kho

| Cột quan trọng | Mô tả |
|----------------|-------|
| `type` | in / out / adjust / reserve / release |
| `quantity_change` | Số lượng thay đổi (+/-) |
| `quantity_after` | Tồn kho sau thay đổi |
| `reference_type`, `reference_id` | Liên kết đến đơn hàng/phiếu |

**Quan hệ**:
- `variant_id` → `book_variants.id`
- `created_by` → `admins.id`

---

## 4. Shipping (2 bảng)

### `shipping_carriers`
**Chức năng**: Đơn vị vận chuyển (GHTK, GHN, Viettel Post, J&T)

| Cột quan trọng | Mô tả |
|----------------|-------|
| `code` | Mã đơn vị (GHTK, GHN, VTP, JT) |
| `api_endpoint`, `api_key` | Kết nối API |

---

### `shipping_rates`
**Chức năng**: Bảng phí ship theo tỉnh và trọng lượng

| Cột quan trọng | Mô tả |
|----------------|-------|
| `province_code`, `province_name` | Mã và tên tỉnh |
| `base_fee` | Phí cơ bản |
| `per_kg_fee`, `per_500g_fee` | Phí theo trọng lượng |
| `free_ship_threshold` | Ngưỡng freeship |
| `estimated_days_min/max` | Thời gian giao dự kiến |

**Quan hệ**:
- `carrier_id` → `shipping_carriers.id`

---

## 5. Cart & Wishlist (2 bảng)

### `carts`
**Chức năng**: Giỏ hàng của khách

| Cột quan trọng | Mô tả |
|----------------|-------|
| `quantity` | Số lượng |

**Quan hệ**:
- `user_id` → `users.id`
- `variant_id` → `book_variants.id`

---

### `wishlists`
**Chức năng**: Danh sách yêu thích

**Quan hệ**:
- `user_id` → `users.id`
- `book_id` → `books.id`

---

## 6. Promotions (6 bảng)

### `flash_sales`
**Chức năng**: Flash sale theo khung giờ

| Cột quan trọng | Mô tả |
|----------------|-------|
| `start_time`, `end_time` | Khung thời gian |

---

### `flash_sale_items`
**Chức năng**: Sản phẩm trong flash sale

| Cột quan trọng | Mô tả |
|----------------|-------|
| `sale_price` | Giá flash sale |
| `quantity_limit` | Giới hạn số lượng |
| `per_user_limit` | Giới hạn mỗi user |
| `sold_count` | Đã bán |

**Quan hệ**:
- `flash_sale_id` → `flash_sales.id`
- `variant_id` → `book_variants.id`

---

### `vouchers`
**Chức năng**: Mã giảm giá / voucher

| Cột quan trọng | Mô tả |
|----------------|-------|
| `code` | Mã voucher |
| `discount_type` | percent / fixed |
| `discount_value` | Giá trị giảm |
| `max_discount` | Giảm tối đa (cho %) |
| `min_order_value` | Đơn tối thiểu |
| `usage_limit`, `per_user_limit` | Giới hạn sử dụng |

---

### `voucher_usage`
**Chức năng**: Lịch sử sử dụng voucher

**Quan hệ**:
- `voucher_id` → `vouchers.id`
- `user_id` → `users.id`
- `order_id` → `orders.id`

---

### `promotions`
**Chức năng**: Chương trình khuyến mãi đa dạng

| Cột quan trọng | Mô tả |
|----------------|-------|
| `type` | percent / buy_x_get_y / combo / bundle_discount |
| `discount_percent` | Giảm % |
| `buy_quantity`, `get_quantity` | Mua X tặng Y |
| `bundle_min_quantity`, `bundle_discount_percent` | Mua N giảm % |
| `combo_price` | Giá combo cố định |

---

### `promotion_books`
**Chức năng**: Sách áp dụng khuyến mãi

| Cột quan trọng | Mô tả |
|----------------|-------|
| `is_gift` | Là sách tặng (buy_x_get_y) |

**Quan hệ**:
- `promotion_id` → `promotions.id`
- `book_id` → `books.id`

---

## 7. Orders (4 bảng)

### `orders`
**Chức năng**: Đơn hàng

| Cột quan trọng | Mô tả |
|----------------|-------|
| `order_code` | Mã đơn hàng |
| `subtotal`, `shipping_fee`, `discount_amount`, `total_amount` | Tiền |
| `points_used`, `points_discount` | Dùng điểm thưởng |
| `payment_method` | cod / bank_transfer / momo / zalopay / vnpay / credit_card / installment |
| `payment_status` | pending / paid / failed / refunded |
| `status` | pending → confirmed → processing → shipping → delivered → completed |
| `tracking_number` | Mã vận đơn |

**Quan hệ**:
- `user_id` → `users.id`
- `voucher_id` → `vouchers.id`
- `carrier_id` → `shipping_carriers.id`

---

### `order_items`
**Chức năng**: Chi tiết đơn hàng (từng sản phẩm)

| Cột quan trọng | Mô tả |
|----------------|-------|
| `unit_price` | Giá tại thời điểm mua |
| `discount_amount` | Giảm giá |
| `is_gift` | Là quà tặng |
| `is_reviewed` | Đã đánh giá chưa |

**Quan hệ**:
- `order_id` → `orders.id`
- `variant_id` → `book_variants.id`
- `promotion_id` → `promotions.id`

---

### `order_status_history`
**Chức năng**: Lịch sử thay đổi trạng thái đơn hàng

| Cột quan trọng | Mô tả |
|----------------|-------|
| `old_status`, `new_status` | Trạng thái cũ/mới |
| `note` | Ghi chú |

**Quan hệ**:
- `order_id` → `orders.id`
- `changed_by` → `admins.id`

---

### `refunds`
**Chức năng**: Hoàn tiền / trả hàng / khiếu nại

| Cột quan trọng | Mô tả |
|----------------|-------|
| `type` | refund / return / exchange |
| `reason` | wrong_item / damaged / not_as_described / change_mind / other |
| `images` | JSON ảnh minh chứng |
| `status` | pending → approved/rejected → processing → completed |

**Quan hệ**:
- `order_id` → `orders.id`
- `order_item_id` → `order_items.id`
- `processed_by` → `admins.id`

---

## 8. Payments (1 bảng)

### `payments`
**Chức năng**: Giao dịch thanh toán

| Cột quan trọng | Mô tả |
|----------------|-------|
| `method` | Phương thức thanh toán |
| `transaction_id` | Mã giao dịch từ payment gateway |
| `status` | pending / processing / success / failed / cancelled / refunded |
| `gateway_response` | JSON response từ gateway |
| `installment_months`, `installment_bank` | Thông tin trả góp |

**Quan hệ**:
- `order_id` → `orders.id`

---

## 9. Rewards (2 bảng)

### `reward_points`
**Chức năng**: Tích điểm thưởng

| Cột quan trọng | Mô tả |
|----------------|-------|
| `points` | Số điểm (+/-) |
| `type` | earn / redeem / expire / adjust |
| `reference_type`, `reference_id` | Liên kết (order, review, referral) |
| `expires_at` | Ngày hết hạn điểm |

**Quan hệ**:
- `user_id` → `users.id`

---

### `loyalty_transactions`
**Chức năng**: Giao dịch tích điểm loyalty

| Cột quan trọng | Mô tả |
|----------------|-------|
| `transaction_type` | earn / spend / expire / bonus / refund |
| `points_balance_after` | Số dư sau giao dịch |

**Quan hệ**:
- `user_id` → `users.id`

---

## 10. Reviews (2 bảng)

### `reviews`
**Chức năng**: Đánh giá sản phẩm (chỉ khi đã mua)

| Cột quan trọng | Mô tả |
|----------------|-------|
| `rating` | 1-5 sao |
| `title`, `comment` | Tiêu đề và nội dung |
| `pros`, `cons` | Ưu điểm, nhược điểm |
| `is_verified` | Đã xác thực mua hàng |
| `helpful_count` | Số lượt hữu ích |

**Quan hệ**:
- `user_id` → `users.id`
- `book_id` → `books.id`
- `order_item_id` → `order_items.id` (bắt buộc - chỉ đánh giá khi đã mua)

---

### `review_images`
**Chức năng**: Ảnh trong đánh giá

**Quan hệ**:
- `review_id` → `reviews.id`

---

## 11. Notifications (1 bảng)

### `notifications`
**Chức năng**: Thông báo đến khách hàng (in-app + email)

| Cột quan trọng | Mô tả |
|----------------|-------|
| `type` | order / promotion / system / review / reward |
| `is_read`, `is_email_sent` | Trạng thái |
| `reference_type`, `reference_id` | Liên kết đến đối tượng |

**Quan hệ**:
- `user_id` → `users.id`

---

## 12. Recommendations (1 bảng)

### `user_book_interactions`
**Chức năng**: Lưu tương tác người dùng với sách (cho ML recommendation)

| Cột quan trọng | Mô tả |
|----------------|-------|
| `interaction_type` | view / wishlist / cart / purchase / review |
| `interaction_count` | Số lần tương tác |
| `last_interaction_at` | Lần cuối tương tác |

**Quan hệ**:
- `user_id` → `users.id`
- `book_id` → `books.id`

---

## Sơ đồ quan hệ tổng hợp

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           BOOKSTORE DATABASE RELATIONSHIPS                   │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│ customer_tiers  │◄─────│     users       │─────►│   otp_codes     │
└─────────────────┘      └────────┬────────┘      └─────────────────┘
                                  │
         ┌────────────────────────┼────────────────────────┐
         │                        │                        │
         ▼                        ▼                        ▼
┌─────────────────┐      ┌─────────────────┐      ┌─────────────────┐
│     carts       │      │   wishlists     │      │    orders       │
└────────┬────────┘      └────────┬────────┘      └────────┬────────┘
         │                        │                        │
         │                        │              ┌─────────┼─────────┐
         │                        │              │         │         │
         ▼                        ▼              ▼         ▼         ▼
┌─────────────────┐      ┌─────────────────┐   ┌──────┐ ┌──────┐ ┌──────┐
│  book_variants  │◄─────│     books       │   │order │ │order │ │refunds│
└────────┬────────┘      └────────┬────────┘   │items │ │status│ └──────┘
         │                        │            └──────┘ │hist  │
         │              ┌─────────┼─────────┐          └──────┘
         │              │         │         │
         ▼              ▼         ▼         ▼
┌─────────────────┐ ┌────────┐ ┌────────┐ ┌────────────┐
│   inventory     │ │  book  │ │ book   │ │   book     │
│ + inv_history   │ │authors │ │images  │ │ (category) │
└─────────────────┘ └────────┘ └────────┘ └────────────┘
                         │                       │
                         ▼                       ▼
                    ┌─────────┐           ┌───────────┐
                    │ authors │           │ categories│ (self-ref)
                    └─────────┘           └───────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ PROMOTIONS                                                                   │
├─────────────────┬─────────────────┬─────────────────┬───────────────────────┤
│  flash_sales    │    vouchers     │   promotions    │                       │
│       │         │        │        │        │        │                       │
│       ▼         │        ▼        │        ▼        │                       │
│ flash_sale_items│  voucher_usage  │ promotion_books │                       │
│       │         │        │        │        │        │                       │
│       └─────────┴────────┴────────┴────────┘        │                       │
│                         │                            │                       │
│                         ▼                            │                       │
│              book_variants / orders                  │                       │
└─────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────┐
│ OTHER RELATIONSHIPS                                                          │
├─────────────────────────────────────────────────────────────────────────────┤
│ publishers ──► books, book_variants                                          │
│ shipping_carriers ──► shipping_rates, orders                                 │
│ admins ──► price_history, inventory_history, order_status_history, refunds   │
│ users ──► reviews, notifications, reward_points, loyalty_transactions        │
│ users ──► user_book_interactions                                             │
│ order_items ──► reviews (đánh giá chỉ khi đã mua)                            │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## Bảng tổng hợp Foreign Keys

| Bảng | Foreign Key | Tham chiếu đến |
|------|-------------|----------------|
| `users` | `tier_id` | `customer_tiers.id` |
| `otp_codes` | `user_id` | `users.id` |
| `categories` | `parent_id` | `categories.id` |
| `books` | `category_id` | `categories.id` |
| `books` | `publisher_id` | `publishers.id` |
| `book_authors` | `book_id` | `books.id` |
| `book_authors` | `author_id` | `authors.id` |
| `book_variants` | `book_id` | `books.id` |
| `book_variants` | `publisher_id` | `publishers.id` |
| `book_images` | `book_id` | `books.id` |
| `price_history` | `variant_id` | `book_variants.id` |
| `price_history` | `changed_by` | `admins.id` |
| `inventory` | `variant_id` | `book_variants.id` |
| `inventory_history` | `variant_id` | `book_variants.id` |
| `inventory_history` | `created_by` | `admins.id` |
| `shipping_rates` | `carrier_id` | `shipping_carriers.id` |
| `carts` | `user_id` | `users.id` |
| `carts` | `variant_id` | `book_variants.id` |
| `wishlists` | `user_id` | `users.id` |
| `wishlists` | `book_id` | `books.id` |
| `flash_sale_items` | `flash_sale_id` | `flash_sales.id` |
| `flash_sale_items` | `variant_id` | `book_variants.id` |
| `voucher_usage` | `voucher_id` | `vouchers.id` |
| `voucher_usage` | `user_id` | `users.id` |
| `promotion_books` | `promotion_id` | `promotions.id` |
| `promotion_books` | `book_id` | `books.id` |
| `orders` | `user_id` | `users.id` |
| `orders` | `voucher_id` | `vouchers.id` |
| `orders` | `carrier_id` | `shipping_carriers.id` |
| `order_items` | `order_id` | `orders.id` |
| `order_items` | `variant_id` | `book_variants.id` |
| `order_items` | `promotion_id` | `promotions.id` |
| `order_status_history` | `order_id` | `orders.id` |
| `order_status_history` | `changed_by` | `admins.id` |
| `refunds` | `order_id` | `orders.id` |
| `refunds` | `order_item_id` | `order_items.id` |
| `refunds` | `processed_by` | `admins.id` |
| `payments` | `order_id` | `orders.id` |
| `reward_points` | `user_id` | `users.id` |
| `loyalty_transactions` | `user_id` | `users.id` |
| `reviews` | `user_id` | `users.id` |
| `reviews` | `book_id` | `books.id` |
| `reviews` | `order_item_id` | `order_items.id` |
| `review_images` | `review_id` | `reviews.id` |
| `notifications` | `user_id` | `users.id` |
| `user_book_interactions` | `user_id` | `users.id` |
| `user_book_interactions` | `book_id` | `books.id` |
