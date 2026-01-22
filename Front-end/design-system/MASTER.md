# BookStore Design System - AbeBooks Style (2024-2025)

> **Phong cách:** Classic, Professional, Trustworthy, Vintage/Academic  
> **Cảm giác:** Như đang lướt qua một hiệu sách lâu đời hoặc thư viện lớn  
> **Ưu tiên:** Readability, Information-rich, Collector-focused

---

## 🎨 Color Palette

### Primary Colors
```css
--color-primary-dark-red: #8B0000;      /* Dark Red - Accent cho links, buttons, hover */
--color-primary-navy: #1E3A5F;          /* Navy Blue - Alternative accent */
--color-primary-gold: #D4A017;          /* Gold - Badges (rare/signed/first edition) */
```

### Neutral Colors
```css
--color-white: #FFFFFF;                 /* Background chính */
--color-gray-50: #F5F5F5;               /* Background phụ */
--color-gray-100: #EDEDED;              /* Border, divider */
--color-gray-200: #D1D5DB;              /* Border hover */
--color-gray-600: #475569;              /* Muted text */
--color-gray-900: #0F172A;              /* Text chính */
--color-black: #000000;                 /* Heading, strong text */
```

### Semantic Colors
```css
--color-success: #059669;               /* Order confirmed, in stock */
--color-warning: #D97706;               /* Low stock, pending */
--color-error: #DC2626;                 /* Out of stock, cancelled */
--color-info: #0284C7;                  /* Shipping, processing */
```

### Condition Badge Colors (Subtle, 10% opacity background)
```css
--badge-fine: #059669;                  /* Fine condition */
--badge-very-good: #0284C7;             /* Very Good */
--badge-good: #D97706;                  /* Good */
--badge-fair: #DC2626;                  /* Fair/Poor */
--badge-rare: #D4A017;                  /* Rare/Signed/First Edition */
```

---

## 📝 Typography

### Font Families
```css
/* Serif - Cho tiêu đề và nội dung chính */
--font-serif: 'Georgia', 'Times New Roman', 'Book Antiqua', serif;

/* Sans-serif - Cho navigation, buttons, metadata */
--font-sans: 'Arial', 'Helvetica', 'Segoe UI', sans-serif;
```

### Font Sizes
```css
--text-xs: 0.75rem;      /* 12px - ISBN, SKU, metadata nhỏ */
--text-sm: 0.875rem;     /* 14px - Condition, seller info, price secondary */
--text-base: 1rem;       /* 16px - Body text, description */
--text-lg: 1.125rem;     /* 18px - Author name */
--text-xl: 1.25rem;      /* 20px - Book title (grid) */
--text-2xl: 1.5rem;      /* 24px - Book title (detail page) */
--text-3xl: 1.875rem;    /* 30px - Page heading */
--text-4xl: 2.25rem;     /* 36px - Hero title */
```

### Font Weights
```css
--font-normal: 400;
--font-medium: 500;
--font-semibold: 600;
--font-bold: 700;
```

### Line Heights
```css
--leading-tight: 1.25;
--leading-normal: 1.5;
--leading-relaxed: 1.75;
```

---

## 🧩 Component Styles

### Buttons
```css
/* Primary Button (Dark Red) */
.btn-primary {
  background: var(--color-primary-dark-red);
  color: white;
  padding: 10px 24px;
  font-family: var(--font-sans);
  font-size: var(--text-base);
  font-weight: var(--font-semibold);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background 200ms;
}
.btn-primary:hover {
  background: #6B0000;
}

/* Secondary Button (Navy) */
.btn-secondary {
  background: var(--color-primary-navy);
  color: white;
  /* Same padding/font as primary */
}
.btn-secondary:hover {
  background: #152A47;
}

/* Outline Button */
.btn-outline {
  background: transparent;
  color: var(--color-primary-dark-red);
  border: 1px solid var(--color-primary-dark-red);
  /* Same padding/font */
}
.btn-outline:hover {
  background: var(--color-primary-dark-red);
  color: white;
}
```

### Cards
```css
/* Product Card */
.product-card {
  background: white;
  border: 1px solid var(--color-gray-100);
  padding: 16px;
  border-radius: 4px;
  transition: border-color 200ms, box-shadow 200ms;
  cursor: pointer;
}
.product-card:hover {
  border-color: var(--color-gray-200);
  box-shadow: 0 2px 8px rgba(0,0,0,0.08);
}

/* Info Card (Account pages) */
.info-card {
  background: white;
  border: 1px solid var(--color-gray-100);
  padding: 20px;
  border-radius: 6px;
  margin-bottom: 16px;
}
```

### Badges
```css
/* Condition Badge */
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
  color: var(--badge-fine);
}
.badge-very-good {
  background: rgba(2, 132, 199, 0.1);
  color: var(--badge-very-good);
}
.badge-good {
  background: rgba(217, 119, 6, 0.1);
  color: var(--badge-good);
}
.badge-rare {
  background: rgba(212, 160, 23, 0.1);
  color: var(--badge-rare);
  border: 1px solid var(--badge-rare);
}
```

### Links
```css
.link {
  color: var(--color-primary-dark-red);
  text-decoration: none;
  font-family: var(--font-sans);
  transition: text-decoration 150ms;
}
.link:hover {
  text-decoration: underline;
}
```

### Forms
```css
/* Input */
.input {
  width: 100%;
  padding: 10px 14px;
  font-size: var(--text-base);
  font-family: var(--font-sans);
  border: 1px solid var(--color-gray-100);
  border-radius: 4px;
  background: white;
  transition: border-color 200ms;
}
.input:focus {
  outline: none;
  border-color: var(--color-primary-dark-red);
}

/* Search Bar (Large) */
.search-bar {
  width: 100%;
  max-width: 600px;
  padding: 14px 20px;
  font-size: var(--text-lg);
  font-family: var(--font-serif);
  border: 2px solid var(--color-gray-200);
  border-radius: 6px;
}
.search-bar:focus {
  border-color: var(--color-primary-dark-red);
}
```

---

## 📐 Layout & Spacing

### Container
```css
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 20px;
}
```

### Grid
```css
/* Product Grid - 3-4 columns desktop */
.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 24px;
}

@media (min-width: 1024px) {
  .product-grid {
    grid-template-columns: repeat(4, 1fr);
  }
}
```

### Spacing Scale
```css
--space-xs: 4px;
--space-sm: 8px;
--space-md: 16px;
--space-lg: 24px;
--space-xl: 32px;
--space-2xl: 48px;
--space-3xl: 64px;
```

---

## 🎭 Effects & Interactions

### Transitions
```css
/* Standard transition */
transition: all 200ms ease;

/* Color transition only */
transition: color 200ms, background-color 200ms;

/* Border transition */
transition: border-color 200ms;
```

### Hover States
- **Links:** Underline
- **Cards:** Border color change + subtle shadow
- **Buttons:** Background darken
- **Thumbnails:** Border highlight (no scale)

### No Animation
- Không dùng scale transform
- Không dùng rotate/skew
- Không dùng complex keyframe animations
- Ưu tiên smooth transitions (opacity, color, border)

---

## 🚫 Anti-Patterns (TRÁNH)

### ❌ Không Làm
1. **Emojis làm icons** - Dùng SVG icons (Heroicons, Lucide)
2. **Màu sắc flashy** - Giữ palette cổ điển, tránh neon/vibrant
3. **Animation phức tạp** - Không parallax, không 3D transforms
4. **Typography hiện đại quá** - Tránh font sans-serif trendy (Inter, Poppins)
5. **Glassmorphism/Neumorphism** - Giữ flat design với subtle shadows
6. **Gradient backgrounds** - Dùng solid colors
7. **Hover scale effects** - Chỉ dùng color/border transitions
8. **Quá nhiều whitespace** - Information-dense, compact layout
9. **Mobile-first quá đơn giản** - Desktop vẫn là priority, mobile là responsive version

### ✅ Nên Làm
1. **Serif fonts cho content** - Georgia, Times New Roman
2. **Information-rich layout** - Hiển thị nhiều metadata (edition, ISBN, condition, seller)
3. **Subtle hover effects** - Underline, border color, light shadow
4. **Professional color palette** - Dark red, navy, gold, grayscale
5. **Clear typography hierarchy** - Large titles, readable body, small metadata
6. **Consistent spacing** - 16-20px padding cho cards
7. **Trustworthy design** - Clean, organized, no tricks
8. **Collector-focused** - Badge cho rare/signed/first edition rõ ràng

---

## 📱 Responsive Breakpoints

```css
/* Mobile */
@media (max-width: 767px) {
  /* Stack layout, search bar full width, 1-2 columns */
}

/* Tablet */
@media (min-width: 768px) and (max-width: 1023px) {
  /* 2-3 columns, sidebar collapsible */
}

/* Desktop */
@media (min-width: 1024px) {
  /* 3-4 columns, sidebar visible, full layout */
}

/* Large Desktop */
@media (min-width: 1440px) {
  /* Max container width, optimal reading width */
}
```

---

## 🎯 Design Principles

1. **Readability First** - Font size đủ lớn, contrast cao, line-height thoải mái
2. **Information Density** - Hiển thị đầy đủ metadata (edition, condition, ISBN, seller)
3. **Trust & Credibility** - Professional, clean, no gimmicks
4. **Collector-Focused** - Badge rõ ràng cho rare/signed/first edition
5. **Classic Aesthetic** - Vintage bookstore vibe, academic feel
6. **No Distractions** - Minimal animations, focus on content
7. **Consistent Patterns** - Reuse components, predictable interactions
8. **Accessible** - High contrast, keyboard navigation, screen reader friendly

---

## 📚 Component Library

### Header
- Logo bên trái (serif font, dark red)
- Search bar lớn ở giữa (max-width 600px)
- Navigation links nhỏ bên phải (Sign In, My Account, Basket, Help)
- Fixed position với subtle shadow

### Footer
- 4 columns: About, Help, Policies, Connect
- Links nhỏ (text-sm), color gray-600
- Copyright text (text-xs)

### Product Thumbnail
- Book cover image (150-200px width)
- Title (text-xl, serif, bold)
- Author (text-lg, serif, normal)
- Price (text-lg, sans, bold, dark red)
- Condition badge
- Seller info (text-sm, gray-600)

### Sidebar Filter
- Accordion sections
- Checkboxes/radio buttons
- Price range slider
- Clear filters button

### Breadcrumb
- Home > Category > Subcategory > Book
- Text-sm, sans-serif, gray-600
- Current page bold

---

**Version:** 1.0  
**Last Updated:** 2026-01-22  
**Project:** BookStore - Used, Rare, Collectible & New Books Marketplace
