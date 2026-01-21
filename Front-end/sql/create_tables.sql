-- ============================================================
-- BOOKSTORE DATABASE - MySQL 8.x
-- Website TMĐT bán sách online
-- ============================================================
-- Tổng số: 26 bảng
-- Encoding: UTF8MB4
-- Collation: utf8mb4_unicode_ci
-- ============================================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;
DROP DATABASE IF EXISTS bookstore;
CREATE DATABASE bookstore CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE bookstore;

-- ============================================================
-- 1. USER MANAGEMENT
-- ============================================================

-- Bảng cấp bậc khách hàng VIP
CREATE TABLE customer_tiers (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    min_spent DECIMAL(15,2) NOT NULL DEFAULT 0,
    discount_percent TINYINT UNSIGNED NOT NULL DEFAULT 0,
    benefits TEXT,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    UNIQUE KEY uk_tier_name (name)
) ENGINE=InnoDB COMMENT='Cấp bậc thành viên: Bạc, Vàng, Kim cương';

CREATE TABLE users (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    phone VARCHAR(20) UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    avatar_url VARCHAR(500),
    date_of_birth DATE,
    gender ENUM('male','female','other'),
    tier_id BIGINT UNSIGNED,
    total_spent DECIMAL(15,2) NOT NULL DEFAULT 0,
    reward_points INT UNSIGNED NOT NULL DEFAULT 0,
    status ENUM('active','inactive','banned') DEFAULT 'active',
    email_verified_at DATETIME,
    phone_verified_at DATETIME,
    last_login_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_tier (tier_id),
    INDEX idx_status (status),
    CONSTRAINT fk_user_tier FOREIGN KEY (tier_id) REFERENCES customer_tiers(id) ON DELETE SET NULL
) ENGINE=InnoDB COMMENT='Khách hàng';

CREATE TABLE admins (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    avatar_url VARCHAR(500),
    role ENUM('super_admin','admin','staff') DEFAULT 'staff',
    permissions JSON,
    is_active TINYINT(1) DEFAULT 1,
    last_login_at DATETIME,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB COMMENT='Quản trị viên & nhân viên';

CREATE TABLE otp_codes (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    code VARCHAR(10) NOT NULL,
    type ENUM('register','reset_password','verify_email','verify_phone') NOT NULL,
    expires_at DATETIME NOT NULL,
    is_used TINYINT(1) DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user (user_id),
    INDEX idx_code (code, type),
    CONSTRAINT fk_otp_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB COMMENT='Mã OTP';

-- ============================================================
-- 2. ADDRESS & LOCATION
-- ============================================================

CREATE TABLE provinces (
    code VARCHAR(10) PRIMARY KEY,
    name VARCHAR(100) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE districts (
    code VARCHAR(10) PRIMARY KEY,
    province_code VARCHAR(10) NOT NULL,
    name VARCHAR(100) NOT NULL,
    CONSTRAINT fk_dist_prov FOREIGN KEY (province_code) REFERENCES provinces(code)
) ENGINE=InnoDB;

CREATE TABLE user_addresses (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    recipient_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    province_code VARCHAR(10) NOT NULL,
    district_code VARCHAR(10) NOT NULL,
    ward VARCHAR(100) NOT NULL,
    street TEXT NOT NULL,
    is_default TINYINT(1) DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user (user_id),
    CONSTRAINT fk_addr_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
) ENGINE=InnoDB COMMENT='Địa chỉ giao hàng của khách';

-- ============================================================
-- 3. PRODUCT CATALOG
-- ============================================================

CREATE TABLE categories (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    slug VARCHAR(120) NOT NULL UNIQUE,
    parent_id BIGINT UNSIGNED NULL,
    level TINYINT UNSIGNED DEFAULT 0,
    image_url VARCHAR(500),
    sort_order INT DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uk_slug (slug),
    INDEX idx_parent (parent_id),
    CONSTRAINT fk_cat_parent FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
) ENGINE=InnoDB COMMENT='Danh mục đa cấp';

CREATE TABLE authors (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(170) NOT NULL UNIQUE,
    biography TEXT,
    image_url VARCHAR(500),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FULLTEXT ft_name (name) WITH PARSER ngram
) ENGINE=InnoDB COMMENT='Tác giả';

CREATE TABLE publishers (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    slug VARCHAR(170) NOT NULL UNIQUE,
    logo_url VARCHAR(500),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FULLTEXT ft_name (name) WITH PARSER ngram
) ENGINE=InnoDB COMMENT='Nhà xuất bản';

CREATE TABLE books (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    category_id BIGINT UNSIGNED NOT NULL,
    publisher_id BIGINT UNSIGNED NOT NULL,
    title VARCHAR(300) NOT NULL,
    slug VARCHAR(350) NOT NULL UNIQUE,
    isbn VARCHAR(20) UNIQUE,
    publication_year SMALLINT UNSIGNED,
    pages SMALLINT UNSIGNED,
    dimensions VARCHAR(50),
    weight_grams INT UNSIGNED,
    cover_type ENUM('soft','hard') DEFAULT 'soft',
    language VARCHAR(50) DEFAULT 'Tiếng Việt',
    description TEXT,
    base_price DECIMAL(12,2) NOT NULL,
    avg_rating DECIMAL(2,1) DEFAULT 0,
    review_count INT UNSIGNED DEFAULT 0,
    sold_count INT UNSIGNED DEFAULT 0,
    view_count INT UNSIGNED DEFAULT 0,
    is_active TINYINT(1) DEFAULT 1,
    is_featured TINYINT(1) DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_category (category_id),
    INDEX idx_publisher (publisher_id),
    INDEX idx_active (is_active),
    INDEX idx_featured (is_featured),
    FULLTEXT ft_search (title, description) WITH PARSER ngram,
    CONSTRAINT fk_book_cat FOREIGN KEY (category_id) REFERENCES categories(id),
    CONSTRAINT fk_book_pub FOREIGN KEY (publisher_id) REFERENCES publishers(id)
) ENGINE=InnoDB COMMENT='Sách chính';

CREATE TABLE book_authors (
    book_id BIGINT UNSIGNED NOT NULL,
    author_id BIGINT UNSIGNED NOT NULL,
    is_primary TINYINT(1) DEFAULT 0,
    PRIMARY KEY (book_id, author_id),
    CONSTRAINT fk_ba_book FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
    CONSTRAINT fk_ba_author FOREIGN KEY (author_id) REFERENCES authors(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- Ảnh gallery của sách (góc mở, bìa sau, mục lục…)
CREATE TABLE book_images (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    book_id BIGINT UNSIGNED NOT NULL,
    image_url VARCHAR(500) NOT NULL,
    alt_text VARCHAR(255),
    is_primary TINYINT(1) DEFAULT 0,
    sort_order TINYINT UNSIGNED DEFAULT 0,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_book (book_id),
    CONSTRAINT fk_img_book FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE
) ENGINE=InnoDB COMMENT='Ảnh chi tiết sách';

-- Variant = SKU (cùng sách nhưng khác bìa, NXB, giá)
CREATE TABLE book_variants (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    book_id BIGINT UNSIGNED NOT NULL,
    publisher_id BIGINT UNSIGNED NOT NULL,
    sku VARCHAR(50) NOT NULL UNIQUE,
    cover_type ENUM('soft','hard') DEFAULT 'soft',
    edition VARCHAR(100),
    price DECIMAL(12,2) NOT NULL,
    compare_at_price DECIMAL(12,2),
    cover_image_url VARCHAR(500) COMMENT 'Ảnh bìa chính của variant (rất quan trọng)',
    thumbnail_url VARCHAR(500) COMMENT 'Ảnh nhỏ 300x450',
    is_active TINYINT(1) DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX idx_book (book_id),
    INDEX idx_price (price, is_active),
    FULLTEXT ft_search (sku) WITH PARSER ngram,
    CONSTRAINT fk_var_book FOREIGN KEY (book_id) REFERENCES books(id) ON DELETE CASCADE,
    CONSTRAINT fk_var_pub FOREIGN KEY (publisher_id) REFERENCES publishers(id)
) ENGINE=InnoDB COMMENT='Variant sách (SKU)';

-- ============================================================
-- 4. INVENTORY & PRICE HISTORY
-- ============================================================

CREATE TABLE inventory (
    variant_id BIGINT UNSIGNED PRIMARY KEY,
    quantity INT UNSIGNED NOT NULL DEFAULT 0,
    reserved_quantity INT UNSIGNED NOT NULL DEFAULT 0,
    min_stock_level INT UNSIGNED DEFAULT 5,
    last_restocked_at DATETIME,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    CONSTRAINT fk_inv_variant FOREIGN KEY (variant_id) REFERENCES book_variants(id) ON DELETE CASCADE
) ENGINE=InnoDB COMMENT='Tồn kho';

CREATE TABLE price_history (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    variant_id BIGINT UNSIGNED NOT NULL,
    old_price DECIMAL(12,2) NOT NULL,
    new_price DECIMAL(12,2) NOT NULL,
    changed_by BIGINT UNSIGNED,
    reason VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_variant (variant_id),
    CONSTRAINT fk_ph_variant FOREIGN KEY (variant_id) REFERENCES book_variants(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ============================================================
-- 5. CART & WISHLIST
-- ============================================================

-- Bảng giỏ hàng
CREATE TABLE `carts` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `variant_id` BIGINT UNSIGNED NOT NULL,
    `quantity` INT UNSIGNED NOT NULL DEFAULT 1,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_cart_user_variant` (`user_id`, `variant_id`),
    KEY `idx_cart_user` (`user_id`),
    CONSTRAINT `fk_cart_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_cart_variant` FOREIGN KEY (`variant_id`) REFERENCES `book_variants` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Giỏ hàng';

-- Bảng wishlist
CREATE TABLE `wishlists` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `book_id` BIGINT UNSIGNED NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_wishlist_user_book` (`user_id`, `book_id`),
    KEY `idx_wishlist_user` (`user_id`),
    CONSTRAINT `fk_wishlist_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_wishlist_book` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Danh sách yêu thích';

-- ============================================================
-- 6. PROMOTIONS
-- ============================================================

-- Bảng flash sale
CREATE TABLE `flash_sales` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(150) NOT NULL COMMENT 'Tên chiến dịch',
    `description` TEXT,
    `start_time` DATETIME NOT NULL COMMENT 'Thời điểm bắt đầu',
    `end_time` DATETIME NOT NULL COMMENT 'Thời điểm kết thúc',
    `is_active` TINYINT(1) NOT NULL DEFAULT 1,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_flash_time` (`start_time`, `end_time`),
    KEY `idx_flash_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Flash sale theo khung giờ';

-- Bảng sản phẩm flash sale
CREATE TABLE `flash_sale_items` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `flash_sale_id` BIGINT UNSIGNED NOT NULL,
    `variant_id` BIGINT UNSIGNED NOT NULL,
    `sale_price` DECIMAL(12,2) NOT NULL COMMENT 'Giá flash sale',
    `quantity_limit` INT UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Giới hạn số lượng (0=không giới hạn)',
    `per_user_limit` INT UNSIGNED NOT NULL DEFAULT 1 COMMENT 'Giới hạn mỗi user',
    `sold_count` INT UNSIGNED NOT NULL DEFAULT 0,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_flash_variant` (`flash_sale_id`, `variant_id`),
    KEY `idx_flash_item_variant` (`variant_id`),
    CONSTRAINT `fk_flashitem_sale` FOREIGN KEY (`flash_sale_id`) REFERENCES `flash_sales` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_flashitem_variant` FOREIGN KEY (`variant_id`) REFERENCES `book_variants` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Sản phẩm trong flash sale';

-- Bảng voucher
CREATE TABLE `vouchers` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `code` VARCHAR(50) NOT NULL COMMENT 'Mã voucher',
    `name` VARCHAR(150) NOT NULL,
    `description` TEXT,
    `discount_type` ENUM('percent','fixed') NOT NULL COMMENT 'Loại giảm giá',
    `discount_value` DECIMAL(12,2) NOT NULL COMMENT 'Giá trị giảm',
    `max_discount` DECIMAL(12,2) DEFAULT NULL COMMENT 'Giảm tối đa (cho %)',
    `min_order_value` DECIMAL(12,2) NOT NULL DEFAULT 0 COMMENT 'Đơn hàng tối thiểu',
    `usage_limit` INT UNSIGNED DEFAULT NULL COMMENT 'Giới hạn tổng lượt dùng',
    `used_count` INT UNSIGNED NOT NULL DEFAULT 0,
    `per_user_limit` INT UNSIGNED NOT NULL DEFAULT 1 COMMENT 'Giới hạn mỗi user',
    `start_date` DATETIME NOT NULL,
    `end_date` DATETIME NOT NULL,
    `is_active` TINYINT(1) NOT NULL DEFAULT 1,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_voucher_code` (`code`),
    KEY `idx_voucher_date` (`start_date`, `end_date`),
    KEY `idx_voucher_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Voucher giảm giá';

-- Bảng lịch sử sử dụng voucher
CREATE TABLE `voucher_usage` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `voucher_id` BIGINT UNSIGNED NOT NULL,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `order_id` BIGINT UNSIGNED DEFAULT NULL,
    `discount_amount` DECIMAL(12,2) NOT NULL COMMENT 'Số tiền đã giảm',
    `used_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_voucherusage_voucher` (`voucher_id`),
    KEY `idx_voucherusage_user` (`user_id`),
    KEY `idx_voucherusage_order` (`order_id`),
    CONSTRAINT `fk_voucherusage_voucher` FOREIGN KEY (`voucher_id`) REFERENCES `vouchers` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_voucherusage_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Lịch sử sử dụng voucher';

-- Bảng chương trình khuyến mãi
CREATE TABLE `promotions` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(150) NOT NULL,
    `description` TEXT,
    `type` ENUM('percent','buy_x_get_y','combo','bundle_discount') NOT NULL COMMENT 'Loại khuyến mãi',
    `discount_percent` TINYINT UNSIGNED DEFAULT NULL COMMENT 'Giảm %',
    `buy_quantity` INT UNSIGNED DEFAULT NULL COMMENT 'Mua X (cho buy_x_get_y)',
    `get_quantity` INT UNSIGNED DEFAULT NULL COMMENT 'Tặng Y (cho buy_x_get_y)',
    `bundle_min_quantity` INT UNSIGNED DEFAULT NULL COMMENT 'Mua tối thiểu (cho bundle)',
    `bundle_discount_percent` TINYINT UNSIGNED DEFAULT NULL COMMENT 'Giảm % khi mua bundle',
    `combo_price` DECIMAL(12,2) DEFAULT NULL COMMENT 'Giá combo cố định',
    `start_date` DATETIME NOT NULL,
    `end_date` DATETIME NOT NULL,
    `is_active` TINYINT(1) NOT NULL DEFAULT 1,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_promo_type` (`type`),
    KEY `idx_promo_date` (`start_date`, `end_date`),
    KEY `idx_promo_active` (`is_active`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Chương trình khuyến mãi';

-- Bảng sách trong khuyến mãi
CREATE TABLE `promotion_books` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `promotion_id` BIGINT UNSIGNED NOT NULL,
    `book_id` BIGINT UNSIGNED NOT NULL,
    `is_gift` TINYINT(1) NOT NULL DEFAULT 0 COMMENT 'Là sách tặng (buy_x_get_y)',
    `sort_order` INT NOT NULL DEFAULT 0,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_promobook` (`promotion_id`, `book_id`),
    KEY `idx_promobook_book` (`book_id`),
    CONSTRAINT `fk_promobook_promo` FOREIGN KEY (`promotion_id`) REFERENCES `promotions` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_promobook_book` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Sách áp dụng khuyến mãi';


-- ============================================================
-- 6.5 SHIPPING
-- ============================================================

CREATE TABLE shipping_carriers (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    code VARCHAR(20) NOT NULL UNIQUE,
    logo_url VARCHAR(500),
    api_endpoint VARCHAR(500),
    api_key VARCHAR(255),
    is_active TINYINT(1) DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB COMMENT='Đơn vị vận chuyển: GHTK, GHN, Viettel Post, J&T';

CREATE TABLE shipping_rates (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    carrier_id BIGINT UNSIGNED NOT NULL,
    province_code VARCHAR(10) NOT NULL,
    province_name VARCHAR(100) NOT NULL,
    base_fee DECIMAL(10,2) NOT NULL,
    per_kg_fee DECIMAL(10,2) DEFAULT 0,
    per_500g_fee DECIMAL(10,2) DEFAULT 0,
    free_ship_threshold DECIMAL(12,2),
    estimated_days_min TINYINT UNSIGNED DEFAULT 1,
    estimated_days_max TINYINT UNSIGNED DEFAULT 3,
    is_active TINYINT(1) DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    UNIQUE KEY uk_carrier_province (carrier_id, province_code),
    INDEX idx_province (province_code),
    CONSTRAINT fk_rate_carrier FOREIGN KEY (carrier_id) REFERENCES shipping_carriers(id) ON DELETE CASCADE
) ENGINE=InnoDB COMMENT='Bảng phí ship theo tỉnh';

-- ============================================================
-- 7. ORDERS
-- ============================================================

-- Bảng đơn hàng
CREATE TABLE `orders` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `order_code` VARCHAR(30) NOT NULL COMMENT 'Mã đơn hàng',
    `user_id` BIGINT UNSIGNED NOT NULL,
    `voucher_id` BIGINT UNSIGNED DEFAULT NULL,
    `carrier_id` BIGINT UNSIGNED DEFAULT NULL COMMENT 'Đơn vị vận chuyển',
    `subtotal` DECIMAL(15,2) NOT NULL COMMENT 'Tổng tiền hàng',
    `shipping_fee` DECIMAL(10,2) NOT NULL DEFAULT 0,
    `discount_amount` DECIMAL(12,2) NOT NULL DEFAULT 0 COMMENT 'Giảm từ voucher/promo',
    `points_used` INT UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Điểm đã dùng',
    `points_discount` DECIMAL(10,2) NOT NULL DEFAULT 0 COMMENT 'Tiền giảm từ điểm',
    `total_amount` DECIMAL(15,2) NOT NULL COMMENT 'Tổng thanh toán',
    `payment_method` ENUM('cod','bank_transfer','momo','zalopay','vnpay','credit_card','installment') NOT NULL,
    `payment_status` ENUM('pending','paid','failed','refunded') NOT NULL DEFAULT 'pending',
    `status` ENUM('pending','confirmed','processing','shipping','delivered','completed','cancelled','returned') NOT NULL DEFAULT 'pending',
    `shipping_address` TEXT NOT NULL,
    `recipient_name` VARCHAR(100) NOT NULL,
    `recipient_phone` VARCHAR(20) NOT NULL,
    `tracking_number` VARCHAR(100) DEFAULT NULL,
    `note` TEXT COMMENT 'Ghi chú đơn hàng',
    `shipped_at` DATETIME DEFAULT NULL,
    `delivered_at` DATETIME DEFAULT NULL,
    `completed_at` DATETIME DEFAULT NULL,
    `cancelled_at` DATETIME DEFAULT NULL,
    `cancel_reason` TEXT,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_order_code` (`order_code`),
    KEY `idx_order_user` (`user_id`),
    KEY `idx_order_status` (`status`),
    KEY `idx_order_payment_status` (`payment_status`),
    KEY `idx_order_created` (`created_at`),
    CONSTRAINT `fk_order_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`),
    CONSTRAINT `fk_order_voucher` FOREIGN KEY (`voucher_id`) REFERENCES `vouchers` (`id`) ON DELETE SET NULL,
    CONSTRAINT `fk_order_carrier` FOREIGN KEY (`carrier_id`) REFERENCES `shipping_carriers` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Đơn hàng';

-- Bảng chi tiết đơn hàng
CREATE TABLE `order_items` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `order_id` BIGINT UNSIGNED NOT NULL,
    `variant_id` BIGINT UNSIGNED NOT NULL,
    `promotion_id` BIGINT UNSIGNED DEFAULT NULL COMMENT 'Khuyến mãi áp dụng',
    `quantity` INT UNSIGNED NOT NULL,
    `unit_price` DECIMAL(12,2) NOT NULL COMMENT 'Giá tại thời điểm mua',
    `discount_amount` DECIMAL(12,2) NOT NULL DEFAULT 0,
    `subtotal` DECIMAL(12,2) NOT NULL COMMENT 'Thành tiền',
    `is_gift` TINYINT(1) NOT NULL DEFAULT 0 COMMENT 'Là quà tặng',
    `is_reviewed` TINYINT(1) NOT NULL DEFAULT 0 COMMENT 'Đã đánh giá',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_orderitem_order` (`order_id`),
    KEY `idx_orderitem_variant` (`variant_id`),
    KEY `idx_orderitem_promo` (`promotion_id`),
    CONSTRAINT `fk_orderitem_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_orderitem_variant` FOREIGN KEY (`variant_id`) REFERENCES `book_variants` (`id`),
    CONSTRAINT `fk_orderitem_promo` FOREIGN KEY (`promotion_id`) REFERENCES `promotions` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Chi tiết đơn hàng';

-- Bảng lịch sử trạng thái đơn hàng
CREATE TABLE `order_status_history` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `order_id` BIGINT UNSIGNED NOT NULL,
    `old_status` ENUM('pending','confirmed','processing','shipping','delivered','completed','cancelled','returned') DEFAULT NULL,
    `new_status` ENUM('pending','confirmed','processing','shipping','delivered','completed','cancelled','returned') NOT NULL,
    `note` TEXT,
    `changed_by` BIGINT UNSIGNED DEFAULT NULL COMMENT 'Admin thay đổi',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_orderhist_order` (`order_id`),
    KEY `idx_orderhist_status` (`new_status`),
    CONSTRAINT `fk_orderhist_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_orderhist_admin` FOREIGN KEY (`changed_by`) REFERENCES `admins` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Lịch sử trạng thái đơn hàng';

-- Bảng hoàn tiền/trả hàng
CREATE TABLE `refunds` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `order_id` BIGINT UNSIGNED NOT NULL,
    `order_item_id` BIGINT UNSIGNED DEFAULT NULL COMMENT 'Trả 1 sản phẩm cụ thể',
    `type` ENUM('refund','return','exchange') NOT NULL COMMENT 'Hoàn tiền/Trả hàng/Đổi hàng',
    `reason` ENUM('wrong_item','damaged','not_as_described','change_mind','other') NOT NULL,
    `description` TEXT COMMENT 'Mô tả chi tiết',
    `images` JSON COMMENT 'Ảnh minh chứng',
    `refund_amount` DECIMAL(12,2) NOT NULL DEFAULT 0,
    `status` ENUM('pending','approved','rejected','processing','completed') NOT NULL DEFAULT 'pending',
    `admin_note` TEXT,
    `processed_by` BIGINT UNSIGNED DEFAULT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `processed_at` DATETIME DEFAULT NULL,
    `completed_at` DATETIME DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY `idx_refund_order` (`order_id`),
    KEY `idx_refund_item` (`order_item_id`),
    KEY `idx_refund_status` (`status`),
    CONSTRAINT `fk_refund_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_refund_item` FOREIGN KEY (`order_item_id`) REFERENCES `order_items` (`id`) ON DELETE SET NULL,
    CONSTRAINT `fk_refund_admin` FOREIGN KEY (`processed_by`) REFERENCES `admins` (`id`) ON DELETE SET NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Hoàn tiền và trả hàng';

-- ============================================================
-- 8. PAYMENTS
-- ============================================================

-- Bảng thanh toán
CREATE TABLE `payments` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `order_id` BIGINT UNSIGNED NOT NULL,
    `method` ENUM('cod','bank_transfer','momo','zalopay','vnpay','credit_card','installment') NOT NULL,
    `transaction_id` VARCHAR(100) DEFAULT NULL COMMENT 'Mã giao dịch từ gateway',
    `amount` DECIMAL(15,2) NOT NULL,
    `status` ENUM('pending','processing','success','failed','cancelled','refunded') NOT NULL DEFAULT 'pending',
    `gateway_response` JSON COMMENT 'Response từ payment gateway',
    `installment_months` TINYINT UNSIGNED DEFAULT NULL COMMENT 'Số tháng trả góp',
    `installment_bank` VARCHAR(100) DEFAULT NULL COMMENT 'Ngân hàng trả góp',
    `paid_at` DATETIME DEFAULT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_payment_transaction` (`transaction_id`),
    KEY `idx_payment_order` (`order_id`),
    KEY `idx_payment_status` (`status`),
    KEY `idx_payment_method` (`method`),
    CONSTRAINT `fk_payment_order` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Thanh toán';

-- ============================================================
-- 9. REWARDS
-- ============================================================

-- Bảng điểm thưởng
CREATE TABLE `reward_points` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `points` INT NOT NULL COMMENT 'Số điểm (+/-)',
    `type` ENUM('earn','redeem','expire','adjust') NOT NULL,
    `reference_type` VARCHAR(50) DEFAULT NULL COMMENT 'order, review, referral',
    `reference_id` BIGINT UNSIGNED DEFAULT NULL,
    `description` TEXT,
    `expires_at` DATETIME DEFAULT NULL COMMENT 'Ngày hết hạn điểm',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_points_user` (`user_id`),
    KEY `idx_points_type` (`type`),
    KEY `idx_points_expires` (`expires_at`),
    CONSTRAINT `fk_points_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Điểm thưởng';

-- Bảng giao dịch loyalty
CREATE TABLE `loyalty_transactions` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `transaction_type` ENUM('earn','spend','expire','bonus','refund') NOT NULL,
    `points_amount` INT NOT NULL COMMENT 'Số điểm giao dịch',
    `points_balance_after` INT UNSIGNED NOT NULL COMMENT 'Số dư sau giao dịch',
    `reference_type` VARCHAR(50) DEFAULT NULL,
    `reference_id` BIGINT UNSIGNED DEFAULT NULL,
    `description` TEXT,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_loyalty_user` (`user_id`),
    KEY `idx_loyalty_type` (`transaction_type`),
    KEY `idx_loyalty_date` (`created_at`),
    CONSTRAINT `fk_loyalty_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Giao dịch tích điểm loyalty';

-- ============================================================
-- 10. REVIEWS
-- ============================================================

-- Bảng đánh giá sản phẩm
CREATE TABLE `reviews` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `book_id` BIGINT UNSIGNED NOT NULL,
    `order_item_id` BIGINT UNSIGNED NOT NULL COMMENT 'Chỉ đánh giá khi đã mua',
    `rating` TINYINT UNSIGNED NOT NULL COMMENT '1-5 sao',
    `title` VARCHAR(200) DEFAULT NULL,
    `comment` TEXT,
    `pros` TEXT COMMENT 'Ưu điểm',
    `cons` TEXT COMMENT 'Nhược điểm',
    `is_verified` TINYINT(1) NOT NULL DEFAULT 1 COMMENT 'Đã xác thực mua hàng',
    `is_visible` TINYINT(1) NOT NULL DEFAULT 1,
    `helpful_count` INT UNSIGNED NOT NULL DEFAULT 0 COMMENT 'Số lượt hữu ích',
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `updated_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_review_orderitem` (`order_item_id`),
    KEY `idx_review_user` (`user_id`),
    KEY `idx_review_book` (`book_id`),
    KEY `idx_review_rating` (`rating`),
    KEY `idx_review_visible` (`is_visible`),
    CONSTRAINT `fk_review_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_review_book` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_review_orderitem` FOREIGN KEY (`order_item_id`) REFERENCES `order_items` (`id`) ON DELETE CASCADE,
    CONSTRAINT `chk_review_rating` CHECK (`rating` >= 1 AND `rating` <= 5)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Đánh giá sản phẩm';

-- Bảng ảnh đánh giá
CREATE TABLE `review_images` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `review_id` BIGINT UNSIGNED NOT NULL,
    `image_url` VARCHAR(500) NOT NULL,
    `sort_order` TINYINT UNSIGNED NOT NULL DEFAULT 0,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_reviewimg_review` (`review_id`),
    CONSTRAINT `fk_reviewimg_review` FOREIGN KEY (`review_id`) REFERENCES `reviews` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Ảnh đánh giá';

-- ============================================================
-- 11. NOTIFICATIONS
-- ============================================================

-- Bảng thông báo
CREATE TABLE `notifications` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `title` VARCHAR(200) NOT NULL,
    `content` TEXT NOT NULL,
    `type` ENUM('order','promotion','system','review','reward') NOT NULL,
    `reference_type` VARCHAR(50) DEFAULT NULL COMMENT 'order, voucher, etc.',
    `reference_id` BIGINT UNSIGNED DEFAULT NULL,
    `is_read` TINYINT(1) NOT NULL DEFAULT 0,
    `is_email_sent` TINYINT(1) NOT NULL DEFAULT 0,
    `read_at` DATETIME DEFAULT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    KEY `idx_notif_user` (`user_id`),
    KEY `idx_notif_type` (`type`),
    KEY `idx_notif_read` (`is_read`),
    KEY `idx_notif_created` (`created_at`),
    CONSTRAINT `fk_notif_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Thông báo người dùng';

-- ============================================================
-- 12. RECOMMENDATIONS
-- ============================================================

-- Bảng tương tác người dùng với sách (cho ML recommendation)
CREATE TABLE `user_book_interactions` (
    `id` BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
    `user_id` BIGINT UNSIGNED NOT NULL,
    `book_id` BIGINT UNSIGNED NOT NULL,
    `interaction_type` ENUM('view','wishlist','cart','purchase','review') NOT NULL,
    `interaction_count` INT UNSIGNED NOT NULL DEFAULT 1,
    `last_interaction_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (`id`),
    UNIQUE KEY `uk_interaction` (`user_id`, `book_id`, `interaction_type`),
    KEY `idx_interaction_book` (`book_id`),
    KEY `idx_interaction_type` (`interaction_type`),
    KEY `idx_interaction_last` (`last_interaction_at`),
    CONSTRAINT `fk_interaction_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
    CONSTRAINT `fk_interaction_book` FOREIGN KEY (`book_id`) REFERENCES `books` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci COMMENT='Tương tác người dùng với sách';

SET FOREIGN_KEY_CHECKS = 1;

-- ============================================================
-- SAMPLE DATA: Customer Tiers
-- ============================================================

INSERT INTO `customer_tiers` (`name`, `min_spent`, `discount_percent`, `benefits`) VALUES
('Bạc', 0, 0, 'Thành viên mới, tích điểm 1% giá trị đơn hàng'),
('Vàng', 2000000, 3, 'Tích điểm 2%, ưu tiên hỗ trợ, freeship đơn từ 300K'),
('Kim cương', 10000000, 5, 'Tích điểm 3%, freeship mọi đơn, quà sinh nhật, sale riêng');

-- ============================================================
-- SAMPLE DATA: Shipping Carriers
-- ============================================================

INSERT INTO `shipping_carriers` (`name`, `code`, `is_active`) VALUES
('Giao Hàng Tiết Kiệm', 'GHTK', 1),
('Giao Hàng Nhanh', 'GHN', 1),
('Viettel Post', 'VTP', 1),
('J&T Express', 'JT', 1);
