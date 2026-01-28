# BookStore Frontend Implementation Plan (SQL-Aligned)

> Scope: FE alignment to database schema in Front-end/sql/create_tables.sql
> Target: USER + ADMIN flows mapped to tables and constraints
> Stack: HTML/CSS/JS (vanilla), progressive enhancement

---

## 1) Alignment Summary (Current FE vs SQL)

- Users (`users`, `otp_codes`, `customer_tiers`):
  - Implemented: Login/Register skeleton, Account dashboard
  - Missing: Email/phone verification, VIP tier badge + points, OTP flows, profile fields parity
- Addresses & Location (`provinces`, `districts`, `user_addresses`):
  - Implemented: Addresses page skeleton
  - Missing: Province/District selector + default address management
- Catalog (`categories`, `authors`, `publishers`, `books`, `book_images`, `book_variants`, `book_authors`):
  - Implemented: Homepage, Search results, Product detail (basic), card linking
  - Missing: Category tree + filters, author/publisher filters, variant selector (SKU), compare-at price, gallery from `book_images`
- Inventory & Price (`inventory`, `price_history`):
  - Implemented: —
  - Missing: Stock/low-stock display, disable Add-to-Cart when out of stock, price badge (history/compare)
- Cart & Wishlist (`carts`, `wishlists`):
  - Implemented: Local cart (localStorage), Cart page, Checkout skeleton
  - Missing: Server cart sync, wishlist page + actions
- Promotions (`flash_sales`, `flash_sale_items`, `vouchers`, `voucher_usage`, `promotions`, `promotion_books`):
  - Implemented: —
  - Missing: Voucher input/apply, promo badges, flash sale banner, usage recording
- Shipping (`shipping_carriers`, `shipping_rates`):
  - Implemented: —
  - Missing: Shipping method selector with dynamic fee, SLA display
- Orders (`orders`, `order_items`, `order_status_history`, `refunds`):
  - Implemented: Orders list skeleton, Order detail skeleton
  - Missing: Status timeline, tracking number, refund initiation form
- Payments (`payments`):
  - Implemented: Checkout with method choices (static)
  - Missing: Gateway states (pending/success), transaction id display, error handling
- Rewards & Loyalty (`reward_points`, `loyalty_transactions`):
  - Implemented: —
  - Missing: Reward points page, tier progression, earn/spend history
- Reviews (`reviews`, `review_images`):
  - Implemented: —
  - Missing: Product reviews list + creation, My Reviews management
- Notifications (`notifications`):
  - Implemented: —
  - Missing: Notifications center + read state
- Recommendations (`user_book_interactions`):
  - Implemented: —
  - Missing: Recently viewed, recommended for you blocks

---

## 2) Implementation Phases (SQL-Mapped)

- Phase A: Catalog & Product Detail (Week 2 continuation)
  - Category tree + filters (price, condition, binding, year, language, rating)
  - Author/Publisher filters + SEO-friendly links
  - Variant selector from `book_variants` with price/compare, cover type
  - Gallery from `book_images` (primary + thumbnails)
  - Display `avg_rating`, `review_count`, `sold_count`

- Phase B: Inventory & Cart (Week 3)
  - Show stock from `inventory` (qty/reserved, low-stock badge)
  - Prevent add-to-cart when `quantity == 0`
  - Voucher input in Cart and Checkout; compute provisional discount
  - Server cart API contracts for persistent carts (`carts`)
  - Wishlist page and actions (`wishlists`)

- Phase C: Checkout, Shipping & Payments (Week 3)
  - Address selector from `user_addresses` (default + new)
  - Shipping methods with fee from `shipping_rates` and `shipping_carriers`
  - Payment method statuses (pending/success/failed), summary updates
  - Order review page before submit; place order creates `orders` + `order_items`

- Phase D: Account & Loyalty (Week 3-4)
  - Rewards page: balance, transactions (`reward_points`, `loyalty_transactions`)
  - Profile parity: full fields + change password
  - Orders: status timeline from `order_status_history`, tracking number
  - Refund request form -> `refunds` (create pending)

- Phase E: Reviews & Promotions (Week 4)
  - Product Reviews: list, pagination, add review (after purchase check via `order_items`)
  - Review images upload (`review_images`)
  - Promotions: vouchers usage recording (`voucher_usage`), flash sale badges (`flash_sales`), promo ribbons (`promotions`)

- Phase F: Notifications & Recommendations (Week 4)
  - Notifications center (list/read), types
  - Recommended blocks using `user_book_interactions` (basic rules)

---

## 3) API Contracts (Front-end Expectations)

- Catalog
  - GET `/api/categories` → tree { id, name, slug, parent_id }
  - GET `/api/books` → filters: q, category, author, publisher, min_price, max_price, rating
  - GET `/api/books/:id` → book, variants[], images[]

- Inventory
  - GET `/api/variants/:id/inventory` → { quantity, reserved_quantity }

- Cart & Wishlist
  - GET `/api/cart` | POST `/api/cart` | PATCH `/api/cart/:variantId` | DELETE `/api/cart/:variantId`
  - GET `/api/wishlist` | POST `/api/wishlist` | DELETE `/api/wishlist/:bookId`

- Promotions
  - POST `/api/voucher/apply` → { discount_amount, code, valid }
  - GET `/api/flash-sales` → items + prices

- Shipping
  - GET `/api/shipping/methods` → carriers + rates by province

- Orders & Payments
  - POST `/api/orders` → creates order + items, returns order_code
  - GET `/api/orders` | GET `/api/orders/:id`
  - POST `/api/payments` → start payment, returns transaction_id and status

- Rewards
  - GET `/api/rewards` → points balance, tier, transactions

- Reviews
  - GET `/api/books/:id/reviews` | POST `/api/books/:id/reviews`

- Notifications
  - GET `/api/notifications` | PATCH `/api/notifications/:id/read`

---

## 4) Page Updates Checklist

- Homepage: featured + promo badges, category shortcuts
- Search: filters, sort, pagination, category/author/publisher facets
- Product: variant selector, gallery, stock status, rating, review tab
- Cart: voucher input, totals with discounts, stock validation
- Checkout: address selector, shipping methods, payment feedback
- Account: rewards, orders timeline, refunds, wishlist, reviews
- Admin: categories tree, authors, publishers, shipping management tabs

---

## 5) Dependencies & Risks

- Back-end endpoints must support filters, variants, inventory, vouchers
- Image hosting and upload for review images
- Payment gateway sandbox for status flows
- Province/district dataset for address forms

---

## 6) Milestones & Acceptance

- M1: Catalog/PDP complete (variants, gallery, filters)
- M2: Cart/Checkout functional with vouchers & shipping
- M3: Account suite complete (orders, refunds, rewards)
- M4: Reviews & Promotions live
- M5: Notifications & Recommendations

Acceptance per page: responsive, a11y, no layout shift on hover, clear focus states, sufficient contrast, forms with labels, alt text on images.
