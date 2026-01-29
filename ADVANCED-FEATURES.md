# ADVANCED FEATURES SPECIFICATION - BOOKSTORE PROJECT

> **Companion Document to:** `prompt.md` (Core Features)
> **Purpose:** Chi tiết hóa các tính năng nâng cao và optional modules.
> **Database Reference:** `create_tables.sql` + `database_optimizations.sql`

---

## TABLE OF CONTENTS

1. [Loyalty & Rewards System](#1-loyalty--rewards-system)
2. [Promotions & Campaigns](#2-promotions--campaigns)
3. [Wishlist & Personalization](#3-wishlist--personalization)
4. [Notifications Hub](#4-notifications-hub)
5. [Refunds & Returns Management](#5-refunds--returns-management)

---

## 1. LOYALTY & REWARDS SYSTEM

### 1.1. Mục tiêu Nghiệp vụ
Tạo chương trình tích điểm tự động để **tăng retention** và **khuyến khích mua lại**. Tương tự "Fahasa Xu" hoặc "Shopee Xu".

### 1.2. Database Schema Mapping

**Bảng chính:**
*   `customer_tiers`: Định nghĩa các hạng (Bạc, Vàng, Kim cương).
    *   Cột quan trọng: `min_spent` (Ngưỡng để lên hạng), `discount_percent` (Ưu đãi).
*   `reward_points`: Lịch sử giao dịch điểm (Earn/Redeem).
    *   Cột: `points` (Số điểm +/-), `type` (earn/redeem/expire), `reference_type` (order/review).
*   `loyalty_transactions`: Log chi tiết tích điểm (Redundant với `reward_points` nhưng có thêm `points_balance_after`).

**Stored Procedure:**
*   `sp_update_user_tier(user_id)`: Tự động nâng hạng user khi `total_spent` đủ ngưỡng.

### 1.3. UI Components (Frontend)

**A. Membership Card (User Dashboard)**
*   **Vị trí:** Tab đầu tiên trong Profile.
*   **Thiết kế:** Card gradient (Bạc = Xám, Vàng = Vàng óng, Kim cương = Xanh lam sang trọng).
*   **Thông tin hiển thị:**
    *   Tên hạng hiện tại (`customer_tiers.name`).
    *   Điểm hiện có (`users.reward_points`).
    *   Progress bar: "Còn 500.000đ để lên **Hạng Vàng**" (Tính từ `total_spent` so với `customer_tiers.min_spent` của tier tiếp theo).

**B. Points History Table**
*   **Cột:** Ngày, Loại giao dịch (Tích điểm/Đổi điểm/Hết hạn), Số điểm, Số dư, Ghi chú.
*   **Data:** Query `loyalty_transactions` ORDER BY `created_at DESC`.

### 1.4. Business Logic (Backend)

**Sequence: Earn Points (Tích điểm sau khi hoàn thành đơn hàng)**

```
1. User đặt đơn hàng → Order Status = 'completed'
2. Trigger: trg_after_order_completed (Đã có trong SQL)
   ├─ Update users.total_spent
   └─ (CẦN BỔ SUNG LOGIC) Calculate points = total_amount * tier_earn_rate
3. Insert vào reward_points:
   ├─ points = +500
   ├─ type = 'earn'
   ├─ reference_type = 'order'
   └─ reference_id = order.id
4. Update users.reward_points = reward_points + 500
5. Call sp_update_user_tier(user_id) để check lên hạng
```

**Sequence: Redeem Points (Đổi điểm khi Checkout)**

```
1. User nhập số điểm muốn dùng tại Checkout
2. Frontend validate: points <= users.reward_points
3. Backend tính giảm giá: discount = points * conversion_rate (VD: 100 điểm = 1.000đ)
4. Tạo order với:
   ├─ points_used = 500
   ├─ points_discount = 5000 (đồng)
   └─ total_amount = subtotal - points_discount
5. Insert vào reward_points:
   ├─ points = -500
   └─ type = 'redeem'
6. Update users.reward_points = reward_points - 500
```

### 1.5. Edge Cases & Validation

*   **Hết hạn điểm:** Nếu `reward_points.expires_at < NOW()`, Frontend không cho phép sử dụng.
*   **Tier downgrade:** Không có logic hạ hạng (User giữ hạng cao nhất đã đạt).
*   **Race condition:** Khi user dùng điểm đồng thời ở 2 device → Backend check bằng Transaction Lock.

---

## 2. PROMOTIONS & CAMPAIGNS

### 2.1. Mục tiêu Nghiệp vụ
Hỗ trợ các chiến dịch marketing phức tạp: **Mua 2 tặng 1**, **Combo giá sốc**, **Bundle discount**.

### 2.2. Database Schema Mapping

**Bảng chính:**
*   `promotions`: Định nghĩa chương trình khuyến mãi.
    *   Cột quan trọng:
        *   `type`: ENUM (percent, buy_x_get_y, combo, bundle_discount)
        *   `discount_percent`: Giảm % (cho type=percent)
        *   `buy_quantity`, `get_quantity`: Mua X tặng Y
        *   `bundle_discount_percent`: Giảm khi mua combo
*   `promotion_books`: Danh sách sách áp dụng khuyến mãi.
    *   Cột: `is_gift` (1 = Sách tặng kèm trong Buy X Get Y).

### 2.3. UI Components

**A. Product Badge (Listing & PDP)**
*   **Hiển thị:** Tag "Mua 2 tặng 1" hoặc "Combo -20%" trên Product Card.
*   **Logic:** Join `books` → `promotion_books` → `promotions` WHERE `is_active=1` AND `NOW() BETWEEN start_date AND end_date`.

**B. Promotion Detail Popup (PDP)**
*   **Trigger:** Click vào badge → Hiện modal.
*   **Nội dung:** Mô tả chi tiết (`promotions.description`), Thời gian còn lại, Danh sách sách áp dụng.

**C. Auto-Apply at Checkout**
*   **Logic:** Khi user thêm vào giỏ sách thuộc promotion:
    1.  Check `promotion.type`:
        *   `buy_x_get_y`: Nếu quantity >= buy_quantity → Tự động thêm gift book vào giỏ (đánh dấu `order_items.is_gift=1`).
        *   `bundle_discount`: Tính giảm giá trên tổng đơn.

### 2.4. Business Logic (Critical)

**Sequence: Calculate Promotion Discount**

```
1. User có 3 sách A (thuộc promo "Mua 2 tặng 1") trong giỏ
2. Backend query:
   SELECT * FROM promotions p
   JOIN promotion_books pb ON p.id = pb.promotion_id
   WHERE pb.book_id = A.id AND p.is_active = 1
3. Apply logic:
   ├─ buy_quantity = 2, get_quantity = 1
   ├─ User quantity = 3 → Eligible for 1 free book (3 / 2 = 1)
   └─ Tự động insert order_item với is_gift=1, discount_amount = giá sách A
4. Hiển thị dòng "Khuyến mãi: -150.000đ" trong Order Summary
```

### 2.5. Admin Management

**UI Admin - Tạo Promotion:**
*   Form với dropdown chọn `type`.
*   Dynamic fields dựa theo type:
    *   Type = `buy_x_get_y` → Hiện input "Mua bao nhiêu", "Tặng bao nhiêu".
    *   Type = `bundle` → Hiện input "Giảm %".
*   Multi-select Books để add vào `promotion_books`.

---

## 3. WISHLIST & PERSONALIZATION

### 3.1. Database Schema Mapping

**Bảng:**
*   `wishlists`: Lưu sách yêu thích của user.
    *   Constraint: UNIQUE (`user_id`, `book_id`) → Không thể thích trùng.
*   `user_book_interactions`: Track hành vi (view, wishlist, cart, purchase).
    *   Cột: `interaction_type`, `interaction_count`, `last_interaction_at`.
    *   **Dùng cho:** Machine Learning recommendation (Future).

### 3.2. UI Components

**A. Heart Icon Toggle (Product Card & PDP)**
*   **State:** Outline (Chưa thích) ↔ Filled Red (Đã thích).
*   **Action:** Click → API `POST /wishlist/add` hoặc `DELETE /wishlist/remove`.

**B. Wishlist Page**
*   **Layout:** Grid giống Listing Page.
*   **Extra:** Button "Chuyển tất cả vào giỏ" (Bulk add to cart).

### 3.3. Business Logic

**Sequence: Add to Wishlist**

```
1. User click Heart icon
2. Frontend check login status → Nếu chưa login → Redirect /login
3. API POST /wishlist { book_id: 123 }
4. Backend:
   ├─ INSERT INTO wishlists (user_id, book_id)
   └─ INSERT/UPDATE user_book_interactions (interaction_type='wishlist')
5. Response: { success: true, wishlist_count: 5 }
6. Frontend update Heart icon → Filled
```

**Analytics Use Case:**
*   Query `user_book_interactions` để biết:
    *   Top viewed books (Không mua).
    *   Wishlist → Purchase conversion rate.

---

## 4. NOTIFICATIONS HUB

### 4.1. Database Schema Mapping

**Bảng:**
*   `notifications`: Thông báo realtime.
    *   Cột quan trọng:
        *   `type`: ENUM (order, promotion, system, review, reward).
        *   `is_read`: Boolean.
        *   `reference_type`, `reference_id`: Link đến đơn hàng/voucher cụ thể.

### 4.2. UI Components

**A. Bell Icon (Header)**
*   **Badge:** Số thông báo chưa đọc (Count `WHERE is_read=0`).
*   **Dropdown:** List 5 thông báo gần nhất. Click "Xem tất cả" → Trang Notifications.

**B. Notification Item**
*   **Icon:** Màu sắc theo type (Order=Blue, Promotion=Orange, Reward=Gold).
*   **Text:** `notifications.title` (Bold nếu `is_read=0`).
*   **Action:** Click → Navigate to `reference_type` (VD: Order detail page) + Mark as read.

### 4.3. Business Logic

**Sequence: Push Notification**

```
1. Event trigger: Order status changed to 'shipping'
2. Backend insert vào notifications:
   ├─ user_id = order.user_id
   ├─ title = "Đơn hàng #ORD123 đang được giao"
   ├─ type = 'order'
   ├─ reference_type = 'order'
   └─ reference_id = order.id
3. (Optional) Send Email:
   └─ Update is_email_sent = 1
4. Frontend (Realtime):
   └─ WebSocket hoặc Polling API /notifications/unread → Update badge
```

---

## 5. REFUNDS & RETURNS MANAGEMENT

### 5.1. Database Schema Mapping

**Bảng:**
*   `refunds`: Yêu cầu hoàn tiền/trả hàng.
    *   Cột quan trọng:
        *   `type`: refund (Hoàn tiền) / return (Trả hàng) / exchange (Đổi hàng).
        *   `reason`: wrong_item, damaged, not_as_described, change_mind.
        *   `status`: pending → approved/rejected → processing → completed.
        *   `images`: JSON array chứa URL ảnh minh chứng.

### 5.2. UI Components

**A. User - Request Refund Form**
*   **Trigger:** Button "Yêu cầu hoàn tiền" trên Order Detail (Chỉ hiện nếu `order.status = 'delivered'` và trong 7 ngày).
*   **Form fields:**
    *   Chọn sản phẩm cần trả (nếu trả 1 phần).
    *   Chọn lý do (Dropdown).
    *   Mô tả chi tiết (Textarea).
    *   Upload ảnh (Tối đa 5 ảnh).
*   **Submit:** API `POST /refunds`.

**B. Admin - Refund Management Dashboard**
*   **Table:** List yêu cầu với filter theo status.
*   **Actions:**
    *   View detail (Popup) → Xem ảnh, mô tả.
    *   Approve/Reject → Update `refunds.status` và `refunds.admin_note`.

### 5.3. Business Logic

**Sequence: Process Refund (Admin approves)**

```
1. Admin click "Approve" refund #RF001
2. Backend:
   ├─ Update refunds.status = 'approved'
   ├─ Update refunds.processed_by = admin.id
   └─ Update refunds.processed_at = NOW()
3. Create refund payment:
   ├─ Insert vào payments (amount = -refund_amount, status='refunded')
   └─ Update order.payment_status = 'refunded'
4. (Optional) Restore inventory:
   └─ Update inventory.quantity += returned_quantity
5. Send notification:
   └─ Insert vào notifications (type='order', title='Yêu cầu hoàn tiền đã được chấp nhận')
```

**Constraint (Database):**
*   Không cho phép refund nếu order.status = 'cancelled' (Check ở Backend).

---

## IMPLEMENTATION PRIORITY

Dựa trên Business Impact và Technical Complexity:

| Feature | Priority | Impact | Effort | Rationale |
|---------|----------|--------|--------|-----------|
| **Wishlist** | 🔥 High | High (UX) | Low | Dễ implement, tăng engagement ngay |
| **Loyalty & Rewards** | 🔥 High | Very High (Retention) | Medium | Core cho retention strategy |
| **Notifications** | 🟡 Medium | Medium (UX) | Medium | Cần WebSocket/Polling |
| **Promotions** | 🟡 Medium | High (Conversion) | High | Logic phức tạp (Stacking rules) |
| **Refunds** | 🟢 Low | Medium (Trust) | High | Ít xảy ra, nhưng cần thiết |

**Đề xuất Roadmap:**
*   **Sprint 1:** Wishlist (Quick win).
*   **Sprint 2:** Loyalty & Rewards (Foundation).
*   **Sprint 3:** Basic Notifications (Email first, WebSocket later).
*   **Sprint 4:** Simple Promotions (Percent discount only).
*   **Sprint 5:** Refunds (Khi có CS team).

---

*Tài liệu này sẽ được update liên tục khi phát triển các tính năng mới. Luôn sync với `prompt.md` để đảm bảo consistency.*
