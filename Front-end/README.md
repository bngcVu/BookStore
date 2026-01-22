# BookStore Frontend

> **Phong cách thiết kế:** AbeBooks Classic (2024-2025) - Professional, Trustworthy, Vintage/Academic  
> **Mục tiêu:** Marketplace bán sách cũ, sách hiếm, sách sưu tầm và sách mới  
> **Tech Stack:** HTML5, Vanilla CSS, Vanilla JavaScript

---

## 📁 Cấu trúc thư mục

```
Front-end/
├── README.md                       # File này - Tổng quan Frontend
├── IMPLEMENTATION-PLAN.md          # Timeline 4 tuần, CSS/JS architecture
├── design-system/                  # Design System (HOÀN THÀNH ✅)
│   ├── INDEX.md                    # Tổng hợp deliverables
│   ├── README.md                   # Hướng dẫn sử dụng Design System
│   ├── MASTER.md                   # Design tokens, components, anti-patterns
│   └── wireframes/
│       ├── USER-PAGES.md           # Wireframes 12 trang USER
│       └── ADMIN-PAGES.md          # Wireframes 7 module ADMIN
└── sql/                            # Database scripts (reference)
    └── scripts/
        └── ...
```

---

## ✅ Đã hoàn thành

### 1. Design System (design-system/)
**Status:** ✅ Complete (2026-01-22)

#### Files
- **INDEX.md** (16 KB) - Tổng hợp deliverables, statistics, design principles
- **MASTER.md** (10 KB) - Design tokens, components, anti-patterns
- **README.md** (11 KB) - Hướng dẫn sử dụng Design System
- **wireframes/USER-PAGES.md** (35 KB) - Wireframes 12 trang USER
- **wireframes/ADMIN-PAGES.md** (32 KB) - Wireframes 7 module ADMIN

#### Coverage
- **USER Pages:** 12 trang (Homepage, Search, Product Detail, Cart, Checkout, Account + 5 sub-pages, Order Detail)
- **ADMIN Pages:** 7 modules (Dashboard, Books & Inventory, Orders, Promotions, Users & Tiers, Content, Reports)
- **Total pages designed:** 19 trang

#### Components
- **Buttons:** 3 variants (Primary, Secondary, Outline)
- **Cards:** 2 types (Product Card, Info Card)
- **Badges:** 5 types (Fine, Very Good, Good, Fair, Rare)
- **Forms:** 2 types (Input, Search Bar)
- **Tables:** Admin data tables với sorting, filtering, pagination
- **Modals:** CRUD modals cho Books, Orders, Promotions, Users
- **Charts:** Line chart (Sales), Pie chart (Customer segments)

---

## 🚀 Triển khai tiếp theo

### Phase 1: Implementation (4 tuần - 160 giờ)
Theo **IMPLEMENTATION-PLAN.md**:

#### Tuần 1: Foundation & Core Components (40h)
- [ ] Setup project structure
- [ ] `assets/css/variables.css` - CSS variables từ MASTER.md
- [ ] `assets/css/reset.css` - CSS reset/normalize
- [ ] `assets/css/components.css` - Buttons, cards, badges, forms
- [ ] `assets/css/layout.css` - Container, grid, spacing
- [ ] `assets/js/utils.js` - DOM helpers, formatters
- [ ] `assets/js/api.js` - Mock API calls
- [ ] `assets/js/components.js` - Modal, Tabs, Dropdown

**Deliverables:** CSS variables system, Component library, JS utilities

#### Tuần 2: USER Pages - Core Shopping Flow (40h)
- [ ] `user/index.html` - Homepage (Header, Hero, Featured Books, Footer)
- [ ] `user/search.html` - Search/Listing (Sidebar filters, Product grid, Pagination)
- [ ] `user/product.html` - Product Detail (Image gallery, Variant selector, Reviews)

**Deliverables:** Homepage, Search page, Product detail page

#### Tuần 3: USER Pages - Cart, Checkout & Account (40h)
- [ ] `user/cart.html` - Shopping Cart
- [ ] `user/checkout.html` - Checkout (3 steps)
- [ ] `user/account/` - My Account (8 pages: index, orders, order-detail, wishlist, addresses, rewards, reviews, profile)
- [ ] `user/auth/` - Auth pages (login, register)

**Deliverables:** Cart, Checkout, Account section (8 pages), Auth pages

#### Tuần 4: ADMIN Pages (40h)
- [ ] `admin/index.html` - Dashboard
- [ ] `admin/books.html` - Books & Inventory (Edit Book Modal với 5 tabs)
- [ ] `admin/orders.html` - Orders Management (Order Detail Modal)
- [ ] `admin/promotions.html` - Promotions (3 tabs: Vouchers, Flash Sales, Promotions)
- [ ] `admin/users.html` - Users & Tiers (3 tabs)
- [ ] `admin/content.html` - Content Management (4 tabs)
- [ ] `admin/reports.html` - Reports

**Deliverables:** Complete admin panel (7 modules)

---

## 🎨 Design Principles

### 1. Color Palette
- **Primary:** Dark Red (#8B0000), Navy (#1E3A5F), Gold (#D4A017)
- **Neutral:** White → Gray-50 → Gray-900 → Black
- **Semantic:** Success, Warning, Error, Info
- **Badges:** 10% opacity backgrounds

### 2. Typography
- **Serif:** Georgia, Times New Roman (tiêu đề, nội dung)
- **Sans-serif:** Arial, Helvetica (navigation, buttons, metadata)
- **Sizes:** xs (12px) → 4xl (36px)
- **Weights:** Normal (400) → Bold (700)

### 3. Layout
- **Container:** Max-width 1280px
- **Grid:** 3-4 columns desktop, responsive
- **Spacing:** xs (4px) → 3xl (64px)

### 4. Interactions
- **Transitions:** 200ms ease, color/border only
- **Hover:** Underline, border color, subtle shadow
- **No animations:** Scale, rotate, complex keyframes

### 5. Anti-Patterns
- ❌ Emojis làm icons → ✅ SVG icons (Heroicons, Lucide)
- ❌ Màu sắc flashy → ✅ Classic palette (Dark Red, Navy, Gold)
- ❌ Animation phức tạp → ✅ Subtle transitions
- ❌ Typography hiện đại → ✅ Serif fonts (Georgia, Times New Roman)

---

## 📚 Hướng dẫn sử dụng

### Bước 1: Đọc Design System
1. **design-system/INDEX.md** - Tổng quan deliverables
2. **design-system/MASTER.md** - Design tokens, components, anti-patterns
3. **design-system/README.md** - Hướng dẫn sử dụng

### Bước 2: Chọn Wireframe
- **USER Pages?** → `design-system/wireframes/USER-PAGES.md`
- **ADMIN Pages?** → `design-system/wireframes/ADMIN-PAGES.md`

### Bước 3: Follow Implementation Plan
- **IMPLEMENTATION-PLAN.md** - Timeline 4 tuần, CSS/JS architecture, testing checklist

### Bước 4: Implement
```bash
# Tạo cấu trúc thư mục
mkdir -p assets/{css,js,images/icons}
mkdir -p user/{account,auth}
mkdir -p admin

# Tạo CSS files
touch assets/css/{variables,reset,components,layout,main}.css

# Tạo JS files
touch assets/js/{utils,api,components,main}.js

# Tạo HTML files (USER)
touch user/{index,search,product,cart,checkout}.html
touch user/account/{index,orders,order-detail,wishlist,addresses,rewards,reviews,profile}.html
touch user/auth/{login,register}.html

# Tạo HTML files (ADMIN)
touch admin/{index,books,orders,promotions,users,content,reports}.html
```

---

## ✅ Implementation Checklist

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
- [ ] Keyboard navigation (Tab, Enter, Esc)
- [ ] Focus states visible

---

## 🔗 Database Schema Reference

Design system được thiết kế dựa trên database schema trong `sql/scripts/`:

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

---

## 📊 Statistics

### Design System
- **Files created:** 5
- **Total size:** ~105 KB
- **Total sections:** 32
- **Pages designed:** 19 (12 USER + 7 ADMIN)
- **Components designed:** 20+

### Timeline
- **Design Phase:** ✅ Complete (2026-01-22)
- **Implementation Phase:** 🚀 Ready to start (4 tuần - 160 giờ)
- **Backend Integration:** Pending
- **Testing & Optimization:** Pending
- **Production Deployment:** Pending

---

## 🎯 Design Goals

1. **Readability First** - Font size đủ lớn, contrast cao
2. **Information Density** - Hiển thị đầy đủ metadata (edition, condition, ISBN, seller)
3. **Trust & Credibility** - Professional, clean, no gimmicks
4. **Collector-Focused** - Badge rõ ràng cho rare/signed/first edition
5. **Classic Aesthetic** - Vintage bookstore vibe, academic feel
6. **No Distractions** - Minimal animations, focus on content
7. **Consistent Patterns** - Reuse components, predictable interactions
8. **Accessible** - High contrast, keyboard navigation, screen reader friendly

---

## 📞 Support

### Documentation
1. **design-system/INDEX.md** - Tổng hợp deliverables
2. **design-system/MASTER.md** - Design tokens, components
3. **design-system/wireframes/USER-PAGES.md** - Layout 12 trang USER
4. **design-system/wireframes/ADMIN-PAGES.md** - Layout 7 module ADMIN
5. **IMPLEMENTATION-PLAN.md** - Timeline 4 tuần, CSS/JS architecture

### Reference
- **AbeBooks.com** (2024-2025) - Main design reference

---

## 🔄 Version History

| Version | Date | Phase | Status |
|---------|------|-------|--------|
| 1.0 | 2026-01-22 | Design System | ✅ Complete |
| 2.0 | TBD | Implementation | 🚀 Ready to start |
| 3.0 | TBD | Backend Integration | Pending |
| 4.0 | TBD | Testing & Optimization | Pending |
| 5.0 | TBD | Production Deployment | Pending |

---

**Project:** BookStore - Used, Rare, Collectible & New Books Marketplace  
**Current Status:** 📐 Design Phase Complete → 🚀 Ready for Implementation  
**Next Step:** Follow **IMPLEMENTATION-PLAN.md** để bắt đầu Tuần 1 (Foundation & Core Components)

---

**Nguyên tắc vàng:** Khi nghi ngờ, hãy tham khảo AbeBooks.com (2024-2025) để đảm bảo phong cách classic, professional, trustworthy.
