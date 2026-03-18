# Cấu trúc Database BookStore

Dưới đây là tài liệu chi tiết về cấu trúc của 38 bảng trong cơ sở dữ liệu `bookstore`, bao gồm các thuộc tính, tên cột và giải thích mối quan hệ (Foreign Key) giữa các bảng. Tài liệu được tổng hợp từ 3 file: `create_tables.sql`, `database_optimizations.sql`, và `wishlist_enhancements.sql`.

## 1. User Management (Quản lý người dùng)

### 1.1. `customer_tiers` (Cấp bậc khách hàng)
- **id** (BIGINT): Khóa chính
- **name** (VARCHAR): Tên cấp bậc (Bạc, Vàng, Kim Cương...)
- **min_spent** (DECIMAL): Mức chi tiêu tối thiểu để đạt cấp
- **discount_percent** (TINYINT): Tỷ lệ giảm giá tương ứng
- **benefits** (TEXT): Quyền lợi
- **created_at** (DATETIME): Ngày tạo

### 1.2. `users` (Khách hàng)
- **id** (BIGINT): Khóa chính
- **email**, **phone** (VARCHAR): Thông tin liên hệ
- **password_hash** (VARCHAR): Mật khẩu
- **full_name** (VARCHAR): Họ và tên
- **avatar_url** (VARCHAR): Ảnh đại diện
- **date_of_birth** (DATE), **gender** (ENUM): Ngày sinh, giới tính
- **tier_id** (BIGINT): Cấp bậc (Khóa ngoại tham chiếu `customer_tiers.id`)
- **total_spent** (DECIMAL): Tổng chi tiêu
- **reward_points** (INT): Điểm thưởng tích lũy
- **status** (ENUM): Trạng thái (active, inactive, banned)
- **email_verified_at**, **phone_verified_at**, **last_login_at**, **created_at**, **updated_at**, **deleted_at** (DATETIME): Các mốc thời gian.

### 1.3. `admins` (Quản trị viên)
- **id** (BIGINT): Khóa chính
- **email**, **password_hash**, **full_name**, **avatar_url**
- **role** (ENUM): Vai trò (super_admin, admin, staff)
- **permissions** (JSON): Phân quyền chi tiết
- **is_active** (TINYINT), **last_login_at**, **created_at**, **updated_at**

### 1.4. `otp_codes` (Mã OTP)
- **id** (BIGINT): Khóa chính
- **user_id** (BIGINT): Khóa ngoại tham chiếu `users.id`
- **email**, **phone**, **code**, **type**, **expires_at**, **is_used**, **created_at**

### 1.5. `refresh_tokens` (Refresh Token)
- **id** (BIGINT): Khóa chính
- **user_id** (BIGINT): Khóa ngoại tham chiếu `users.id`
- **token_hash** (CHAR): Hash SHA-256 của refresh token
- **expires_at**, **revoked_at**, **created_at**

---

## 2. Address & Location (Địa chỉ & Khu vực)

### 2.1. `provinces` (Tỉnh/Thành phố)
- **code** (VARCHAR): Khóa chính
- **name** (VARCHAR), **full_name** (VARCHAR), **type** (ENUM)

### 2.2. `districts` (Quận/Huyện)
- **code** (VARCHAR): Khóa chính
- **province_code** (VARCHAR): Khóa ngoại tham chiếu `provinces.code`
- **name** (VARCHAR)

### 2.3. `user_addresses` (Địa chỉ khách hàng)
- **id** (BIGINT): Khóa chính
- **user_id** (BIGINT): Khóa ngoại tham chiếu `users.id`
- **recipient_name**, **phone**, **province_code**, **district_code**, **ward**, **street**, **is_default**, **created_at**

---

## 3. Product Catalog (Danh mục & Sản phẩm)

### 3.1. `categories` (Danh mục sản phẩm)
- **id** (BIGINT): Khóa chính
- **name**, **slug**, **level**, **image_url**, **sort_order**, **is_active**, **created_at**, **updated_at**, **deleted_at**
- **parent_id** (BIGINT): Danh mục cha (Khóa ngoại tham chiếu `categories.id`)

### 3.2. `authors` (Tác giả)
- **id** (BIGINT): Khóa chính
- **name**, **slug**, **biography**, **image_url**, **created_at**

### 3.3. `publishers` (Nhà xuất bản)
- **id** (BIGINT): Khóa chính
- **name**, **slug**, **logo_url**, **created_at**

### 3.4. `books` (Thông tin cơ bản sách)
- **id** (BIGINT): Khóa chính
- **category_id** (BIGINT): Khóa ngoại tham chiếu `categories.id`
- **publisher_id** (BIGINT): Khóa ngoại tham chiếu `publishers.id`
- **title**, **slug**, **isbn**, **publication_year**, **pages**, **dimensions**, **weight_grams**, **cover_type**, **language**, **description**, **base_price**, **avg_rating**, **review_count**, **sold_count**, **view_count**, **is_active**, **is_featured**, **created_at**, **updated_at**, **deleted_at**

### 3.5. `book_authors` (Cầu nối Sách và Tác giả)
- **book_id** (BIGINT): Khóa ngoại tham chiếu `books.id`
- **author_id** (BIGINT): Khóa ngoại tham chiếu `authors.id`
- **is_primary** (TINYINT)

### 3.6. `book_images` (Thư viện ảnh của sách)
- **id** (BIGINT): Khóa chính
- **book_id** (BIGINT): Khóa ngoại tham chiếu `books.id`
- **image_url**, **alt_text**, **is_primary**, **sort_order**, **created_at**

### 3.7. `book_variants` (SKU - Phiên bản bìa/Sách rời)
- **id** (BIGINT): Khóa chính
- **book_id** (BIGINT): Khóa ngoại tham chiếu `books.id`
- **publisher_id** (BIGINT): Khóa ngoại tham chiếu `publishers.id`
- **sku**, **cover_type**, **edition**, **price**, **compare_at_price**, **cover_image_url**, **thumbnail_url**, **is_active**, **created_at**, **updated_at**

---

## 4. Inventory & Price History (Kho chứa & Lịch sử giá)

### 4.1. `inventory` (Tồn kho của SKU)
- **variant_id** (BIGINT): Khóa chính (Khóa ngoại tham chiếu `book_variants.id`)
- **quantity**, **reserved_quantity**, **min_stock_level**, **last_restocked_at**, **updated_at**

### 4.2. `inventory_history` (Lịch sử nhập/xuất/điều chỉnh kho)
- **id** (BIGINT): Khóa chính
- **variant_id** (BIGINT): Khóa ngoại tham chiếu `book_variants.id`
- **type**, **quantity_change**, **quantity_after**, **reference_type**, **reference_id**, **note**
- **created_by** (BIGINT): Khóa ngoại tham chiếu `admins.id`
- **created_at**

### 4.3. `price_history` (Lịch sử thay đổi giá)
- **id** (BIGINT): Khóa chính
- **variant_id** (BIGINT): Khóa ngoại tham chiếu `book_variants.id`
- **old_price**, **new_price**, **changed_by**, **reason**, **created_at**

---

## 5. Carts & Wishlist (Giỏ hàng & Danh sách yêu thích)

### 5.1. `carts` (Giỏ hàng)
- **id** (BIGINT): Khóa chính
- **user_id** (BIGINT): Khóa ngoại tham chiếu `users.id`
- **variant_id** (BIGINT): Khóa ngoại tham chiếu `book_variants.id`
- **quantity**, **created_at**, **updated_at**

### 5.2. `wishlists` (Danh sách mong muốn)
- **id** (BIGINT): Khóa chính
- **user_id** (BIGINT): Khóa ngoại tham chiếu `users.id`
- **book_id** (BIGINT): Khóa ngoại tham chiếu `books.id`
- **added_price** (DECIMAL): Mức giá hiện hành vào thời điểm được lưu (sử dụng để thông báo giảm giá)
- **notify_on_price_drop** (TINYINT): Cờ bật tắt thông báo
- **priority** (TINYINT): Mức ưu tiên
- **created_at**

---

## 6. Promotions (Khuyến mãi)

### 6.1. `flash_sales` (Chiến dịch Flash Sale)
- **id** (BIGINT): Khóa chính
- **name**, **description**, **start_time**, **end_time**, **is_active**, **created_at**, **updated_at**

### 6.2. `flash_sale_items` (Sản phẩm trong Flash Sale)
- **id** (BIGINT): Khóa chính
- **flash_sale_id** (BIGINT): Khóa ngoại tham chiếu `flash_sales.id`
- **variant_id** (BIGINT): Khóa ngoại tham chiếu `book_variants.id`
- **sale_price**, **quantity_limit**, **per_user_limit**, **sold_count**, **created_at**

### 6.3. `vouchers` (Mã giảm giá/Coupon)
- **id** (BIGINT): Khóa chính
- **code**, **name**, **description**, **discount_type**, **discount_value**, **max_discount**, **min_order_value**, **usage_limit**, **used_count**, **per_user_limit**, **start_date**, **end_date**, **is_active**, **created_at**, **updated_at**

### 6.4. `voucher_usage` (Lịch sử sử dụng Voucher)
- **id** (BIGINT): Khóa chính
- **voucher_id** (BIGINT): Khóa ngoại tham chiếu `vouchers.id`
- **user_id** (BIGINT): Khóa ngoại tham chiếu `users.id`
- **order_id** (BIGINT): Khóa ngoại tham chiếu `orders.id`
- **discount_amount**, **used_at**

### 6.5. `promotions` (Chương trình khuyến mãi lớn)
- **id** (BIGINT): Khóa chính
- **name**, **description**, **type**, **discount_percent**, **buy_quantity**, **get_quantity**, **bundle_min_quantity**, **bundle_discount_percent**, **combo_price**, **start_date**, **end_date**, **is_active**, **created_at**, **updated_at**

### 6.6. `promotion_books` (Đầu sách áp dụng trong Chương trình khuyến mãi)
- **id** (BIGINT): Khóa chính
- **promotion_id** (BIGINT): Khóa ngoại tham chiếu `promotions.id`
- **book_id** (BIGINT): Khóa ngoại tham chiếu `books.id`
- **is_gift**, **sort_order**, **created_at**

---

## 7. Shipping (Giao hàng)

### 7.1. `shipping_carriers` (Nhà vận chuyển/GHTK, GHN..)
- **id** (BIGINT): Khóa chính
- **name**, **code**, **logo_url**, **api_endpoint**, **api_key**, **is_active**, **created_at**, **updated_at**

### 7.2. `shipping_rates` (Bảng chi phí giao hàng)
- **id** (BIGINT): Khóa chính
- **carrier_id** (BIGINT): Khóa ngoại tham chiếu `shipping_carriers.id`
- **province_code**, **province_name**, **base_fee**, **per_kg_fee**, **per_500g_fee**, **free_ship_threshold**, **estimated_days_min**, **estimated_days_max**, **is_active**, **created_at**, **updated_at**

---

## 8. Orders & Payments (Đơn hàng & Thanh toán)

### 8.1. `orders` (Đơn hàng)
- **id** (BIGINT): Khóa chính
- **order_code**
- **user_id** (BIGINT): Khóa ngoại tham chiếu `users.id`
- **voucher_id** (BIGINT): Khóa ngoại tham chiếu `vouchers.id`
- **carrier_id** (BIGINT): Khóa ngoại tham chiếu `shipping_carriers.id`
- **subtotal**, **shipping_fee**, **discount_amount**, **points_used**, **points_discount**, **total_amount**, **payment_method**, **payment_status**, **status**
- **shipping_address**, **recipient_name**, **recipient_phone**, **tracking_number**, **note**
- **shipped_at**, **delivered_at**, **completed_at**, **cancelled_at**, **cancel_reason**
- **created_at**, **updated_at**, **deleted_at**

### 8.2. `order_items` (Chi tiết của từng mặt hàng trong Đơn)
- **id** (BIGINT): Khóa chính
- **order_id** (BIGINT): Khóa ngoại tham chiếu `orders.id`
- **variant_id** (BIGINT): Khóa ngoại tham chiếu `book_variants.id`
- **promotion_id** (BIGINT): Khóa ngoại tham chiếu `promotions.id`
- **quantity**, **unit_price**, **discount_amount**, **subtotal**, **is_gift**, **is_reviewed**, **created_at**

### 8.3. `order_status_history` (Lưu vết thay đổi trạng thái Đơn hàng)
- **id** (BIGINT): Khóa chính
- **order_id** (BIGINT): Khóa ngoại tham chiếu `orders.id`
- **old_status**, **new_status**, **note**
- **changed_by** (BIGINT): Khóa ngoại tham chiếu `admins.id`
- **created_at**

### 8.4. `refunds` (Hoàn tiền / Đổi trả sách)
- **id** (BIGINT): Khóa chính
- **order_id** (BIGINT): Khóa ngoại tham chiếu `orders.id`
- **order_item_id** (BIGINT): Khóa ngoại tham chiếu `order_items.id`
- **type**, **reason**, **description**, **images**, **refund_amount**, **status**, **admin_note**
- **processed_by** (BIGINT): Khóa ngoại tham chiếu `admins.id`
- **created_at**, **processed_at**, **completed_at**

### 8.5. `payments` (Lưu vết Giao dịch từ Đối tác Thanh toán)
- **id** (BIGINT): Khóa chính
- **order_id** (BIGINT): Khóa ngoại tham chiếu `orders.id`
- **method**, **transaction_id**, **amount**, **status**, **gateway_response**, **installment_months**, **installment_bank**, **paid_at**, **created_at**, **updated_at**

---

## 9. Rewards & Loyalty (Tích lũy thẻ thành viên)

### 9.1. `reward_points` (Điểm thưởng chi tiết)
- **id** (BIGINT): Khóa chính
- **user_id** (BIGINT): Khóa ngoại tham chiếu `users.id`
- **points**, **type**, **reference_type**, **reference_id**, **description**, **expires_at**, **created_at**

### 9.2. `loyalty_transactions` (Lịch sử giao dịch điểm thẻ)
- **id** (BIGINT): Khóa chính
- **user_id** (BIGINT): Khóa ngoại tham chiếu `users.id`
- **transaction_type**, **points_amount**, **points_balance_after**, **reference_type**, **reference_id**, **description**, **created_at**

---

## 10. Reviews & Interactive (Đánh giá & AI Recommendations)

### 10.1. `reviews` (Đánh giá sản phẩm)
- **id** (BIGINT): Khóa chính
- **user_id** (BIGINT): Khóa ngoại tham chiếu `users.id`
- **book_id** (BIGINT): Khóa ngoại tham chiếu `books.id`
- **order_item_id** (BIGINT): Khóa ngoại tham chiếu `order_items.id`
- **rating**, **title**, **comment**, **pros**, **cons**, **is_verified**, **is_visible**, **helpful_count**, **created_at**, **updated_at**

### 10.2. `review_images` (Hình ảnh trong đánh giá)
- **id** (BIGINT): Khóa chính
- **review_id** (BIGINT): Khóa ngoại tham chiếu `reviews.id`
- **image_url**, **sort_order**, **created_at**

### 10.3. `notifications` (Thông báo tới Người dùng)
- **id** (BIGINT): Khóa chính
- **user_id** (BIGINT): Khóa ngoại tham chiếu `users.id`
- **title**, **content**, **type**, **reference_type**, **reference_id**, **is_read**, **is_email_sent**, **read_at**, **created_at**

### 10.4. `user_book_interactions` (Tương tác sách hỗ trợ cho AI/Recommendation Engine)
- **id** (BIGINT): Khóa chính
- **user_id** (BIGINT): Khóa ngoại tham chiếu `users.id`
- **book_id** (BIGINT): Khóa ngoại tham chiếu `books.id`
- **interaction_type**, **interaction_count**, **last_interaction_at**, **created_at**
