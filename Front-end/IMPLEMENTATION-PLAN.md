# BookStore Frontend Implementation Plan

> **Phong cách:** AbeBooks Classic - Professional, Trustworthy, Information-rich  
> **Tech Stack:** HTML5, Vanilla CSS, Vanilla JavaScript  
> **Timeline:** 4 tuần (160 giờ)

---

## 📋 Tổng quan

### Mục tiêu
Xây dựng frontend hoàn chỉnh cho BookStore marketplace theo phong cách AbeBooks với:
- 12 trang USER (Homepage, Search, Product Detail, Cart, Checkout, Account + 5 sub-pages, Order Detail)
- 7 module ADMIN (Dashboard, Books & Inventory, Orders, Promotions, Users & Tiers, Content, Reports)
- Responsive design (mobile, tablet, desktop)
- Vanilla HTML/CSS/JS (không framework)

### Cấu trúc thư mục đề xuất
```
Front-end/
├── design-system/              # Design System (đã hoàn thành)
│   ├── README.md
│   ├── MASTER.md
│   └── wireframes/
│       ├── USER-PAGES.md
│       └── ADMIN-PAGES.md
├── assets/
│   ├── css/
│   │   ├── variables.css       # CSS Variables từ MASTER.md
│   │   ├── reset.css           # CSS Reset
│   │   ├── components.css      # Component styles
│   │   ├── layout.css          # Layout utilities
│   │   └── main.css            # Main stylesheet (import all)
│   ├── js/
│   │   ├── utils.js            # Utility functions
│   │   ├── api.js              # API calls (mock data)
│   │   ├── components.js       # Reusable components
│   │   └── main.js             # Main app logic
│   └── images/
│       ├── logo.svg
│       ├── icons/              # SVG icons (Heroicons)
│       └── placeholders/       # Placeholder images
├── user/                       # USER pages
│   ├── index.html              # Homepage
│   ├── search.html             # Product listing
│   ├── product.html            # Product detail
│   ├── cart.html               # Shopping cart
│   ├── checkout.html           # Checkout
│   ├── account/
│   │   ├── index.html          # My Account
│   │   ├── orders.html         # My Orders
│   │   ├── order-detail.html   # Order Detail
│   │   ├── wishlist.html       # Wishlist
│   │   ├── addresses.html      # Addresses
│   │   ├── rewards.html        # Reward Points
│   │   ├── reviews.html        # My Reviews
│   │   └── profile.html        # Profile
│   └── auth/
│       ├── login.html          # Sign In
│       └── register.html       # Sign Up
├── admin/                      # ADMIN pages
│   ├── index.html              # Dashboard
│   ├── books.html              # Books & Inventory
│   ├── orders.html             # Orders Management
│   ├── promotions.html         # Promotions
│   ├── users.html              # Users & Tiers
│   ├── content.html            # Content Management
│   └── reports.html            # Reports
└── README.md                   # Implementation guide
```

---

## 🗓️ Timeline (4 tuần)

### Tuần 1: Foundation & Core Components (40 giờ)
**Mục tiêu:** Setup project, CSS variables, core components

#### Ngày 1-2 (16h): Project Setup & CSS Foundation
- [ ] Tạo cấu trúc thư mục
- [ ] `assets/css/variables.css` - Convert MASTER.md colors/typography sang CSS variables
- [ ] `assets/css/reset.css` - CSS reset/normalize
- [ ] `assets/css/layout.css` - Container, grid, spacing utilities
- [ ] Test responsive breakpoints

#### Ngày 3-4 (16h): Core Components CSS
- [ ] `assets/css/components.css` - Buttons, cards, badges, links, forms
- [ ] Test component variations (primary/secondary/outline buttons, etc.)
- [ ] Hover states, transitions
- [ ] Accessibility (focus states, keyboard navigation)

#### Ngày 5 (8h): JavaScript Utilities
- [ ] `assets/js/utils.js` - DOM helpers, formatters (currency, date)
- [ ] `assets/js/api.js` - Mock API calls (fetch book data, orders, etc.)
- [ ] `assets/js/components.js` - Reusable JS components (modal, dropdown, tabs)

**Deliverables:**
- CSS variables system hoàn chỉnh
- Component library (buttons, cards, badges, forms)
- JS utilities & mock API

---

### Tuần 2: USER Pages - Core Shopping Flow (40 giờ)

#### Ngày 6-7 (16h): Homepage & Header/Footer
- [ ] `user/index.html` - Homepage layout
  - Fixed header (logo, search bar, navigation)
  - Hero section
  - Featured books grid (4 columns)
  - Curated lists
  - Footer (4 columns)
- [ ] Responsive: Mobile (1 col), Tablet (2-3 cols), Desktop (4 cols)
- [ ] JavaScript: Search autocomplete, featured books carousel (optional)

#### Ngày 8 (8h): Search / Product Listing
- [ ] `user/search.html` - Search results page
  - Sidebar filters (price, condition, binding, year, language, rating)
  - Product grid (3 columns desktop)
  - Sort dropdown
  - Pagination
- [ ] JavaScript: Filter logic, sort, pagination

#### Ngày 9-10 (16h): Product Detail
- [ ] `user/product.html` - Product detail page
  - Image gallery (main image + thumbnails, zoomable)
  - Product info (title, author, publisher, ISBN, edition, condition)
  - Variant selector (condition, binding)
  - Price display (sale price, compare at price)
  - Seller info card
  - Tabs (Description, Details, Reviews)
  - Reviews list
  - Add to Cart, Add to Wishlist buttons
- [ ] JavaScript: Image gallery, variant selector, tabs, add to cart

**Deliverables:**
- Homepage hoàn chỉnh
- Search/listing page với filters
- Product detail page với image gallery, variant selector, reviews

---

### Tuần 3: USER Pages - Cart, Checkout & Account (40 giờ)

#### Ngày 11 (8h): Shopping Cart
- [ ] `user/cart.html` - Shopping cart page
  - Cart items list (thumbnail, title, condition, price, quantity)
  - Order summary (subtotal, shipping, discount, total)
  - Voucher code input
  - Proceed to Checkout button
- [ ] JavaScript: Update quantity, remove item, apply voucher, calculate total

#### Ngày 12 (8h): Checkout
- [ ] `user/checkout.html` - Checkout page
  - Step indicator (Shipping → Payment → Review)
  - Shipping address form (saved addresses dropdown, new address)
  - Shipping method selection (GHTK, GHN with prices)
  - Payment method selection (COD, Bank, MoMo, Card)
  - Order summary (sticky sidebar)
- [ ] JavaScript: Multi-step form, address selector, shipping calculator

#### Ngày 13-14 (16h): My Account & Sub-pages
- [ ] `user/account/index.html` - My Account dashboard
  - Sidebar menu (Orders, Wishlist, Addresses, Reward Points, Reviews, Profile)
  - User info card (avatar, name, VIP tier, points)
  - Recent orders list
- [ ] `user/account/orders.html` - My Orders
- [ ] `user/account/order-detail.html` - Order Detail (status timeline, tracking)
- [ ] `user/account/wishlist.html` - Wishlist (product grid)
- [ ] `user/account/addresses.html` - Addresses (address cards, add/edit/delete)
- [ ] `user/account/rewards.html` - Reward Points (balance, tier progress, history)
- [ ] `user/account/reviews.html` - My Reviews (review cards, edit/delete)
- [ ] `user/account/profile.html` - Profile (edit form, change password)
- [ ] JavaScript: Sidebar navigation, forms, CRUD operations

#### Ngày 15 (8h): Auth Pages
- [ ] `user/auth/login.html` - Sign In
- [ ] `user/auth/register.html` - Sign Up
- [ ] JavaScript: Form validation, mock authentication

**Deliverables:**
- Cart page với voucher & calculations
- Checkout flow (3 steps)
- Complete account section (8 pages)
- Auth pages (login, register)

---

### Tuần 4: ADMIN Pages (40 giờ)

#### Ngày 16 (8h): Admin Layout & Dashboard
- [ ] Admin header (navy background, logo, user dropdown)
- [ ] Admin sidebar (menu items, active state)
- [ ] `admin/index.html` - Dashboard
  - Stats grid (4 cards: Total Sales, New Orders, Low Stock, Pending Reviews)
  - Recent orders table
  - Sales chart (Chart.js or simple SVG)
- [ ] JavaScript: Fetch stats, render chart

#### Ngày 17-18 (16h): Books & Inventory
- [ ] `admin/books.html` - Books management
  - Toolbar (Add Book, Import CSV, Export, Search, Filters)
  - Books table (checkbox, image, title, author, SKU, price, stock, status, actions)
  - Bulk actions
  - Pagination
  - Edit Book Modal (5 tabs: Basic Info, Variants, Images, Inventory, SEO)
- [ ] JavaScript: Table sorting, filtering, modal, tabs, image upload, inventory adjustment

#### Ngày 19 (8h): Orders Management
- [ ] `admin/orders.html` - Orders management
  - Toolbar (Search, Status filter, Date filter, Export)
  - Quick stats (Pending, Confirmed, Shipping, Completed counts)
  - Orders table
  - Order Detail Modal (status timeline, order info, customer info, items, summary, actions, notes)
- [ ] JavaScript: Table filtering, modal, status update, tracking update

#### Ngày 20 (8h): Promotions, Users, Content, Reports
- [ ] `admin/promotions.html` - Promotions (3 tabs: Vouchers, Flash Sales, Promotions)
  - Create/Edit Voucher Modal
  - Create Flash Sale Modal
- [ ] `admin/users.html` - Users & Tiers (3 tabs: Customers, VIP Tiers, Reward Points)
  - Customers table
  - Tier settings
  - Manual points adjustment
- [ ] `admin/content.html` - Content Management (4 tabs: Categories tree, Authors, Publishers, Shipping)
- [ ] `admin/reports.html` - Reports (Date range, Sales overview, Top products, Customer insights, Inventory alerts)
- [ ] JavaScript: Tabs, modals, forms, charts

**Deliverables:**
- Complete admin panel (7 modules)
- Data tables với sorting, filtering, pagination
- Modals cho CRUD operations
- Charts cho reports

---

## 🎨 CSS Architecture

### 1. variables.css
```css
/* Colors */
:root {
  /* Primary */
  --color-primary-dark-red: #8B0000;
  --color-primary-navy: #1E3A5F;
  --color-primary-gold: #D4A017;
  
  /* Neutral */
  --color-white: #FFFFFF;
  --color-gray-50: #F5F5F5;
  --color-gray-100: #EDEDED;
  --color-gray-200: #D1D5DB;
  --color-gray-600: #475569;
  --color-gray-900: #0F172A;
  --color-black: #000000;
  
  /* Semantic */
  --color-success: #059669;
  --color-warning: #D97706;
  --color-error: #DC2626;
  --color-info: #0284C7;
  
  /* Typography */
  --font-serif: 'Georgia', 'Times New Roman', 'Book Antiqua', serif;
  --font-sans: 'Arial', 'Helvetica', 'Segoe UI', sans-serif;
  
  --text-xs: 0.75rem;
  --text-sm: 0.875rem;
  --text-base: 1rem;
  --text-lg: 1.125rem;
  --text-xl: 1.25rem;
  --text-2xl: 1.5rem;
  --text-3xl: 1.875rem;
  --text-4xl: 2.25rem;
  
  --font-normal: 400;
  --font-medium: 500;
  --font-semibold: 600;
  --font-bold: 700;
  
  /* Spacing */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
  
  /* Layout */
  --container-max-width: 1280px;
  --sidebar-width: 280px;
  --header-height: 120px;
  
  /* Effects */
  --transition-fast: 150ms ease;
  --transition-base: 200ms ease;
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
  --shadow-md: 0 2px 8px rgba(0,0,0,0.08);
  --shadow-lg: 0 4px 16px rgba(0,0,0,0.12);
}
```

### 2. components.css
```css
/* Buttons */
.btn {
  padding: 10px 24px;
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background var(--transition-base);
}

.btn-primary {
  background: var(--color-primary-dark-red);
  color: white;
}

.btn-primary:hover {
  background: #6B0000;
}

/* Cards */
.product-card {
  background: white;
  border: 1px solid var(--color-gray-100);
  padding: var(--space-md);
  border-radius: 4px;
  transition: border-color var(--transition-base), box-shadow var(--transition-base);
  cursor: pointer;
}

.product-card:hover {
  border-color: var(--color-gray-200);
  box-shadow: var(--shadow-md);
}

/* Badges */
.badge {
  display: inline-block;
  padding: 4px 10px;
  font-size: var(--text-xs);
  font-family: var(--font-sans);
  font-weight: var(--font-semibold);
  border-radius: 12px;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.badge-fine {
  background: rgba(5, 150, 105, 0.1);
  color: var(--color-success);
}

/* ... more components */
```

### 3. layout.css
```css
/* Container */
.container {
  max-width: var(--container-max-width);
  margin: 0 auto;
  padding: 0 var(--space-lg);
}

/* Grid */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: var(--space-lg);
}

@media (min-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}

/* Responsive utilities */
@media (max-width: 767px) {
  .hide-mobile { display: none; }
}

@media (min-width: 768px) and (max-width: 1023px) {
  .hide-tablet { display: none; }
}

@media (min-width: 1024px) {
  .hide-desktop { display: none; }
}
```

---

## 🔧 JavaScript Architecture

### 1. utils.js
```javascript
// DOM helpers
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// Formatters
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
};

const formatDate = (date) => {
  return new Intl.DateTimeFormat('vi-VN').format(new Date(date));
};

// Local storage
const storage = {
  get: (key) => JSON.parse(localStorage.getItem(key)),
  set: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
  remove: (key) => localStorage.removeItem(key)
};
```

### 2. api.js (Mock API)
```javascript
// Mock data
const mockBooks = [
  {
    id: 1,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    price: 25.00,
    condition: 'Fine',
    image: '/assets/images/placeholders/book1.jpg'
  },
  // ... more books
];

// API functions
const api = {
  getBooks: async (filters = {}) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    return mockBooks;
  },
  
  getBook: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return mockBooks.find(book => book.id === id);
  },
  
  // ... more API functions
};
```

### 3. components.js
```javascript
// Modal component
class Modal {
  constructor(id) {
    this.modal = $(`#${id}`);
    this.closeBtn = this.modal.querySelector('.modal__close');
    this.init();
  }
  
  init() {
    this.closeBtn.addEventListener('click', () => this.close());
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) this.close();
    });
  }
  
  open() {
    this.modal.classList.add('modal--active');
  }
  
  close() {
    this.modal.classList.remove('modal--active');
  }
}

// Tabs component
class Tabs {
  constructor(container) {
    this.container = $(container);
    this.tabs = this.container.querySelectorAll('.tab');
    this.panels = this.container.querySelectorAll('.tab-panel');
    this.init();
  }
  
  init() {
    this.tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => this.switchTab(index));
    });
  }
  
  switchTab(index) {
    this.tabs.forEach(tab => tab.classList.remove('tab--active'));
    this.panels.forEach(panel => panel.classList.remove('tab-panel--active'));
    
    this.tabs[index].classList.add('tab--active');
    this.panels[index].classList.add('tab-panel--active');
  }
}
```

---

## ✅ Testing Checklist

### Visual Testing
- [ ] All pages render correctly on Chrome, Firefox, Safari, Edge
- [ ] Responsive: Test 375px (mobile), 768px (tablet), 1024px (desktop), 1440px (large desktop)
- [ ] Colors match MASTER.md palette
- [ ] Typography hierarchy correct (serif for content, sans for UI)
- [ ] Badges have 10% opacity backgrounds
- [ ] No layout shift on hover

### Interaction Testing
- [ ] All links navigate correctly
- [ ] Buttons have hover states
- [ ] Forms validate input
- [ ] Modals open/close correctly
- [ ] Tabs switch content
- [ ] Image gallery works (zoom, thumbnails)
- [ ] Cart updates quantity/total correctly
- [ ] Filters work on search page
- [ ] Sorting works on tables

### Accessibility Testing
- [ ] All images have alt text
- [ ] Form inputs have labels
- [ ] Keyboard navigation works (Tab, Enter, Esc)
- [ ] Focus states visible
- [ ] Color contrast ≥ 4.5:1
- [ ] Screen reader friendly (semantic HTML)

### Performance Testing
- [ ] Page load < 3s (with mock data)
- [ ] No console errors
- [ ] Images optimized (WebP, lazy loading)
- [ ] CSS/JS minified for production

---

## 📦 Deliverables

### Tuần 1
- [ ] CSS variables system
- [ ] Component library (buttons, cards, badges, forms)
- [ ] JS utilities & mock API

### Tuần 2
- [ ] Homepage
- [ ] Search/listing page
- [ ] Product detail page

### Tuần 3
- [ ] Cart page
- [ ] Checkout page
- [ ] Account section (8 pages)
- [ ] Auth pages (login, register)

### Tuần 4
- [ ] Admin panel (7 modules)
- [ ] All CRUD modals
- [ ] Charts & reports

### Final Delivery
- [ ] Complete codebase (HTML/CSS/JS)
- [ ] README với hướng dẫn chạy
- [ ] Design system documentation
- [ ] Testing report
- [ ] Deployment guide (optional)

---

## 🚀 Next Steps (Post-Implementation)

1. **Backend Integration**
   - Replace mock API với real API endpoints
   - Implement authentication (JWT)
   - Connect to MySQL database

2. **Advanced Features**
   - Real-time notifications (WebSocket)
   - Advanced search (Elasticsearch)
   - Recommendation engine
   - Payment gateway integration

3. **Optimization**
   - Code splitting
   - Image optimization (WebP, lazy loading)
   - CSS/JS minification
   - CDN deployment

4. **Testing**
   - Unit tests (Jest)
   - E2E tests (Playwright)
   - Accessibility audit (Lighthouse)
   - Performance profiling

---

**Version:** 1.0  
**Last Updated:** 2026-01-22  
**Estimated Timeline:** 4 tuần (160 giờ)  
**Tech Stack:** HTML5, Vanilla CSS, Vanilla JavaScript
