# Kế hoạch Triển khai Frontend - BookStore Project

Tài liệu này phác thảo chiến lược thiết kế và danh sách các nhiệm vụ (tasks) triển khai Frontend dựa trên `DATABASE_SCHEMA.md` và tiêu chuẩn `ui-ux-pro-max`.

## 1. Design System & Tech Stack

### Technology Stack
- **Framework**: HTML5, Vanilla JavaScript (hoặc React/Next.js nếu được yêu cầu sau này - hiện tại dùng HTML/JS thuần theo cấu trúc thư mục hiện có).
- **Styling**: TailwindCSS (Utility-first, dễ tùy biến).
- **Icons**: Heroicons / Phosphor Icons (SVG).
- **Fonts**:
  - Headings: `Merriweather` (Serif - tạo cảm giác tri thức, sách vở).
  - Body: `Inter` hoặc `Roboto` (Sans-serif - hiện đại, dễ đọc trên màn hình).

### Color Palette (Premium Bookstore)
- **Primary**: `Deep Ocean Blue` (#0F172A) - Sang trọng, tin cậy.
- **Secondary**: `Amber Gold` (#F59E0B) - Điểm nhấn cho nút mua hàng, khuyến mãi (Vàng).
- **Background**: `Soft Paper` (#F8FAFC) - Dịu mắt, giống giấy.
- **Text**: `Slate 900` (Đen dịu) cho văn bản chính, `Slate 500` cho phụ đề.

## 2. Phân chia Nhóm Chức năng (Functional Groups)

Dựa trên Database Schema, hệ thống chia làm 3 phân hệ chính:

### A. Storefront (Khách hàng)
1. **Khám phá (Discovery)**: Trang chủ, Danh mục, Chi tiết sách.
2. **Mua hàng (Commerce)**: Giỏ hàng, Thanh toán (Checkout).
3. **Tài khoản (Account)**: Đăng nhập/ký, Hồ sơ, Lịch sử đơn hàng, Điểm thưởng.

### B. Admin Portal (Quản trị)
1. **Quản lý sản phẩm**: Sách, Danh mục, Tác giả.
2. **Quản lý đơn hàng**: Xử lý đơn, Trạng thái vận chuyển.
3. **Quản lý người dùng & Khuyến mãi**.

## 3. Danh sách Tasks (Implementation Plan)

Dưới đây là các task nhỏ để bạn dễ dàng review và đánh giá tiến độ.

### Phase 1: Foundation (Nền tảng)
- [x] **TASK-F01**: Khởi tạo cấu trúc dự án Frontend (folder structure, assets).
- [x] **TASK-F02**: Thiết lập TailwindCSS và file `input.css`.
- [x] **TASK-F03**: Xây dựng **Global Layout** (Header, Footer, Mobile Navigation).
- [x] **TASK-F04**: Thiết kế bộ UI Kit cơ bản (Button, Input, Badge, Card, Modal) theo style `ui-ux-pro-max`.

### Phase 2: Storefront - Discovery (Khám phá)
- [x] **TASK-S01**: Thiết kế **Trang chủ (Home Page)** (Banner, Featured, Best Sellers).
- [x] **TASK-S02**: Thiết kế **Component Sách (Book Card)** (Hiển thị ảnh, giá, rating, badge Sale).
- [x] **TASK-S03**: Thiết kế **Trang Danh sách (Category/Search)** với bộ lọc (Filter) bên trái.
- [x] **TASK-S04**: Thiết kế **Trang Chi tiết Sách (Product Detail)** (Gallery ảnh, chọn phiên bản bìa, thông tin chi tiết, Reviews).

### Phase 3: Shopping Experience (Mua sắm)
- [x] **TASK-S05**: Thiết kế **Trang Giỏ hàng (Cart)** (Table sản phẩm, Tăng giảm số lượng, Mã giảm giá).
- [x] **TASK-S06**: Thiết kế **Trang Thanh toán (Checkout)** (Địa chỉ, Phương thức vận chuyển, Thanh toán).

### Phase 4: User Account & Admin (Tài khoản & Quản trị)
- [x] **TASK-U01**: Các trang **Auth** (Login, Register).
- [x] **TASK-U02**: **Dashboard thành viên** (Profile, Lịch sử đơn hàng, Điểm thưởng).
- [x] **TASK-A01**: **Admin Dashboard** (Tổng quan, Sidebar, Thống kê).
- [x] **TASK-A02**: Trang **Quản lý** (Sản phẩm, Đơn hàng).
- [x] **TASK-A03**: Trang Quản lý Đơn hàng (Quy trình xử lý trạng thái).

### Phase 5: Polish & Integration (Hoàn thiện)
- [x] **TASK-P01**: Kiểm tra và liên kết tất cả các trang (`href`).
- [x] **TASK-P02**: Rà soát giao diện và trải nghiệm người dùng (Mobile Responsive).

## 4. Hướng dẫn Review
Sau khi hoàn thành mỗi task, tôi sẽ:
1. Cập nhật trạng thái trong file này.
2. Gửi screenshot hoặc file HTML/CSS để bạn mở trực tiếp trên trình duyệt.
3. Đợi feedback của bạn trước khi sang task tiếp theo.
