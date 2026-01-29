-- ============================================================
-- BOOKSTORE DATABASE - WISHLIST & PRICE ALERT ENHANCEMENTS
-- Phiên bản: 1.0 (Chuẩn sàn TMĐT lớn)
-- Tối ưu: Tốc độ truy vấn & Tự động hóa thông báo
-- ============================================================

USE bookstore;

-- 1. NÂNG CẤP CẤU TRÚC BẢNG WISHLISTS
-- Lưu giá lúc thêm giúp tính toán % giảm giá chính xác cho người dùng
ALTER TABLE wishlists 
    ADD COLUMN added_price DECIMAL(15,2) NOT NULL DEFAULT 0 COMMENT 'Giá sách lúc người dùng nhấn thích',
    ADD COLUMN notify_on_price_drop TINYINT(1) DEFAULT 1 COMMENT 'Bật/tắt nhận thông báo khi giảm giá',
    ADD COLUMN priority TINYINT UNSIGNED DEFAULT 0 COMMENT 'Mức độ ưu tiên (0: Thường, 1: Cao)';

-- 2. TỐI ƯU HÓA CHỈ MỤC (INDEX)
-- Giúp hệ thống quét hàng triệu bản ghi wishlist trong vài mil giây khi Admin đổi giá sách
ALTER TABLE wishlists
    ADD INDEX idx_wishlist_book_price (book_id, added_price, notify_on_price_drop),
    ADD INDEX idx_wishlist_user_priority (user_id, priority DESC);

-- 3. TỰ ĐỘNG HÓA THÔNG BÁO GIAO DỊCH (TRIGGER)
-- Hệ thống tự động đẩy thông báo ngay khi Admin cập nhật giá mới mà không cần can thiệp Backend code
DELIMITER //

DROP TRIGGER IF EXISTS trg_wishlist_price_alert//
CREATE TRIGGER trg_wishlist_price_alert
AFTER UPDATE ON book_variants
FOR EACH ROW
BEGIN
    -- Chỉ kích hoạt khi giá giảm thực sự
    IF NEW.price < OLD.price THEN
        -- Chèn thông báo cá nhân hóa cho từng khách hàng đang quan tâm
        INSERT INTO notifications (user_id, title, content, type, reference_type, reference_id, created_at)
        SELECT 
            w.user_id, 
            '📉 Giá cực hời cho sách bạn thích!', 
            CONCAT('Cuốn sách "', b.title, '" hiện đã giảm xuống còn ', FORMAT(NEW.price, 0), 'đ (Giảm từ ', FORMAT(w.added_price, 0), 'đ). Mua ngay kẻo lỡ!'),
            'promotion',
            'order', -- Sử dụng reference_type 'order' để điều hướng về chi tiết sản phẩm nếu cần
            NEW.book_id,
            NOW()
        FROM wishlists w
        INNER JOIN books b ON w.book_id = b.id
        WHERE w.book_id = NEW.book_id 
          AND w.notify_on_price_drop = 1
          AND w.added_price > NEW.price;
    END IF;
END//

DELIMITER ;

-- 4. THỦ TỤC LẤY DANH SÁCH WISHLIST TỐI ƯU (STORED PROCEDURE)
-- Kết hợp thông tin giá hiện tại và % giảm giá so với lúc thêm
DELIMITER //

DROP PROCEDURE IF EXISTS sp_get_user_wishlist_with_alerts//
CREATE PROCEDURE sp_get_user_wishlist_with_alerts(IN p_user_id BIGINT UNSIGNED)
BEGIN
    SELECT 
        w.id AS wishlist_id,
        b.id AS book_id,
        b.title,
        b.slug,
        w.added_price,
        bv.price AS current_price,
        ROUND((w.added_price - bv.price) / w.added_price * 100) AS discount_from_added,
        (CASE WHEN bv.price < w.added_price THEN 1 ELSE 0 END) AS is_price_dropped,
        bi.image_url AS thumbnail
    FROM wishlists w
    INNER JOIN books b ON w.book_id = b.id
    INNER JOIN (
        -- Lấy giá thấp nhất hiện tại của các variant
        SELECT book_id, MIN(price) as price 
        FROM book_variants 
        WHERE is_active = 1 
        GROUP BY book_id
    ) bv ON b.id = bv.book_id
    LEFT JOIN book_images bi ON b.id = bi.book_id AND bi.is_primary = 1
    WHERE w.user_id = p_user_id
    ORDER BY w.priority DESC, w.created_at DESC;
END//

DELIMITER ;

-- ============================================================
-- Ghi chú vận hành:
-- 1. File này bổ sung tính năng Price Alert chuẩn sàn TMĐT.
-- 2. Trigger đảm bảo tính Real-time (Thời gian thực).
-- 3. Stored Procedure giúp giảm tải cho ứng dụng (Application Layer).
-- ============================================================
