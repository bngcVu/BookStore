# Frontend Implementation Plan - BookStore

## Overview
This plan outlines the frontend development steps to build the full BookStore website based on the provided SQL schema and the new `ui-ux-pro-max` Design System.

## Design System Summary
- **Primary Color**: `#3B82F6` (Blue)
- **Accent/CTA**: `#F97316` (Orange)
- **Typography**: Rubik (Headings) + Nunito Sans (Body)
- **Style**: Clean, Modern, Vibrant

## Phase 1: Foundation & Core Layout (Current Focus)
- [ ] **Setup Global Styles**: Implement CSS variables from `MASTER.md` in `globals.css`.
- [ ] **Typography**: Replace Inter/Playfair with Rubik/Nunito Sans in `layout.tsx`.
- [ ] **Header/Footer**: Update `Header` to match new design (sticky, glassmorphism). Create `Footer`.
- [ ] **Home Page**: Refactor `page.tsx` to use new components and "Vibrant Block-based" style.

## Phase 2: Product Discovery (Catalog)
**Target DB Tables**: `books`, `categories`, `authors`, `publishers`, `book_variants`, `reviews`

- [ ] **Category Page** (`/categories`): Grid view of categories with images.
- [ ] **Product Listing** (`/books`):
    - Filters: Price, Author, Publisher, Category, Rating.
    - Sorting: Bestseller, Newest, Price.
    - Components: `ProductCard`, `FilterSidebar`.
- [ ] **Product Detail** (`/books/[slug]`):
    - Gallery (`book_images`).
    - Variant Selector (Soft/Hard cover) (`book_variants`).
    - Price Display (Sale price vs Original).
    - Reviews Section (`reviews`).
    - Related Products.

## Phase 3: Shopping Experience
**Target DB Tables**: `carts`, `orders`, `order_items`, `shipping_rates`, `vouchers`, `payments`

- [ ] **Cart** (`/cart`):
    - Quantity adjustment.
    - Voucher input.
    - Estimated total.
- [ ] **Checkout** (`/checkout`):
    - Address Selection (`user_addresses`, `provinces`, `districts`).
    - Shipping Method (`shipping_carriers`, `shipping_rates`).
    - Payment Method (`payments`).
- [ ] **Order Success** (`/checkout/success`): Summary and tracking info.

## Phase 4: User Account (Customer Tier & Loyalty)
**Target DB Tables**: `users`, `customer_tiers`, `reward_points`, `notifications`, `wishlists`, `orders`

- [ ] **Auth Pages**: Login, Register with OTP (`otp_codes`).
- [ ] **Dashboard** (`/profile`):
    - Tier Status (Silver/Gold/Diamond) & Benefits.
    - Loyalty Points History (`loyalty_transactions`).
- [ ] **Order History** (`/profile/orders`): Status tracking, Re-order, Return/Refund (`refunds`).
- [ ] **Wishlist** (`/profile/wishlist`).
- [ ] **Address Book**.

## Phase 5: Marketing & Content
**Target DB Tables**: `flash_sales`, `promotions`

- [ ] **Flash Sale Page**: Timer-based layout.
- [ ] **Blog**: (Static or connected to a CMS - TBD).
- [ ] **SEO Optimization**: Meta tags, structured data (JSON-LD) for Books.

## Next Steps
1.  Apply Design System to `globals.css` and `layout.tsx`.
2.  Build the **Product Card** component (core block).
3.  Build the **Book Listing** page.
