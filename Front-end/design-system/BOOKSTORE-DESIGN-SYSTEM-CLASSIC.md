## Design System: BookStore Classic

### Pattern
- **Name:** Minimal Single Column
- **Conversion Focus:** Single CTA focus. Large typography. Lots of whitespace. No nav clutter. Mobile-first.
- **CTA Placement:** Center, large CTA button
- **Color Strategy:** Minimalist: Brand + white #FFFFFF + accent. Buttons: High contrast 7:1+. Text: Black/Dark grey
- **Sections:** 1. Hero headline, 2. Short description, 3. Benefit bullets (3 max), 4. CTA, 5. Footer

### Style
- **Name:** Trust & Authority
- **Keywords:** Certificates/badges displayed, expert credentials, case studies with metrics, before/after comparisons, industry recognition, security badges
- **Best For:** Healthcare/medical landing pages, financial services, enterprise software, premium/luxury products, legal services
- **Performance:** ⚡ Excellent | **Accessibility:** ✓ WCAG AAA

### Colors
| Role | Hex |
|------|-----|
| Primary | #0F172A |
| Secondary | #334155 |
| CTA | #0369A1 |
| Background | #F8FAFC |
| Text | #020617 |

Notes: Navy + Gold + Professional grey

### Typography
- **Heading:** Cormorant Garamond
- **Body:** Libre Baskerville
- **Mood:** editorial, classic, literary, traditional, refined, bookish
- **Best For:** Publishing, blogs, news sites, literary magazines, book covers
- **Google Fonts:** https://fonts.google.com/share?selection.family=Cormorant+Garamond:wght@400;500;600;700|Libre+Baskerville:wght@400;700
- **CSS Import:**
```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600;700&family=Libre+Baskerville:wght@400;700&display=swap');
```

### Key Effects
Badge hover effects, metric pulse animations, certificate carousel, smooth stat reveal

### Avoid (Anti-patterns)
- Playful design
- Hidden credentials
- AI purple/pink gradients

### Pre-Delivery Checklist
- [ ] No emojis as icons (use SVG: Heroicons/Lucide)
- [ ] cursor-pointer on all clickable elements
- [ ] Hover states with smooth transitions (150-300ms)
- [ ] Light mode: text contrast 4.5:1 minimum
- [ ] Focus states visible for keyboard nav
- [ ] prefers-reduced-motion respected
- [ ] Responsive: 375px, 768px, 1024px, 1440px
