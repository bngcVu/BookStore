# Cấu trúc Cơ sở Dữ liệu BookStore

Tài liệu này mô tả chi tiết các bảng và thuộc tính trong cơ sở dữ liệu của hệ thống BookStore, được tổng hợp từ script `create_tables.sql`.

## Tổng quan
Hệ thống bao gồm các nhóm chức năng chính:
1. **User Management**: Quản lý người dùng, admin, cấp bậc thành viên.
2. **Catalog**: Quản lý sách, danh mục, tác giả, nhà xuất bản.
3. **Inventory & Price**: Quản lý kho và lịch sử giá.
4. **Sales & Promotions**: Quản lý đơn hàng, giỏ hàng, khuyến mãi, voucher.
5. **Shipping**: Quản lý vận chuyển.
6. **Social & Interaction**: Quản lý đánh giá, bình luận, thông báo.

---

## 1. User Management

### `customer_tiers` (Cấp bậc khách hàng)
Lưu trữ thông tin về các hạng thành viên (Bạc, Vàng, Kim cương).
| Cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT UNSIGNED | PK, AI | ID cấp bậc |
| `name` | VARCHAR(50) | NOT NULL, UNIQUE | Tên hạng (Ví dụ: Vàng, Bạc) |
| `min_spent` | DECIMAL(15,2) | Default 0 | Số tiền chi tiêu tối thiểu để đạt hạng |
| `discount_percent` | TINYINT UNSIGNED | Default 0 | Phần trăm giảm giá mặc định |
| `benefits` | TEXT | | Mô tả quyền lợi |
| `created_at` | DATETIME | Default NOW | Ngày tạo |

### `users` (Người dùng)
Lưu trữ thông tin khách hàng.
| Cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT UNSIGNED | PK, AI | ID người dùng |
| `email` | VARCHAR(255) | UNIQUE | Email đăng nhập |
| `phone` | VARCHAR(20) | UNIQUE | Số điện thoại |
| `password_hash` | VARCHAR(255) | NOT NULL | Mật khẩu đã mã hóa |
| `full_name` | VARCHAR(100) | NOT NULL | Họ tên đầy đủ |
| `avatar_url` | VARCHAR(500) | | Link ảnh đại diện |
| `date_of_birth` | DATE | | Ngày sinh |
| `gender` | ENUM | 'male','female','other' | Giới tính |
| `tier_id` | BIGINT UNSIGNED | FK -> `customer_tiers` | ID cấp bậc hiện tại |
| `total_spent` | DECIMAL(15,2) | Default 0 | Tổng tiền đã chi tiêu |
| `reward_points` | INT UNSIGNED | Default 0 | Điểm thưởng hiện có |
| `status` | ENUM | Default 'active' | Trạng thái ('active','inactive','banned') |
| `created_at` | DATETIME | Default NOW | Ngày đăng ký |
| `updated_at` | DATETIME | ON UPDATE | Ngày cập nhật |

### `admins` (Quản trị viên)
Lưu trữ thông tin nhân viên và admin.
| Cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT UNSIGNED | PK, AI | ID admin |
| `email` | VARCHAR(255) | UNIQUE, NOT NULL | Email đăng nhập |
| `password_hash` | VARCHAR(255) | NOT NULL | Mật khẩu |
| `full_name` | VARCHAR(100) | NOT NULL | Họ tên |
| `role` | ENUM | Default 'staff' | Vai trò ('super_admin','admin','staff') |
| `permissions` | JSON | | Danh sách quyền hạn chi tiết |
| `is_active` | TINYINT(1) | Default 1 | Trạng thái hoạt động |

### `otp_codes` (Mã OTP)
Lưu trữ mã xác thực OTP.
| Cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT UNSIGNED | PK, AI | ID |
| `user_id` | BIGINT UNSIGNED | FK -> `users` | Người dùng (nếu có) |
| `email` | VARCHAR(255) | | Email nhận OTP |
| `phone` | VARCHAR(20) | | SĐT nhận OTP |
| `code` | VARCHAR(10) | NOT NULL | Mã OTP |
| `type` | ENUM | NOT NULL | Loại ('register','reset_password',...) |
| `expires_at` | DATETIME | NOT NULL | Thời gian hết hạn |
| `is_used` | TINYINT(1) | Default 0 | Đã sử dụng chưa |

---

## 2. Address & Location

### `provinces` (Tỉnh/Thành phố)
| Cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `code` | VARCHAR(10) | PK | Mã tỉnh/thành |
| `name` | VARCHAR(100) | NOT NULL | Tên tỉnh/thành |

### `districts` (Quận/Huyện)
| Cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `code` | VARCHAR(10) | PK | Mã quận/huyện |
| `province_code` | VARCHAR(10) | FK -> `provinces` | Thuộc tỉnh nào |
| `name` | VARCHAR(100) | NOT NULL | Tên quận/huyện |

### `user_addresses` (Địa chỉ khách hàng)
| Cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT UNSIGNED | PK, AI | ID địa chỉ |
| `user_id` | BIGINT UNSIGNED | FK -> `users` | Thuộc về user nào |
| `recipient_name` | VARCHAR(100) | NOT NULL | Tên người nhận |
| `phone` | VARCHAR(20) | NOT NULL | SĐT người nhận |
| `province_code` | VARCHAR(10) | | Mã tỉnh |
| `district_code` | VARCHAR(10) | | Mã huyện |
| `ward` | VARCHAR(100) | NOT NULL | Phường/Xã |
| `street` | TEXT | NOT NULL | Số nhà, tên đường |
| `is_default` | TINYINT(1) | Default 0 | Là địa chỉ mặc định? |

---

## 3. Product Catalog

### `categories` (Danh mục)
| Cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT UNSIGNED | PK, AI | ID danh mục |
| `name` | VARCHAR(100) | NOT NULL | Tên danh mục |
| `slug` | VARCHAR(120) | UNIQUE, NOT NULL | URL friendly |
| `parent_id` | BIGINT UNSIGNED | FK -> `categories` | Danh mục cha |
| `level` | TINYINT UNSIGNED | Default 0 | Cấp độ danh mục |

### `authors` (Tác giả)
| Cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT UNSIGNED | PK, AI | ID tác giả |
| `name` | VARCHAR(150) | NOT NULL | Tên tác giả |
| `biography` | TEXT | | Tiểu sử |

### `publishers` (Nhà xuất bản)
| Cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT UNSIGNED | PK, AI | ID nhà xuất bản |
| `name` | VARCHAR(150) | NOT NULL | Tên NXB |
| `logo_url` | VARCHAR(500) | | Logo |

### `books` (Sách)
Bảng chính lưu thông tin chung của sách.
| Cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT UNSIGNED | PK, AI | ID sách |
| `category_id` | BIGINT UNSIGNED | FK -> `categories` | Danh mục chính |
| `publisher_id` | BIGINT UNSIGNED | FK -> `publishers` | Nhà xuất bản |
| `title` | VARCHAR(300) | NOT NULL | Tên sách |
| `slug` | VARCHAR(350) | UNIQUE | URL friendly |
| `isbn` | VARCHAR(20) | UNIQUE | Mã ISBN |
| `publication_year`| SMALLINT UNSIGNED| | Năm xuất bản |
| `base_price` | DECIMAL(12,2) | NOT NULL | Giá cơ bản (tham khảo) |
| `avg_rating` | DECIMAL(2,1) | Default 0 | Đánh giá trung bình |
| `is_active` | TINYINT(1) | Default 1 | Đang kinh doanh? |

### `book_authors` (Sách - Tác giả)
Bảng trung gian liên kết sách và tác giả (Many-to-Many).
| Cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `book_id` | BIGINT UNSIGNED | PK, FK -> `books` | |
| `author_id` | BIGINT UNSIGNED | PK, FK -> `authors`| |
| `is_primary` | TINYINT(1) | Default 0 | Tác giả chính? |

### `book_variants` (Phiên bản sách/SKU)
Lưu thông tin cụ thể từng phiên bản (Bìa cứng/mềm, tái bản...).
| Cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT UNSIGNED | PK, AI | ID variant |
| `book_id` | BIGINT UNSIGNED | FK -> `books` | Thuộc sách nào |
| `sku` | VARCHAR(50) | UNIQUE | Mã SKU kho |
| `cover_type` | ENUM | 'soft','hard' | Loại bìa |
| `price` | DECIMAL(12,2) | NOT NULL | Giá bán thực tế |
| `compare_at_price`| DECIMAL(12,2) | | Giá gạch (giá gốc) |
| `cover_image_url` | VARCHAR(500) | | Ảnh bìa của bản này |

### `inventory` (Tồn kho)
| Cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `variant_id` | BIGINT UNSIGNED | PK, FK -> `book_variants`| Mã variant |
| `quantity` | INT UNSIGNED | Default 0 | Số lượng thực tế trong kho |
| `reserved_quantity`| INT UNSIGNED | Default 0 | Số lượng đang được giữ (trong đơn hàng chưa xuất) |

---

## 4. Sales & Orders

### `carts` (Giỏ hàng)
| Cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT UNSIGNED | PK, AI | ID |
| `user_id` | BIGINT UNSIGNED | FK -> `users` | Người mua |
| `variant_id` | BIGINT UNSIGNED | FK -> `book_variants`| Sản phẩm |
| `quantity` | INT UNSIGNED | Default 1 | Số lượng |

### `orders` (Đơn hàng)
| Cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT UNSIGNED | PK, AI | ID đơn hàng |
| `order_code` | VARCHAR(30) | UNIQUE | Mã đơn hàng (User visible) |
| `user_id` | BIGINT UNSIGNED | FK -> `users` | Người đặt |
| `total_amount` | DECIMAL(15,2) | NOT NULL | Tổng thanh toán |
| `payment_status` | ENUM | | Trạng thái thanh toán |
| `status` | ENUM | | Trạng thái đơn hàng (pending, shipping,...) |
| `shipping_address`| TEXT | NOT NULL | Địa chỉ giao hàng (snapshot) |

### `order_items` (Chi tiết đơn hàng)
| Cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `order_id` | BIGINT UNSIGNED | FK -> `orders` | Thuộc đơn nào |
| `variant_id` | BIGINT UNSIGNED | FK -> `book_variants`| Sản phẩm nào |
| `quantity` | INT UNSIGNED | NOT NULL | Số lượng mua |
| `unit_price` | DECIMAL(12,2) | NOT NULL | Giá tại thời điểm mua |
| `subtotal` | DECIMAL(12,2) | NOT NULL | Thành tiền |

---

## 5. Promotions & Discounts

### `flash_sales`
Chiến dịch Flash Sale.
| Cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `id` | BIGINT UNSIGNED | PK, AI | ID |
| `start_time` | DATETIME | NOT NULL | Bắt đầu |
| `end_time` | DATETIME | NOT NULL | Kết thúc |

### `vouchers`
Mã giảm giá.
| Cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `code` | VARCHAR(50) | UNIQUE | Mã nhập (Vd: NAMMOI2025) |
| `discount_type` | ENUM | 'percent','fixed'| Loại giảm |
| `discount_value` | DECIMAL(12,2) | | Giá trị giảm |
| `min_order_value` | DECIMAL(12,2) | | Đơn tối thiểu |

---

## 6. Social & Reviews

### `reviews` (Đánh giá)
| Cột | Kiểu dữ liệu | Ràng buộc | Mô tả |
| :--- | :--- | :--- | :--- |
| `user_id` | BIGINT UNSIGNED | FK -> `users` | Người đánh giá |
| `book_id` | BIGINT UNSIGNED | FK -> `books` | Sách được đánh giá |
| `rating` | TINYINT | 1-5 | Số sao |
| `comment` | TEXT | | Nội dung |
| `is_verified` | TINYINT(1) | Default 1 | Đã mua hàng thật |

### `reward_points` (Lịch sử điểm thưởng)
Theo dõi biến động điểm thưởng của User.

### `notifications` (Thông báo)
Lưu các thông báo hệ thống gửi đến User.

---

## Ghi chú
*   **Engine**: InnoDB
*   **Charset**: utf8mb4 (Hỗ trợ tiếng Việt đầy đủ và Emoji)
*   **Collation**: utf8mb4_unicode_ci
