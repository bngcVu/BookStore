# 🚀 Kế hoạch Phát triển Frontend Trang Admin BookStore

Tài liệu này phác thảo lộ trình xây dựng và phát triển giao diện người dùng (FE) dành cho hệ thống Quản trị (Admin Dashboard) của BookStore. Kế hoạch được thiết kế dựa trên cấu trúc Database Schema của dự án phục vụ toàn trình nghiệp vụ quản lý sàn thương mại điện tử từ Tồn kho, Khuyến mãi đến Chăm sóc khách hàng.

---

## 📅 Tổng quan các Giai đoạn (Phases)

| Giai đoạn | Trọng tâm | Mô tả chức năng |
| :--- | :--- | :--- |
| **Phase 1** | **Tổng quan & Sản phẩm (Core Catalog)** | Dashboard thống kê, Quản lý Sách, Danh mục, Biến thể (SKU) và Kho. |
| **Phase 2** | **Đơn hàng & Giao vận (Order Fulfillment)** | Xử lý Đơn hàng, Trạng thái giao hàng, Yêu cầu hoàn tiền và Đối soát. |
| **Phase 3** | **Marketing & Khuyến mãi (Growth & Promos)** | Quản lý Flash Sale, Vouchers, Chương trình khuyến mãi. |
| **Phase 4** | **Khách hàng & Chăm sóc (CRM & Content)** | Quản lý Users, Hạng thẻ Loyalty, Đánh giá (Reviews) và Phân quyền Admin. |

---

## 💎 Chi tiết từng Giai đoạn

### Phase 1: Tổng quan & Sản phẩm (Core Catalog)
*Tập trung quản lý các bảng: `books`, `book_variants`, `categories`, `inventory`, `inventory_history`, `price_history`, `authors`, `publishers`.*
*🛠️ **Skills hỗ trợ:** `@[skills/frontend-design]`, `@[skills/clean-code]`, `@[skills/react-best-practices]`*

1.  **Dashboard Tổng quan (`/admin/dashboard`):**
    *   **Logic:** Hiển thị các Widget thống kê doanh thu (Doanh số trong ngày, Doanh số tuần), Số lượng đơn hàng mới, Top sách bán chạy nhất và Cảnh báo sản phẩm sắp hết hạn trong kho (`min_stock_level`).
    *   **Giao diện:** Đồ thị đường (Line Chart) biểu diễn biến động doanh thu và biểu đồ tròn (Pie Chart) biểu diễn cơ cấu đơn hàng theo trạng thái.

2.  **Quản lý Sách & Danh mục NXB, Tác giả (`/admin/catalog/*`):**
    *   **Quản lý Danh mục, Tác giả, NXB:** Cây danh mục (Tree view), Table CRUD quản lý danh sách Tác giả (`authors`) và NXB (`publishers`) để phục vụ drop-down khi thêm sách.
    *   **Danh sách Sách (`books`):** Table hiển thị ảnh bìa, tên sách, giá niêm yết, thông số `sold_count` / `view_count` và công tắc (Toggle) ẩn hiện nhanh (`is_active`).
    *   **Thêm mới / Edit Sách:** Form phức tạp gồm nhiều Tab: Thông tin chung, Tác giả / NXB, SKU & Giá bán, và Quản lý Kho lưu trữ (Multi-upload Images cho `book_images`).

3.  **Quản lý Kho (`/admin/inventory/stock`):**
    *   Theo dõi tồn kho khả dụng (`quantity` trừ đi `reserved_quantity`).
    *   Giao diện Lịch sử Nhập / Xuất kho (`inventory_history`) dành cho thủ kho.

---

### Phase 2: Đơn hàng & Giao vận & Đối soát (Order Fulfillment & Finance)
*Tập trung quản lý các bảng: `orders`, `order_items`, `order_status_history`, `refunds`, `shipping_carriers`, `shipping_rates`, `payments`.*
*🛠️ **Skills hỗ trợ:** `@[skills/frontend-design]`, `@[skills/testing-patterns]`, `@[skills/clean-code]`*

1.  **Xử lý Đơn hàng (`/admin/orders`):**
    *   Giao diện Quản lý Đơn hàng tập trung, có các Tabs lọc theo `status` (Chờ cập nhật, Đang giao, Đã hoàn thành, Đã hủy).
    *   Thiết kế dạng "Kanban Board" kéo thẻ giúp xử lý đơn hàng trực quan.
    *   Ở màn chi tiết đơn, hỗ trợ In hóa đơn và cập nhật Trạng thái sang `shipping`.

2.  **Quản lý Đổi trả & Hoàn tiền (`/admin/orders/refunds`):**
    *   Form thẩm định (Review Form) cho yêu cầu đổi trả, hiển thị side-by-side lý do của khách hàng và 3 ảnh minh chứng (dựa trên cột `images`).
    *   Nút chốt: [Duyệt Hoàn tiền] hoặc [Từ chối đổi trả] kèm input điền `admin_note`.

3.  **Cấu hình Vận chuyển & Đối tác (`/admin/shipping`):**
    *   Quản lý danh sách Đối tác vận chuyển (`shipping_carriers` như GHTK, GHN).
    *   Form quản lý Bảng giá đối tác giao hàng (`shipping_rates`), cài đặt nhanh các ngưỡng Freeship `free_ship_threshold` trên toàn quốc.

4.  **Đối soát Thanh toán Online (`/admin/finance/payments`):**
    *   Giao diện theo dõi Giao dịch VNPay/MoMo (Bảng `payments`). Tra cứu `transaction_id` để xử lý các đơn hàng lỗi thanh toán, đồng bộ trạng thái `gateway_response`.

---

### Phase 3: Marketing & Khuyến mãi (Growth & Promos)
*Tập trung quản lý các bảng: `flash_sales`, `flash_sale_items`, `vouchers`, `promotions`, `promotion_books`.*
*🛠️ **Skills hỗ trợ:** `@[skills/frontend-design]`, `@[skills/api-patterns]`, `@[skills/webapp-testing]`*

1.  **Quản lý Flash Sale (`/admin/marketing/flash-sales`):**
    *   Giao diện Calendar (Lịch) để xem tổng quan các khung giờ có Flash Sale.
    *   Form tạo Flash Sale, cho phép Select hàng loạt Sách để cài đặt `sale_price` và `quantity_limit` cho từng SKU một cách tập trung (Bulk Edit).

2.  **Bảng điều khiển Khuyến mãi & Vouchers (`/admin/marketing/promotions`):**
    *   Quản lý Voucher: Tạo mã code tùy chỉnh, loại voucher (% hoặc trừ tiền mặt), số lượt dùng (`usage_limit`).
    *   Khuyến mãi Combo: Thiết kế giao diện xếp cặp tự động (VD: Combo Mua 3 tặng 1 dựa trên `buy_quantity` / `get_quantity`).

---

### Phase 4: Khách hàng & CRM Content (Loyalty & Phân quyền)
*Tập trung quản lý các bảng: `users`, `customer_tiers`, `admins`, `reviews`, `notifications`.*
*🛠️ **Skills hỗ trợ:** `@[skills/frontend-design]`, `@[skills/clean-code]`, `@[skills/performance-profiling]`*

1.  **Quản lý Khách hàng & Loyalty (`/admin/crm/customers`):**
    *   Hồ sơ chi tiết (Profile 360) của 1 người dùng, thống kê chu kỳ mua sắm, liệt kê Lịch sử cộng/trừ Điểm thưởng (`reward_points`).
    *   Cấu hình chính sách Hạng Thẻ (`customer_tiers`): Thay đổi mức tiền cần chi để lên hạng và phúc lợi tự động.

2.  **Quản lý Content & Đánh giá (`/admin/content/reviews`):**
    *   Giao diện duyệt Đánh giá của khách hàng, ẩn các bình luận thô tục, spam (`is_visible=0`).
    *   Chỉ số đo lường sức khỏe Cửa hàng (Tỉ lệ đánh giá 5 sao trung bình).

3.  **Chiến dịch Thông báo Push (`/admin/crm/notifications`):**
    *   Giao diện soạn thảo và Gửi Thông báo (`notifications`) đẩy hàng loạt đến Người dùng (App / Web) về Chương trình Khuyến mãi hoặc cập nhật quan trọng.

4.  **Phân quyền Quản trị viên (`/admin/settings/roles`):**
    *   Quản lý User nhân sự (Bảng `admins`), phân quyền chi tiết (RBAC) sử dụng mảng JSON để chia quyền View/Edit dữ liệu theo phòng ban.

---

## 🎨 Nguyên tắc Thiết kế Giao diện Admin
1.  **Layout:** Có Sidebar cố định bên trái, Header với icon Notifications, Breadcrumbs rõ ràng mở đường tắt.
2.  **UX Focus:**
    *   Luôn có bộ lọc đa chiều (Filter Panel) tại các màn hình danh sách dài với khả năng xuất file CSV.
    *   Sử dụng Drawer (Trượt) cho việc tạo/chỉnh sửa nhanh, không mở ra các tab/trang mới tốn thời gian tải.
    *   Responsive tốt trên Tablet để đảm bảo thủ kho có thể xách máy đi duyệt kho trực tiếp.
3.  **Công nghệ:** Tái sử dụng Component System hiện tại của hệ sinh thái (Button, Form, Table) được phát triển ở nhánh Client.

> **Định dạng file:** Phác thảo dưới dạng `PLAN-admin-dashboard.md`
> **Kế hoạch được phê duyệt để bắt tay vào Khởi tạo (Implementation).**
