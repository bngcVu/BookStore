# BookStore Design System - AbeBooks Style

> **Phong cách thiết kế:** Classic, Professional, Trustworthy, Vintage/Academic  
> **Cảm giác:** Như đang lướt qua một hiệu sách lâu đời hoặc thư viện lớn  
> **Mục tiêu:** Marketplace bán sách cũ, sách hiếm, sách sưu tầm và sách mới

---

## 📁 Cấu trúc Design System

```
design-system/
├── README.md                    # File này - Hướng dẫn tổng quan
├── MASTER.md                    # Design System Master - Source of Truth
└── wireframes/
    ├── USER-PAGES.md            # Wireframes 12 trang USER
    └── ADMIN-PAGES.md           # Wireframes 7 module ADMIN
```

---

## 🎨 Design System Master (MASTER.md)

File `MASTER.md` là **Source of Truth** cho toàn bộ design system, bao gồm:

### 1. Color Palette
- **Primary Colors:** Dark Red (#8B0000), Navy (#1E3A5F), Gold (#D4A017)
- **Neutral Colors:** White, Gray-50 đến Gray-900, Black
- **Semantic Colors:** Success, Warning, Error, Info
- **Condition Badges:** Fine, Very Good, Good, Fair, Rare (10% opacity backgrounds)

### 2. Typography
- **Serif Fonts:** Georgia, Times New Roman, Book Antiqua (cho tiêu đề và nội dung chính)
- **Sans-serif Fonts:** Arial, Helvetica, Segoe UI (cho navigation, buttons, metadata)
- **Font Sizes:** xs (12px) đến 4xl (36px)
- **Font Weights:** Normal (400) đến Bold (700)

### 3. Component Styles
- **Buttons:** Primary (Dark Red), Secondary (Navy), Outline
- **Cards:** Product Card, Info Card với hover states
- **Badges:** Condition, Rare/Signed/First Edition
- **Links:** Dark Red với underline on hover
- **Forms:** Input, Search Bar (Large)

### 4. Layout & Spacing
- **Container:** Max-width 1280px
- **Grid:** 3-4 columns desktop, responsive
- **Spacing Scale:** xs (4px) đến 3xl (64px)

### 5. Effects & Interactions
- **Transitions:** 200ms ease, color/border only
- **Hover States:** Underline, border color, subtle shadow
- **No Animations:** Tránh scale, rotate, complex keyframes

### 6. Anti-Patterns
- ❌ Emojis làm icons
- ❌ Màu sắc flashy
- ❌ Animation phức tạp
- ❌ Typography hiện đại quá
- ✅ Serif fonts, information-rich, subtle effects

---

## 📐 Wireframes - USER Pages (USER-PAGES.md)

File `wireframes/USER-PAGES.md` chứa wireframes chi tiết cho **12 trang USER**:

### Trang chính (7 trang)
1. **Homepage** - Hero, Featured Books, Curated Lists
2. **Search / Product Listing** - Sidebar filters, 3-4 column grid
3. **Product Detail** - Image gallery, variant selector, seller info, reviews
4. **Basket / Cart** - Cart items, order summary, voucher code
5. **Checkout** - 3-step process (Shipping, Payment, Review)
6. **My Account** - Sidebar menu, main content area
7. **Order Detail** - Status timeline, order items, summary

### Account Sub-pages (5 trang)
- **Wishlist** - Product grid với "Remove" button
- **Addresses** - Saved addresses với default marker
- **Reward Points** - Points balance, VIP tier progress, history
- **Reviews** - My reviews với edit/delete
- **Profile** - Edit profile, change password

### Đặc điểm chung
- **Layout:** Desktop-first, responsive mobile
- **Header:** Fixed, logo + search bar lớn + navigation
- **Footer:** 4 columns (About, Help, Policies, Connect)
- **Product Card:** Thumbnail 150x220px, title, author, price, condition badge, seller info
- **Interaction:** Hover underline/border, no scale transforms

---

## 🔧 Wireframes - ADMIN Pages (ADMIN-PAGES.md)

File `wireframes/ADMIN-PAGES.md` chứa wireframes chi tiết cho **7 module ADMIN**:

### Modules
1. **Dashboard** - Stats grid, recent orders, sales chart
2. **Books & Inventory** - Books table, edit modal (5 tabs: Basic Info, Variants, Images, Inventory, SEO)
3. **Orders Management** - Orders table, order detail modal, status timeline
4. **Promotions** - 3 tabs (Vouchers, Flash Sales, Promotions)
5. **Users & Tiers** - 3 tabs (Customers, VIP Tiers, Reward Points)
6. **Content Management** - 4 tabs (Categories tree, Authors, Publishers, Shipping)
7. **Reports** - Sales overview, top products, customer insights, inventory alerts

### Đặc điểm chung
- **Layout:** Sidebar (20%) + Main Content (80%)
- **Header:** Navy background, white text, user dropdown
- **Sidebar:** White background, active item dark red
- **Tables:** Data-dense, sortable, filterable, pagination
- **Modals:** Max-width 800px, tabs for complex forms
- **Status Badges:** Color-coded (Pending, Confirmed, Shipping, Completed, Cancelled)

---

## 🚀 Cách sử dụng Design System

### Bước 1: Đọc MASTER.md
Trước khi implement bất kỳ trang nào, **BẮT BUỘC** đọc `MASTER.md` để hiểu:
- Color palette chính xác
- Typography hierarchy
- Component styles
- Anti-patterns cần tránh

### Bước 2: Chọn Wireframe phù hợp
- **Implement trang USER?** → Đọc `wireframes/USER-PAGES.md`
- **Implement trang ADMIN?** → Đọc `wireframes/ADMIN-PAGES.md`

### Bước 3: Follow Layout Structure
Mỗi wireframe có:
- **Layout Structure:** ASCII art diagram chi tiết
- **Component Details:** Specs cụ thể (size, padding, colors)
- **Responsive Behavior:** Breakpoints và layout changes
- **Interaction Patterns:** Hover, loading, empty, error states

### Bước 4: Implement với HTML/CSS
```html
<!-- Example: Product Card -->
<div class="product-card">
  <img src="book-cover.jpg" alt="Book Title" class="product-card__image">
  <h3 class="product-card__title">To Kill a Mockingbird</h3>
  <p class="product-card__author">by Harper Lee</p>
  <p class="product-card__price">$25.00</p>
  <span class="badge badge-fine">Fine</span>
  <span class="badge badge-rare">1st Edition</span>
  <p class="product-card__seller">Seller: Rare Books Emporium</p>
</div>
```

```css
/* Example: Product Card Styles */
.product-card {
  background: white;
  border: 1px solid var(--color-gray-100);
  padding: 16px;
  border-radius: 4px;
  transition: border-color 200ms, box-shadow 200ms;
  cursor: pointer;
}

.product-card:hover {
  border-color: var(--color-gray-200);
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

.product-card__title {
  font-family: var(--font-serif);
  font-size: var(--text-xl);
  font-weight: var(--font-bold);
  color: var(--color-black);
  margin-bottom: 8px;
}

.product-card__price {
  font-family: var(--font-sans);
  font-size: var(--text-lg);
  font-weight: var(--font-bold);
  color: var(--color-primary-dark-red);
}
```

---

## 📱 Responsive Guidelines

### Breakpoints
```css
/* Mobile */
@media (max-width: 767px) {
  /* 1-2 columns, stack layout */
}

/* Tablet */
@media (min-width: 768px) and (max-width: 1023px) {
  /* 2-3 columns, collapsible sidebar */
}

/* Desktop */
@media (min-width: 1024px) {
  /* 3-4 columns, full layout */
}

/* Large Desktop */
@media (min-width: 1440px) {
  /* Max container width 1280px */
}
```

### Mobile Adaptations
- **Header:** Stack logo, search, hamburger menu
- **Product Grid:** 1 column
- **Sidebar:** Collapsible drawer
- **Product Detail:** Stack image + info vertically
- **Cart/Checkout:** Stack items + summary vertically
- **Admin:** Hamburger menu, card view instead of tables

---

## ✅ Implementation Checklist

Trước khi deliver code, kiểm tra:

### Visual Quality
- [ ] Không dùng emojis làm icons (dùng SVG: Heroicons, Lucide)
- [ ] Serif fonts cho tiêu đề/nội dung, sans-serif cho UI elements
- [ ] Color palette đúng (Dark Red, Navy, Gold, Grayscale)
- [ ] Badges có 10% opacity background
- [ ] Hover states không gây layout shift

### Typography
- [ ] Title sách: text-xl/2xl, serif, bold
- [ ] Author: text-lg, serif, normal
- [ ] Price: text-lg, sans, bold, dark-red
- [ ] Metadata: text-sm/xs, sans, gray-600
- [ ] Line-height thoải mái (1.5-1.75)

### Layout
- [ ] Container max-width 1280px
- [ ] Product grid 3-4 columns desktop
- [ ] Spacing nhất quán (16-20px padding cho cards)
- [ ] Khoảng trắng đủ nhưng không quá nhiều (information-dense)

### Interaction
- [ ] Links: Dark red, underline on hover
- [ ] Cards: Border color change + subtle shadow on hover
- [ ] Buttons: Background darken on hover
- [ ] Không dùng scale/rotate transforms
- [ ] Transitions 200ms ease

### Responsive
- [ ] Mobile: 1 column, stack layout
- [ ] Tablet: 2-3 columns
- [ ] Desktop: 3-4 columns
- [ ] Search bar luôn nổi bật (large size)

### Accessibility
- [ ] Alt text cho images
- [ ] Labels cho form inputs
- [ ] High contrast (4.5:1 minimum)
- [ ] Keyboard navigation

---

## 🎯 Design Principles (Nhắc lại)

1. **Readability First** - Font size đủ lớn, contrast cao
2. **Information Density** - Hiển thị đầy đủ metadata (edition, condition, ISBN, seller)
3. **Trust & Credibility** - Professional, clean, no gimmicks
4. **Collector-Focused** - Badge rõ ràng cho rare/signed/first edition
5. **Classic Aesthetic** - Vintage bookstore vibe, academic feel
6. **No Distractions** - Minimal animations, focus on content
7. **Consistent Patterns** - Reuse components, predictable interactions
8. **Accessible** - High contrast, keyboard navigation, screen reader friendly

---

## 📚 Database Schema Reference

Design system này được thiết kế dựa trên database schema với các thực thể chính:

### Catalog
- `books`, `book_variants`, `book_images`, `authors`, `publishers`, `categories`

### E-commerce
- `carts`, `wishlists`, `orders`, `order_items`, `flash_sales`, `promotions`, `vouchers`

### User Management
- `users`, `user_addresses`, `customer_tiers`, `reward_points`

### Reviews & Ratings
- `reviews` (rating, title, comment, pros, cons, images, verified, visible)

### Inventory
- `inventory` (quantity, reserved_quantity, min_stock_level), `inventory_history`

### Shipping
- `carriers`, `shipping_rates` (theo province), `provinces`, `districts`

Tham khảo file SQL schema để hiểu rõ hơn về data structure.

---

## 🔄 Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-01-22 | Initial release - Complete design system với MASTER.md, USER-PAGES.md, ADMIN-PAGES.md |

---

## 📞 Support

Nếu có thắc mắc về design system, tham khảo:
1. `MASTER.md` - Design tokens, components, anti-patterns
2. `wireframes/USER-PAGES.md` - Layout chi tiết 12 trang USER
3. `wireframes/ADMIN-PAGES.md` - Layout chi tiết 7 module ADMIN

**Nguyên tắc vàng:** Khi nghi ngờ, hãy tham khảo AbeBooks.com (2024-2025) để đảm bảo phong cách classic, professional, trustworthy.

---

**Project:** BookStore - Used, Rare, Collectible & New Books Marketplace  
**Design System Version:** 1.0  
**Last Updated:** 2026-01-22
