# 🚀 Kế hoạch Cải thiện Frontend BookStore (Logic Nghiệp vụ Thực tế)

Tài liệu này phác thảo lộ trình nâng cấp giao diện người dùng (FE) của BookStore từ mức cơ bản lên mức ứng dụng thương mại điện tử chuyên nghiệp, bám sát cấu trúc **Database Schema** và áp dụng các nguyên lý **UX Psychology** để tối ưu hóa chuyển đổi.

---

## 📅 Tổng quan 4 Giai đoạn (Phases)

| Giai đoạn | Trọng tâm | Mục tiêu chính |
| :--- | :--- | :--- |
| **Phase 1** | **Loyalty & Retention** | Giữ chân khách hàng qua hệ thống Thành viên & Điểm thưởng. |
| **Phase 2** | **Conversion & Scarcity** | Tăng tỷ lệ mua hàng bằng hiệu ứng khẩn cấp & bằng chứng xã hội. |
| **Phase 3** | **Smart Fulfillment** | Tự động hóa khuyến mãi, tính phí ship động & quy trình đổi trả. |
| **Phase 4** | **Personalization** | Cá nhân hóa trải nghiệm dựa trên hành vi và Wishlist thông minh. |

---

## 💎 Chi tiết từng Giai đoạn

### Phase 1: Hệ thống Lòng trung thành (Loyalty & Retention)
*Tập trung vào bảng: `customer_tiers`, `reward_points`, `loyalty_transactions`.*
*🛠️ **Skills hỗ trợ:** `@[skills/frontend-design]`, `@[skills/api-patterns]`, `@[skills/clean-code]`*

1.  **Tier Dashboard (Trang hạng thành viên):**
    *   **Logic:** Hiển thị hạng hiện tại (Bạc/Vàng/Kim Cương) từ `tier_id`.
    *   **UX Psychology (Goal Gradient Effect):** Sử dụng thanh tiến trình (Progress Bar) hiển thị số tiền cần chi tiêu thêm để lên hạng tiếp theo.
    *   **Tính năng:** Liệt kê các quyền lợi (`benefits`) như tỷ lệ giảm giá (`discount_percent`).

2.  **Hệ thống Điểm thưởng trong Checkout:**
    *   **Logic:** Cho phép người dùng chọn số điểm muốn sử dụng (`points_used`) để trừ trực tiếp vào hóa đơn.
    *   **Giao diện:** Hiển thị quy đổi: "Bạn có 5,000 điểm = 50,000đ. Sử dụng cho đơn này?"

---

### Phase 2: Tối ưu Chuyển đổi (Conversion & Scarcity)
*Tập trung vào bảng: `inventory`, `book_variants`, `reviews`, `flash_sale_items`.*
*🛠️ **Skills hỗ trợ:** `@[workflows/ui-ux-pro-max]`, `@[skills/frontend-design]`, `@[skills/testing-patterns]`*

1.  **Hiệu ứng Khan hiếm (Scarcity & Urgency):**
    *   **Logic:** Lấy dữ liệu `quantity` từ `inventory`. Nếu `< 5`, hiển thị Badge: "🔥 Chỉ còn vài sản phẩm cuối cùng!".
    *   **Flash Sale:** Hiển thị thanh trạng thái "Đã bán X%" (`sold_count` / `quantity_limit`) cho các sản phẩm trong đợt khuyến mãi.

2.  **Nâng cấp Review & Social Proof:**
    *   **Logic:** Phân loại đánh giá có "Đã mua hàng" (`is_verified`).
    *   **Giao diện:** Thêm mục "Ưu điểm/Nhược điểm" (`pros/cons`) và thư viện ảnh đánh giá (`review_images`) dạng Carousel.
    *   **UX Psychology:** Sử dụng *Social Proof* để tăng độ tin cậy cho khách hàng mới.

---

### Phase 3: Vận chuyển & Khuyến mãi Thông minh (Smart Fulfillment)
*Tập trung vào bảng: `promotions`, `shipping_rates`, `vouchers`, `refunds`.*
*🛠️ **Skills hỗ trợ:** `@[skills/api-patterns]`, `@[skills/webapp-testing]`, `@[skills/database-design]`*

1.  **Tính phí vận chuyển Động:**
    *   **Logic:** Liên kết dropdown Tỉnh/Thành (`provinces`) với bảng `shipping_rates`.
    *   **Tính năng:** Tự động tính phí ship dựa trên `base_fee` và trọng lượng sản phẩm ngay khi người dùng chọn địa chỉ. Hiển thị "Mua thêm Xđ để được Miễn phí vận chuyển" (`free_ship_threshold`).

2.  **Logic Khuyến mãi Phức tạp:**
    *   **Combo/Bundle:** Hiển thị Bundle ngay trên trang sản phẩm (Ví dụ: "Mua combo 3 cuốn tặng 1" - theo logic `buy_quantity`/`get_quantity`).
    *   **Voucher Selector:** Thay vì người dùng phải gõ code, FE hiển thị danh sách Voucher khả dụng trong ví của họ để "Áp dụng nhanh".

3.  **Hệ thống Đổi trả/Hoàn tiền:**
    *   **Logic:** Form yêu cầu hoàn tiền cho đơn hàng trạng thái `delivered` (Bảng `refunds`). Hỗ trợ tải ảnh minh chứng lỗi sản phẩm.

---

### Phase 4: Cá nhân hóa (Personalization & Discovery)
*Tập trung vào bảng: `user_book_interactions`, `wishlists`.*
*🛠️ **Skills hỗ trợ:** `@[skills/nextjs-react-expert]`, `@[skills/performance-profiling]`, `@[skills/frontend-design]`*

1.  **Wishlist thông minh:**
    *   **Logic:** So sánh `added_price` (giá lúc thêm) và giá hiện tại. 
    *   **Thông báo:** Badge "Giá đã giảm!" ngay trên icon Wishlist để thúc đẩy hành động mua lại.

2.  **AI Recommendation Blocks:**
    *   **Giao diện:** "Sách bạn có thể thích" dựa trên `interaction_type` (view/add_to_cart/search).
    *   **Sắp xếp:** Ưu tiên hiển thị các sản phẩm thuộc danh mục (`categories`) mà người dùng thường xuyên xem nhất.

---

## 🎨 Nguyên tắc Thiết kế (Design Principles)

*   **Aesthetics:** Duy trì phối màu **Emerald & Gold** trên nền Slate hiện đại.
*   **Micro-interactions:** 
    *   Loading Skeleton cho tất cả các khối dữ liệu từ API.
    *   Thông báo Toast thành công/thất bại sinh động.
*   **Responsive:** Đảm bảo trải nghiệm mua sắm trên Mobile mượt mà như Native App (Fitts' Law áp dụng cho các nút bấm lớn).

---

## 🛠️ Công nghệ & Thực thi

*   **State Management:** Sử dụng **Zustand** hoặc **Context API** để quản lý giỏ hàng và trạng thái thành viên.
*   **API Integration:** Xây dựng các hook `useSWR` hoặc `TanStack Query` để đồng bộ dữ liệu kho và giá khuyến mãi thời gian thực.
*   **Validation:** Sử dụng **Zod** kết hợp **React Hook Form** cho các form thanh toán và đổi trả.

---
> **Người lập kế hoạch:** AI Assistant (dựa trên tinh thần UX Pro Max)
> **Trạng thái:** Chờ Review & Phân bổ Task.
