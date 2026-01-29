# Product Requirements Document (PRD): BookStore Website

**Version**: 1.0
**Status**: Draft
**Date**: 2026-01-29

---

## 1. Executive Summary

**Problem**: Người dùng hiện tại gặp khó khăn trong việc tìm kiếm và mua sách trực tuyến do giao diện cũ kỹ, khó sử dụng và thiếu các tính năng lọc/tìm kiếm thông minh.
**Solution**: Xây dựng một website BookStore mới với giao diện Glassmorphism hiện đại, tập trung vào trải nghiệm tìm kiếm, khám phá sản phẩm và quy trình thanh toán mượt mà.
**Business Impact**: Tăng tỷ lệ chuyển đổi (Conversion Rate) lên 20%, giảm tỷ lệ bỏ giỏ hàng và tăng giá trị đơn hàng trung bình (AOV).
**Success Metrics**: 
- Monthly Active Users (MAU) > 10,000
- Conversion Rate > 2.5%
- Cart Abandonment Rate < 60%

---

## 2. Problem Definition

### 2.1 Customer Problem
- **Who**: Độc giả trẻ (18-35 tuổi), yêu thích công nghệ và trải nghiệm mua sắm tiện lợi.
- **What**: Khó khăn khi tìm sách theo chủ đề cụ thể, không xem được review tin cậy, và quy trình thanh toán phức tạp.
- **Why**: Hệ thống cũ thiếu bộ lọc metadata, UI/UX kém hấp dẫn.

### 2.2 Business Case
- **Revenue**: Dự kiến tăng trưởng doanh thu 30% trong quý đầu tiên sau khi ra mắt.
- **Strategic**: Định vị BookStore là nền tảng bán sách công nghệ số 1.

---

## 3. Solution Overview

### 3.1 Components
- **Frontend**: Multi-page application (HTML/Tailwind CSS) tối ưu SEO và tốc độ.
- **Design System**: Glassmorphism (Premium Look & Feel).
- **Core Features**: Search Engine, Smart Cart, Fast Checkout.

### 3.2 Feature Scope (In Scope)
- Tìm kiếm & Lọc nâng cao.
- Giỏ hàng & Thanh toán (Checkout).
- Tài khoản người dùng & Tích điểm.
- Đánh giá sản phẩm.

### 3.3 Out of Scope
- E-book reader (Đọc sách online).
- Mạng xã hội sách (Social networking features).

---

## 4. Feature Prioritization (RICE Framework)

Dựa trên mô hình RICE (Reach, Impact, Confidence, Effort), dưới đây là bảng ưu tiên các tính năng cần phát triển cho giai đoạn MVP.

| Rank | Feature | Reach (Users/Q) | Impact | Confidence | Effort | RICE Score | Analysis |
|------|---------|-----------------|--------|------------|--------|------------|----------|
| 1 | **Search & Filter** | 1000 | Massive (3.0) | High (1.0) | Small (3) | **1000** | **Must Have**: Tính năng quan trọng nhất để user tìm thấy sản phẩm. Quick Win. |
| 2 | **Shopping Cart** | 600 | Massive (3.0) | High (1.0) | Small (3) | **600** | **Must Have**: Cốt lõi của E-commerce. |
| 3 | **Product Browse/List** | 1000 | High (2.0) | High (1.0) | Medium (5) | **400** | **Must Have**: Trải nghiệm điều hướng cơ bản. |
| 4 | **User Authentication** | 700 | High (2.0) | Medium (0.8) | Small (3) | **373** | **Should Have**: Cần thiết để giữ chân khách hàng (Retention). |
| 5 | **Checkout Process** | 500 | Massive (3.0) | High (1.0) | Medium (5) | **300** | **Must Have**: Tạo ra doanh thu. Effort cao hơn do bảo mật/thanh toán. |
| 6 | **User Reviews** | 800 | Medium (1.0) | Medium (0.8) | Medium (5) | **128** | **Could Have**: Tăng tin cậy nhưng chưa cần ngay ở Day 1. |
| 7 | **Product Recs** | 800 | Medium (1.0) | Low (0.5) | Large (8) | **50** | **Won't Have**: Effort quá lớn (AI), hiệu quả chưa kiểm chứng. |

---

## 5. Functional Requirements (Core Features)

### 5.1 Search & Filter
**User Story**: "Là khách hàng, tôi muốn lọc sách theo giá và danh mục để nhanh chóng tìm thấy cuốn sách phù hợp với túi tiền."
- **FR1**: Thanh tìm kiếm (Keyword search) luôn hiển thị ở Header.
- **FR2**: Bộ lọc bên trái (Sidebar) cho phép lọc theo: Danh mục, Khoảng giá, Đánh giá (Sao).
- **FR3**: Kết quả tìm kiếm hiển thị dạng Grid, có phân trang.

### 5.2 Shopping Cart
**User Story**: "Là khách hàng, tôi muốn xem lại các sách đã chọn và tổng tiền trước khi quyết định thanh toán."
- **FR4**: Thêm sản phẩm vào giỏ (AJAX/No reload).
- **FR5**: Cập nhật số lượng hoặc xóa sản phẩm.
- **FR6**: Hiển thị tạm tính và tổng tiền chính xác.

### 5.3 Checkout
**User Story**: "Là khách hàng, tôi muốn thanh toán nhanh chóng và biết rõ phí vận chuyển."
- **FR7**: Form nhập địa chỉ giao hàng (Tự động suggest xã/phường là điểm cộng).
- **FR8**: Chọn phương thức vận chuyển & Thanh toán.
- **FR9**: Xác nhận đơn hàng và gửi email thông báo.

---

## 6. Metrics & Analytics
- **Adoption**: % users sử dụng bộ lọc tìm kiếm.
- **Conversion**: Tỷ lệ users đi từ `Product View` -> `Add to Cart` -> `Purchase`.
- **Performance**: Thời gian load trang danh sách sản phẩm < 1.5s.

## 7. Timeline (Estimated)
- **Week 1-2**: Design UI/UX & Mockups (Glassmorphism).
- **Week 3**: Implement Frontend Core (Layout, Components).
- **Week 4**: Implement Search & Cart Logic.
- **Week 5**: Implement Checkout & User Auth.
- **Week 6**: Testing & Bug Fixes.
