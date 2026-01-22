# BookStore Frontend - Design System & Wireframes

> **Phong cách thiết kế:** AbeBooks Classic (2024-2025)  
> **Mục tiêu:** Marketplace bán sách cũ, sách hiếm, sách sưu tầm và sách mới  
> **Deliverables:** Complete Design System + Wireframes cho 19 trang (12 USER + 7 ADMIN)

---

## 📦 Deliverables Summary

### ✅ Đã hoàn thành

#### 1. Design System Master (design-system/MASTER.md)
**Nội dung:**
- **Color Palette:** Primary (Dark Red, Navy, Gold), Neutral (White → Black), Semantic (Success, Warning, Error, Info), Condition Badges
- **Typography:** Serif fonts (Georgia, Times New Roman), Sans-serif (Arial, Helvetica), Font sizes (xs → 4xl), Font weights (400-700)
- **Component Styles:** Buttons (Primary, Secondary, Outline), Cards (Product, Info), Badges (Condition, Rare), Links, Forms (Input, Search Bar)
- **Layout & Spacing:** Container (max-width 1280px), Grid (3-4 columns), Spacing scale (xs → 3xl)
- **Effects & Interactions:** Transitions (200ms ease), Hover states (underline, border, shadow), No animations (scale, rotate)
- **Anti-Patterns:** ❌ Emojis, flashy colors, complex animations, modern typography | ✅ Serif fonts, information-rich, subtle effects
- **Responsive Breakpoints:** Mobile (<768px), Tablet (768-1023px), Desktop (≥1024px), Large Desktop (≥1440px)
- **Design Principles:** Readability First, Information Density, Trust & Credibility, Collector-Focused, Classic Aesthetic

**File size:** ~12 KB  
**Sections:** 9 (Color, Typography, Components, Layout, Effects, Anti-Patterns, Responsive, Principles, Component Library)

---

#### 2. Wireframes - USER Pages (design-system/wireframes/USER-PAGES.md)
**Nội dung:** Wireframes chi tiết cho **12 trang USER**

##### Trang chính (7 trang)
1. **Homepage (index.html)**
   - Header (Fixed, logo + search bar lớn + navigation)
   - Hero section (text-heavy, curated lists)
   - Featured Books (4-column grid)
   - Curated Lists (100 Fiction Books, Signed First Editions)
   - Footer (4 columns: About, Help, Policies, Connect)

2. **Search / Product Listing (search.html, category.html)**
   - Breadcrumb navigation
   - Sidebar filters (25% width: Price, Condition, Binding, Publication Year, Language, Seller Rating)
   - Main content (75%: Sort dropdown, 3-column product grid, pagination)

3. **Product Detail (product.html)**
   - Image gallery (300x440px main, 4 thumbnails, zoomable)
   - Product info (Title, Author, Publisher, Year, ISBN, Edition, Language, Pages, Dimensions, Weight)
   - Variant selector (Condition, Binding → changes price/image)
   - Price display (Sale price, Compare at price)
   - Seller info card (Name, Location, Rating, Contact)
   - Tabs (Description, Details, Reviews)
   - Reviews list (Rating, Title, Comment, Pros/Cons, Verified Purchase badge)
   - Actions (Add to Basket, Add to Wishlist)

4. **Basket / Cart (cart.html)**
   - Cart items (70%: Thumbnail, Title, Author, Condition, SKU, Price, Quantity, Remove)
   - Order summary (30%: Subtotal, Shipping, Discount, VIP Tier, Points Used, Total)
   - Voucher code input
   - Actions (Proceed to Checkout, Continue Shopping)

5. **Checkout (checkout.html)**
   - Step indicator (Shipping → Payment → Review)
   - Main form (70%: Shipping address, Shipping method, Payment method)
   - Order summary (30%: Items, Subtotal, Shipping, Discount, Total)
   - Actions (Back to Cart, Continue, Place Order)

6. **My Account (account.html)**
   - Sidebar (25%: User info, Menu: Orders, Wishlist, Addresses, Reward Points, Reviews, Profile, Sign Out)
   - Main content (75%: Recent orders, order cards with status badges)

7. **Order Detail (order-detail.html)**
   - Order status timeline (Pending → Confirmed → Processing → Shipping → Delivered)
   - Order info (Order code, Date, Payment, Tracking)
   - Shipping info (Address, Customer)
   - Order items (Thumbnail, Title, Condition, SKU, Price, Quantity, Discount, Subtotal)
   - Order summary (Subtotal, Shipping, Discount, VIP Tier, Points Used, Total)
   - Actions (Cancel Order, Request Refund, Contact Seller)

##### Account Sub-pages (5 trang)
8. **Wishlist (wishlist.html)** - 3-column product grid với "Remove from Wishlist" button
9. **Addresses (addresses.html)** - Address cards với Default marker, Add/Edit/Delete actions
10. **Reward Points (rewards.html)** - Points balance, VIP tier progress bar, Points history table
11. **Reviews (reviews.html)** - Review cards với Edit/Delete actions
12. **Profile (profile.html)** - Edit profile form, Change password form

**Component Details:**
- Product Card: 150x220px thumbnail, Title (text-xl, serif, bold), Author (text-lg, serif), Price (text-lg, sans, bold, dark-red), Badges (10% opacity bg), Seller info (text-sm, gray-600)
- Sidebar Filter: Accordion sections, Checkboxes (dark-red when checked), Price range slider
- Review Card: Rating stars, Title, Comment, Pros/Cons, Verified Purchase badge, Date

**File size:** ~35 KB  
**Sections:** 7 main pages + 5 sub-pages + Responsive behavior + Interaction patterns

---

#### 3. Wireframes - ADMIN Pages (design-system/wireframes/ADMIN-PAGES.md)
**Nội dung:** Wireframes chi tiết cho **7 module ADMIN**

##### Modules
1. **Dashboard (admin/index.html)**
   - Stats grid (4 cards: Total Sales, New Orders, Low Stock, Pending Reviews)
   - Recent orders table
   - Sales chart (Line chart, last 30 days)

2. **Books & Inventory (admin/books.html)**
   - Toolbar (Add Book, Import CSV, Export, Search, Filters)
   - Books table (Checkbox, Image, Title, Author, SKU, Price, Stock, Status, Actions)
   - Bulk actions (Delete, Set Featured, Export)
   - Pagination
   - **Edit Book Modal (5 tabs):**
     - Basic Info: Title, Slug, ISBN, Authors, Publisher, Year, Categories, Language, Pages, Dimensions, Weight, Description, Base Price, Is Featured
     - Variants: SKU, Edition, Condition, Binding, Price, Compare at Price, Cover Image, Active
     - Images: Upload images (max 10), Set Primary, Delete
     - Inventory: Current Quantity, Reserved, Available, Min Stock Level, Adjust Inventory (Add/Remove/Set), Inventory History
     - SEO: Meta Title, Meta Description, Keywords

3. **Orders Management (admin/orders.html)**
   - Toolbar (Search, Status filter, Date filter, Payment filter, Export)
   - Quick stats (Pending, Confirmed, Shipping, Completed counts)
   - Orders table (Order Code, Date, Customer, Total, Payment, Status, Actions)
   - **Order Detail Modal:**
     - Order status timeline (clickable to change status)
     - Order info (Order code, Date, Payment, Tracking)
     - Customer info (Name, Email, Phone, VIP Tier, Shipping address)
     - Order items (Thumbnail, Title, Condition, SKU, Price, Quantity, Discount, Subtotal)
     - Order summary (Subtotal, Shipping, Discount, VIP Tier, Points Used, Total)
     - Admin actions (Change Status, Send Email, Print Invoice, Process Refund, Cancel Order)
     - Order notes (Add Note, System logs)

4. **Promotions (admin/promotions.html)**
   - **3 tabs:**
     - Vouchers: Table (Code, Type, Value, Min Order, Usage, Valid, Status, Actions), Create/Edit Voucher Modal
     - Flash Sales: Table (Name, Start, End, Items, Status, Actions), Create Flash Sale Modal
     - Promotions: Table (Name, Type, Rules, Valid, Status, Actions), Create Promotion Modal

5. **Users & Tiers (admin/users.html)**
   - **3 tabs:**
     - Customers: Table (ID, Name, Email, Phone, VIP Tier, Points, Orders, Spent, Joined, Actions)
     - VIP Tiers: Table (Tier, Min Spent, Discount, Points Multiplier, Members, Actions)
     - Reward Points: Points settings (Earn Rate, Redemption Rate, Expiry), Manual adjustment form

6. **Content Management (admin/content.html)**
   - **4 tabs:**
     - Categories: Tree view (expandable/collapsible), Add/Edit/Delete/Add Child actions
     - Authors: Table (ID, Name, Bio, Books, Actions), Add/Edit/Delete
     - Publishers: Table (ID, Name, Country, Books, Actions), Add/Edit/Delete
     - Shipping: Carriers table (Carrier, Base Rate, Per KG, Active, Actions), Shipping rates by province

7. **Reports (admin/reports.html)**
   - Date range selector (Last 30 days, Custom range)
   - Sales overview (Total Sales, Orders, Avg Order Value, Line chart)
   - Top products table (Rank, Product, Sales, Revenue, Actions)
   - Customer insights (New Customers, Returning, Retention, Pie chart)
   - Inventory alerts (Low Stock, Out of Stock)
   - Export (PDF, CSV)

**Component Details:**
- Admin Header: Navy background (#1E3A5F), White text, Height 60px, Logo + Page title left, User dropdown right
- Sidebar Menu: 240px width, White background, Active item dark-red, Hover gray-50
- Data Table: White background, Gray-50 header, Hover gray-50 rows, Pagination bottom
- Status Badges: Pending (orange), Confirmed (blue), Shipping (blue), Completed (green), Cancelled (red) - all 10% opacity bg
- Modal: Max-width 800px, White background, 32px padding, Border-radius 8px

**File size:** ~32 KB  
**Sections:** 7 modules + Component library + Responsive behavior + Admin permissions

---

#### 4. Design System README (design-system/README.md)
**Nội dung:**
- Cấu trúc Design System (MASTER.md, USER-PAGES.md, ADMIN-PAGES.md)
- Hướng dẫn sử dụng Design System (4 bước: Đọc MASTER → Chọn Wireframe → Follow Layout → Implement)
- Responsive Guidelines (Breakpoints, Mobile adaptations)
- Implementation Checklist (Visual Quality, Typography, Layout, Interaction, Responsive, Accessibility)
- Design Principles (8 nguyên tắc)
- Database Schema Reference
- Version History

**File size:** ~8 KB  
**Sections:** 7

---

#### 5. Implementation Plan (IMPLEMENTATION-PLAN.md)
**Nội dung:**
- Tổng quan (Mục tiêu, Cấu trúc thư mục đề xuất)
- Timeline 4 tuần (160 giờ):
  - **Tuần 1:** Foundation & Core Components (CSS variables, components, JS utilities)
  - **Tuần 2:** USER Pages - Core Shopping Flow (Homepage, Search, Product Detail)
  - **Tuần 3:** USER Pages - Cart, Checkout & Account (Cart, Checkout, 8 account pages, Auth)
  - **Tuần 4:** ADMIN Pages (7 modules)
- CSS Architecture (variables.css, components.css, layout.css)
- JavaScript Architecture (utils.js, api.js, components.js)
- Testing Checklist (Visual, Interaction, Accessibility, Performance)
- Deliverables từng tuần
- Next Steps (Backend Integration, Advanced Features, Optimization, Testing)

**File size:** ~18 KB  
**Sections:** 9

---

## 📊 Statistics

### Files Created
- **Total files:** 5
- **Total size:** ~105 KB
- **Total sections:** 32

### Coverage
- **USER Pages:** 12 trang (Homepage, Search, Product Detail, Cart, Checkout, Account + 5 sub-pages, Order Detail)
- **ADMIN Pages:** 7 modules (Dashboard, Books & Inventory, Orders, Promotions, Users & Tiers, Content, Reports)
- **Total pages designed:** 19 trang

### Components Designed
- **Buttons:** 3 variants (Primary, Secondary, Outline)
- **Cards:** 2 types (Product Card, Info Card)
- **Badges:** 5 types (Fine, Very Good, Good, Fair, Rare)
- **Forms:** 2 types (Input, Search Bar)
- **Tables:** Admin data tables với sorting, filtering, pagination
- **Modals:** CRUD modals cho Books, Orders, Promotions, Users
- **Charts:** Line chart (Sales), Pie chart (Customer segments)

---

## 🎯 Design Principles Applied

1. **Readability First** ✅
   - Font size đủ lớn (text-base 16px, text-lg 18px cho author)
   - High contrast (black text on white, dark-red accents)
   - Line-height thoải mái (1.5-1.75)

2. **Information Density** ✅
   - Hiển thị đầy đủ metadata (Edition, Condition, ISBN, Seller info, Publication year)
   - Product cards compact nhưng đầy đủ thông tin
   - Admin tables data-dense với nhiều columns

3. **Trust & Credibility** ✅
   - Professional color palette (Dark Red, Navy, Gold, Grayscale)
   - Clean layout, no gimmicks
   - Seller info rõ ràng (Name, Location, Rating)

4. **Collector-Focused** ✅
   - Badge rõ ràng cho Rare, Signed, First Edition
   - Condition badges với 10% opacity backgrounds
   - Detailed product info (Pages, Dimensions, Weight, Language)

5. **Classic Aesthetic** ✅
   - Serif fonts cho tiêu đề và nội dung (Georgia, Times New Roman)
   - Vintage bookstore vibe (Dark Red, Gold accents)
   - Academic feel (Information-rich, text-heavy)

6. **No Distractions** ✅
   - Minimal animations (chỉ transitions 200ms)
   - No scale/rotate transforms
   - Focus on content, not effects

7. **Consistent Patterns** ✅
   - Reuse components (buttons, cards, badges)
   - Predictable interactions (hover underline, border color change)
   - Consistent spacing (16-20px padding)

8. **Accessible** ✅
   - High contrast (4.5:1 minimum)
   - Keyboard navigation (Tab, Enter, Esc)
   - Screen reader friendly (semantic HTML)
   - Alt text cho images, Labels cho form inputs

---

## 🚀 Next Steps

### Phase 1: Implementation (4 tuần)
Theo **IMPLEMENTATION-PLAN.md**:
1. **Tuần 1:** Setup project, CSS variables, core components
2. **Tuần 2:** Homepage, Search, Product Detail
3. **Tuần 3:** Cart, Checkout, Account pages
4. **Tuần 4:** Admin panel (7 modules)

### Phase 2: Backend Integration
1. Replace mock API với real API endpoints
2. Implement authentication (JWT)
3. Connect to MySQL database (schema đã có trong `sql/scripts/`)

### Phase 3: Advanced Features
1. Real-time notifications (WebSocket)
2. Advanced search (Elasticsearch)
3. Recommendation engine
4. Payment gateway integration (MoMo, VNPay, Stripe)

### Phase 4: Optimization & Testing
1. Code splitting, Image optimization (WebP, lazy loading)
2. CSS/JS minification, CDN deployment
3. Unit tests (Jest), E2E tests (Playwright)
4. Accessibility audit (Lighthouse), Performance profiling

---

## 📚 References

### Design Inspiration
- **AbeBooks.com** (2024-2025) - Main reference cho phong cách classic, professional, trustworthy

### Database Schema
- **Location:** `sql/scripts/`
- **Tables:** 30+ tables (books, book_variants, orders, users, reviews, inventory, promotions, etc.)
- **Features:** Soft delete, VIP tiers, Reward points, Flash sales, Vouchers, Multi-variant products

### Tech Stack (Recommended)
- **Frontend:** HTML5, Vanilla CSS, Vanilla JavaScript (hoặc React/Next.js cho advanced features)
- **Backend:** Spring Boot (Java) hoặc Node.js (Express)
- **Database:** MySQL 8.0+
- **Deployment:** Vercel/Netlify (Frontend), AWS/GCP (Backend), CloudFlare CDN

---

## 📞 Support & Documentation

### Design System Files
1. **MASTER.md** - Design tokens, components, anti-patterns
2. **wireframes/USER-PAGES.md** - Layout chi tiết 12 trang USER
3. **wireframes/ADMIN-PAGES.md** - Layout chi tiết 7 module ADMIN
4. **README.md** - Hướng dẫn sử dụng Design System
5. **IMPLEMENTATION-PLAN.md** - Timeline 4 tuần, CSS/JS architecture, testing checklist

### Contact
- **Project:** BookStore - Used, Rare, Collectible & New Books Marketplace
- **Design System Version:** 1.0
- **Last Updated:** 2026-01-22
- **Status:** ✅ Design System Complete, Ready for Implementation

---

**Nguyên tắc vàng:** Khi nghi ngờ, hãy tham khảo AbeBooks.com (2024-2025) để đảm bảo phong cách classic, professional, trustworthy.

---

## ✅ Completion Checklist

- [x] Design System Master (MASTER.md)
- [x] Wireframes USER Pages (12 trang)
- [x] Wireframes ADMIN Pages (7 modules)
- [x] Design System README
- [x] Implementation Plan (4 tuần)
- [ ] CSS Implementation (Tuần 1)
- [ ] USER Pages Implementation (Tuần 2-3)
- [ ] ADMIN Pages Implementation (Tuần 4)
- [ ] Backend Integration
- [ ] Testing & Optimization
- [ ] Production Deployment

**Current Status:** 📐 Design Phase Complete → 🚀 Ready for Implementation
