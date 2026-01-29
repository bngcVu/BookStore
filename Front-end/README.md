# BookStore Frontend - UI Pro Max

Bộ giao diện Website Bookstore hoàn chỉnh (Multi-Page Structure) theo phong cách Glassmorphism / Premium.

## Tài liệu Dự án
-   **[User Journey](..\USER_JOURNEY.md)**: Sơ đồ hành trình người dùng.
-   **[Functional Spec](..\FUNCTIONAL_SPEC.md)**: Đặc tả chức năng chi tiết.
-   **[PRD](..\PRD.md)**: Yêu cầu sản phẩm (Product Requirements Document).

## Cấu trúc thư mục

-   `css/styles.css`: Design Tokens, Fonts, Glassmorphism.
-   `js/mock_data.js`: Dữ liệu giả lập (Books, User, Cart).
-   `js/layout.js`: Layout Injector (Header/Footer).
-   `tests/playwright_test.js`: Script kiểm thử tự động.

## Danh sách trang (Pages)

1.  **index.html**: Trang chủ (Hero, Flash Sale).
2.  **products.html**: Danh sách sản phẩm & Bộ lọc.
3.  **product_detail.html**: Chi tiết biến thể, gallery.
4.  **cart.html**: Giỏ hàng (Tính tổng tiền).
5.  **checkout.html**: Thanh toán (2 bước).

## Hướng dẫn chạy (Run)

### 1. Chạy Website
Sử dụng **Live Server** (VS Code) hoặc `http-server`:
```bash
npx http-server ./Front-end
```
Truy cập: `http://127.0.0.1:8080`

### 2. Chạy Kiểm thử (Playwright)
Yêu cầu đã cài Node.js.
```bash
cd Front-end/tests
npm install playwright
node playwright_test.js
```

## Tối ưu hóa (Performance & CRO)
-   **LCP**: Sử dụng ảnh WebP/JPG nén (Mock URL).
-   **CLS**: Định nghĩa khung chứa ảnh (`aspect-ratio`).
-   **Form CRO**: Input type chuẩn (`tel`, `email`), Layout rõ ràng.
