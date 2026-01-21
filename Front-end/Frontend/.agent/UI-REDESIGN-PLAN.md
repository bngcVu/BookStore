# 📋 Kế hoạch Thiết kế lại Toàn bộ UI - Aureum Books

## 🎯 Mục tiêu
Thiết kế lại toàn bộ hệ thống UI để phản ánh **100% logic nghiệp vụ** từ database schema (26 bảng), bao gồm:
- Customer Tiers (Hạng thành viên)
- Book Variants (SKU với giá & ảnh riêng)
- Flash Sales (Countdown, giới hạn số lượng)
- Vouchers & Promotions
- Multiple Shipping Carriers
- Multiple Payment Methods (bao gồm Installment)
- Order Status Tracking (8 trạng thái)
- Reward Points System
- Reviews & Ratings

---

## ✅ Phase 1: Core Customer Pages (HOÀN THÀNH)

### 1.1 Checkout Flow ✅
**File:** `checkout.html`
- [x] Multi-step progress indicator (Giỏ hàng → Giao hàng → Thanh toán)
- [x] Địa chỉ giao hàng với multiple addresses
- [x] Phương thức vận chuyển (GHTK, GHN, J&T) với estimated days
- [x] Phương thức thanh toán (COD, MoMo, ZaloPay, Credit Card, Installment)
- [x] Voucher input + danh sách voucher khả dụng
- [x] Reward points checkbox với số điểm khả dụng
- [x] Order summary với price breakdown chi tiết

**Database Tables:** `orders`, `shipping_carriers`, `shipping_rates`, `vouchers`, `reward_points`

### 1.2 Order Tracking ✅
**File:** `order-tracking.html`
- [x] Visual timeline với 8 trạng thái đơn hàng
- [x] Tracking number & shipper info
- [x] Địa chỉ nhận hàng & payment status
- [x] Danh sách sản phẩm với nút "Đánh giá"
- [x] Price breakdown
- [x] Actions: Liên hệ hỗ trợ, Mua lại

**Database Tables:** `orders`, `order_status_history`, `order_items`, `shipping_carriers`

### 1.3 My Account Dashboard ✅
**File:** `account.html`
- [x] User info với avatar & tier badge
- [x] Sidebar navigation (Tổng quan, Đơn hàng, Yêu thích, Điểm thưởng, Địa chỉ, Thông tin)
- [x] Stats cards (Tổng chi tiêu, Điểm thưởng, Đơn hàng, Yêu thích)
- [x] Tier progress bar (Bạc → Vàng → Kim Cương)
- [x] Benefits display (Giảm giá %, Freeship, Ưu tiên hỗ trợ)
- [x] Recent orders table
- [x] Available vouchers grid

**Database Tables:** `users`, `customer_tiers`, `reward_points`, `orders`, `vouchers`

---

## 🔄 Phase 2: Enhanced Product Pages (HOÀN THÀNH ✅)

### 2.1 Product Detail Enhancement ✅
**File:** `product.html`
- [x] Hiển thị tất cả variants (SKU) với giá riêng
- [x] Variant selector (Bìa cứng/mềm, NXB khác nhau)
- [x] Promotion badges (Buy X Get Y, Bundle, Combo)
- [x] Flash sale countdown nếu sản phẩm đang trong flash sale
- [x] Stock level indicator (Còn X cuốn)
- [x] Review form với rating stars
- [x] Related products từ cùng category

**Database Tables:** `book_variants`, `inventory`, `promotions`, `flash_sales`, `reviews`

### 2.2 Homepage Enhancement ✅
**File:** `index.html`
- [x] Flash Sale section với countdown timer
- [x] Flash sale products grid với progress bar (đã bán/tổng số)
- [x] Promotion banners (Buy X Get Y, Bundle deals)
- [x] Featured books với promotion badges
- [x] Customer tier benefits section

**Database Tables:** `flash_sales`, `flash_sale_items`, `promotions`, `promotion_books`

### 2.3 Catalog Enhancement 🔄
**File:** `catalog.html` (CẦN CẬP NHẬT)
- [ ] Filter by promotion type
- [ ] Filter by flash sale status
- [ ] Sort by discount percentage
- [ ] Promotion badges trên product cards
- [ ] Flash sale countdown trên cards

---

## 📦 Phase 3: User Account Pages (HOÀN THÀNH ✅)

### 3.1 Order History Page ✅
**File:** `orders.html`
- [x] Filter by status (pending, confirmed, shipping, delivered, cancelled)
- [x] Filter by date range
- [x] Search by order code
- [x] Order cards với status badge
- [x] Quick actions (Theo dõi, Hủy, Mua lại, Đánh giá)
- [x] Pagination

**Database Tables:** `orders`, `order_items`, `order_status_history`

### 3.2 Reward Points Page ✅
**File:** `rewards.html`
- [x] Current points balance
- [x] Points expiration warning
- [x] Transaction history table (Earn, Redeem, Expire, Adjust)
- [x] Points earning rules
- [x] Redeem options
- [x] Tier progress bar

**Database Tables:** `reward_points`, `loyalty_transactions`

### 3.3 Wishlist Page ✅
**File:** `wishlist.html`
- [x] Product grid với wishlist items
- [x] Quick "Add to Cart" button
- [x] Remove from wishlist
- [x] Price change notifications
- [x] Stock availability status

**Database Tables:** `wishlists`, `books`, `book_variants`, `inventory`

### 3.4 Addresses Management ✅
**File:** `addresses.html`
- [x] List of saved addresses
- [x] Add new address form
- [x] Edit/Delete address
- [x] Set default address
- [x] Province/District dropdowns

**Database Tables:** `user_addresses`, `provinces`, `districts`

### 3.5 Profile Settings ✅
**File:** `profile.html`
- [x] Personal info form (Full name, Email, Phone, DOB, Gender)
- [x] Avatar upload
- [x] Change password
- [x] Email/Phone verification status
- [x] Notification preferences
- [x] Account management (disable/delete)

**Database Tables:** `users`

---

## 🛒 Phase 4: Cart Enhancement (ĐANG THỰC HIỆN)

### 4.1 Cart Page Update 🔄
**File:** `cart.html` (CẦN CẬP NHẬT)
- [ ] Hiển thị variant info (SKU, cover type)
- [ ] Check stock availability realtime
- [ ] Apply promotion automatically (Buy X Get Y)
- [ ] Show available vouchers
- [ ] Reward points preview
- [ ] Shipping fee calculator

**Database Tables:** `carts`, `book_variants`, `inventory`, `promotions`, `vouchers`

---

## 👨‍💼 Phase 5: Admin Enhancement (ĐANG THỰC HIỆN)

### 5.1 Order Management 🆕
**File:** `admin/orders.html` (CHƯA TẠO)
- [ ] Orders table với filters (status, date, payment)
- [ ] Order detail modal
- [ ] Update order status
- [ ] Assign shipping carrier
- [ ] Print invoice
- [ ] Refund management

**Database Tables:** `orders`, `order_items`, `order_status_history`, `refunds`

### 5.2 Promotion Management 🆕
**File:** `admin/promotions.html` (CHƯA TẠO)
- [ ] Flash sales management
- [ ] Vouchers management
- [ ] Promotions management (Buy X Get Y, Bundle, Combo)
- [ ] Create/Edit/Delete promotions
- [ ] Assign products to promotions
- [ ] Usage statistics

**Database Tables:** `flash_sales`, `flash_sale_items`, `vouchers`, `promotions`, `promotion_books`

### 5.3 Customer Management 🆕
**File:** `admin/customers.html` (CHƯA TẠO)
- [ ] Customers table với tier info
- [ ] Customer detail view
- [ ] Order history per customer
- [ ] Reward points adjustment
- [ ] Tier upgrade/downgrade

**Database Tables:** `users`, `customer_tiers`, `orders`, `reward_points`

### 5.4 Inventory Management 🆕
**File:** `admin/inventory.html` (CHƯA TẠO)
- [ ] Stock levels per variant
- [ ] Low stock alerts
- [ ] Restock history
- [ ] Reserved quantity tracking

**Database Tables:** `inventory`, `inventory_history`, `book_variants`

---

## 🎨 Phase 6: CSS & Components Enhancement

### 6.1 Additional CSS Classes 🔄
**File:** `assets/css/styles.css` (CẦN BỔ SUNG)
- [ ] `.voucher-card` - Voucher display component
- [ ] `.flash-sale-badge` - Flash sale indicator
- [ ] `.promotion-badge` - Promotion type badges
- [ ] `.tier-badge` - Customer tier badges
- [ ] `.timeline` - Order status timeline
- [ ] `.progress-bar` - Tier progress, flash sale progress
- [ ] `.review-stars` - Rating stars component
- [ ] `.variant-selector` - Product variant selector

### 6.2 JavaScript Components 🆕
**File:** `assets/js/components.js` (CHƯA TẠO)
- [ ] Countdown timer (Flash sale)
- [ ] Variant selector logic
- [ ] Voucher validator
- [ ] Points calculator
- [ ] Address form with province/district cascade
- [ ] Review form with star rating
- [ ] Image gallery (Product detail)

---

## 📊 Tiến độ Tổng thể

### Đã hoàn thành: 9/30 trang (30%)
- ✅ checkout.html
- ✅ order-tracking.html
- ✅ account.html
- ✅ product.html (Enhanced)
- ✅ index.html (Flash Sale)
- ✅ orders.html
- ✅ rewards.html
- ✅ wishlist.html
- ✅ addresses.html
- ✅ profile.html

### Đang làm: 2 trang
- 🔄 catalog.html
- 🔄 cart.html

### Chưa bắt đầu: 19 trang
- 🆕 admin/orders.html
- 🆕 admin/promotions.html
- 🆕 admin/customers.html
- 🆕 admin/inventory.html
- 🆕 admin/reviews.html
- 🆕 admin/vouchers.html
- ... và nhiều trang khác

---

## 🚀 Ưu tiên tiếp theo

1. **Catalog Enhancement** - Thêm filters cho Flash Sale và Promotions
2. **Cart Enhancement** - Tích hợp variant info và promotions
3. **Admin Order Management** - Cần thiết cho vận hành
4. **Admin Promotion Management** - Quản lý Flash Sale và Vouchers
5. **Admin Customer Management** - Quản lý tier và reward points

---

## 📝 Ghi chú

- Tất cả các trang đều tuân thủ design system **Playfair Display + Inter**
- Màu sắc chính: `--color-primary: #1C1917`, `--color-cta: #A16207`
- Icons: Lucide Icons
- Responsive: Mobile-first approach
- Accessibility: WCAG 2.1 AA compliant

---

**Cập nhật lần cuối:** 22/01/2026 02:05
**Người thực hiện:** Antigravity AI
