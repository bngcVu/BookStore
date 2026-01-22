# Front-end Redesign Plan (SQL-mapped)

## Goals
- Adopt "BookStore Classic" design system (editorial, trust & authority)
- Map FE features to SQL entities for realistic data flows
- Improve a11y, performance, and consistent navigation

## Core Data → UI Mapping
- Catalog:
  - `categories`, `authors`, `publishers`, `books`, `book_images`, `book_variants`
  - UI: Home (Hero + Highlights), Search (filters: category/author/publisher), Product Detail (variant selector, gallery)
- Inventory & Pricing:
  - `inventory`, `price_history`
  - UI: PDP stock indicator (qty, low-stock), strike-through compare price, price history badge (optional)
- Cart & Wishlist:
  - `carts`, `wishlists`
  - UI: Cart page, Wishlist page, mini-toast for add/remove
- Promotions & Vouchers:
  - `flash_sales`, `flash_sale_items`, `vouchers`, `promotions`, `promotion_books`
  - UI: Voucher input on Checkout, Flash Sale banner (optional), Promo badges
- Shipping:
  - `shipping_carriers`, `shipping_rates`
  - UI: Checkout shipping fee estimate by province; delivery ETA range
- Orders:
  - `orders`, `order_items`, `order_status_history`, `refunds`
  - UI: Account Orders list + detail with status timeline; Refund initiation
- Payments:
  - `payments`
  - UI: Payment method selection + status display
- Rewards/Loyalty:
  - `reward_points`, `loyalty_transactions`
  - UI: Account Rewards summary + history
- Reviews:
  - `reviews`, `review_images`
  - UI: PDP reviews + rating breakdown
- Notifications & Interactions:
  - `notifications`, `user_book_interactions`
  - UI: Account notifications; PDP wish/cart interaction buttons

## Pages & Components (New Style)
- Global Header: glass, minimal nav, large type (Cormorant Garamond)
- Hero: single-column, center headline, one CTA
- Search: left filter column (category/author/publisher), right results grid; sorting
- PDP: large cover, gallery strip, editorial typography, variant selector, stock/price
- Cart/Checkout: checklist layout, voucher field, totals, clear CTA
- Account Suite: sidebar, orders, addresses, rewards, refunds, notifications

## Design Tokens (to implement)
- Fonts:
  - Heading: Cormorant Garamond
  - Body: Libre Baskerville
- Colors:
  - `--color-primary: #0F172A`
  - `--color-secondary: #334155`
  - `--color-cta: #0369A1`
  - `--color-bg: #F8FAFC`
  - `--color-text: #020617`
- Effects:
  - `backdrop-filter: blur(6px)` for header
  - Transitions: 200ms, `prefers-reduced-motion` support

## Phases
1) Tokens & Fonts: add new theme variables and font imports; keep legacy aliases
2) Global UI: apply to header, nav, hero, footer; unify links
3) Catalog UX: filters, sorting, PDP variants/gallery/stock
4) Checkout UX: voucher, shipping estimation, clear CTAs
5) Account UX: orders timeline, rewards, refunds, notifications
6) A11y & Perf: aria-current, focus outlines, reduced motion; image lazy-loading

## Next Actions
- Implement new theme file and switch site to classic palette
- Update components to editorial typography and high-contrast buttons
- Add `aria-current="page"` auto-detection for nav
- Introduce shipping fee estimation stub aligning `shipping_rates`
