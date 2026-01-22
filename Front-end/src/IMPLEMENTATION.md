# BookStore Frontend - Implementation Guide

## 📊 Trạng Thái Hiện Tại

**Phase 1:** ✅ HOÀN THÀNH (5/5 features)
- ✅ Customer Tiers System
- ✅ Reward Points System  
- ✅ Product Variants & Specs
- ✅ Shipping Calculator
- ✅ Flash Sales Section

**Phase 2A:** 🔴 CẦN LÀM (3 tasks - Essential)
**Phase 2B:** ⏸️ CHỜ (2 tasks - Important)
**Phase 2C:** ⏸️ CHỜ (2 tasks - Enhancement)

---

## 🔴 PHASE 2A - ESSENTIAL (Tuần 2)

### Task 1: Vouchers Page ⏳ CHỜ
**File:** `user/account/vouchers.html`  
**CSS:** `assets/css/vouchers.css`  
**Thời gian:** 3 giờ

**Checklist:**
- [ ] HTML structure với 3 tabs (Khả dụng, Đã dùng, Hết hạn)
- [ ] Voucher card component
- [ ] Copy voucher code button
- [ ] Expiry countdown timer
- [ ] Usage progress bar
- [ ] Tab switching JS
- [ ] Empty states
- [ ] Responsive mobile

**Database fields cần hiển thị:**
```
vouchers table:
- code, name, description
- discount_type, discount_value, max_discount
- min_order_value
- start_date, end_date
- usage_limit, used_count
```

---

### Task 2: Notifications Page ⏳ CHỜ
**File:** `user/account/notifications.html`  
**CSS:** `assets/css/notifications.css`  
**Thời gian:** 2 giờ

**Checklist:**
- [ ] HTML structure
- [ ] Notification card design
- [ ] Filter tabs (Tất cả, Đơn hàng, Khuyến mãi, Hệ thống)
- [ ] Mark as read functionality
- [ ] Time ago display
- [ ] Type icons (order/promo/system/review/reward)
- [ ] Empty state
- [ ] Responsive

**Database fields:**
```
notifications table:
- title, content
- type (order, promotion, system, review, reward)
- is_read, read_at
- created_at
```

---

### Task 3: Notification Bell (Header) ⏳ CHỜ
**Files:** Update ALL HTML files  
**CSS:** Update `assets/css/components.css`  
**Thời gian:** 1.5 giờ

**Checklist:**
- [ ] Add bell icon to header
- [ ] Unread count badge
- [ ] Dropdown notification list (5 mới nhất)
- [ ] Click outside to close
- [ ] CSS positioning & animation
- [ ] Update header trong 15 HTML files

**HTML to add:**
```html
<div class="header-notifications">
  <button class="notification-bell">
    <svg><!-- Bell --></svg>
    <span class="notification-count">5</span>
  </button>
  <div class="notification-dropdown">
    <!-- List 5 notifications -->
    <a href="account/notifications.html">Xem tất cả</a>
  </div>
</div>
```

---

### Task 4: Checkout Shipping Update ⏳ CHỜ
**File:** Update `user/checkout.html`  
**CSS:** Already have `assets/css/shipping-flash.css`  
**Thời gian:** 1.5 giờ

**Checklist:**
- [ ] Add shipping carriers section
- [ ] Carrier cards (GHTK, GHN, VTP, J&T)
- [ ] Carrier logos (SVG placeholders)
- [ ] Free shipping progress bar
- [ ] Points redemption section
- [ ] Calculate total (subtotal + shipping - voucher - points)
- [ ] Responsive

**HTML structure:**
```html
<!-- Shipping Section -->
<div class="shipping-section">
  <h3>Phương thức vận chuyển</h3>
  <div class="shipping-carriers">
    <label class="shipping-carrier">
      <input type="radio" name="carrier" value="GHTK" />
      <div class="shipping-carrier__content">
        <img src="path-to-logo" />
        <div>
          <strong>Giao Hàng Tiết Kiệm</strong>
          <span>2-3 ngày</span>
        </div>
        <div class="shipping-carrier__price">25.000₫</div>
      </div>
    </label>
  </div>
</div>

<!-- Points Redemption -->
<div class="points-redeem">
  <label>Sử dụng điểm (1 điểm = 10₫)</label>
  <div class="points-redeem__input-group">
    <input type="number" max="3850" placeholder="Nhập số điểm" />
    <button>Áp dụng</button>
  </div>
  <p>Số dư: 3,850 điểm (≈ 38,500₫)</p>
</div>
```

---

## ⏸️ PHASE 2B - IMPORTANT (Tuần 3)

### Task 5: Returns/Refunds Page
**File:** `user/account/returns.html`  
**CSS:** `assets/css/returns.css`  
**Thời gian:** 3 giờ

**Checklist:**
- [ ] Tabs (Yêu cầu mới, Đang xử lý, Hoàn thành)
- [ ] Return request form
- [ ] Image uploader (multiple)
- [ ] Reason selector dropdown
- [ ] Status timeline
- [ ] Refund amount display
- [ ] Admin notes display

---

### Task 6: Product Reviews Section
**File:** Update `user/product.html`  
**CSS:** `assets/css/reviews.css`  
**Thời gian:** 3 giờ

**Checklist:**
- [ ] Rating summary section
- [ ] Filter by stars (5⭐, 4⭐, etc.)
- [ ] Review cards list
- [ ] Review form (modal)
- [ ] Star rating input
- [ ] Pros/Cons fields
- [ ] Image upload
- [ ] "Hữu ích" button
- [ ] Verified purchase badge

---

## ⏸️ PHASE 2C - ENHANCEMENT (Tuần 4 - Optional)

### Task 7: Promotions Page
**File:** `user/promotions/all.html`

### Task 8: Multi-level Categories
**File:** Update `user/search.html` sidebar

---

## 📁 Cấu Trúc Thư Mục

```
src/
├── user/
│   ├── index.html ✅
│   ├── search.html ✅
│   ├── product.html ✅ (cần thêm reviews)
│   ├── cart.html ✅
│   ├── checkout.html ✅ (cần thêm shipping)
│   ├── wishlist.html ✅
│   ├── auth/
│   │   ├── login.html ✅
│   │   └── register.html ✅
│   ├── account/
│   │   ├── index.html ✅
│   │   ├── profile.html ✅
│   │   ├── orders.html ✅
│   │   ├── order.html ✅
│   │   ├── addresses.html ✅
│   │   ├── loyalty.html ✅
│   │   ├── rewards.html ✅
│   │   ├── vouchers.html 🔴 CẦN TẠO
│   │   ├── notifications.html 🔴 CẦN TẠO
│   │   └── returns.html 🔴 CẦN TẠO
│   └── promotions/
│       └── all.html 🔴 CẦN TẠO
└── assets/
    └── css/
        ├── main.css ✅
        ├── variables.css ✅
        ├── components.css ✅
        ├── tiers.css ✅
        ├── rewards.css ✅
        ├── product-detail.css ✅
        ├── shipping-flash.css ✅
        ├── search-filters.css ✅
        ├── vouchers.css 🔴 CẦN TẠO
        ├── notifications.css 🔴 CẦN TẠO
        ├── returns.css 🔴 CẦN TẠO
        └── reviews.css 🔴 CẦN TẠO
```

---

## 🎨 Reusable Components

### 1. Tab Component
```html
<div class="tabs">
  <button class="tab tab--active">Tab 1</button>
  <button class="tab">Tab 2</button>
</div>
```

### 2. Empty State
```html
<div class="empty-state">
  <svg><!-- Icon --></svg>
  <h3>Chưa có dữ liệu</h3>
  <button class="btn">Hành động</button>
</div>
```

### 3. Status Timeline
```html
<div class="timeline">
  <div class="timeline-item timeline-item--completed">
    <div class="timeline-marker"></div>
    <div class="timeline-content">
      <strong>Tiêu đề</strong>
      <time>22/01/2026</time>
    </div>
  </div>
</div>
```

### 4. Image Uploader
```html
<div class="image-uploader">
  <input type="file" multiple accept="image/*" />
  <div class="upload-preview"></div>
</div>
```

---

## ⚡ Lệnh Chạy

```bash
# Start dev server
python serve.py

# Mở browser
http://localhost:8000/user/index.html
```

---

## ✅ Pre-flight Checklist

Trước khi bắt đầu task mới:
- [ ] Read database schema (sql/create_tables.sql)
- [ ] Check existing components để reuse
- [ ] Prepare placeholder data
- [ ] Test trên browser

---

**Next Task:** Vouchers Page (3 giờ)  
**Start Date:** TBD  
**Status:** 📋 Ready to implement
