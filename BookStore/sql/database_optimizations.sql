-- ============================================================
-- BOOKSTORE DATABASE - OPTIMIZATION SCRIPT
-- Script cải thiện và tối ưu hóa database
-- ============================================================
-- Chạy script này SAU KHI đã chạy create_tables.sql
-- ============================================================

USE bookstore;
SET FOREIGN_KEY_CHECKS = 0;

-- ============================================================
-- 1. BỔ SUNG BẢNG THIẾU
-- ============================================================

-- Bảng lịch sử tồn kho (thiếu trong create_tables.sql)
CREATE TABLE IF NOT EXISTS inventory_history (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    variant_id BIGINT UNSIGNED NOT NULL,
    type ENUM('in','out','adjust','reserve','release') NOT NULL COMMENT 'Loại thay đổi',
    quantity_change INT NOT NULL COMMENT 'Số lượng thay đổi (+/-)',
    quantity_after INT UNSIGNED NOT NULL COMMENT 'Tồn kho sau thay đổi',
    reference_type VARCHAR(50) DEFAULT NULL COMMENT 'order, import, return',
    reference_id BIGINT UNSIGNED DEFAULT NULL,
    note TEXT,
    created_by BIGINT UNSIGNED DEFAULT NULL COMMENT 'Admin thực hiện',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_invhist_variant (variant_id),
    INDEX idx_invhist_type (type),
    INDEX idx_invhist_date (created_at),
    CONSTRAINT fk_invhist_variant FOREIGN KEY (variant_id) REFERENCES book_variants(id) ON DELETE CASCADE,
    CONSTRAINT fk_invhist_admin FOREIGN KEY (created_by) REFERENCES admins(id) ON DELETE SET NULL
) ENGINE=InnoDB COMMENT='Lịch sử nhập/xuất/điều chỉnh kho';

-- ============================================================
-- 2. CẢI THIỆN BẢNG PROVINCES
-- ============================================================

-- Thêm cột mở rộng cho bảng provinces
ALTER TABLE provinces 
    ADD COLUMN IF NOT EXISTS full_name VARCHAR(150) AFTER name,
    ADD COLUMN IF NOT EXISTS type ENUM('thanh_pho','tinh') DEFAULT 'tinh' AFTER full_name;

-- ============================================================
-- 3. THÊM SOFT DELETE
-- ============================================================

-- Thêm cột deleted_at cho các bảng quan trọng
ALTER TABLE books 
    ADD COLUMN IF NOT EXISTS deleted_at DATETIME DEFAULT NULL,
    ADD INDEX IF NOT EXISTS idx_books_deleted (deleted_at);

ALTER TABLE users 
    ADD COLUMN IF NOT EXISTS deleted_at DATETIME DEFAULT NULL,
    ADD INDEX IF NOT EXISTS idx_users_deleted (deleted_at);

ALTER TABLE orders 
    ADD COLUMN IF NOT EXISTS deleted_at DATETIME DEFAULT NULL,
    ADD INDEX IF NOT EXISTS idx_orders_deleted (deleted_at);

ALTER TABLE categories
    ADD COLUMN IF NOT EXISTS deleted_at DATETIME DEFAULT NULL,
    ADD INDEX IF NOT EXISTS idx_categories_deleted (deleted_at);

-- ============================================================
-- 4. COMPOSITE INDEX CHO PERFORMANCE
-- ============================================================

-- Bảng books - Query phổ biến: danh sách sách active, sắp xếp theo bán chạy/đánh giá
ALTER TABLE books 
    ADD INDEX IF NOT EXISTS idx_books_active_featured_sold (is_active, is_featured, sold_count DESC),
    ADD INDEX IF NOT EXISTS idx_books_active_rating (is_active, avg_rating DESC),
    ADD INDEX IF NOT EXISTS idx_books_active_created (is_active, created_at DESC),
    ADD INDEX IF NOT EXISTS idx_books_category_active (category_id, is_active, sold_count DESC);

-- Bảng book_variants - Query thường dùng
ALTER TABLE book_variants 
    ADD INDEX IF NOT EXISTS idx_variants_book_active (book_id, is_active),
    ADD INDEX IF NOT EXISTS idx_variants_active_price (is_active, price);

-- Bảng orders - Query cho admin dashboard và user history
ALTER TABLE orders 
    ADD INDEX IF NOT EXISTS idx_orders_status_created (status, created_at DESC),
    ADD INDEX IF NOT EXISTS idx_orders_user_status_created (user_id, status, created_at DESC),
    ADD INDEX IF NOT EXISTS idx_orders_payment_status_created (payment_status, created_at DESC);

-- Bảng order_items - Join thường xuyên
ALTER TABLE order_items 
    ADD INDEX IF NOT EXISTS idx_orderitems_variant_reviewed (variant_id, is_reviewed);

-- Bảng flash_sale_items - Check sold out
ALTER TABLE flash_sale_items 
    ADD INDEX IF NOT EXISTS idx_flash_items_sale_sold (flash_sale_id, sold_count);

-- Bảng reviews - Filter theo rating và visible
ALTER TABLE reviews 
    ADD INDEX IF NOT EXISTS idx_reviews_book_rating_visible (book_id, rating, is_visible),
    ADD INDEX IF NOT EXISTS idx_reviews_book_created (book_id, created_at DESC),
    ADD INDEX IF NOT EXISTS idx_reviews_verified_visible (is_verified, is_visible);

-- Bảng vouchers - Query active vouchers
ALTER TABLE vouchers 
    ADD INDEX IF NOT EXISTS idx_vouchers_active_dates (is_active, start_date, end_date),
    ADD INDEX IF NOT EXISTS idx_vouchers_code_active (code, is_active);

-- Bảng flash_sales - Query active sales trong khung giờ
ALTER TABLE flash_sales 
    ADD INDEX IF NOT EXISTS idx_flash_active_time (is_active, start_time, end_time);

-- Bảng promotions - Query active promotions
ALTER TABLE promotions 
    ADD INDEX IF NOT EXISTS idx_promos_active_dates (is_active, start_date, end_date),
    ADD INDEX IF NOT EXISTS idx_promos_type_active (type, is_active);

-- Bảng inventory - Query low stock
ALTER TABLE inventory 
    ADD INDEX IF NOT EXISTS idx_inventory_low_stock (quantity, min_stock_level);

-- Bảng user_book_interactions - ML recommendations
ALTER TABLE user_book_interactions 
    ADD INDEX IF NOT EXISTS idx_interactions_user_type (user_id, interaction_type, last_interaction_at DESC),
    ADD INDEX IF NOT EXISTS idx_interactions_book_type (book_id, interaction_type);

-- Bảng notifications - Unread notifications
ALTER TABLE notifications 
    ADD INDEX IF NOT EXISTS idx_notif_user_unread (user_id, is_read, created_at DESC);

-- ============================================================
-- 5. CHECK CONSTRAINTS - Data Integrity
-- ============================================================

-- Bảng books
ALTER TABLE books 
    ADD CONSTRAINT IF NOT EXISTS chk_books_price 
        CHECK (base_price >= 0),
    ADD CONSTRAINT IF NOT EXISTS chk_books_rating 
        CHECK (avg_rating >= 0 AND avg_rating <= 5),
    ADD CONSTRAINT IF NOT EXISTS chk_books_review_count 
        CHECK (review_count >= 0),
    ADD CONSTRAINT IF NOT EXISTS chk_books_sold_count 
        CHECK (sold_count >= 0),
    ADD CONSTRAINT IF NOT EXISTS chk_books_view_count 
        CHECK (view_count >= 0),
    ADD CONSTRAINT IF NOT EXISTS chk_books_pages 
        CHECK (pages IS NULL OR pages > 0),
    ADD CONSTRAINT IF NOT EXISTS chk_books_weight 
        CHECK (weight_grams IS NULL OR weight_grams > 0);

-- Bảng book_variants
ALTER TABLE book_variants 
    ADD CONSTRAINT IF NOT EXISTS chk_variant_price 
        CHECK (price > 0),
    ADD CONSTRAINT IF NOT EXISTS chk_variant_compare_price 
        CHECK (compare_at_price IS NULL OR compare_at_price >= price);

-- Bảng inventory
ALTER TABLE inventory 
    ADD CONSTRAINT IF NOT EXISTS chk_inventory_quantity 
        CHECK (quantity >= 0),
    ADD CONSTRAINT IF NOT EXISTS chk_inventory_reserved 
        CHECK (reserved_quantity >= 0 AND reserved_quantity <= quantity),
    ADD CONSTRAINT IF NOT EXISTS chk_inventory_min_stock 
        CHECK (min_stock_level >= 0);

-- Bảng vouchers
ALTER TABLE vouchers 
    ADD CONSTRAINT IF NOT EXISTS chk_voucher_dates 
        CHECK (end_date > start_date),
    ADD CONSTRAINT IF NOT EXISTS chk_voucher_usage 
        CHECK (used_count <= usage_limit OR usage_limit IS NULL),
    ADD CONSTRAINT IF NOT EXISTS chk_voucher_discount 
        CHECK (discount_value > 0),
    ADD CONSTRAINT IF NOT EXISTS chk_voucher_min_order 
        CHECK (min_order_value >= 0),
    ADD CONSTRAINT IF NOT EXISTS chk_voucher_used_count 
        CHECK (used_count >= 0);

-- Bảng flash_sales
ALTER TABLE flash_sales 
    ADD CONSTRAINT IF NOT EXISTS chk_flash_time 
        CHECK (end_time > start_time);

-- Bảng flash_sale_items
ALTER TABLE flash_sale_items 
    ADD CONSTRAINT IF NOT EXISTS chk_flash_item_price 
        CHECK (sale_price > 0),
    ADD CONSTRAINT IF NOT EXISTS chk_flash_item_quantity 
        CHECK (quantity_limit >= 0),
    ADD CONSTRAINT IF NOT EXISTS chk_flash_item_per_user 
        CHECK (per_user_limit > 0),
    ADD CONSTRAINT IF NOT EXISTS chk_flash_item_sold 
        CHECK (sold_count >= 0 AND (quantity_limit = 0 OR sold_count <= quantity_limit));

-- Bảng promotions
ALTER TABLE promotions 
    ADD CONSTRAINT IF NOT EXISTS chk_promo_dates 
        CHECK (end_date > start_date),
    ADD CONSTRAINT IF NOT EXISTS chk_promo_percent 
        CHECK (discount_percent IS NULL OR (discount_percent > 0 AND discount_percent <= 100)),
    ADD CONSTRAINT IF NOT EXISTS chk_promo_combo_price 
        CHECK (combo_price IS NULL OR combo_price > 0);

-- Bảng orders
ALTER TABLE orders 
    ADD CONSTRAINT IF NOT EXISTS chk_order_subtotal 
        CHECK (subtotal >= 0),
    ADD CONSTRAINT IF NOT EXISTS chk_order_shipping 
        CHECK (shipping_fee >= 0),
    ADD CONSTRAINT IF NOT EXISTS chk_order_discount 
        CHECK (discount_amount >= 0),
    ADD CONSTRAINT IF NOT EXISTS chk_order_points 
        CHECK (points_used >= 0 AND points_discount >= 0),
    ADD CONSTRAINT IF NOT EXISTS chk_order_total 
        CHECK (total_amount >= 0);

-- Bảng order_items
ALTER TABLE order_items 
    ADD CONSTRAINT IF NOT EXISTS chk_orderitem_quantity 
        CHECK (quantity > 0),
    ADD CONSTRAINT IF NOT EXISTS chk_orderitem_price 
        CHECK (unit_price >= 0),
    ADD CONSTRAINT IF NOT EXISTS chk_orderitem_discount 
        CHECK (discount_amount >= 0),
    ADD CONSTRAINT IF NOT EXISTS chk_orderitem_subtotal 
        CHECK (subtotal >= 0);

-- Bảng refunds
ALTER TABLE refunds 
    ADD CONSTRAINT IF NOT EXISTS chk_refund_amount 
        CHECK (refund_amount >= 0);

-- Bảng payments
ALTER TABLE payments 
    ADD CONSTRAINT IF NOT EXISTS chk_payment_amount 
        CHECK (amount > 0),
    ADD CONSTRAINT IF NOT EXISTS chk_payment_installment 
        CHECK (installment_months IS NULL OR installment_months IN (3,6,9,12,18,24));

-- Bảng users
ALTER TABLE users 
    ADD CONSTRAINT IF NOT EXISTS chk_user_total_spent 
        CHECK (total_spent >= 0),
    ADD CONSTRAINT IF NOT EXISTS chk_user_points 
        CHECK (reward_points >= 0);

-- Bảng customer_tiers
ALTER TABLE customer_tiers 
    ADD CONSTRAINT IF NOT EXISTS chk_tier_min_spent 
        CHECK (min_spent >= 0),
    ADD CONSTRAINT IF NOT EXISTS chk_tier_discount 
        CHECK (discount_percent >= 0 AND discount_percent <= 100);

-- Bảng shipping_rates
ALTER TABLE shipping_rates 
    ADD CONSTRAINT IF NOT EXISTS chk_shipping_fees 
        CHECK (base_fee >= 0 AND per_kg_fee >= 0 AND per_500g_fee >= 0),
    ADD CONSTRAINT IF NOT EXISTS chk_shipping_days 
        CHECK (estimated_days_min > 0 AND estimated_days_max >= estimated_days_min),
    ADD CONSTRAINT IF NOT EXISTS chk_shipping_threshold 
        CHECK (free_ship_threshold IS NULL OR free_ship_threshold > 0);

-- Bảng carts
ALTER TABLE carts 
    ADD CONSTRAINT IF NOT EXISTS chk_cart_quantity 
        CHECK (quantity > 0);

-- ============================================================
-- 6. TRIGGERS - Tự động cập nhật dữ liệu
-- ============================================================

-- Trigger: Tự động cập nhật avg_rating và review_count khi có review mới
DELIMITER //

DROP TRIGGER IF EXISTS trg_after_review_insert//
CREATE TRIGGER trg_after_review_insert 
AFTER INSERT ON reviews
FOR EACH ROW
BEGIN
    UPDATE books 
    SET 
        review_count = review_count + 1,
        avg_rating = (
            SELECT ROUND(AVG(rating), 1) 
            FROM reviews 
            WHERE book_id = NEW.book_id AND is_visible = 1
        )
    WHERE id = NEW.book_id;
END//

DROP TRIGGER IF EXISTS trg_after_review_update//
CREATE TRIGGER trg_after_review_update 
AFTER UPDATE ON reviews
FOR EACH ROW
BEGIN
    IF OLD.rating != NEW.rating OR OLD.is_visible != NEW.is_visible THEN
        UPDATE books 
        SET 
            avg_rating = (
                SELECT ROUND(AVG(rating), 1) 
                FROM reviews 
                WHERE book_id = NEW.book_id AND is_visible = 1
            )
        WHERE id = NEW.book_id;
    END IF;
END//

DROP TRIGGER IF EXISTS trg_after_review_delete//
CREATE TRIGGER trg_after_review_delete 
AFTER DELETE ON reviews
FOR EACH ROW
BEGIN
    UPDATE books 
    SET 
        review_count = review_count - 1,
        avg_rating = (
            SELECT COALESCE(ROUND(AVG(rating), 1), 0)
            FROM reviews 
            WHERE book_id = OLD.book_id AND is_visible = 1
        )
    WHERE id = OLD.book_id;
END//

-- Trigger: Tự động cập nhật inventory khi đặt hàng
DROP TRIGGER IF EXISTS trg_after_orderitem_insert//
CREATE TRIGGER trg_after_orderitem_insert 
AFTER INSERT ON order_items
FOR EACH ROW
BEGIN
    -- Tăng reserved_quantity
    UPDATE inventory 
    SET reserved_quantity = reserved_quantity + NEW.quantity
    WHERE variant_id = NEW.variant_id;
    
    -- Ghi log inventory_history
    INSERT INTO inventory_history (variant_id, type, quantity_change, quantity_after, reference_type, reference_id, note)
    SELECT 
        NEW.variant_id,
        'reserve',
        -NEW.quantity,
        quantity,
        'order',
        NEW.order_id,
        CONCAT('Reserved for order #', NEW.order_id)
    FROM inventory 
    WHERE variant_id = NEW.variant_id;
END//

-- Trigger: Tự động cập nhật sold_count khi order completed
DROP TRIGGER IF EXISTS trg_after_order_completed//
CREATE TRIGGER trg_after_order_completed 
AFTER UPDATE ON orders
FOR EACH ROW
BEGIN
    IF OLD.status != 'completed' AND NEW.status = 'completed' THEN
        -- Cập nhật sold_count cho từng variant
        UPDATE books b
        INNER JOIN book_variants bv ON b.id = bv.book_id
        INNER JOIN order_items oi ON bv.id = oi.variant_id
        SET b.sold_count = b.sold_count + oi.quantity
        WHERE oi.order_id = NEW.id;
        
        -- Giảm reserved_quantity, giảm quantity thực tế
        UPDATE inventory i
        INNER JOIN order_items oi ON i.variant_id = oi.variant_id
        SET 
            i.quantity = i.quantity - oi.quantity,
            i.reserved_quantity = i.reserved_quantity - oi.quantity
        WHERE oi.order_id = NEW.id;
        
        -- Ghi log
        INSERT INTO inventory_history (variant_id, type, quantity_change, quantity_after, reference_type, reference_id)
        SELECT 
            oi.variant_id,
            'out',
            -oi.quantity,
            i.quantity - oi.quantity,
            'order',
            NEW.id
        FROM order_items oi
        INNER JOIN inventory i ON oi.variant_id = i.variant_id
        WHERE oi.order_id = NEW.id;
        
        -- Cập nhật total_spent cho user
        UPDATE users 
        SET total_spent = total_spent + NEW.total_amount
        WHERE id = NEW.user_id;
    END IF;
END//

-- Trigger: Giải phóng reserved_quantity khi order cancelled
DROP TRIGGER IF EXISTS trg_after_order_cancelled//
CREATE TRIGGER trg_after_order_cancelled 
AFTER UPDATE ON orders
FOR EACH ROW
BEGIN
    IF OLD.status != 'cancelled' AND NEW.status = 'cancelled' THEN
        UPDATE inventory i
        INNER JOIN order_items oi ON i.variant_id = oi.variant_id
        SET i.reserved_quantity = i.reserved_quantity - oi.quantity
        WHERE oi.order_id = NEW.id;
        
        -- Ghi log
        INSERT INTO inventory_history (variant_id, type, quantity_change, quantity_after, reference_type, reference_id, note)
        SELECT 
            oi.variant_id,
            'release',
            oi.quantity,
            i.quantity,
            'order',
            NEW.id,
            'Released due to order cancellation'
        FROM order_items oi
        INNER JOIN inventory i ON oi.variant_id = i.variant_id
        WHERE oi.order_id = NEW.id;
    END IF;
END//

-- Trigger: Tự động ghi log khi thay đổi giá
DROP TRIGGER IF EXISTS trg_after_variant_price_update//
CREATE TRIGGER trg_after_variant_price_update 
AFTER UPDATE ON book_variants
FOR EACH ROW
BEGIN
    IF OLD.price != NEW.price THEN
        INSERT INTO price_history (variant_id, old_price, new_price, reason, created_at)
        VALUES (NEW.id, OLD.price, NEW.price, 'Auto-logged price change', NOW());
    END IF;
END//

DELIMITER ;

-- ============================================================
-- 7. STORED PROCEDURES - Các thủ tục thường dùng
-- ============================================================

DELIMITER //

-- Procedure: Tính toán và cập nhật tier cho user dựa trên total_spent
DROP PROCEDURE IF EXISTS sp_update_user_tier//
CREATE PROCEDURE sp_update_user_tier(IN p_user_id BIGINT UNSIGNED)
BEGIN
    DECLARE v_total_spent DECIMAL(15,2);
    DECLARE v_new_tier_id BIGINT UNSIGNED;
    
    -- Lấy total_spent của user
    SELECT total_spent INTO v_total_spent
    FROM users 
    WHERE id = p_user_id;
    
    -- Tìm tier phù hợp (tier cao nhất mà user đủ điều kiện)
    SELECT id INTO v_new_tier_id
    FROM customer_tiers
    WHERE min_spent <= v_total_spent
    ORDER BY min_spent DESC
    LIMIT 1;
    
    -- Cập nhật tier
    UPDATE users 
    SET tier_id = v_new_tier_id
    WHERE id = p_user_id;
END//

-- Procedure: Lấy danh sách sách bán chạy
DROP PROCEDURE IF EXISTS sp_get_bestsellers//
CREATE PROCEDURE sp_get_bestsellers(
    IN p_limit INT,
    IN p_category_id BIGINT UNSIGNED,
    IN p_days INT
)
BEGIN
    SELECT 
        b.id,
        b.title,
        b.slug,
        b.base_price,
        b.avg_rating,
        b.sold_count,
        GROUP_CONCAT(DISTINCT a.name SEPARATOR ', ') AS authors
    FROM books b
    INNER JOIN book_authors ba ON b.id = ba.book_id
    INNER JOIN authors a ON ba.author_id = a.id
    WHERE 
        b.is_active = 1
        AND b.deleted_at IS NULL
        AND (p_category_id IS NULL OR b.category_id = p_category_id)
        AND (p_days IS NULL OR b.created_at >= DATE_SUB(NOW(), INTERVAL p_days DAY))
    GROUP BY b.id
    ORDER BY b.sold_count DESC
    LIMIT p_limit;
END//

-- Procedure: Kiểm tra tồn kho có đủ không
DROP PROCEDURE IF EXISTS sp_check_stock_availability//
CREATE PROCEDURE sp_check_stock_availability(
    IN p_variant_id BIGINT UNSIGNED,
    IN p_quantity INT,
    OUT p_available BOOLEAN,
    OUT p_available_quantity INT
)
BEGIN
    SELECT 
        (quantity - reserved_quantity) >= p_quantity,
        (quantity - reserved_quantity)
    INTO p_available, p_available_quantity
    FROM inventory
    WHERE variant_id = p_variant_id;
END//

-- Procedure: Tính phí ship
DROP PROCEDURE IF EXISTS sp_calculate_shipping_fee//
CREATE PROCEDURE sp_calculate_shipping_fee(
    IN p_carrier_id BIGINT UNSIGNED,
    IN p_province_code VARCHAR(10),
    IN p_weight_grams INT,
    IN p_order_total DECIMAL(12,2),
    OUT p_shipping_fee DECIMAL(10,2)
)
BEGIN
    DECLARE v_base_fee DECIMAL(10,2);
    DECLARE v_per_500g_fee DECIMAL(10,2);
    DECLARE v_free_ship_threshold DECIMAL(12,2);
    
    -- Lấy thông tin phí ship
    SELECT 
        base_fee,
        per_500g_fee,
        free_ship_threshold
    INTO 
        v_base_fee,
        v_per_500g_fee,
        v_free_ship_threshold
    FROM shipping_rates
    WHERE 
        carrier_id = p_carrier_id
        AND province_code = p_province_code
        AND is_active = 1
    LIMIT 1;
    
    -- Kiểm tra freeship
    IF p_order_total >= COALESCE(v_free_ship_threshold, 999999999) THEN
        SET p_shipping_fee = 0;
    ELSE
        -- Tính phí = base_fee + (số khối 500g * phí mỗi 500g)
        SET p_shipping_fee = v_base_fee + (CEILING(p_weight_grams / 500) * v_per_500g_fee);
    END IF;
END//

DELIMITER ;

-- ============================================================
-- 8. VIEWS - Các view thường dùng
-- ============================================================

-- View: Sách với thông tin đầy đủ (cho listing)
CREATE OR REPLACE VIEW vw_books_full AS
SELECT 
    b.id,
    b.title,
    b.slug,
    b.isbn,
    b.description,
    b.base_price,
    b.avg_rating,
    b.review_count,
    b.sold_count,
    b.view_count,
    b.is_active,
    b.is_featured,
    c.name AS category_name,
    c.slug AS category_slug,
    p.name AS publisher_name,
    GROUP_CONCAT(DISTINCT a.name ORDER BY ba.is_primary DESC SEPARATOR ', ') AS authors,
    (
        SELECT image_url 
        FROM book_images bi 
        WHERE bi.book_id = b.id AND bi.is_primary = 1 
        LIMIT 1
    ) AS primary_image,
    (
        SELECT MIN(price) 
        FROM book_variants bv 
        WHERE bv.book_id = b.id AND bv.is_active = 1
    ) AS min_price,
    (
        SELECT MAX(price) 
        FROM book_variants bv 
        WHERE bv.book_id = b.id AND bv.is_active = 1
    ) AS max_price
FROM books b
INNER JOIN categories c ON b.category_id = c.id
INNER JOIN publishers p ON b.publisher_id = p.id
LEFT JOIN book_authors ba ON b.book_id = ba.book_id
LEFT JOIN authors a ON ba.author_id = a.id
WHERE b.deleted_at IS NULL
GROUP BY b.id;

-- View: Order với thông tin chi tiết
CREATE OR REPLACE VIEW vw_orders_detail AS
SELECT 
    o.id,
    o.order_code,
    o.user_id,
    u.full_name AS customer_name,
    u.email AS customer_email,
    u.phone AS customer_phone,
    o.subtotal,
    o.shipping_fee,
    o.discount_amount,
    o.total_amount,
    o.payment_method,
    o.payment_status,
    o.status,
    o.recipient_name,
    o.recipient_phone,
    o.shipping_address,
    o.tracking_number,
    sc.name AS carrier_name,
    v.code AS voucher_code,
    o.created_at,
    o.updated_at
FROM orders o
INNER JOIN users u ON o.user_id = u.id
LEFT JOIN shipping_carriers sc ON o.carrier_id = sc.id
LEFT JOIN vouchers v ON o.voucher_id = v.id
WHERE o.deleted_at IS NULL;

-- View: Voucher đang active
CREATE OR REPLACE VIEW vw_active_vouchers AS
SELECT 
    id,
    code,
    name,
    description,
    discount_type,
    discount_value,
    max_discount,
    min_order_value,
    usage_limit,
    used_count,
    (usage_limit - used_count) AS remaining_uses,
    per_user_limit,
    start_date,
    end_date
FROM vouchers
WHERE 
    is_active = 1
    AND NOW() BETWEEN start_date AND end_date
    AND (usage_limit IS NULL OR used_count < usage_limit);

-- View: Flash sale đang active
CREATE OR REPLACE VIEW vw_active_flash_sales AS
SELECT 
    fs.id AS flash_sale_id,
    fs.name AS flash_sale_name,
    fs.start_time,
    fs.end_time,
    fsi.id AS item_id,
    fsi.variant_id,
    bv.sku,
    b.title AS book_title,
    bv.price AS original_price,
    fsi.sale_price,
    fsi.quantity_limit,
    fsi.sold_count,
    (fsi.quantity_limit - fsi.sold_count) AS remaining_quantity,
    fsi.per_user_limit,
    ROUND((bv.price - fsi.sale_price) / bv.price * 100) AS discount_percent
FROM flash_sales fs
INNER JOIN flash_sale_items fsi ON fs.id = fsi.flash_sale_id
INNER JOIN book_variants bv ON fsi.variant_id = bv.id
INNER JOIN books b ON bv.book_id = b.id
WHERE 
    fs.is_active = 1
    AND NOW() BETWEEN fs.start_time AND fs.end_time
    AND (fsi.quantity_limit = 0 OR fsi.sold_count < fsi.quantity_limit)
    AND bv.is_active = 1;

-- View: Low stock warning
CREATE OR REPLACE VIEW vw_low_stock_products AS
SELECT 
    i.variant_id,
    bv.sku,
    b.title AS book_title,
    i.quantity,
    i.reserved_quantity,
    (i.quantity - i.reserved_quantity) AS available_quantity,
    i.min_stock_level,
    i.last_restocked_at
FROM inventory i
INNER JOIN book_variants bv ON i.variant_id = bv.id
INNER JOIN books b ON bv.book_id = b.id
WHERE 
    bv.is_active = 1
    AND (i.quantity - i.reserved_quantity) <= i.min_stock_level
ORDER BY (i.quantity - i.reserved_quantity) ASC;

-- ============================================================
-- 9. INDEXES CHO FULLTEXT SEARCH
-- ============================================================

-- Tối ưu FULLTEXT search cho tiếng Việt
-- (Đã có sẵn trong create_tables.sql, chỉ cần đảm bảo config)
-- Cần set trong my.cnf/my.ini:
-- ngram_token_size = 2
-- ft_min_word_len = 2
-- innodb_ft_min_token_size = 2

-- ============================================================
-- 10. SAMPLE QUERIES - Ví dụ sử dụng
-- ============================================================

-- Query 1: Tìm kiếm sách theo từ khóa (FULLTEXT)
-- SELECT * FROM books 
-- WHERE MATCH(title, description) AGAINST('harry potter' IN NATURAL LANGUAGE MODE)
-- AND is_active = 1;

-- Query 2: Lấy sách bán chạy nhất tuần
-- CALL sp_get_bestsellers(10, NULL, 7);

-- Query 3: Kiểm tra tồn kho
-- CALL sp_check_stock_availability(123, 5, @available, @quantity);
-- SELECT @available, @quantity;

-- Query 4: Tính phí ship
-- CALL sp_calculate_shipping_fee(1, '01', 1500, 500000, @fee);
-- SELECT @fee;

-- Query 5: Cập nhật tier cho user
-- CALL sp_update_user_tier(1);

SET FOREIGN_KEY_CHECKS = 1;

-- ============================================================
-- KẾT THÚC OPTIMIZATION SCRIPT
-- ============================================================
-- Lưu ý:
-- 1. Chạy script này SAU khi đã có database từ create_tables.sql
-- 2. Backup database trước khi chạy
-- 3. Test kỹ trên môi trường dev trước khi production
-- 4. Có thể chạy từng phần riêng biệt nếu cần
-- ============================================================
