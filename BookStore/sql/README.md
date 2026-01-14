# 📚 BookStore Database - Hướng Dẫn Sử Dụng

## 📋 Tổng Quan

Hệ thống database BookStore bao gồm 26 bảng được tối ưu hóa cho website TMĐT bán sách online.

## 📂 Cấu Trúc Thư Mục

```
sql/
├── create_tables.sql           # Script tạo cấu trúc database
├── database_optimizations.sql  # Script tối ưu hóa (indexes, triggers, procedures)
├── database_documentation.md   # Tài liệu chi tiết về database
├── README.md                   # File này
└── scripts/
    ├── seed_data_tiki.sql     # Dữ liệu mẫu từ Tiki (579KB)
    ├── tiki_crawler.py        # Script crawl dữ liệu từ Tiki
    └── requirements.txt       # Dependencies cho crawler
```

## 🚀 Hướng Dẫn Cài Đặt

### Bước 1: Tạo Database Cơ Bản

```bash
mysql -u root -p < create_tables.sql
```

Hoặc trong MySQL:
```sql
SOURCE d:/BookStore/BookStore/sql/create_tables.sql;
```

**Kết quả:**
- ✅ Database `bookstore` được tạo với 26 bảng
- ✅ Encoding: UTF8MB4, Collation: utf8mb4_unicode_ci
- ✅ Foreign keys và indexes cơ bản
- ✅ Sample data cho `customer_tiers` và `shipping_carriers`

### Bước 2: Áp Dụng Tối Ưu Hóa

```bash
mysql -u root -p bookstore < database_optimizations.sql
```

**Kết quả:**
- ✅ Bổ sung bảng `inventory_history`
- ✅ Thêm cột cho soft delete (`deleted_at`)
- ✅ 20+ composite indexes cho performance
- ✅ 40+ CHECK constraints cho data integrity
- ✅ 6 triggers tự động (auto-update ratings, inventory, sold_count)
- ✅ 4 stored procedures tiện ích
- ✅ 5 views thường dùng

### Bước 3: Import Dữ Liệu Mẫu (Tùy Chọn)

```bash
mysql -u root -p bookstore < scripts/seed_data_tiki.sql
```

**Kết quả:**
- ✅ ~100 sách từ Tiki
- ✅ Tác giả, nhà xuất bản, danh mục
- ✅ Dữ liệu ảnh minh họa

---

## 🔧 Cấu Hình MySQL (Khuyến Nghị)

Thêm vào file `my.cnf` hoặc `my.ini`:

```ini
[mysqld]
# Tối ưu FULLTEXT search cho tiếng Việt
ngram_token_size = 2
ft_min_word_len = 2
innodb_ft_min_token_size = 2

# Performance
innodb_default_row_format = DYNAMIC
max_allowed_packet = 256M
```

Sau đó restart MySQL:
```bash
# Windows
net stop MySQL80
net start MySQL80

# Linux/Mac
sudo systemctl restart mysql
```

---

## 📊 Các Tính Năng Đã Tối Ưu

### 1. **Bảng Mới**
- `inventory_history` - Lịch sử nhập/xuất/điều chỉnh kho

### 2. **Soft Delete**
Các bảng có cột `deleted_at`:
- `books`
- `users`
- `orders`
- `categories`

### 3. **Composite Indexes** (20+)
```sql
-- Ví dụ: Query sách bán chạy
SELECT * FROM books 
WHERE is_active = 1 
ORDER BY sold_count DESC;
-- Sử dụng index: idx_books_active_featured_sold

-- Ví dụ: Query đơn hàng theo user và status
SELECT * FROM orders 
WHERE user_id = 123 AND status = 'processing'
ORDER BY created_at DESC;
-- Sử dụng index: idx_orders_user_status_created
```

### 4. **CHECK Constraints** (40+)
```sql
-- Đảm bảo dữ liệu hợp lệ
-- Ví dụ: Giá phải > 0
-- ALTER TABLE books ADD CONSTRAINT chk_books_price CHECK (base_price >= 0)

-- Ví dụ: Rating từ 1-5
-- ALTER TABLE reviews ADD CONSTRAINT chk_review_rating CHECK (rating >= 1 AND rating <= 5)
```

### 5. **Triggers Tự Động** (6)

#### a) Tự động cập nhật review_count và avg_rating
```sql
-- Khi thêm review mới
INSERT INTO reviews (user_id, book_id, order_item_id, rating, comment) 
VALUES (1, 10, 100, 5, 'Sách hay!');
-- → Tự động tăng review_count và tính lại avg_rating cho book_id = 10
```

#### b) Tự động reserve inventory khi đặt hàng
```sql
-- Khi tạo order_item mới
INSERT INTO order_items (order_id, variant_id, quantity, unit_price, subtotal)
VALUES (200, 50, 2, 100000, 200000);
-- → Tự động tăng reserved_quantity trong inventory
-- → Ghi log vào inventory_history
```

#### c) Tự động cập nhật sold_count khi order completed
```sql
-- Khi order chuyển sang 'completed'
UPDATE orders SET status = 'completed' WHERE id = 200;
-- → Tự động tăng sold_count cho books
-- → Giảm quantity và reserved_quantity trong inventory
-- → Ghi log inventory_history
-- → Cập nhật total_spent cho users
```

#### d) Giải phóng reserved_quantity khi cancel order
```sql
-- Khi cancel order
UPDATE orders SET status = 'cancelled' WHERE id = 200;
-- → Tự động giảm reserved_quantity
-- → Ghi log inventory_history
```

#### e) Tự động ghi log khi thay đổi giá
```sql
-- Khi update giá variant
UPDATE book_variants SET price = 120000 WHERE id = 50;
-- → Tự động ghi vào price_history (old_price, new_price)
```

### 6. **Stored Procedures** (4)

#### a) Cập nhật tier cho user
```sql
-- Tự động tính toán và cập nhật tier dựa trên total_spent
CALL sp_update_user_tier(123);
```

#### b) Lấy danh sách sách bán chạy
```sql
-- Top 10 sách bán chạy trong 7 ngày
CALL sp_get_bestsellers(10, NULL, 7);

-- Top 20 sách bán chạy trong category 5
CALL sp_get_bestsellers(20, 5, NULL);
```

#### c) Kiểm tra tồn kho
```sql
-- Kiểm tra variant_id = 100 có đủ 5 cuốn không
CALL sp_check_stock_availability(100, 5, @available, @quantity);
SELECT @available AS 'Đủ hàng?', @quantity AS 'Số lượng còn';
```

#### d) Tính phí ship
```sql
-- Tính phí ship: carrier_id=1, tỉnh Hà Nội (01), nặng 1500g, đơn 500k
CALL sp_calculate_shipping_fee(1, '01', 1500, 500000, @fee);
SELECT @fee AS 'Phí ship';
```

### 7. **Views** (5)

#### a) View sách đầy đủ thông tin
```sql
-- Lấy thông tin sách kèm tác giả, giá min/max, ảnh
SELECT * FROM vw_books_full 
WHERE is_active = 1 
LIMIT 10;
```

#### b) View chi tiết đơn hàng
```sql
-- Xem thông tin đơn hàng kèm khách hàng
SELECT * FROM vw_orders_detail 
WHERE user_id = 123 
ORDER BY created_at DESC;
```

#### c) View voucher đang hoạt động
```sql
-- Lấy tất cả voucher đang active và chưa hết hạn
SELECT * FROM vw_active_vouchers;
```

#### d) View flash sale đang diễn ra
```sql
-- Lấy các flash sale items đang active
SELECT * FROM vw_active_flash_sales 
WHERE remaining_quantity > 0;
```

#### e) View cảnh báo sắp hết hàng
```sql
-- Kiểm tra sản phẩm sắp hết hàng
SELECT * FROM vw_low_stock_products 
LIMIT 20;
```

---

## 💡 Best Practices

### 1. **Luôn Backup Trước Khi Chạy Scripts**
```bash
# Backup toàn bộ database
mysqldump -u root -p bookstore > backup_bookstore_$(date +%Y%m%d).sql

# Restore nếu cần
mysql -u root -p bookstore < backup_bookstore_20260114.sql
```

### 2. **Chạy Script Từng Phần Khi Test**
```sql
-- Thay vì chạy toàn bộ, test từng phần
SOURCE database_optimizations.sql;

-- Hoặc copy-paste từng section để kiểm tra
```

### 3. **Kiểm Tra Indexes Đã Hoạt Động**
```sql
-- Xem explain plan để verify index được sử dụng
EXPLAIN SELECT * FROM books 
WHERE is_active = 1 
ORDER BY sold_count DESC;

-- Kiểm tra index nào đang được dùng nhiều
SHOW INDEX FROM books;
```

### 4. **Monitor Trigger Performance**
```sql
-- Tắt triggers tạm thời nếu import data lớn
SET @DISABLE_TRIGGERS = 1;
-- ... import data ...
SET @DISABLE_TRIGGERS = 0;
```

### 5. **Sử dụng Transaction Cho Bulk Operations**
```sql
START TRANSACTION;

-- Nhiều insert/update ở đây
INSERT INTO books (...) VALUES (...);
UPDATE inventory SET quantity = quantity + 100 WHERE variant_id = 1;

COMMIT; -- Hoặc ROLLBACK nếu có lỗi
```

---

## 🔍 Query Examples

### Tìm kiếm sách theo từ khóa (FULLTEXT)
```sql
SELECT * FROM books 
WHERE MATCH(title, description) AGAINST('harry potter' IN NATURAL LANGUAGE MODE)
AND is_active = 1;
```

### Lấy sách cùng tác giả
```sql
SELECT b.*, GROUP_CONCAT(a.name) AS authors
FROM books b
INNER JOIN book_authors ba ON b.id = ba.book_id
INNER JOIN authors a ON ba.author_id = a.id
WHERE b.is_active = 1
GROUP BY b.id;
```

### Tính tổng doanh thu theo tháng
```sql
SELECT 
    DATE_FORMAT(created_at, '%Y-%m') AS thang,
    SUM(total_amount) AS doanh_thu,
    COUNT(*) AS so_don
FROM orders
WHERE status = 'completed'
GROUP BY DATE_FORMAT(created_at, '%Y-%m')
ORDER BY thang DESC;
```

### Top 10 khách hàng chi tiêu nhiều nhất
```sql
SELECT 
    u.id,
    u.full_name,
    u.email,
    u.total_spent,
    ct.name AS tier_name
FROM users u
LEFT JOIN customer_tiers ct ON u.tier_id = ct.id
WHERE u.status = 'active'
ORDER BY u.total_spent DESC
LIMIT 10;
```

---

## 🐛 Troubleshooting

### Lỗi: "IF NOT EXISTS not supported"
→ Dùng MySQL 5.7.6 trở lên hoặc bỏ `IF NOT EXISTS`

### Lỗi: CHECK constraint bị reject
→ Có dữ liệu cũ không hợp lệ, cần clean trước:
```sql
-- Ví dụ: Fix giá âm
UPDATE books SET base_price = 0 WHERE base_price < 0;
-- Sau đó mới add constraint
```

### Lỗi: Trigger duplicate
→ Drop trigger cũ trước:
```sql
DROP TRIGGER IF EXISTS trg_after_review_insert;
-- Sau đó mới tạo lại
```

### Performance chậm sau khi thêm indexes
→ Rebuild indexes:
```sql
OPTIMIZE TABLE books, book_variants, orders;
```

---

## 📞 Liên Hệ & Hỗ Trợ

- **Documentation**: Xem file `database_documentation.md`
- **Issues**: Báo lỗi hoặc góp ý tại repository

---

## ⚠️ Lưu Ý Quan Trọng

1. ✅ **Luôn test trên môi trường DEV trước**
2. ✅ **Backup database trước khi chạy optimization**
3. ✅ **Kiểm tra compatibility với MySQL version (khuyến nghị >= 8.0)**
4. ✅ **Monitor performance sau khi áp dụng triggers**
5. ✅ **Đọc kỹ database_documentation.md để hiểu rõ schema**

---

## 📝 Change Log

### v1.1 (2026-01-14)
- ✅ Thêm file `database_optimizations.sql`
- ✅ Bổ sung 20+ composite indexes
- ✅ Thêm 40+ CHECK constraints
- ✅ Tạo 6 triggers tự động
- ✅ Tạo 4 stored procedures
- ✅ Tạo 5 views tiện ích
- ✅ Thêm bảng `inventory_history`
- ✅ Thêm soft delete cho các bảng quan trọng

### v1.0 (Initial)
- ✅ Tạo cấu trúc database cơ bản
- ✅ 26 bảng với foreign keys
- ✅ Sample data cho tiers và carriers

---

**Chúc bạn triển khai thành công! 🚀**
