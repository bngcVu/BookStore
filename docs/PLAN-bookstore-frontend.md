# Kế hoạch phát triển Frontend: Sàn TMĐT BookStore

Dự án BookStore là nền tảng thương mại điện tử chuyên biệt để bán sách với các tính năng cạnh tranh như: Theo dõi giảm giá Wishlist, Flash sale tự động, cấp bậc thành viên (Loyalty). Kế hoạch này dựa trên cấu trúc database với 38 bảng đã được xây dựng.

## 1. Thông tin tổng quan (Overview)
- **Tên dự án:** BookStore E-commerce
- **Nền tảng (Platform):** Web Application (Responsive cho Mobile/Tablet/Desktop)
- **Tech Stack (Công nghệ):** Next.js (App Router), React, Tailwind CSS v4, TypeScript.
- **Goal (Mục tiêu):** Xây dựng luồng mua hàng (Shopping Flow) và tính năng cá nhân hóa (Personalization) tối ưu trải nghiệm tương tự Tiki.vn hoặc Fahasa.com.

## 2. Thiết kế Kiến trúc Giải pháp (Architecture)

### 2.1. Cấu trúc thư mục (File Structure)
```
/src
  /app                  # Next.js App Router (Các trang chính)
    (admin)             # Tuyến đường dành riêng cho Admin Dashboard
    (shop)              # Tuyến đường cho khách hàng (Storefront)
      page.tsx          # Homepage
      /category/[slug]  # Danh sách sản phẩm theo danh mục
      /product/[slug]   # Chi tiết sản phẩm
      /cart             # Giỏ hàng
      /checkout         # Thanh toán
      /account          # Quản lý tài khoản (Đơn hàng, Lịch sử hạng thẻ, Ưa thích)
        /wishlist       # Tính năng theo dõi giá nâng cao
  /components           # Reusable Components (Thành phần tái sử dụng)
    /ui                 # Button, Input, Modal, Badge...
    /layout             # Header, Footer, Sidebar, Navigation
    /product            # ProductCard, ProductList, ReviewStars...
    /checkout           # CartItem, CheckoutForm, OrderSummary
  /lib                  # Utilities (Format tiền, API Fetcher, Date formatter)
  /hooks                # Custom React Hooks (useCart, useAuth, useCountdown)
  /store                # State Management (Zustand/Redux) cho Cart/User Session
```

### 2.2. Chiến lược UI/UX & Giao diện (Design Strategy)
*   **Color Palette (Bảng màu):** Sử dụng các gam màu tạo sự uy tín như Xanh Dương hoặc Cam (kích thích mua hàng) làm màu chủ đạo (Primary). Tuyệt đối tránh rập khuôn màu tím sậm/Neon quá mức của AI theo chuẩn `frontend-design`.
*   **Typography:** Sử dụng Font chữ rõ ràng, dễ đọc cho nội dung dài (ví dụ: Inter, Roboto) cho cả Title và Body.
*   **Layout:** 
    *   **Trang chủ:** Dạng Block linh hoạt (Banner Hero -> Flash Sale -> Danh mục -> Gợi ý cá nhân hóa).
    *   **Trang sản phẩm:** Bố cục bất đối xứng, nổi bật nút Thêm vào giỏ.
*   **Focus State & Micro-interactions:** Các nút bấm chuyển trạng thái mượt mà, Notification dạng Toast nổi báo thêm giỏ hàng thành công.

---

## 3. Lộ trình Triển khai (Roadmap & Phases)

Để tối ưu hóa thời gian và thấy kết quả sớm nhất, dự án chia làm 4 Phase.

### Phase 1: Nền tảng Core & Hệ thống tài khoản (Foundation)
**Mục tiêu:** Xây dựng khung giao diện và chức năng đăng nhập, định danh người dùng.
**Skills sử dụng:** `@[d:\BookStore\.agent\skills\app-builder\SKILL.md]`, `@[d:\BookStore\.agent\skills\frontend-design\SKILL.md]`, `@[d:\BookStore\.agent\skills\tailwind-patterns\SKILL.md]`

*   **Task 1.1: Khởi tạo Project & Cấu hình UI System**
    *   *Input:* Setup Next.js, cấu hình Tailwind v4, biến màu sắc, biến Typography (--font-sans).
    *   *Output:* Bộ Component chuẩn `Button`, `Input`, `Dialog`, `Toast`.
    *   *Verify:* Code compile không lỗi, Component hiển thị đúng trên Storybook/Trang nháp.
*   **Task 1.2: Thiết kế Layout chính**
    *   *Input:* Tạo `Header` (có thanh tìm kiếm, icon giỏ hàng số lượng), `Footer`, Navigation Menu.
    *   *Output:* Khung sườn website có thể điều hướng.
    *   *Verify:* Reponsive chuẩn trên màn hình từ 375px đến 1920px.
*   **Task 1.3: Module Xác thực (Auth) & Cấp bậc**
    *   *Input:* Cấu trúc bảng `users`, `customer_tiers`, `otp_codes`.
    *   *Output:* Form Đăng nhập/Đăng ký (có field Ngày sinh, Giới tính), Màn hình OTP, Dashboard User hiển thị Thanh tiến trình cấp bậc (Ví dụ: "Bạn cần mua thêm 500k để lên hạng Vàng").
    *   *Verify:* Test UI các luồng nhập lỗi (Validation).

### Phase 2: Khám phá & Trưng bày Sản phẩm (Product Discovery)
**Mục tiêu:** Hiển thị sản phẩm hấp dẫn, tìm kiếm và lọc nội dung.
**Skills sử dụng:** `@[d:\BookStore\.agent\skills\frontend-design\SKILL.md]`, `@[d:\BookStore\.agent\skills\tailwind-patterns\SKILL.md]`, `@[d:\BookStore\.agent\skills\nextjs-react-expert\SKILL.md]`

*   **Task 2.1: Xây dựng Trang chủ (Homepage)**
    *   *Input:* Bảng `categories`, `books`.
    *   *Output:* Carousel Banner, Box Danh mục sản phẩm, Box "Sách bán chạy".
    *   *Verify:* Tốc độ load hình ảnh nhanh (Dùng Next/Image).
*   **Task 2.2: Hệ thống Flash Sale (Nổi bật)**
    *   *Input:* Bảng `flash_sales`, `flash_sale_items`.
    *   *Output:* Block Flash Sale có Đồng hồ đếm ngược (Countdown Timer) theo thời gian thực, Thanh phần trăm "Đã bán X/Y".
    *   *Verify:* Hook đếm ngược chạy đúng, UI khóa nút mua khi Sold-out.
*   **Task 2.3: Trang Danh sách sản phẩm (Product Listing - PLP)**
    *   *Output:* Lưới sản phẩm (Grid), Sidebar lọc theo Danh mục, Khoảng giá, Nhà xuất bản, Rating.
*   **Task 2.4: Trang Chi tiết sản phẩm (Product Detail - PDP)**
    *   *Input:* Bảng `books`, `book_images`, `book_variants`, `reviews`.
    *   *Output:* Ảnh Gallery mở rộng, Nút chọn Phiên bản (Bìa mềm/Bìa cứng), Phần mô tả nội dung, Box hiển thị giá bị gạch chéo (So sánh giá cũ/mới).
    *   *Verify:* Lựa chọn Variant sẽ đổi cấu trúc Giá hiển thị.

### Phase 3: Luồng Thanh toán & Ưu đãi (Checkout & Promotion Flow)
**Mục tiêu:** Giảm thiểu tỷ lệ bỏ giỏ hàng (Cart Abandonment) bằng UI mượt mà.
**Skills sử dụng:** `@[d:\BookStore\.agent\skills\frontend-design\SKILL.md]`, `@[d:\BookStore\.agent\skills\nextjs-react-expert\SKILL.md]`, `@[d:\BookStore\.agent\skills\tailwind-patterns\SKILL.md]`

*   **Task 3.1: Module Giỏ hàng (Cart)**
    *   *Input:* Bảng `carts`.
    *   *Output:* Side-panel Cart (Truy cập nhanh) và Cart Page chi tiết. Chức năng tăng giảm số lượng, cảnh báo "Chỉ còn X sản phẩm" dựa trên hàm `sp_check_stock_availability`.
*   **Task 3.2: Module Vouchers & Khuyến mãi (Combo/Buy X Get Y)**
    *   *Input:* Bảng `vouchers`, `promotions`.
    *   *Output:* Khung nhập mã Giảm giá trực tiếp trong Giỏ hàng, List các Voucher "Có thể áp dụng".
*   **Task 3.3: Trang Thanh toán (Checkout Page)**
    *   *Input:* Bảng `user_addresses`, `shipping_rates`, `orders`, `payments`.
    *   *Output:* 
        *   Step 1: Chọn địa chỉ (Hiển thị form Tỉnh/Huyện/Xã liên động).
        *   Step 2: Chọn phương thức giao hàng (Hiện giá ship `shipping_fee`).
        *   Step 3: Chọn phương thức thanh toán (COD, VnPay, MoMo).
        *   Step 4: Box Tổng quan đơn hàng.
    *   *Verify:* Luồng thanh toán mượt mà, không bị rớt mạng giữa chừng gây lỗi State.

### Phase 4: Tính năng Thông minh (Retention & Interactive)
**Mục tiêu:** Giữ chân khách hàng và tăng tỷ lệ mua lại (LTV).
**Skills sử dụng:** `@[d:\BookStore\.agent\skills\frontend-design\SKILL.md]`, `@[d:\BookStore\.agent\skills\nextjs-react-expert\SKILL.md]`, `@[d:\BookStore\.agent\skills\tailwind-patterns\SKILL.md]`

*   **Task 4.1: Hệ thống Wishlist & Price Alert (Chuẩn Sàn lớn)**
    *   *Input:* File `wishlist_enhancements.sql` (bảng `wishlists` nâng cấp).
    *   *Output:* Nút thả tim ở mỗi sản phẩm. Trang quản lý Wishlist hiển thị badge: "📈 Giảm 20% so với lúc bạn thêm vào" (Tính toán từ `added_price` và `current_price`). Nút bật/tắt (Toggle) "Nhận thông báo khi giảm giá".
*   **Task 4.2: Trung tâm Thông báo (Notification Hub)**
    *   *Input:* Bảng `notifications`.
    *   *Output:* Chuông báo ở Header, Dropdown danh sách thông báo (Biết được sách wishlist vừa giảm giá, Đơn hàng được giao).
*   **Task 4.3: Module Đánh giá (Review System)**
    *   *Input:* Bảng `reviews`, `review_images`.
    *   *Output:* Cụm đồ thị Thống kê sao (1-5 sao), Giao diện up hình ảnh đánh giá sản phẩm.

---

## 4. Phase X: Kiểm định (Verification Checklist)
*Sau khi hoàn thành code, bắt buộc chạy các kịch bản nghiệm thu:*
**Skills sử dụng:** `@[d:\BookStore\.agent\skills\web-design-guidelines\SKILL.md]`, `@[d:\BookStore\.agent\skills\performance-profiling\SKILL.md]`

- [ ] **UI/UX Audit:** Đảm bảo Không sử dụng các Component lỗi thời hoặc gây nhiễu, test khoảng cách các nút theo Fitts's Law.
- [ ] **Accessibility:** Các phần thay đổi Giá tiền, Giỏ hàng phải dễ đọc (Contrast ratio). 
- [ ] **Performance:** Load trang chủ dưới 2s, Tích hợp Skeleton Loading cho các List Sách để không bị giật trang (Layout Shift).
- [ ] **E2E Test (Giả lập):** Chạy giả lập 1 kịch bản từ User (Đăng nhập -> Xem Sách -> Thêm Giỏ Hàng -> Thanh toán).

---
*(Kế hoạch này được đối chiếu trực tiếp từ Schema 38 bảng thực tế, đáp ứng đầy đủ yêu cầu cho 1 hệ thống Thương mại điện tử như Fahasa / Tiki)*
