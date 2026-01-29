# TECHNICAL SPECIFICATION - BOOKSTORE PROJECT

> **Role:** Senior Full-stack Developer & System Architect.
> **Scope:** Xây dựng website BookStore (Mô hình Tiki/Fahasa).
> **Database:** MySQL 8.x (Schema: `create_tables.sql`, Optimization: `database_optimizations.sql`).
> **Architecture Pattern:** Client-Server Decoupling (Frontend React/Vue ↔ REST API ↔ MySQL Stored Procedures).

---

## I. CORE ARCHITECTURE & DESIGN PATTERN

### 1. Database Schema Mapping
Hệ thống dựa trên cấu trúc dữ liệu quan hệ chặt chẽ (Relational Data Model):
*   **Product Core:** `books` (Parent) ↔ `book_variants` (SKU/Price/Inventory) ↔ `inventory` (Stock).
*   **Views Layer (Read-Optimized):**
    *   `vw_books_full`: View tổng hợp cho Listing/Search (Join Books, Variants, Authors, Images).
    *   `vw_active_flash_sales`: View realtime cho Flash Sale đang active.
    *   `vw_orders_detail`: View chi tiết đơn hàng (Join Orders, Users, Vouchers, Carriers).
    *   `vw_low_stock_products`: View cảnh báo tồn kho thấp.
*   **Logic Layer (Stored Procedures & Triggers):**
    *   `sp_calculate_shipping_fee`: Logic tính phí vận chuyển động.
    *   `sp_check_stock_availability`: Kiểm tra tồn kho realtime.
    *   `sp_get_bestsellers`: Logic Ranking sản phẩm bán chạy.
    *   `trg_after_orderitem_insert`: Tự động giữ hàng (Reserved Stock).
    *   `trg_after_order_completed`: Tự động trừ kho thật và cập nhật Sold Count.

---

## II. DETAILED FEATURE SPECIFICATIONS

### 1. PHÂN HỆ KHÁCH HÀNG (STOREFRONT)

#### 1.1. Trang Chủ (Home Page)
**Mục tiêu:** Điều hướng nhanh và FOMO (Flash Sale).

*   **UI Components:**
    *   **Mega Menu:** Danh mục đa cấp (Văn học → Tiểu thuyết).
    *   **Flash Sale Block:** Đồng hồ đếm ngược + Progress Bar "Đã bán".
    *   **Bestsellers Grid:** Top 10 sách bán chạy nhất tuần.

*   **Data Binding (SQL Mapped):**
    *   **Mega Menu:** Query bảng `categories` (cột `id`, `name`, `slug`, `parent_id`, `image_url`) với đệ quy.
    *   **Flash Sale:** Query View `vw_active_flash_sales` để lấy: `book_title`, `sale_price`, `quantity_limit`, `sold_count`, `discount_percent`.
    *   **Bestsellers:** Gọi Procedure `sp_get_bestsellers(Limit=10, Days=7)`.

*   **Business Logic:**
    1.  **On Load:** Gọi song song 3 API (Menu, FlashSale, Bestsellers).
    2.  **Visual Logic:** Thanh trạng thái Flash Sale = `(sold_count / quantity_limit) * 100`. Nếu `sold_count >= quantity_limit` → Hiển thị "Cháy hàng".

#### 1.2. Trang Danh sách & Tìm kiếm (Listing & Search)
**Mục tiêu:** Tìm kiếm nhanh (Fulltext) và Lọc đa chiều.

*   **UI Components:**
    *   **Search Input:** Gợi ý từ khóa tự động.
    *   **Sidebar Filters:** Giá (`min_price` - `max_price`), Tác giả (`authors`), Nhà xuất bản (`publishers`).
    *   **Product Card:** Hiển thị dải giá "100k - 200k" (nếu nhiều variants). Badge "Freeship" nếu giá dự kiến > `free_ship_threshold`.

*   **Data Binding (SQL Mapped):**
    *   **Source:** Query View `vw_books_full` (Đã join sẵn Authors, Min/Max Price, Primary Image).
    *   **Search Engine:** Sử dụng Index `FULLTEXT ft_search` trên cột `title` và `description` của bảng `books`. Có thể dùng thêm `ft_search` trên `sku` của `book_variants`.
    *   **Filters:** `WHERE base_price BETWEEN X AND Y`, `WHERE publisher_id = Z`.

*   **Business Logic:**
    *   **Search Flow:** Client gửi keyword → API query `MATCH(title, description) AGAINST('keyword')` → Trả về List JSON.
    *   **Display:** Chỉ hiển thị sách có `is_active = 1` và `deleted_at IS NULL`. Sắp xếp theo `sold_count DESC` hoặc `avg_rating DESC` (có Index tối ưu).

#### 1.3. Trang Chi tiết Sách (Product Detail Page - PDP)
**Mục tiêu:** "Booking Flow" - Chọn đúng phiên bản (SKU) để mua.

*   **UI Components:**
    *   **Variant Selector:** Radio Buttons chọn "Bìa Mềm" / "Bìa Cứng".
    *   **Price Box:** Cập nhật realtime khi đổi Variant.
    *   **Review Section:** List đánh giá + Ảnh thực tế từ người mua.

*   **Data Binding (SQL Mapped):**
    *   **Product Info:** Bảng `books` (Title, Desc, ISBN) + `book_images` (Gallery).
    *   **Variants:** Bảng `book_variants` (SKU, Price, Cover Type, Thumbnail) + `inventory` (Quantity, Reserved).
    *   **Reviews:** Bảng `reviews` JOIN `users` (Name, Avatar). Ảnh từ `review_images`.

*   **Business Logic (Sequence):**
    1.  **Select Variant:** User chọn "Bìa Cứng" (`cover_type='hard'`) → Client tìm `variant_id` tương ứng trong List đã load.
    2.  **Update UI:** Giá đổi từ `min_price` (của Book) sang `price` (của Variant đó).
    3.  **Add to Cart Validity:** Gọi Procedure `sp_check_stock_availability(variant_id, qty)`.
        *   Logic View: `inventory.quantity - inventory.reserved_quantity`.
        *   Nếu `False` → Disable button, Toast Error: "Sản phẩm tạm hết hàng".

#### 1.4. Trang Giỏ hàng & Thanh toán (Cart & Checkout)
**Mục tiêu:** Transactional Integrity & Auto-Calculation.

*   **UI Components:**
    *   **Step Wizard:** Cart → Address → Shipping/Payment → Done.
    *   **Address Form:** Chọn Tỉnh/Thành (Dropdown) → Trigger tính phí ship.
    *   **Voucher Input:** Nhập mã giảm giá.

*   **Data Binding (SQL Mapped):**
    *   **Cart Items:** Bảng `carts` JOIN `book_variants` JOIN `books` (Check lại giá mới nhất).
    *   **Locations:** Bảng `provinces`, `districts` (Dropdown Data).
    *   **Shipping Rates:** Bảng `shipping_rates` (`base_fee`, `per_kg_fee`, `free_ship_threshold`).

*   **Business Logic (Critical):**
    1.  **Auto-Ship Calculation:** Ngay khi chọn `province_code`, gọi `sp_calculate_shipping_fee`.
        *   Input: `carrier_id`, `province_code`, `total_weight` (Sum `books.weight_grams * quantity`), `order_total`.
        *   Logic: Nếu `order_total >= free_ship_threshold` → Fee = 0.
    2.  **Voucher Check:** Query View `vw_active_vouchers`. Check `min_order_value` và `usage_limit`.
    3.  **Place Order (Transaction):**
        *   Insert `orders` → Insert `order_items`.
        *   **Trigger Magic:** Trigger `trg_after_orderitem_insert` sẽ TỰ ĐỘNG tăng `inventory.reserved_quantity` và ghi log `inventory_history`.
        *   **Fail-safe:** Nếu Kho không đủ (Trigger chặn do Constraint `chk_inventory_reserved`) → Rollback transaction, báo lỗi Client "Hết hàng vào phút chót".

#### 1.5. Trang Tài khoản & Loyalty (User Dashboard)
**Mục tiêu:** Retention & Membership.

*   **UI Components:**
    *   **Membership Card:** Hiển thị Hạng (Vàng/Bạc) và Progress Bar tích điểm.
    *   **Order History:** List đơn hàng theo Tabs (Chờ xử lý, Đang giao...).

*   **Data Binding (SQL Mapped):**
    *   **Profile:** Bảng `users` (`tier_id`, `reward_points`, `total_spent`).
    *   **Tiers:** Bảng `customer_tiers` (`name`, `benefits`, `discount_percent`).
    *   **History:** View `vw_orders_detail` (để lấy đủ tên User, tên Carrier, tên Voucher).

*   **Business Logic:**
    *   **Tier Update:** Gọi/Schedule Procedure `sp_update_user_tier(user_id)` sau khi đơn hàng `completed`.
    *   **Write Review:** Chỉ cho phép đánh giá các `order_items` có `is_reviewed = 0` và Order Status = `completed`. Trigger `trg_after_review_insert` sẽ tự tính lại `avg_rating` cho Book.

---

### 2. PHÂN HỆ QUẢN TRỊ (ADMIN DASHBOARD)

#### 2.1. Quản lý Sản phẩm (Product Lifecycle)
*   **UI Components:** Form đa tầng (Tabs: Info, Variants, SEO).
*   **Logic (Sequence):**
    *   **Edit:** Load `Book` Object kèm Array `BookVariant` và Array `BookImage` (Nested JSON response).
    *   **Price Log:** Hiển thị lịch sử thay đổi giá từ bảng `price_history`. Trigger `trg_after_variant_price_update` đã tự động ghi log này khi Admin update giá.
    *   **Inventory History:** Tab xem lịch sử xuất nhập tồn từ bảng `inventory_history`.

#### 2.2. Báo cáo & Kho hàng (Reports)
*   **UI Components:**
    *   **Chart:** Doanh thu (Query `orders` theo `completed_at`).
    *   **Low Stock Alert:** Widget đỏ cảnh báo nhập hàng.
*   **Data Binding:**
    *   **Alert:** Query View `vw_low_stock_products` (Lọc các item có `available_quantity <= min_stock_level`).
    *   **Revenue:** Aggregation query trên bảng `orders` (Sum `total_amount`).

---
*Tài liệu kỹ thuật này mapping 1:1 với Schema Database hiện tại. Dev Frontend và Backend phải tuân thủ nghiêm ngặt các tên bảng/cột và Logic Procedure đã định nghĩa.*
