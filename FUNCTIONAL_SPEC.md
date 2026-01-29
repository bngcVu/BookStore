# Functional Specification: BookStore Frontend

**Version**: 1.0
**Date**: 2026-01-29
**Based on**: PRD v1.0, User Journey v1.0

## 1. Architecture Overview

The frontend will be a **Multi-Page Application (MPA)** built with **HTML5**, **Tailwind CSS v4**, and **Vanilla JavaScript (ES6+)**.
It will rely on a **Client-Side Mock Database** (`js/mock_data.js`) to simulate dynamic content (Products, Users, Cart) without a running backend.

### 1.1 Technology Stack
-   **Structure**: Semantic HTML5.
-   **Styling**: Tailwind CSS v4 (CDN for dev/proto).
    -   *Theme*: Glassmorphism (Backdrop blur, translucent white/dark layers).
    -   *Colors*: Primary Violet (`#7c3aed`), Secondary Indigo, Warning Rose, Success Emerald.
    -   *Font*: 'Outfit' (Headings), 'Inter' (Body).
-   **Logic**: Vanilla JS (Modules).
    -   `mock_data.js`: Single source of truth for data.
    -   `layout.js`: Handles Header/Footer injection and Global State (Cart Count).
    -   `utils.js` (optional): Formatters (Currency, Date).

## 2. Page Specifications

### 2.1 Global Layout (Applied to all pages)
-   **Header**:
    -   Logo (Left).
    -   Search Bar (Center/Right - Responsive).
    -   Navigation: Home, Shop, About.
    -   User Tools: Cart Icon (with badge), Profile/Login Avatar.
    -   Behaviour: Sticky on scroll, Glass effect.
-   **Footer**:
    -   Links (Categories, Support, policies).
    -   Newsletter Signup.
    -   Social Icons.

### 2.2 Homepage (`index.html`)
-   **Hero Section**: Intro text + CTA button. Background image with overlay.
-   **Flash Sale**: Countdown timer, Horizontal scroll of discounted items.
-   **Featured Categories**: Grid of 4-6 top categories.
-   **Best Sellers**: Grid of 4-8 book cards.

### 2.3 Product List (`products.html`)
-   **Sidebar Filter** (Left, Collapsible on Mobile):
    -   Categories (Checkbox list).
    -   Price Range (Radio or Slider).
    -   Rating (4+ Stars, etc).
-   **Main Content**:
    -   Sort Toolbar (Price Low/High, Newest).
    -   Product Grid (Responsive: 1 col Mobile, 3-4 col Desktop).
    -   Pagination UI (Visual only for mock).

### 2.4 Product Detail (`product_detail.html`)
-   **Breadcrumbs**: Home > Category > Book Title.
-   **Gallery**: Main image + Thumbnail strip.
-   **Info Column**:
    -   Title, Author, Rating.
    -   Price (Current & Original).
    -   **Variant Selector**: Buttons for 'Softcover', 'Hardcover' (updates price).
    -   Quantity Input (1-10).
    -   Buttons: "Add to Cart" (Primary), "Wishlist" (Secondary icon).
-   **Tabs**: Description, Detailed Specs, Reviews.

### 2.5 Cart (`cart.html`)
-   **Item List**: Table/Grid rows. Image, Title, Variant, Price, Quantity Control (+/-), Remove Button.
-   **Summary Card**: Subtotal, Shipping, Total.
-   **CTA**: "Proceed to Checkout".

### 2.6 Checkout (`checkout.html`)
-   **Layout**: Split (Left: Forms, Right: Order Summary).
-   **Step 1: Information**: Name, Email, Phone, Address.
-   **Step 2: Shipping**: Radio group (Standard vs Express).
-   **Step 3: Payment**: Radio group (COD, Banking, Wallet).
-   **Validation**: HTML5 required attributes + Simple JS check.

## 3. Data Model (Mock)

### 3.1 `books`
-   `id`: Number
-   `title`: String
-   `author`: String
-   `price`: Number
-   `original_price`: Number (optional)
-   `image`: URL String
-   `rating`: Number (0-5)
-   `category`: String
-   `variants`: Array [{type: 'softcover', price: x}, {type: 'hardcover', price: y}]

### 3.2 `categories`
-   `id`: Number
-   `name`: String
-   `image`: URL String

## 4. Design Guidelines (UI/UX Pro Max)
-   **Glassmorphism**: Use `bg-white/x backdrop-blur-md border-white/y` classes.
-   **Spacing**: Generous whitespace (`p-6`, `gap-8`).
-   **Feedback**: Hover states on all interactive elements.
-   **Mobile**: 100% responsive. Hamburger menu for Header.

## 5. Performance Goals
-   LCP (Largest Contentful Paint) < 2.5s.
-   CLS (Cumulative Layout Shift) < 0.1.
-   Use `w-full h-auto` for images to prevent overflow.
