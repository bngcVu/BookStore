# 🚀 BookStore Frontend - Development Guide

## Quick Start (Test UI ngay!)

### Bước 1: Start Dev Server

```powershell
cd d:\BookStore\Front-end
python serve.py
```

### Bước 2: Mở trình duyệt

Truy cập: **http://localhost:8000/user/index.html**

### Bước 3: Test Navigation

Bây giờ bạn có thể click và chuyển trang tự do:
- Homepage → Search → Product
- Cart → Checkout  
- Login → Register
- Account → Profile/Orders/Addresses

---

## Cấu trúc thư mục

```
Front-end/
├── serve.py                 # Dev server script
├── src/
│   ├── assets/
│   │   ├── css/            # Styles
│   │   └── js/             # JavaScript
│   └── user/               # Customer pages
│       ├── index.html      # Homepage
│       ├── search.html     # Search
│       ├── product.html    # Product detail
│       ├── cart.html       # Shopping cart
│       ├── checkout.html   # Checkout
│       ├── wishlist.html   # Wishlist
│       ├── auth/
│       │   ├── login.html
│       │   └── register.html
│       └── account/
│           ├── index.html      # Account dashboard
│           ├── profile.html    # Profile settings
│           ├── orders.html     # Order history
│           ├── order.html      # Order detail
│           └── addresses.html  # Saved addresses
```

---

## Tính năng hiện có

### ✅ UI Components
- Responsive header với sticky navigation
- Product cards với hover effects
- Form inputs với focus states
- Badge system (status indicators)
- Smooth transitions (200ms)

### ✅ Navigation
- Tất cả trang đã được link với nhau
- Relative paths - hoạt động với dev server
- Breadcrumb navigation trong account pages

### ✅ Mock Data
- Featured products trên homepage
- Search results
- Cart items
- Order history
- User profile

---

## Best Practices được áp dụng

### UX
- ✅ Smooth transitions (150-300ms)
- ✅ Hover states cho interactive elements
- ✅ Focus states cho accessibility
- ✅ Cursor pointer cho clickable items
- ✅ No layout shift on hover

### Design
- ✅ Classic bookstore aesthetic
- ✅ Serif fonts cho content (Libre Baskerville)
- ✅ Sans-serif cho UI (system fonts)
- ✅ Dark red accent color (#8B0000)
- ✅ 10% opacity badges
- ✅ Information-dense layout

### Accessibility
- ✅ Semantic HTML
- ✅ ARIA labels
- ✅ Keyboard navigation
- ✅ Focus-visible states
- ✅ Proper color contrast

---

## Next Steps

### Hiện tại (Testing UI)
Bạn đang ở giai đoạn này! Chỉ cần:
1. Chạy `python serve.py`
2. Test UI trong trình duyệt
3. Kiểm tra responsive (resize browser)

### Sau này (Khi ghép Backend)
1. Thay thế mock data trong `assets/js/api.js`
2. Connect với Spring Boot API
3. Add authentication
4. Add real database queries

---

## Troubleshooting

### Lỗi "Cannot GET /user/cart.html"
**Giải pháp:** Đảm bảo đang chạy dev server (`python serve.py`) và truy cập qua `http://localhost:8000`, KHÔNG phải `file://`

### Navigation không hoạt động
**Giải pháp:** Kiểm tra console (F12) xem có lỗi JavaScript không

### Styles không load
**Giải pháp:** Hard reload (Ctrl + Shift + R) để xóa cache

---

## Tips

- **Live reload:** Mỗi lần sửa HTML/CSS, chỉ cần F5 là reload
- **Mobile test:** Dùng Chrome DevTools (F12) → Toggle device toolbar
- **Performance:** Mở Network tab để xem load times
- **Debug:** Console tab để check JavaScript errors

---

**Happy Testing! 🎉**
