# User Journey Map: BookStore

## 1. Overview
**Persona**: Tech-savvy Reader (Young, Mobile-first user).
**Goal**: Find, evaluate, and purchase a specific book or discover new ones efficiently.
**Context**: Browsing on a mobile device or laptop during spare time.

## 2. Journey Stages

### Stage 1: Discovery (Khám phá)
*   **User Action**: User lands on Homepage (`index.html`).
*   **Needs**: 
    *   See attractive promotions (Flash Sale).
    *   Quickly access search or categories.
    *   See recommended/featured books.
*   **System Response**: 
    *   Hero Banner with CTA.
    *   Search bar in sticky header.
    *   "Flash Sale" section with countdown.
    *   "Featured Attributes" (Glassmorphism cards).

### Stage 2: Evaluation (Tìm kiếm & Lọc)
*   **User Action**: User searches for "Sci-fi" or clicks "Shop Now". Lands on Product List (`products.html`).
*   **Needs**: 
    *   Narrow down results by Price, Rating, Category.
    *   Sort by Price (Low-High) or Best Selling.
    *   Quickly scan book covers and prices.
*   **System Response**: 
    *   Sidebar filters (Accordion style).
    *   Responsive Grid Layout of Product Cards.
    *   "Quick View" or clear Price/Rating display.

### Stage 3: Detail View (Chi tiết)
*   **User Action**: CTAs on a specific book. Lands on Product Detail (`product_detail.html`).
*   **Needs**: 
    *   Read synopsis (Description).
    *   Check technical specs (Pages, Publisher).
    *   **CRITICAL**: Select Variant (Hardcover vs Softcover).
    *   See Shipping info & Return policy.
*   **System Response**: 
    *   High-res image gallery.
    *   Variant selector (Visual buttons).
    *   Sticky "Add to Cart" bar (Mobile).
    *   Reviews/Rating section.

### Stage 4: Commitment (Giỏ hàng)
*   **User Action**: Clicks "Add to Cart" -> "View Cart". Lands on Cart (`cart.html`).
*   **Needs**: 
    *   Verify items and variants.
    *   Adjust quantity.
    *   See total cost (estimated).
*   **System Response**: 
    *   List of items with thumbnails.
    *   Quantity spinners (+/-).
    *   Order Summary (Subtotal, Tax, Shipping estimate).
    *   "Checkout" CTA.

### Stage 5: Purchase (Thanh toán)
*   **User Action**: Clicks "Checkout". Lands on Checkout (`checkout.html`).
*   **Needs**: 
    *   Guest checkout or Login (if not logged in).
    *   Input Address.
    *   Select Shipping Method (Standard/Express).
    *   Select Payment (Credit Card/COD/Wallet).
*   **System Response**: 
    *   Multi-step form (or Accordion).
    *   Form validation (Real-time).
    *   Order Confirmation Summary.
    *   "Place Order" CTA.

### Stage 6: Post-Purchase (Hoàn tất)
*   **User Action**: Successfully places order.
*   **System Response**: 
    *   Success Page/Modal.
    *   Order ID display.
    *   "Continue Shopping" link.
    *   (Mock) Email trigger.

## 3. Pain Points & Opportunities (Brainstorming Output)
*   **Pain**: Filter logic can be annoying if it reloads page. -> **Solution**: Use Client-side filtering (JS) for speed.
*   **Pain**: Checkout forms are tedious. -> **Solution**: Auto-fill common data if returning user, or use clear inline validation (Form CRO).
*   **Opportunity**: Use "Glassmorphism" to make the UI feel light and modern, reducing cognitive load during the "Evaluation" phase.
*   **Opportunity**: "Flash Sale" countdown creates urgency in "Discovery".

## 4. Key Flows
1.  **Search Flow**: Home -> Search Bar -> Product List (Filtered) -> Detail.
2.  **Flash Sale Flow**: Home (Banner) -> Detail -> Quick Checkout.
3.  **Category Flow**: Home (Category Card) -> Product List.
