# User Page Overrides

> **PROJECT:** BookStore-User
> **Generated:** 2026-02-04 23:18:46
> **Page Type:** Product Detail

> ⚠️ **IMPORTANT:** Rules in this file **override** the Master file (`design-system/MASTER.md`).
> Only deviations from the Master are documented here. For all other rules, refer to the Master.

---

## Page-Specific Rules

### Layout Overrides

- **Max Width:** 800px (narrow, focused)
- **Layout:** Single column, centered
- **Sections:** 1. Hero (product + aggregate rating), 2. Rating breakdown, 3. Individual reviews, 4. Buy/CTA

### Spacing Overrides

- **Content Density:** Low — focus on clarity

### Typography Overrides

- No overrides — use Master typography

### Color Overrides

- **Strategy:** Trust colors. Star ratings gold. Verified badge green. Review sentiment colors.

### Component Overrides

- Avoid: Use for flat single-level sites
- Avoid: Ignore accessibility motion settings
- Avoid: Validate only on submit

---

## Page-Specific Components

- No unique components for this page

---

## Recommendations

- Effects: No gradients/shadows, simple hover (color/opacity shift), fast loading, clean transitions (150-200ms ease), minimal icons
- Navigation: Use for sites with 3+ levels of depth
- Animation: Check prefers-reduced-motion media query
- Forms: Validate on blur for most fields
- CTA Placement: After reviews summary + Buy button alongside reviews
