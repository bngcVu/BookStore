# 🕷️ Tiki Crawler - Hướng Dẫn Sử Dụng

## 📋 Tổng Quan

Script Python để crawl dữ liệu sách thật từ Tiki.vn và tạo file SQL import vào database.

## 📂 Files

- `tiki_crawler.py` - Script crawler chính
- `requirements.txt` - Python dependencies
- `seed_data_tiki.sql` - File SQL được generate (579KB, ~100 sách)
- `README.md` - File này

## 🚀 Cách Sử Dụng

### Bước 1: Cài Đặt Dependencies

```bash
# Di chuyển vào thư mục scripts
cd d:/BookStore/BookStore/sql/scripts

# Cài đặt Python packages
pip install -r requirements.txt
```

### Bước 2: Chạy Crawler (Tùy Chọn)

> ⚠️ **Lưu Ý:** File `seed_data_tiki.sql` đã có sẵn với ~100 sách. Bạn chỉ cần chạy crawler nếu muốn crawl dữ liệu mới.

```bash
# Chạy crawler
python tiki_crawler.py
```

**Kết quả:**
- File `seed_data_tiki.sql` mới sẽ được tạo
- Mất khoảng 5-10 phút (tùy số sách và delay)

### Bước 3: Import Vào Database

```bash
# Chạy từ thư mục sql/
cd ..

# Import seed data
mysql -u root -p bookstore < scripts/seed_data_tiki.sql
```

## ⚙️ Cấu Hình Crawler

Mở file `tiki_crawler.py` và chỉnh sửa:

```python
# Số sách cần crawl
NUM_BOOKS_TO_CRAWL = 100

# Delay giữa các requests (tránh bị block)
DELAY_BETWEEN_REQUESTS = 1.5  # seconds

# Số sách mỗi page
BOOKS_PER_PAGE = 40
```

## 📊 Dữ Liệu Được Crawl

### Bảng được populate:

✅ **Core Tables:**
- `categories` - Danh mục sách
- `publishers` - Nhà xuất bản
- `authors` - Tác giả
- `books` - Thông tin sách chính
- `book_authors` - Quan hệ sách-tác giả
- `book_images` - Ảnh sách
- `book_variants` - Các variant (SKU)
- `inventory` - Tồn kho

✅ **Static Data:**
- `customer_tiers` - Cấp bậc khách hàng (Bạc, Vàng, Kim Cương)
- `provinces` - Tỉnh/thành phố
- `shipping_carriers` - Đơn vị vận chuyển
- `shipping_rates` - Bảng giá ship
- `admins` - Tài khoản admin mẫu
- `users` - User mẫu (3 users)
- `vouchers` - Voucher mẫu

### Dữ Liệu Thật Từ Tiki:

📚 **Từng cuốn sách bao gồm:**
- Tiêu đề, mô tả
- Tác giả (có thể nhiều tác giả)
- Nhà xuất bản
- ISBN, số trang, kích thước, trọng lượng
- Giá, giá so sánh (gạch)
- Đánh giá trung bình, số lượt review
- Số lượng đã bán
- Ảnh (tối đa 5 ảnh/sách)
- Category

## 🔄 Khớp Với Database Optimization

Script này **tương thích 100%** với `database_optimizations.sql`:

### ✅ Triggers Sẽ Tự Động Hoạt Động:

Khi import data, các triggers sau sẽ **KHÔNG** chạy (vì chỉ INSERT thuần):
- `trg_after_review_insert` - Cần tạo reviews sau
- `trg_after_order_completed` - Cần tạo orders sau
- `trg_after_variant_price_update` - Chỉ chạy khi UPDATE giá

Nhưng bạn có thể test triggers bằng cách:

```sql
-- Test trigger cập nhật review
INSERT INTO reviews (user_id, book_id, order_item_id, rating, comment, is_visible)
VALUES (1, 1, NULL, 5, 'Sách hay!', 1);
-- → Tự động cập nhật avg_rating và review_count cho book_id=1

-- Test trigger cập nhật giá
UPDATE book_variants SET price = 120000 WHERE id = 1;
-- → Tự động ghi vào price_history
```

### ✅ Stored Procedures Sẵn Sàng:

```sql
-- Lấy top 10 sách bán chạy
CALL sp_get_bestsellers(10, NULL, NULL);

-- Kiểm tra tồn kho variant 1
CALL sp_check_stock_availability(1, 5, @available, @quantity);
SELECT @available, @quantity;

-- Cập nhật tier cho user 1
CALL sp_update_user_tier(1);

-- Tính phí ship
CALL sp_calculate_shipping_fee(1, '01', 1500, 500000, @fee);
SELECT @fee;
```

### ✅ Views Sẵn Sàng:

```sql
-- Xem sách với đầy đủ thông tin
SELECT * FROM vw_books_full LIMIT 10;

-- Voucher đang active
SELECT * FROM vw_active_vouchers;

-- Cảnh báo sắp hết hàng
SELECT * FROM vw_low_stock_products;
```

## 🔐 Tài Khoản Mẫu Được Tạo

### Admins:

| Email | Password | Role |
|-------|----------|------|
| admin@bookstore.vn | Admin@123 | super_admin |
| manager@bookstore.vn | Manager@123 | admin |
| staff@bookstore.vn | Staff@123 | staff |

### Users:

| Email | Password | Tier |
|-------|----------|------|
| user1@gmail.com | User@123 | Bạc |
| user2@gmail.com | User@123 | Vàng |
| user3@gmail.com | User@123 | Bạc |

### Vouchers:

| Code | Loại | Giảm | Tối thiểu |
|------|------|------|-----------|
| WELCOME10 | percent | 10% (max 50k) | 100k |
| SALE20 | percent | 20% (max 100k) | 200k |
| FREESHIP | fixed | 30k | 150k |

## 📝 Chi Tiết Kỹ Thuật

### Cách Crawler Hoạt Động:

1. **Fetch categories từ Tiki API** (839, 846, 843, 870, etc.)
2. **Lấy danh sách sản phẩm** từ từng category
3. **Enrich chi tiết** bằng cách gọi API product detail
4. **Extract data:**
   - Tác giả từ multiple fields
   - Publisher từ brand hoặc specifications
   - Specs: pages, dimensions, weight, cover_type, ISBN
   - Images: primary + additional (max 5)
5. **Generate SQL:** INSERT statements với batching

### Rate Limiting:

- Delay **1.5 giây** giữa các requests
- User-Agent giả lập browser
- Chunk INSERT statements để tránh quá tải

### Error Handling:

- Retry với fallback về basic info nếu detail API fail
- Generate ISBN fake nếu không có
- Fallback fields với giá trị mặc định hợp lý

## ⚠️ Lưu Ý Quan Trọng

1. **Chỉ Dùng Cho Học Tập:**
   - Script này chỉ để học và demo
   - KHÔNG sử dụng cho mục đích thương mại

2. **Respect Tiki's Server:**
   - Không giảm DELAY quá thấp
   - Không crawl quá nhiều sách cùng lúc

3. **Data Truncation:**
   - Script sẽ **TRUNCATE** các bảng trước khi import
   - Backup data quan trọng trước khi chạy

4. **Order Matters:**
   ```bash
   # Đúng thứ tự:
   1. create_tables.sql          # Tạo schema
   2. database_optimizations.sql # Thêm indexes, triggers, procedures
   3. seed_data_tiki.sql         # Import data mẫu
   
   # SAI: Không import seed data trước khi có optimization
   ```

## 🐛 Troubleshooting

### Lỗi: Import SQL failed at line X
→ Kiểm tra database đã chạy `database_optimizations.sql` chưa

### Lỗi: requests module not found
```bash
pip install -r requirements.txt
```

### Lỗi: TRUNCATE failed due to FK constraints
→ Script có `SET FOREIGN_KEY_CHECKS = 0`, check MySQL version

### Crawler chậm quá
→ Chỉnh `DELAY_BETWEEN_REQUESTS` nhỏ hơn (nhưng cẩn thận bị block)

## 📞 Liên Hệ

- Xem thêm: `../README.md` - Hướng dẫn tổng quan
- Documentation: `../database_documentation.md`

---

**Happy Crawling! 🕷️**
