---
agent: 'agent'
description: '🔒 Security review cho API / code BookStore Backend'
---

# BookStore Backend — Security Review

## Ngữ Cảnh

Dự án BookStore yêu cầu bảo mật cao: JWT, thanh toán, dữ liệu người dùng nhạy cảm.

File tham chiếu:
- **Security skill**: [.antigravity/skills/007/SKILL.md](../../.antigravity/skills/007/SKILL.md)
- **API security patterns**: [.antigravity/skills/007/references/api-security-patterns.md](../../.antigravity/skills/007/references/api-security-patterns.md)
- **Java/Spring Security context**: [.antigravity/skills/java-pro/SKILL.md](../../.antigravity/skills/java-pro/SKILL.md)
- **Architecture decision**: [docs/BACKEND-ARCHITECTURE-RECOMMENDATION.md](../../docs/BACKEND-ARCHITECTURE-RECOMMENDATION.md)

## Người Dùng Sẽ Nói

> Code hoặc mô tả endpoint cần review bảo mật (ví dụ: "review security cho AuthController")

## Quy Trình

### Bước 1 — Xác Định Scope
Đọc code được cung cấp và phân loại:
- Endpoint public / authenticated / admin-only?
- Dữ liệu người dùng nào được xử lý?
- Có liên quan đến thanh toán hoặc thông tin nhạy cảm?

### Bước 2 — OWASP Top 10 Checklist

| # | Risk | Kiểm Tra |
|---|------|----------|
| A01 | Broken Access Control | `@PreAuthorize`, role check, resource ownership |
| A02 | Cryptographic Failures | Mã hóa password (BCrypt), JWT signing (RS256) |
| A03 | Injection | Sử dụng JPA/Prepared Statement, không dùng string concat trong query |
| A04 | Insecure Design | Rate limiting, anti-brute-force cho /login |
| A05 | Security Misconfiguration | CORS config, actuator endpoints, error exposure |
| A07 | Auth Failures | JWT expiry validation, refresh token rotation |
| A08 | Data Integrity | Validate request body, `@Valid` annotations |
| A10 | SSRF | Không gọi URL từ user input |

### Bước 3 — BookStore-Specific Checks

**JWT & Auth:**
- [ ] Access token TTL ≤ 15 phút
- [ ] Refresh token lưu trong HttpOnly Secure cookie
- [ ] Token blacklist cho logout / đổi password
- [ ] OTP có thời hạn và rate limit

**Resource Ownership:**
- [ ] User chỉ xem order / address / wishlist của chính mình
- [ ] Admin endpoints có kiểm tra role `ADMIN` / `SUPER_ADMIN`
- [ ] Không leak thông tin user khác qua response

**Input Validation:**
- [ ] `@Valid` + `@NotNull`, `@Size`, `@Pattern` trên tất cả DTOs
- [ ] ENUM values được validate đúng
- [ ] File upload (nếu có) kiểm tra content-type và size

**Database:**
- [ ] Không có raw SQL string concatenation
- [ ] `@Query` sử dụng named parameters (`:param` không phải `'${param}'`)

**Response:**
- [ ] Không trả về stack trace trong production
- [ ] Không expose internal IDs không cần thiết
- [ ] Error message không tiết lộ thông tin hệ thống

### Bước 4 — Output

Trả về:
1. **Danh sách lỗi bảo mật** với mức độ: CRITICAL / HIGH / MEDIUM / LOW
2. **Code fix** cho từng lỗi
3. **Giải thích** tại sao đây là rủi ro bảo mật
