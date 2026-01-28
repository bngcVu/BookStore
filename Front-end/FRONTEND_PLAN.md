# Kế hoạch Triển khai Frontend BookStore (Design System & Tasks)

Tài liệu này mô tả chi tiết kế hoạch thiết kế và xây dựng giao diện Frontend cho hệ thống BookStore, dựa trên cấu trúc dữ liệu (`DATABASE_SCHEMA.md`) và hệ thống thiết kế (`ui-ux-pro-max`).

## 1. Hệ thống Thiết kế (Design System)

Chúng ta sẽ sử dụng **Vanilla CSS** với **CSS Variables** để quản lý giao diện, tuân thủ phong cách "Calm & Modern" (Yên tĩnh & Hiện đại) phù hợp với trải nghiệm đọc sách.

### 1.1. Bảng màu (Color Palette)
| Vai trò | Mã Hex | Tên biến CSS | Ghi chú |
| :--- | :--- | :--- | :--- |
| **Chủ đạo (Primary)** | `#0D9488` | `--color-primary` | Teal đậm - Dùng cho Header, Link chính. |
| **Phụ trợ (Secondary)** | `#2DD4BF` | `--color-secondary` | Teal sáng - Dùng cho các element trang trí. |
| **Nhấn/Hành động (CTA)** | `#EA580C` | `--color-cta` | Cam cháy - Dùng cho nút Mua hàng, Khuyến mãi. |
| **Văn bản (Text)** | `#134E4A` | `--color-text` | Xanh rêu đậm - Dễ đọc, dịu mắt hơn đen tuyền. |
| **Nền (Background)** | `#F0FDFA` | `--color-background` | Mint nhạt - Tạo cảm giác thư thái. |
| **Success** | `#16A34A` | `--color-success` | Thông báo thành công. |
| **Error** | `#DC2626` | `--color-error` | Thông báo lỗi. |

### 1.2. Typography (Phông chữ)
Sử dụng Google Fonts:
*   **Tiêu đề (Headings)**: `Lora` (Serif) - Mang lại vẻ đẹp cổ điển, tri thức của sách.
*   **Nội dung (Body)**: `Raleway` (Sans-serif) - Hiện đại, sạch sẽ, dễ đọc.

### 1.3. Khoảng cách & Hiệu ứng
*   **Bo góc (Border Radius)**: `8px` (Small), `12px` (Cards), `16px` (Modal).
*   **Đổ bóng (Shadows)**: Sử dụng shadow nhẹ (`0 4px 6px`) cho Card sách để tạo độ nổi.
*   **Micro-interactions**: Hiệu ứng hover nhẹ (nâng lên 2px), transition mượt mà (200ms).

---

## 2. Danh sách Công việc (Implementation Tasks)

Dưới đây là các task nhỏ để bạn review và kiểm tra tiến độ.

### Phase 1: Khởi tạo & Trang Chủ (Foundation & Home)
*Mục tiêu: Xây dựng khung sườn và trang quan trọng nhất.*

- [ ] **Task 1.1: Thiết lập cấu trúc dự án & Base CSS**
    - Tạo `css/variables.css`: Định nghĩa toàn bộ màu, font, spacing.
    - Tạo `css/reset.css`: Reset mặc định trình duyệt.
    - Tạo `css/base.css`: Style chung cho body, typography, container.
    - Tạo `layout/header.html` & `layout/footer.html` (HTML fragment hoặc file mẫu).
- [ ] **Task 1.2: Component Thư viện (UI Kit)**
    - Tạo `css/components.css`: Button (Primary/Secondary), Card (Sách), Input, Badge (Label sale).
    - Demo file `ui-kit.html` để kiểm tra các component này.
- [ ] **Task 1.3: Trang Chủ (Home Page - `index.html`)**
    - Banner chính (Hero Section) vói CTA "Khám phá ngay".
    - Section "Sách nổi bật" (Featured Books) - Lấy từ bảng `books (is_featured=1)`.
    - Section "Flash Sale" - Lấy từ bảng `flash_sales` & `flash_sale_items`.
    - Section "Danh mục phổ biến".

### Phase 2: Danh mục & Chi tiết Sản phẩm (Catalog)
*Mục tiêu: Hiển thị sản phẩm và thông tin chi tiết.*

- [ ] **Task 2.1: Trang Danh sách Sách (`books.html`)**
    - Sidebar bộ lọc: Theo Danh mục (`categories`), Tác giả (`authors`), Giá, Đánh giá.
    - Grid hiển thị sách với phân trang.
    - Sort bar (Sắp xếp theo giá, mới nhất).
- [ ] **Task 2.2: Trang Chi tiết Sách (`book-detail.html`)**
    - Gallery ảnh sách (`book_images`): Ảnh bìa, ảnh chi tiết.
    - Thông tin chính: Tên, Tác giả, Giá, Rating.
    - Chọn phiên bản (`book_variants`): Bìa cứng/mềm.
    - Tab nội dung: Mô tả, Thông tin chi tiết (Số trang, NXB).
    - Section "Đánh giá từ khách hàng" (`reviews`): Hiển thị sao, bình luận.
    - Section "Sách liên quan" (Recommendations).

### Phase 3: Tài khoản & Tương tác (User & Auth)
*Mục tiêu: Quản lý người dùng và cá nhân hóa.*

- [ ] **Task 3.1: Trang Đăng ký / Đăng nhập (`login.html`, `register.html`)**
    - Form đăng nhập/đăng ký với validation.
    - Quên mật khẩu.
- [ ] **Task 3.2: Trang Tài khoản (`profile.html`)**
    - Dashboard tổng quan: Cấp bậc thành viên (`customer_tiers`), Điểm thưởng (`reward_points`).
    - Cập nhật thông tin cá nhân.
- [ ] **Task 3.3: Quản lý Đơn hàng (`orders.html`)**
    - Danh sách đơn hàng (`orders`) với trạng thái màu sắc khác nhau.
    - Chi tiết đơn hàng (`order_items`).
- [ ] **Task 3.4: Sổ địa chỉ & Yêu thích (`addresses.html`, `wishlist.html`)**
    - CRUD địa chỉ giao hàng (`user_addresses`).
    - Danh sách sách yêu thích (`wishlists`).

### Phase 4: Giỏ hàng & Thanh toán (Checkout Flow)
*Mục tiêu: Chuyển đổi doanh số.*

- [ ] **Task 4.1: Giỏ hàng (`cart.html`)**
    - Liệt kê sản phẩm, điều chỉnh số lượng.
    - Hiển thị tạm tính.
    - Input mã giảm giá (`vouchers`).
- [ ] **Task 4.2: Trang Thanh toán (`checkout.html`)**
    - Bước 1: Chọn địa chỉ & Vận chuyển (`shipping_rates`).
    - Bước 2: Chọn phương thức thanh toán.
    - Bước 3: Xác nhận đơn hàng.
- [ ] **Task 4.3: Trang Thành công (`order-success.html`)**
    - Thông báo đặt hàng thành công & Mã đơn hàng.

---

## 3. Quy tắc Kỹ thuật (Technical Rules)

1.  **Mobile First**: Thiết kế CSS ưu tiên màn hình nhỏ trước, sau đó dùng Media Queries (`@media (min-width: 768px)`) cho Tablet và Desktop.
2.  **Semantic HTML**: Sử dụng đúng thẻ `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>` để tối ưu SEO.
3.  **Accessibility**: Đảm bảo contrast màu sắc, có `alt` cho ảnh, và `aria-label` cho các nút icon.
4.  **No Utility Classes**: Hạn chế dùng class kiểu Tailwind (vd: `mt-10`, `text-red`) nếu không dùng framework. Hãy dùng Semantic Class (vd: `.book-card__title`, `.section-hero`).

Bạn hãy xem qua danh sách task trên. Nếu đồng ý, tôi sẽ bắt đầu thực hiện **Phase 1** ngay lập tức.
