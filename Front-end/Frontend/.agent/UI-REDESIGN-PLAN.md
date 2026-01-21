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

## 🔄 Phase 2: Enhanced Product Pages (ĐANG THỰC HIỆN)

### 2.1 Product Detail Enhancement 🔄
**File:** `product.html` (CẦN CẬP NHẬT)
- [ ] Hiển thị tất cả variants (SKU) với giá riêng
- [ ] Variant selector (Bìa cứng/mềm, NXB khác nhau)
- [ ] Promotion badges (Buy X Get Y, Bundle, Combo)
- [ ] Flash sale countdown nếu sản phẩm đang trong flash sale
- [ ] Stock level indicator (Còn X cuốn)
- [ ] Review form với rating stars
- [ ] Related products từ cùng category

**Database Tables:** `book_variants`, `inventory`, `promotions`, `flash_sales`, `reviews`

### 2.2 Homepage Enhancement 🔄
**File:** `index.html` (CẦN CẬP NHẬT)
- [ ] Flash Sale section với countdown timer
- [ ] Flash sale products grid với progress bar (đã bán/tổng số)
- [ ] Promotion banners (Buy X Get Y, Bundle deals)
- [ ] Featured books với promotion badges
- [ ] Customer tier benefits section (đã có nhưng cần cải thiện)

**Database Tables:** `flash_sales`, `flash_sale_items`, `promotions`, `promotion_books`

### 2.3 Catalog Enhancement 🔄
**File:** `catalog.html` (CẦN CẬP NHẬT)
- [ ] Filter by promotion type
- [ ] Filter by flash sale status
- [ ] Sort by discount percentage
- [ ] Promotion badges trên product cards
- [ ] Flash sale countdown trên cards

---

## 📦 Phase 3: User Account Pages (ĐANG THỰC HIỆN)

### 3.1 Order History Page 🆕
**File:** `orders.html` (CHƯA TẠO)
- [ ] Filter by status (pending, confirmed, shipping, delivered, cancelled)
- [ ] Filter by date range
- [ ] Search by order code
- [ ] Order cards với status badge
- [ ] Quick actions (Theo dõi, Hủy, Mua lại, Đánh giá)
- [ ] Pagination

**Database Tables:** `orders`, `order_items`, `order_status_history`

### 3.2 Reward Points Page 🆕
**File:** `rewards.html` (CHƯA TẠO)
- [ ] Current points balance
- [ ] Points expiration warning
- [ ] Transaction history table (Earn, Redeem, Expire, Adjust)
- [ ] Points earning rules
- [ ] Redeem options

**Database Tables:** `reward_points`, `loyalty_transactions`

### 3.3 Wishlist Page 🆕
**File:** `wishlist.html` (CHƯA TẠO)
- [ ] Product grid với wishlist items
- [ ] Quick "Add to Cart" button
- [ ] Remove from wishlist
- [ ] Price change notifications
- [ ] Stock availability status

**Database Tables:** `wishlists`, `books`, `book_variants`, `inventory`

### 3.4 Addresses Management 🆕
**File:** `addresses.html` (CHƯA TẠO)
- [ ] List of saved addresses
- [ ] Add new address form
- [ ] Edit/Delete address
- [ ] Set default address
- [ ] Province/District dropdowns

**Database Tables:** `user_addresses`, `provinces`, `districts`

### 3.5 Profile Settings 🆕
**File:** `profile.html` (CHƯA TẠO)
- [ ] Personal info form (Full name, Email, Phone, DOB, Gender)
- [ ] Avatar upload
- [ ] Change password
- [ ] Email/Phone verification status
- [ ] Account status

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

### Đã hoàn thành: 3/30 trang (10%)
- ✅ checkout.html
- ✅ order-tracking.html
- ✅ account.html

### Đang làm: 4 trang
- 🔄 product.html
- 🔄 index.html
- 🔄 catalog.html
- 🔄 cart.html

### Chưa bắt đầu: 23 trang
- 🆕 orders.html
- 🆕 rewards.html
- 🆕 wishlist.html
- 🆕 addresses.html
- 🆕 profile.html
- 🆕 admin/orders.html
- 🆕 admin/promotions.html
- 🆕 admin/customers.html
- 🆕 admin/inventory.html
- ... và nhiều trang khác

---

## 🚀 Ưu tiên tiếp theo

1. **Product Detail Enhancement** - Quan trọng nhất vì ảnh hưởng trực tiếp đến conversion
2. **Homepage Flash Sale** - Tạo urgency và tăng traffic
3. **Orders History** - Cần thiết cho user experience
4. **Reward Points Page** - Tăng engagement
5. **Admin Order Management** - Cần thiết cho vận hành

---

## 📝 Ghi chú

- Tất cả các trang đều tuân thủ design system **Playfair Display + Inter**
- Màu sắc chính: `--color-primary: #1C1917`, `--color-cta: #A16207`
- Icons: Lucide Icons
- Responsive: Mobile-first approach
- Accessibility: WCAG 2.1 AA compliant

---

**Cập nhật lần cuối:** 22/01/2026 01:52
**Người thực hiện:** Antigravity AI
