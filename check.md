# Tiêu Chuẩn Phát Triển Dự Án BookStore

## 1. Quy chuẩn Kỹ thuật Tailwind CSS v4 (Mới nhất)
Dựa trên kỹ năng `tailwind-patterns`, code CSS phải tuân thủ các nguyên tắc hiện đại nhất của phiên bản v4:

- **CSS-First Configuration**: Thay vì phụ thuộc hoàn toàn vào tệp `tailwind.config.js` phức tạp của các phiên bản cũ, cấu hình được ưu tiên khai báo trực tiếp trong CSS.
- **Container Queries (Truy vấn theo vùng chứa)**: Bắt buộc sử dụng `@container` thay vì chỉ dùng `@media` (media queries) truyền thống. 
  - *Lưu ý đặc biệt cho Book Store*: Một thẻ "Sách" (Book Card) phải tự điều chỉnh giao diện dựa trên khung chứa nó (ví dụ: trong Sidebar hẹp vs. Main Content rộng) chứ không chỉ dựa vào độ rộng màn hình.
- **Design Token Architecture**: Sử dụng hệ thống biến (tokens) cho màu sắc, khoảng cách (spacing), và typography để đảm bảo tính nhất quán toàn hệ thống, tránh sử dụng các giá trị "magic numbers" (ví dụ: `m-[13px]`) tùy tiện.

## 2. Quy chuẩn Thẩm mỹ & UI/UX (Production-Grade)
Các kỹ năng `ui-ux-pro-max` và `frontend-design` áp dụng các tiêu chuẩn thiết kế cấp cao:

- **Intentional Aesthetics (Thẩm mỹ có chủ đích)**: Giao diện không được phép "chung chung" (non-generic). Nó phải có bản sắc riêng, được chọn từ 50 phong cách thiết kế định sẵn (như Glassmorphism, Brutalism, hay Minimalism).
- **Bento Grid Layout**: Đối với trang Book Store, quy chuẩn khuyến khích sử dụng bố cục Bento Grid (lưới dạng hộp cơm Bento) để hiển thị các bộ sưu tập sách hoặc danh mục nổi bật, giúp giao diện hiện đại và gọn gàng.
- **Hệ thống Màu & Font chuẩn**:
  - Sử dụng một trong 21 bảng màu (palettes) đã được cân chỉnh độ tương phản.
  - Áp dụng các cặp phông chữ (font pairings) từ thư viện 50 cặp font chuyên nghiệp để đảm bảo tiêu đề và nội dung dễ đọc.
- **Responsive & Dark Mode**: Mọi thành phần HTML phải hỗ trợ giao diện tối (Dark Mode) và tương thích đa thiết bị ngay từ đầu.

## 3. Quy chuẩn Hiệu năng & Chất lượng Web
Kỹ năng `web-performance-optimization` và `web-design-guidelines` đặt ra các giới hạn kỹ thuật:

- **Core Web Vitals**: Code HTML phải được tối ưu hóa cho các chỉ số của Google như **LCP** (thời gian hiển thị nội dung lớn nhất) và **CLS** (độ ổn định giao diện khi tải).
- **Accessibility (A11y - Khả năng truy cập)**: Bắt buộc tuân thủ các chuẩn tiếp cận web. 
  - Ví dụ: Mọi thẻ `img` bìa sách phải có `alt`, độ tương phản màu sắc phải đạt chuẩn **WCAG** để người khiếm thị có thể sử dụng.
- **Loading Speed**: Tối ưu hóa kích thước DOM và chiến lược tải tài nguyên để trang web đạt tốc độ cao nhất.