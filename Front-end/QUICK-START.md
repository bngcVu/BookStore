# 📋 QUICK START - BookStore Frontend Design System

> **Status:** ✅ Design System Complete (2026-01-22)  
> **Next:** 🚀 Ready for Implementation

---

## 🎯 Bạn đã có gì?

### ✅ Design System hoàn chỉnh (6 files)

1. **Front-end/README.md** - Tổng quan Frontend
2. **Front-end/IMPLEMENTATION-PLAN.md** - Timeline 4 tuần (160 giờ)
3. **Front-end/design-system/INDEX.md** - Tổng hợp deliverables
4. **Front-end/design-system/MASTER.md** - Design tokens, components
5. **Front-end/design-system/wireframes/USER-PAGES.md** - 12 trang USER
6. **Front-end/design-system/wireframes/ADMIN-PAGES.md** - 7 module ADMIN

### 📊 Coverage

- **USER Pages:** 12 trang (Homepage, Search, Product Detail, Cart, Checkout, Account + 5 sub-pages, Order Detail)
- **ADMIN Pages:** 7 modules (Dashboard, Books & Inventory, Orders, Promotions, Users & Tiers, Content, Reports)
- **Components:** 20+ (Buttons, Cards, Badges, Forms, Tables, Modals, Charts)
- **Total size:** ~105 KB documentation

---

## 🚀 Bắt đầu Implementation

### Bước 1: Đọc Design System (30 phút)

```bash
# Đọc theo thứ tự:
1. Front-end/README.md                              # Tổng quan
2. Front-end/design-system/MASTER.md                # Design tokens
3. Front-end/design-system/wireframes/USER-PAGES.md # Layout USER
4. Front-end/design-system/wireframes/ADMIN-PAGES.md # Layout ADMIN
```

### Bước 2: Setup Project (Tuần 1 - Ngày 1-2)

```bash
# Tạo cấu trúc thư mục
cd Front-end
mkdir -p assets/{css,js,images/icons}
mkdir -p user/{account,auth}
mkdir -p admin

# Tạo CSS files
touch assets/css/variables.css   # CSS variables từ MASTER.md
touch assets/css/reset.css       # CSS reset
touch assets/css/components.css  # Buttons, cards, badges
touch assets/css/layout.css      # Container, grid
touch assets/css/main.css        # Import all

# Tạo JS files
touch assets/js/utils.js         # DOM helpers, formatters
touch assets/js/api.js           # Mock API
touch assets/js/components.js    # Modal, Tabs, Dropdown
touch assets/js/main.js          # Main app
```

### Bước 3: Implement CSS Variables (Ngày 1)

**File:** `assets/css/variables.css`

```css
:root {
  /* Colors - từ MASTER.md */
  --color-primary-dark-red: #8B0000;
  --color-primary-navy: #1E3A5F;
  --color-primary-gold: #D4A017;
  --color-white: #FFFFFF;
  --color-gray-50: #F5F5F5;
  --color-gray-100: #EDEDED;
  --color-gray-900: #0F172A;
  --color-black: #000000;
  
  /* Typography */
  --font-serif: 'Georgia', 'Times New Roman', serif;
  --font-sans: 'Arial', 'Helvetica', sans-serif;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  
  /* Spacing */
  --space-md: 16px;
  --space-lg: 24px;
  
  /* Layout */
  --container-max-width: 1280px;
}
```

### Bước 4: Implement Components (Ngày 3-4)

**File:** `assets/css/components.css`

```css
/* Button Primary */
.btn-primary {
  background: var(--color-primary-dark-red);
  color: white;
  padding: 10px 24px;
  font-family: var(--font-sans);
  border-radius: 4px;
  transition: background 200ms;
}
.btn-primary:hover {
  background: #6B0000;
}

/* Product Card */
.product-card {
  background: white;
  border: 1px solid var(--color-gray-100);
  padding: var(--space-md);
  border-radius: 4px;
  cursor: pointer;
  transition: border-color 200ms, box-shadow 200ms;
}
.product-card:hover {
  border-color: var(--color-gray-200);
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

/* Badge Fine */
.badge-fine {
  background: rgba(5, 150, 105, 0.1);
  color: #059669;
  padding: 4px 10px;
  font-size: 0.75rem;
  border-radius: 12px;
  text-transform: uppercase;
}
```

### Bước 5: Implement Homepage (Tuần 2 - Ngày 6-7)

**File:** `user/index.html`

```html
<!DOCTYPE html>
<html lang="vi">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>BookStore - Rare Books, First Editions & Collectibles</title>
  <link rel="stylesheet" href="../assets/css/main.css">
</head>
<body>
  <!-- Header -->
  <header class="header">
    <div class="container">
      <div class="header__logo">BookStore</div>
      <div class="header__search">
        <input type="text" placeholder="Author / Title / Keyword or ISBN" class="search-bar">
      </div>
      <nav class="header__nav">
        <a href="/user/auth/login.html">Sign In</a>
        <a href="/user/account/index.html">My Account</a>
        <a href="/user/cart.html">Basket</a>
        <a href="#">Help</a>
      </nav>
    </div>
  </header>

  <!-- Hero -->
  <section class="hero">
    <div class="container">
      <h1>Discover Rare Books, First Editions & Collectibles</h1>
      <p>Millions of books from trusted sellers worldwide</p>
    </div>
  </section>

  <!-- Featured Books -->
  <section class="featured">
    <div class="container">
      <h2>Trending Books</h2>
      <div class="product-grid">
        <!-- Product Card -->
        <div class="product-card">
          <img src="../assets/images/placeholders/book1.jpg" alt="To Kill a Mockingbird">
          <h3 class="product-card__title">To Kill a Mockingbird</h3>
          <p class="product-card__author">by Harper Lee</p>
          <p class="product-card__price">$25.00</p>
          <span class="badge badge-fine">Fine</span>
          <p class="product-card__seller">Seller: Rare Books Emporium</p>
        </div>
        <!-- Repeat for more books -->
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="footer">
    <div class="container">
      <div class="footer__columns">
        <div class="footer__column">
          <h4>About</h4>
          <ul>
            <li><a href="#">About Us</a></li>
            <li><a href="#">Careers</a></li>
          </ul>
        </div>
        <!-- More columns -->
      </div>
    </div>
  </footer>

  <script src="../assets/js/main.js"></script>
</body>
</html>
```

---

## 📚 Tham khảo nhanh

### Design Principles
1. **Serif fonts** cho tiêu đề/nội dung (Georgia, Times New Roman)
2. **Sans-serif** cho UI elements (Arial, Helvetica)
3. **Dark Red (#8B0000)** cho accents (buttons, links, price)
4. **10% opacity backgrounds** cho badges
5. **200ms transitions** cho hover states
6. **No scale/rotate** transforms
7. **Information-dense** layout (hiển thị nhiều metadata)
8. **Classic aesthetic** (vintage bookstore vibe)

### Color Quick Reference
```css
Primary: #8B0000 (Dark Red)
Navy: #1E3A5F
Gold: #D4A017
White: #FFFFFF
Gray-50: #F5F5F5
Gray-100: #EDEDED
Black: #000000
```

### Typography Quick Reference
```css
Title: text-xl (20px), serif, bold
Author: text-lg (18px), serif, normal
Price: text-lg (18px), sans, bold, dark-red
Metadata: text-sm (14px), sans, gray-600
```

---

## ✅ Checklist trước khi code

- [ ] Đã đọc `design-system/MASTER.md`
- [ ] Đã đọc wireframe tương ứng (USER-PAGES.md hoặc ADMIN-PAGES.md)
- [ ] Hiểu rõ color palette (Dark Red, Navy, Gold, Grayscale)
- [ ] Hiểu rõ typography (Serif cho content, Sans cho UI)
- [ ] Hiểu rõ anti-patterns (No emojis, No flashy colors, No complex animations)
- [ ] Đã setup CSS variables
- [ ] Đã tạo component library (buttons, cards, badges)

---

## 🎯 Timeline (4 tuần)

| Tuần | Focus | Deliverables |
|------|-------|--------------|
| 1 | Foundation & Core Components | CSS variables, components, JS utilities |
| 2 | USER Pages - Shopping Flow | Homepage, Search, Product Detail |
| 3 | USER Pages - Cart & Account | Cart, Checkout, Account (8 pages), Auth |
| 4 | ADMIN Pages | Dashboard, Books, Orders, Promotions, Users, Content, Reports |

---

## 📞 Cần giúp đỡ?

### Đọc documentation
1. **Front-end/README.md** - Tổng quan
2. **Front-end/IMPLEMENTATION-PLAN.md** - Timeline chi tiết
3. **Front-end/design-system/MASTER.md** - Design tokens
4. **Front-end/design-system/wireframes/** - Layout chi tiết

### Reference
- **AbeBooks.com** (2024-2025) - Main design reference

---

**Bắt đầu ngay:** Mở `Front-end/IMPLEMENTATION-PLAN.md` và follow Tuần 1!

**Good luck! 🚀**
