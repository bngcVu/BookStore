# BookStore Frontend - Marketplace Style

Đây là frontend cho hệ thống BookStore theo phong cách Marketplace (Tiki.vn style).

##  Cấu trúc thư mục

```
Front-end/
 index.html              # Trang chủ
 design-system.css       # Design system với CSS variables
 products/               # Trang sản phẩm
    index.html         # Danh sách sản phẩm
    detail.html        # Chi tiết sản phẩm
 cart/                  # Giỏ hàng
    index.html
 checkout/              # Thanh toán
    index.html
 account/               # Tài khoản
    login.html
    register.html
    profile.html
    orders.html
 admin/                 # Quản trị
    index.html        # Dashboard
    books/            # Quản lý sách
    orders/           # Quản lý đơn hàng
    customers/        # Quản lý khách hàng
 assets/
    css/
       components.css  # Component styles
       pages.css       # Page-specific styles
       admin.css       # Admin panel styles
    js/
       main.js        # Core functionality
       products.js    # Product data & functions
       cart.js        # Shopping cart logic
       admin.js       # Admin panel logic
    images/
 components/
     header.html        # Header component
     footer.html        # Footer component
     product-card.html  # Product card template
```

##  Design System

### Color Palette
- **Primary**: #2E90FA (Blue - Trust & Reliability)
- **Accent Orange**: #FF6B00 (Sale/Promotion)
- **Accent Red**: #F04438 (Discount badges)
- **Accent Green**: #12B76A (Success, in-stock)
- **Accent Yellow**: #F79009 (Ratings)

### Typography
- **Font**: Inter, Plus Jakarta Sans
- **Sizes**: 12px - 48px với scale chuẩn

### Spacing
- Scale: 4px, 8px, 12px, 16px, 20px, 24px, 32px...

##  Tính năng

### Customer Features
 Trang chủ với Hero banner
 Danh mục sách phong phú  
 Tìm kiếm & Filter sản phẩm
 Chi tiết sản phẩm với gallery
 Giỏ hàng (LocalStorage)
 Checkout process
 Đăng nhập / Đăng ký
 Quản lý profile & đơn hàng
 Đánh giá sản phẩm

### Admin Features
 Dashboard với metrics
 Quản lý sách (CRUD)
 Quản lý đơn hàng
 Quản lý khách hàng
 Quản lý danh mục
 Quản lý tồn kho
 Kiểm duyệt đánh giá

##  Responsive Design
- Mobile: 375px+
- Tablet: 768px+
- Desktop: 1024px+
- Wide: 1440px+

##  Tech Stack
- **Pure HTML5/CSS3/JavaScript** (No frameworks)
- **CSS Custom Properties** for theming
- **LocalStorage** for cart persistence
- **Fetch API** for component loading

##  Getting Started

1. Mở file `index.html` trong browser
2. Hoặc dùng Live Server trong VS Code
3. Explore các trang khác nhau

##  Notes
- Đây là static demo, chưa kết nối backend
- Data sản phẩm là mock data trong JavaScript
- Cart sử dụng LocalStorage
- Admin panel chưa có authentication thật

##  Developed by
BookStore Team - 2026
