# PLAN: Hoàn thiện Admin Frontend (Gaps Alignment)

Dựa trên việc đối soát giữa `database_schema.md` và thiết kế hiện tại, kế hoạch này tập trung vào việc lấp đầy các khoảng trống về tính năng vận hành chuyên sâu và kiểm toán dữ liệu.

## 🟢 Phase 5: Quản lý Biến thể & Cấu hình Vận hành
*Mục tiêu: Đưa các bảng cấu hình tĩnh trong DB lên giao diện Admin.*

### 5.1. Quản lý SKU & Biến thể Chi tiết (Table 3.7)
- **Mô tả:** Nâng cấp trang Catalog để quản lý từng SKU (Bìa cứng, Bìa mềm, Tái bản) với giá, kho và ISBN riêng.
- **Tính năng:** Form thêm/sửa Variant, trình quản lý ảnh riêng cho từng Variant.
- **Tiêu chí kiểm mã:** Modal/Drawer chỉnh sửa SKU hoạt động mượt mà.

### 5.2. Cấu hình Phí vận chuyển theo vùng (Table 7.1, 7.2)
- **Mô tả:** Trang thiết lập phí ship dựa trên `province_code`.
- **Tính năng:** Bảng giá vận chuyển, thiết lập ngưỡng Freeship (`free_ship_threshold`), ước tính ngày giao.
- **Tiêu chí:** Cập nhật được base_fee cho ít nhất 1 tỉnh thành mô phỏng.

### 5.3. Thiết lập Cấp bậc & Loyalty (Table 1.1, 9.1)
- **Mô tả:** Quản lý `customer_tiers`.
- **Tính năng:** Định nghĩa mức chi tiêu tối thiểu (`min_spent`) và `% giảm giá` cho từng hạng (Bạc, Vàng...).
- **Tiêu chí:** Giao diện thẻ cấp bậc hiển thị đúng các thông số cấu hình.

---

## 🔵 Phase 6: Nhật ký & Kiểm toán
*Mục tiêu: Đảm bảo tính minh bạch của dữ liệu và an toàn hệ thống.*

### 6.1. Nhật ký Thay đổi & Lịch sử Kho (Table 4.2, 4.3)
- **Mô tả:** Trang xem lịch sử biến động.
- **Tính năng:** 
    - Lịch sử giá (`price_history`): Ai đổi giá, khi nào, lý do gì?
    - Nhật ký tồn kho (`inventory_history`): Nhập/Xuất/Điều chỉnh.
- **Tiêu chí:** Bộ lọc theo thời gian và người thực hiện hoạt động tốt.

### 6.2. Phân quyền Admin chi tiết (Table 1.3)
- **Mô tả:** Trình chỉnh sửa quyền tài khoản Nhân viên.
- **Tính năng:** Giao diện Toggle/Checkbox cho các module (Catalog, Orders, Finance...) dựa trên field `permissions` (JSON).
- **Tiêu chí:** Lưu trạng thái quyền mô phỏng thành công.

---

## 🟣 Phase 7: Thông báo & Insights Tiếp thị
*Mục tiêu: Sử dụng dữ liệu Wishlist và Tương tác để tối ưu doanh thu.*

### 7.1. Thống kê Wishlist & Nhu cầu (Table 5.2, 10.4)
- **Mô tả:** Báo cáo các sản phẩm được quan tâm nhưng chưa mua.
- **Tính năng:** Danh sách Top Wishlist, tỷ lệ price_drop notification được bật.
- **Tiêu chí:** Biểu đồ xu hướng quan tâm hiển thị số liệu từ mock data.

### 7.2. Cấu hình Thông báo tự động (Table 10.3)
- **Mô tả:** Thiết lập quy tắc gửi thông báo.
- **Tính năng:** Trigger khi đơn hàng đổi trạng thái, khi sách trong wishlist giảm giá.
- **Tiêu chí:** Giao diện quản lý template thông báo trực quan.

---

## ✅ Verification Checklist

| Phase | Task | Verification |
|-------|------|--------------|
| Phase 5 | SKU Modal | Mở drawer chỉnh sửa SKU từ trang Catalog thành công. |
| Phase 5 | Shipping Grid | Bảng phí ship theo tỉnh thành hiển thị đúng data. |
| Phase 6 | Price Audit | Bảng lịch sử giá hiển thị dòng timeline sự kiện. |
| Phase 6 | Role Editor | Click toggle quyền báo log console thay đổi. |
| Phase 7 | Wishlist Chart | Biểu đồ cột thể hiện Top 10 sách trong Wishlist. |

## 🛠 Tech Stack & Assignment
- **Frontend Specialist:** Xây dựng Layouts và Components UI.
- **Backend/SQL Expert:** (Giả lập) Chuẩn bị Mock data theo đúng cấu trúc JSON/Field trong Schema.
- **Icons:** Lucide-React.
- **Components:** Shadcn/UI (Table, Drawer, Form, Badge).

---
[OK] Plan created: docs/PLAN-admin-gap-fill.md
