# Wireframes - USER Pages (Customer)

> **Phong cách:** AbeBooks Classic - Professional, Trustworthy, Information-rich  
> **Responsive:** Desktop-first, mobile-responsive

---

## 1. HOMEPAGE (index.html)

### Layout Structure

```
┌─────────────────────────────────────────────────────────────────┐
│ HEADER (Fixed, bg-white, border-bottom gray-100)               │
│ ┌──────┐  ┌────────────────────────────┐  ┌──────────────────┐│
│ │ LOGO │  │   SEARCH BAR (Large)       │  │ Sign In | Basket ││
│ │(Serif│  │ "Author/Title/ISBN..."     │  │ My Account | Help││
│ │ Red) │  └────────────────────────────┘  └──────────────────┘│
│ └──────┘                                                        │
│ Books | Art & Collectibles | Rare Books | Signed Copies        │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ HERO SECTION (bg-gray-50, padding 48px)                        │
│                                                                 │
│   Discover Rare Books, First Editions & Collectibles           │
│   ─────────────────────────────────────────────────             │
│   Millions of books from trusted sellers worldwide             │
│                                                                 │
│   [Browse Rare Books] [Browse Signed Copies]                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ FEATURED SECTION (bg-white, padding 32px)                      │
│                                                                 │
│ ┌─ Trending Books ──────────────────────────────────────────┐  │
│ │                                                            │  │
│ │ ┌────────┐ ┌────────┐ ┌────────┐ ┌────────┐             │  │
│ │ │ [IMG]  │ │ [IMG]  │ │ [IMG]  │ │ [IMG]  │             │  │
│ │ │ 150x   │ │ 150x   │ │ 150x   │ │ 150x   │             │  │
│ │ │ 220px  │ │ 220px  │ │ 220px  │ │ 220px  │             │  │
│ │ └────────┘ └────────┘ └────────┘ └────────┘             │  │
│ │ Title      Title      Title      Title                    │  │
│ │ Author     Author     Author     Author                   │  │
│ │ $25.00     $18.50     $42.00     $15.00                   │  │
│ │ [Fine]     [V.Good]   [Rare]     [Good]                   │  │
│ │ Seller A   Seller B   Seller C   Seller D                 │  │
│ └────────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ CURATED LISTS (bg-gray-50, padding 32px)                       │
│                                                                 │
│ ┌─ 100 Fiction Books to Read ──────────────────────────────┐   │
│ │ [4-column grid similar to above]                         │   │
│ └──────────────────────────────────────────────────────────┘   │
│                                                                 │
│ ┌─ Signed First Editions ───────────────────────────────────┐  │
│ │ [4-column grid with "Signed" + "1st Ed" badges]          │  │
│ └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ FOOTER (bg-white, border-top gray-100, padding 32px)           │
│                                                                 │
│ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐              │
│ │ About   │ │ Help    │ │ Policies│ │ Connect │              │
│ │ ─────   │ │ ─────   │ │ ─────── │ │ ─────── │              │
│ │ About Us│ │ FAQ     │ │ Privacy │ │ Facebook│              │
│ │ Careers │ │ Contact │ │ Terms   │ │ Twitter │              │
│ │ Press   │ │ Shipping│ │ Returns │ │ Instagram│             │
│ └─────────┘ └─────────┘ └─────────┘ └─────────┘              │
│                                                                 │
│ © 2026 BookStore. All rights reserved.                         │
└─────────────────────────────────────────────────────────────────┘
```

### Component Details

**Header:**
- Height: 120px (60px logo/search, 40px navigation)
- Logo: 140px width, serif font, dark red (#8B0000)
- Search bar: max-width 600px, height 48px, placeholder "Author / Title / Keyword or ISBN"
- Links: text-sm, sans-serif, gray-900, hover dark-red underline

**Product Card (Grid Item):**
```
┌──────────────────┐
│   [Book Cover]   │ ← 150x220px, border gray-100
│   150 x 220px    │
└──────────────────┘
Title of the Book    ← text-xl, serif, bold, black, 2 lines max
by Author Name       ← text-lg, serif, normal, gray-900
$25.00              ← text-lg, sans, bold, dark-red
[Fine] [1st Ed]     ← badges (10% opacity bg)
Seller: John's Books ← text-sm, sans, gray-600
★★★★★ (4.8)         ← text-xs, gold stars
```

---

## 2. SEARCH / PRODUCT LISTING (search.html, category.html)

### Layout Structure

```
┌─────────────────────────────────────────────────────────────────┐
│ HEADER (Same as Homepage)                                       │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ BREADCRUMB (padding 16px)                                       │
│ Home > Books > Fiction > Classic Literature                     │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ SEARCH RESULTS (bg-gray-50)                                     │
│                                                                 │
│ ┌─SIDEBAR (25%)────┐ ┌─MAIN CONTENT (75%)──────────────────┐  │
│ │                  │ │                                      │  │
│ │ FILTERS          │ │ ┌─ Sort & Results ─────────────────┐│  │
│ │ ───────          │ │ │ 1,234 results                    ││  │
│ │                  │ │ │ Sort: [Relevance ▼]              ││  │
│ │ ▼ Price          │ │ └──────────────────────────────────┘│  │
│ │   $0 - $100      │ │                                      │  │
│ │   [slider]       │ │ ┌─PRODUCT GRID (3 cols)────────────┐│  │
│ │                  │ │ │                                   ││  │
│ │ ▼ Condition      │ │ │ [Card] [Card] [Card]             ││  │
│ │   ☐ Fine         │ │ │                                   ││  │
│ │   ☐ Very Good    │ │ │ [Card] [Card] [Card]             ││  │
│ │   ☐ Good         │ │ │                                   ││  │
│ │   ☐ Fair         │ │ │ [Card] [Card] [Card]             ││  │
│ │                  │ │ │                                   ││  │
│ │ ▼ Binding        │ │ │ [Card] [Card] [Card]             ││  │
│ │   ☐ Hardcover    │ │ │                                   ││  │
│ │   ☐ Softcover    │ │ └───────────────────────────────────┘│  │
│ │                  │ │                                      │  │
│ │ ▼ Publication Yr │ │ ┌─PAGINATION────────────────────────┐│  │
│ │   [1900] - [2025]│ │ │ ← 1 2 3 ... 42 →                 ││  │
│ │                  │ │ └──────────────────────────────────┘│  │
│ │ ▼ Language       │ │                                      │  │
│ │   ☐ English      │ │                                      │  │
│ │   ☐ Vietnamese   │ │                                      │  │
│ │                  │ │                                      │  │
│ │ ▼ Seller Rating  │ │                                      │  │
│ │   ☐ 4+ stars     │ │                                      │  │
│ │   ☐ 3+ stars     │ │                                      │  │
│ │                  │ │                                      │  │
│ │ [Clear Filters]  │ │                                      │  │
│ └──────────────────┘ └──────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ FOOTER (Same as Homepage)                                       │
└─────────────────────────────────────────────────────────────────┘
```

### Component Details

**Sidebar Filter:**
- Width: 25% (280px)
- Background: white
- Padding: 20px
- Border-right: 1px solid gray-100
- Accordion sections (expand/collapse)
- Checkboxes: custom styled, dark-red when checked

**Sort Dropdown:**
- Options: Relevance, Price: Low to High, Price: High to Low, Newest, Bestselling
- Font: sans-serif, text-base

**Product Grid:**
- 3 columns desktop (gap 24px)
- 2 columns tablet
- 1 column mobile

---

## 3. PRODUCT DETAIL (product.html)

### Layout Structure

```
┌─────────────────────────────────────────────────────────────────┐
│ HEADER (Same as Homepage)                                       │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ BREADCRUMB                                                      │
│ Home > Books > Fiction > Classic Literature > To Kill a Mockingbird│
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ PRODUCT DETAIL (bg-white, padding 32px)                         │
│                                                                 │
│ ┌─LEFT (40%)────────┐ ┌─RIGHT (60%)────────────────────────┐  │
│ │                   │ │                                     │  │
│ │ ┌───────────────┐ │ │ To Kill a Mockingbird              │  │
│ │ │               │ │ │ ═══════════════════════            │  │
│ │ │  Book Cover   │ │ │ (text-3xl, serif, bold, black)     │  │
│ │ │  300 x 440px  │ │ │                                     │  │
│ │ │  (Zoomable)   │ │ │ by Harper Lee                      │  │
│ │ │               │ │ │ (text-xl, serif, gray-900)         │  │
│ │ └───────────────┘ │ │                                     │  │
│ │                   │ │ Publisher: J.B. Lippincott & Co.   │  │
│ │ ┌─Thumbnails────┐ │ │ Publication Year: 1960             │  │
│ │ │[T1][T2][T3][T4]│ │ │ ISBN: 978-0-06-112008-4           │  │
│ │ └───────────────┘ │ │ Edition: First Edition             │  │
│ │                   │ │ Language: English                  │  │
│ │                   │ │                                     │  │
│ │                   │ │ ┌─VARIANT SELECTOR────────────────┐│  │
│ │                   │ │ │ Condition: [Fine ▼]             ││  │
│ │                   │ │ │ Binding: [Hardcover ▼]          ││  │
│ │                   │ │ └─────────────────────────────────┘│  │
│ │                   │ │                                     │  │
│ │                   │ │ $125.00                            │  │
│ │                   │ │ (text-4xl, sans, bold, dark-red)   │  │
│ │                   │ │ Compare at: $150.00 (strikethrough)│  │
│ │                   │ │                                     │  │
│ │                   │ │ [Fine] [1st Edition] [Signed]      │  │
│ │                   │ │ (badges with 10% opacity bg)       │  │
│ │                   │ │                                     │  │
│ │                   │ │ ┌─SELLER INFO──────────────────────┐│  │
│ │                   │ │ │ Seller: Rare Books Emporium     ││  │
│ │                   │ │ │ Location: New York, USA         ││  │
│ │                   │ │ │ Rating: ★★★★★ (4.9) 1,234 sales││  │
│ │                   │ │ │ [Contact Seller]                ││  │
│ │                   │ │ └─────────────────────────────────┘│  │
│ │                   │ │                                     │  │
│ │                   │ │ [Add to Basket] [Add to Wishlist]  │  │
│ │                   │ │ (btn-primary)   (btn-outline)      │  │
│ └───────────────────┘ └─────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ TABS SECTION (bg-gray-50, padding 32px)                         │
│                                                                 │
│ [Description] [Details] [Reviews (24)]                          │
│ ──────────────────────────────────────────────────────          │
│                                                                 │
│ ▼ DESCRIPTION TAB (Active)                                     │
│                                                                 │
│ A gripping, heart-wrenching, and wholly remarkable tale of     │
│ coming-of-age in a South poisoned by virulent prejudice...     │
│ (text-base, serif, line-height 1.75, max-width 800px)          │
│                                                                 │
│ • Pages: 324                                                    │
│ • Dimensions: 8.5 x 5.5 x 1.2 inches                           │
│ • Weight: 450 grams                                             │
│ • Cover Type: Hardcover                                         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ REVIEWS SECTION (bg-white, padding 32px)                        │
│                                                                 │
│ Customer Reviews (24)                    [Write a Review]       │
│ ─────────────────────                                           │
│ Average Rating: ★★★★★ 4.8/5                                    │
│                                                                 │
│ ┌─REVIEW CARD───────────────────────────────────────────────┐  │
│ │ ★★★★★ 5/5                                                 │  │
│ │ "Excellent condition, fast shipping"                      │  │
│ │ (text-lg, serif, bold)                                    │  │
│ │                                                            │  │
│ │ The book arrived in pristine condition, exactly as        │  │
│ │ described. Seller was very responsive...                  │  │
│ │ (text-base, serif, line-height 1.5)                       │  │
│ │                                                            │  │
│ │ Pros: Excellent packaging, accurate description           │  │
│ │ Cons: None                                                 │  │
│ │                                                            │  │
│ │ [Verified Purchase] John D. - Jan 15, 2026               │  │
│ │ (text-sm, sans, gray-600)                                 │  │
│ └────────────────────────────────────────────────────────────┘  │
│                                                                 │
│ [More reviews...]                                               │
│                                                                 │
│ [Load More Reviews]                                             │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ FOOTER (Same as Homepage)                                       │
└─────────────────────────────────────────────────────────────────┘
```

### Component Details

**Image Gallery:**
- Main image: 300x440px, zoomable on click
- Thumbnails: 4 images, 60x88px each, border on active

**Variant Selector:**
- Dropdown select (condition, binding)
- Changes price, image, availability on selection

**Seller Info Card:**
- Background: gray-50
- Padding: 16px
- Border: 1px solid gray-100
- Border-radius: 6px

**Review Card:**
- Background: white
- Border: 1px solid gray-100
- Padding: 20px
- Margin-bottom: 16px
- Border-radius: 6px

---

## 4. BASKET / CART (cart.html)

### Layout Structure

```
┌─────────────────────────────────────────────────────────────────┐
│ HEADER (Same as Homepage)                                       │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ BREADCRUMB                                                      │
│ Home > Basket                                                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ BASKET (bg-gray-50, padding 32px)                               │
│                                                                 │
│ Your Basket (3 items)                                           │
│ ═════════════════                                               │
│                                                                 │
│ ┌─CART ITEMS (70%)────────┐ ┌─ORDER SUMMARY (30%)───────────┐ │
│ │                         │ │                               │ │
│ │ ┌─ITEM CARD───────────┐ │ │ Order Summary                 │ │
│ │ │ [IMG] Title         │ │ │ ─────────────                 │ │
│ │ │ 80x   by Author     │ │ │                               │ │
│ │ │ 120px               │ │ │ Subtotal (3 items): $68.50    │ │
│ │ │       Condition:Fine│ │ │ Shipping: $5.00               │ │
│ │ │       SKU: ABC123   │ │ │ Discount (SAVE10): -$6.85     │ │
│ │ │                     │ │ │ VIP Tier (Gold 5%): -$3.43    │ │
│ │ │       $25.00        │ │ │ Points Used (100): -$1.00     │ │
│ │ │       Qty: [1 ▼]    │ │ │ ─────────────────────────     │ │
│ │ │       [Remove]      │ │ │ Total: $62.22                 │ │
│ │ └─────────────────────┘ │ │ (text-2xl, bold, dark-red)    │ │
│ │                         │ │                               │ │
│ │ ┌─ITEM CARD───────────┐ │ │ ┌─VOUCHER CODE──────────────┐│ │
│ │ │ [Similar layout]    │ │ │ │ [Enter code] [Apply]     ││ │
│ │ └─────────────────────┘ │ │ └──────────────────────────┘│ │
│ │                         │ │                               │ │
│ │ ┌─ITEM CARD───────────┐ │ │ [Proceed to Checkout]         │ │
│ │ │ [Similar layout]    │ │ │ (btn-primary, full width)     │ │
│ │ └─────────────────────┘ │ │                               │ │
│ │                         │ │ [Continue Shopping]           │ │
│ │ [Continue Shopping]     │ │ (btn-outline)                 │ │
│ └─────────────────────────┘ └───────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ FOOTER (Same as Homepage)                                       │
└─────────────────────────────────────────────────────────────────┘
```

### Component Details

**Cart Item Card:**
- Background: white
- Border: 1px solid gray-100
- Padding: 16px
- Margin-bottom: 16px
- Layout: Flex (image left, info middle, price/qty right)

**Order Summary:**
- Background: white
- Border: 1px solid gray-100
- Padding: 24px
- Border-radius: 6px
- Sticky position (stays visible on scroll)

---

## 5. CHECKOUT (checkout.html)

### Layout Structure

```
┌─────────────────────────────────────────────────────────────────┐
│ HEADER (Simplified - Logo + Steps indicator)                   │
│ ┌──────┐  [1. Shipping] → [2. Payment] → [3. Review]          │
│ │ LOGO │                                                        │
│ └──────┘                                                        │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ CHECKOUT (bg-gray-50, padding 32px)                             │
│                                                                 │
│ ┌─MAIN FORM (70%)──────────┐ ┌─ORDER SUMMARY (30%)──────────┐ │
│ │                          │ │                              │ │
│ │ Shipping Address         │ │ Your Order (3 items)         │ │
│ │ ════════════════         │ │ ────────────────             │ │
│ │                          │ │                              │ │
│ │ ○ Use saved address:    │ │ [Mini item] $25.00           │ │
│ │   [Select address ▼]    │ │ [Mini item] $18.50           │ │
│ │                          │ │ [Mini item] $25.00           │ │
│ │ ○ New address:          │ │                              │ │
│ │   Full Name: [______]   │ │ Subtotal: $68.50             │ │
│ │   Phone: [______]       │ │ Shipping: $5.00              │ │
│ │   Province: [Select ▼]  │ │ Discount: -$6.85             │ │
│ │   District: [Select ▼]  │ │ ─────────────────            │ │
│ │   Address: [______]     │ │ Total: $66.65                │ │
│ │   ☐ Save this address   │ │ (text-2xl, bold, dark-red)   │ │
│ │                          │ │                              │ │
│ │ Shipping Method          │ │ [Place Order]                │ │
│ │ ═══════════════          │ │ (btn-primary, full width)    │ │
│ │                          │ │                              │ │
│ │ ○ GHTK Express ($5.00)  │ │ Secure Checkout 🔒           │ │
│ │   Estimated: 2-3 days   │ │                              │ │
│ │ ○ GHN Standard ($3.50)  │ │                              │ │
│ │   Estimated: 3-5 days   │ │                              │ │
│ │                          │ │                              │ │
│ │ Payment Method           │ │                              │ │
│ │ ══════════════           │ │                              │ │
│ │                          │ │                              │ │
│ │ ○ Cash on Delivery (COD)│ │                              │ │
│ │ ○ Bank Transfer         │ │                              │ │
│ │ ○ MoMo Wallet           │ │                              │ │
│ │ ○ Credit/Debit Card     │ │                              │ │
│ │                          │ │                              │ │
│ │ [Back to Cart] [Continue]│ │                              │ │
│ └──────────────────────────┘ └──────────────────────────────┘ │
└─────────────────────────────────────────────────────────────────┘
```

### Component Details

**Step Indicator:**
- Horizontal progress bar
- Active step: dark-red, bold
- Completed step: gray-600, checkmark
- Upcoming step: gray-400

**Form Sections:**
- Background: white
- Border: 1px solid gray-100
- Padding: 24px
- Margin-bottom: 24px
- Border-radius: 6px

**Radio Options:**
- Custom styled, dark-red when selected
- Label: text-base, sans-serif
- Sub-text: text-sm, gray-600

---

## 6. MY ACCOUNT (account.html)

### Layout Structure

```
┌─────────────────────────────────────────────────────────────────┐
│ HEADER (Same as Homepage)                                       │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ BREADCRUMB                                                      │
│ Home > My Account                                               │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ MY ACCOUNT (bg-gray-50, padding 32px)                           │
│                                                                 │
│ ┌─SIDEBAR (25%)────┐ ┌─MAIN CONTENT (75%)──────────────────┐  │
│ │                  │ │                                      │  │
│ │ ┌─USER INFO────┐ │ │ My Orders                           │  │
│ │ │ [Avatar]     │ │ │ ═════════                           │  │
│ │ │ John Doe     │ │ │                                      │  │
│ │ │ VIP: Gold ⭐ │ │ │ ┌─ORDER CARD──────────────────────┐ │  │
│ │ │ Points: 1,250│ │ │ │ Order #ORD-2026-001234         │ │  │
│ │ └──────────────┘ │ │ │ Date: Jan 20, 2026             │ │  │
│ │                  │ │ │ Status: [Shipping] (blue badge)│ │  │
│ │ MENU             │ │ │                                 │ │  │
│ │ ────             │ │ │ [Mini item] x1  $25.00         │ │  │
│ │ ► Orders         │ │ │ [Mini item] x2  $37.00         │ │  │
│ │   Wishlist       │ │ │                                 │ │  │
│ │   Addresses      │ │ │ Total: $67.00                  │ │  │
│ │   Reward Points  │ │ │                                 │ │  │
│ │   Reviews        │ │ │ Tracking: VN123456789          │ │  │
│ │   Profile        │ │ │                                 │ │  │
│ │   Sign Out       │ │ │ [View Details] [Track Order]   │ │  │
│ │                  │ │ └─────────────────────────────────┘ │  │
│ │                  │ │                                      │  │
│ │                  │ │ ┌─ORDER CARD──────────────────────┐ │  │
│ │                  │ │ │ [Similar layout]                │ │  │
│ │                  │ │ └─────────────────────────────────┘ │  │
│ │                  │ │                                      │  │
│ │                  │ │ [Pagination: ← 1 2 3 ... 10 →]      │  │
│ └──────────────────┘ └──────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ FOOTER (Same as Homepage)                                       │
└─────────────────────────────────────────────────────────────────┘
```

### Sub-pages (Same layout, different content)

**6.1 Wishlist (wishlist.html)**
```
Main Content:
┌─ My Wishlist (12 items) ──────────────────────────────────────┐
│                                                                │
│ ┌─PRODUCT GRID (3 cols)──────────────────────────────────────┐│
│ │ [Card] [Card] [Card]                                       ││
│ │ (Same as search results, with "Remove from Wishlist" btn) ││
│ └────────────────────────────────────────────────────────────┘│
└────────────────────────────────────────────────────────────────┘
```

**6.2 Addresses (addresses.html)**
```
Main Content:
┌─ My Addresses ────────────────────────────────────────────────┐
│                                                                │
│ [+ Add New Address]                                            │
│                                                                │
│ ┌─ADDRESS CARD───────────────────────────────────────────────┐│
│ │ John Doe                                    [Default] 🏠   ││
│ │ +84 123 456 789                                            ││
│ │ 123 Nguyen Hue St, District 1, Ho Chi Minh City           ││
│ │                                                            ││
│ │ [Edit] [Delete] [Set as Default]                          ││
│ └────────────────────────────────────────────────────────────┘│
│                                                                │
│ ┌─ADDRESS CARD───────────────────────────────────────────────┐│
│ │ [Similar layout]                                           ││
│ └────────────────────────────────────────────────────────────┘│
└────────────────────────────────────────────────────────────────┘
```

**6.3 Reward Points (rewards.html)**
```
Main Content:
┌─ Reward Points ───────────────────────────────────────────────┐
│                                                                │
│ ┌─POINTS SUMMARY──────────────────────────────────────────────┐│
│ │ Current Balance: 1,250 points                              ││
│ │ Points Value: $12.50                                       ││
│ │                                                            ││
│ │ VIP Tier: Gold ⭐                                          ││
│ │ Progress to Diamond: 750 points (60%)                      ││
│ │ [Progress bar: ████████░░ 60%]                            ││
│ └────────────────────────────────────────────────────────────┘│
│                                                                │
│ Points History                                                 │
│ ──────────────                                                 │
│                                                                │
│ ┌─HISTORY ITEM────────────────────────────────────────────────┐│
│ │ +50 points  Purchase #ORD-2026-001234    Jan 20, 2026     ││
│ └────────────────────────────────────────────────────────────┘│
│ ┌─HISTORY ITEM────────────────────────────────────────────────┐│
│ │ -100 points Redeemed for discount         Jan 18, 2026     ││
│ └────────────────────────────────────────────────────────────┘│
└────────────────────────────────────────────────────────────────┘
```

**6.4 Reviews (reviews.html)**
```
Main Content:
┌─ My Reviews ──────────────────────────────────────────────────┐
│                                                                │
│ ┌─REVIEW CARD────────────────────────────────────────────────┐│
│ │ [Book thumbnail] To Kill a Mockingbird                     ││
│ │                  by Harper Lee                             ││
│ │                                                            ││
│ │ ★★★★★ 5/5                                                 ││
│ │ "Excellent condition, fast shipping"                      ││
│ │                                                            ││
│ │ The book arrived in pristine condition...                 ││
│ │                                                            ││
│ │ Reviewed on: Jan 15, 2026                                 ││
│ │ [Edit] [Delete]                                           ││
│ └────────────────────────────────────────────────────────────┘│
└────────────────────────────────────────────────────────────────┘
```

**6.5 Profile (profile.html)**
```
Main Content:
┌─ My Profile ──────────────────────────────────────────────────┐
│                                                                │
│ ┌─PROFILE FORM───────────────────────────────────────────────┐│
│ │ Avatar: [Upload new photo]                                 ││
│ │                                                            ││
│ │ Full Name: [John Doe]                                     ││
│ │ Email: [john.doe@example.com]                             ││
│ │ Phone: [+84 123 456 789]                                  ││
│ │ Date of Birth: [01/01/1990]                               ││
│ │ Gender: [Male ▼]                                          ││
│ │                                                            ││
│ │ [Save Changes] [Cancel]                                    ││
│ └────────────────────────────────────────────────────────────┘│
│                                                                │
│ ┌─CHANGE PASSWORD────────────────────────────────────────────┐│
│ │ Current Password: [______]                                 ││
│ │ New Password: [______]                                     ││
│ │ Confirm Password: [______]                                 ││
│ │                                                            ││
│ │ [Update Password]                                          ││
│ └────────────────────────────────────────────────────────────┘│
└────────────────────────────────────────────────────────────────┘
```

---

## 7. ORDER DETAIL (order-detail.html)

### Layout Structure

```
┌─────────────────────────────────────────────────────────────────┐
│ HEADER (Same as Homepage)                                       │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ BREADCRUMB                                                      │
│ Home > My Account > Orders > Order #ORD-2026-001234             │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ ORDER DETAIL (bg-gray-50, padding 32px)                         │
│                                                                 │
│ Order #ORD-2026-001234                                          │
│ ══════════════════════                                          │
│                                                                 │
│ ┌─ORDER STATUS────────────────────────────────────────────────┐│
│ │ [Pending] → [Confirmed] → [Processing] → [●Shipping] → [Delivered]│
│ │                                           (Active)           ││
│ │ Estimated Delivery: Jan 25, 2026                            ││
│ │ Tracking Number: VN123456789 [Track Package]               ││
│ └─────────────────────────────────────────────────────────────┘│
│                                                                 │
│ ┌─ORDER INFO (50%)────────┐ ┌─SHIPPING INFO (50%)────────────┐│
│ │ Order Date: Jan 20, 2026│ │ Shipping Address:              ││
│ │ Payment: Cash on Delivery│ │ John Doe                       ││
│ │ Payment Status: Pending │ │ +84 123 456 789                ││
│ └─────────────────────────┘ │ 123 Nguyen Hue St, District 1  ││
│                             │ Ho Chi Minh City               ││
│                             └────────────────────────────────┘│
│                                                                 │
│ Order Items                                                     │
│ ───────────                                                     │
│                                                                 │
│ ┌─ITEM CARD──────────────────────────────────────────────────┐ │
│ │ [IMG] To Kill a Mockingbird                                │ │
│ │ 80x   by Harper Lee                                        │ │
│ │ 120px                                                      │ │
│ │       Condition: Fine | SKU: ABC123                        │ │
│ │       Unit Price: $25.00 x 1                               │ │
│ │       Discount: -$2.50                                     │ │
│ │       Subtotal: $22.50                                     │ │
│ │                                                            │ │
│ │       ☐ Gift wrapped                                       │ │
│ │       [Write Review] (if delivered & not reviewed)         │ │
│ └────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ ┌─ITEM CARD──────────────────────────────────────────────────┐ │
│ │ [Similar layout]                                           │ │
│ └────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ ┌─ORDER SUMMARY──────────────────────────────────────────────┐ │
│ │ Subtotal: $68.50                                           │ │
│ │ Shipping (GHTK Express): $5.00                             │ │
│ │ Discount (SAVE10): -$6.85                                  │ │
│ │ VIP Tier (Gold 5%): -$3.43                                 │ │
│ │ Points Used (100): -$1.00                                  │ │
│ │ ─────────────────────────────────────────────              │ │
│ │ Total: $62.22                                              │ │
│ │ (text-2xl, bold, dark-red)                                 │ │
│ └────────────────────────────────────────────────────────────┘ │
│                                                                 │
│ [Cancel Order] [Request Refund] [Contact Seller]               │
│ (Conditional based on status)                                  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ FOOTER (Same as Homepage)                                       │
└─────────────────────────────────────────────────────────────────┘
```

---

## RESPONSIVE BEHAVIOR

### Mobile (< 768px)
- Header: Stack logo, search, menu (hamburger)
- Product grid: 1 column
- Sidebar filters: Collapsible drawer
- Product detail: Stack image + info vertically
- Cart: Stack items + summary vertically
- Checkout: Stack form + summary vertically
- Account: Tabs instead of sidebar

### Tablet (768px - 1023px)
- Product grid: 2 columns
- Sidebar: 30% width
- Product detail: 40/60 split maintained
- Cart: 60/40 split
- Checkout: 65/35 split

### Desktop (≥ 1024px)
- Product grid: 3-4 columns
- All layouts as designed above
- Max container width: 1280px

---

## INTERACTION PATTERNS

### Hover States
- **Links:** Underline (dark-red)
- **Cards:** Border color change (gray-100 → gray-200) + subtle shadow
- **Buttons:** Background darken (10-15%)
- **Thumbnails:** Border highlight (dark-red)
- **No scale transforms**

### Loading States
- Skeleton screens for product grids
- Spinner for form submissions
- Progress bar for checkout steps

### Empty States
- Wishlist: "Your wishlist is empty. Start browsing!"
- Cart: "Your basket is empty. Continue shopping."
- Orders: "You haven't placed any orders yet."

### Error States
- Form validation: Red border + error message below field
- Out of stock: Gray out "Add to Basket" button
- Payment failed: Alert banner at top

---

**Version:** 1.0  
**Last Updated:** 2026-01-22  
**Pages:** 7 main pages + 5 account sub-pages
