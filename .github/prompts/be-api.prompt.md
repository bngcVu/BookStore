---
agent: 'agent'
description: '🔗 Thiết kế + implement 1 REST API endpoint cho BookStore Backend'
---

# BookStore Backend — Thiết Kế & Implement API

## Ngữ Cảnh

Dự án: **BookStore** — Spring Boot 3.x, Java 21, MySQL 8.

File tham chiếu:
- REST API conventions: [.antigravity/skills/api-design-principles/references/rest-best-practices.md](../../.antigravity/skills/api-design-principles/references/rest-best-practices.md)
- Implementation playbook: [.antigravity/skills/api-design-principles/resources/implementation-playbook.md](../../.antigravity/skills/api-design-principles/resources/implementation-playbook.md)
- Java/Spring coding: [.antigravity/skills/java-pro/SKILL.md](../../.antigravity/skills/java-pro/SKILL.md)
- Clean code: [.antigravity/skills/clean-code/SKILL.md](../../.antigravity/skills/clean-code/SKILL.md)
- Unit test generation: [.antigravity/skills/unit-testing-test-generate/SKILL.md](../../.antigravity/skills/unit-testing-test-generate/SKILL.md)
- DB schema: [backend/sql/database/database_schema.md](../../backend/sql/database/database_schema.md)
- Phase plan: [docs/BACKEND-IMPLEMENTATION-PHASES.md](../../docs/BACKEND-IMPLEMENTATION-PHASES.md)

## Người Dùng Sẽ Cung Cấp

> Tên resource / tính năng cần implement (ví dụ: "API lấy danh sách sách", "API tạo đơn hàng")

Người dùng cũng có thể nói theo phase, ví dụ:
- `Phase 1: auth APIs`
- `Phase 2: APIs cho product detail`
- `Phase 3: tạo toàn bộ cart APIs`

## Quy Trình Thực Hiện

### Bước 1 — Phân Tích
Trước khi code, xác định:
- **Phase hiện tại**: endpoint này thuộc Phase nào trong `BACKEND-IMPLEMENTATION-PHASES.md`
- **HTTP Method + URL**: ví dụ `GET /api/v1/books`
- **Authentication**: public / user token / admin token
- **Request params**: query params, path variables, request body
- **Response shape**: fields cần trả về (map với FE mockData.ts)
- **DB tables liên quan**: xem `database_schema.md`
- **Business rules**: validation, edge cases

Nếu người dùng yêu cầu theo phase thay vì 1 endpoint đơn lẻ, hãy tự nhóm endpoint theo feature và implement trong cùng 1 đợt nếu chúng dùng chung entity/service.

### Bước 2 — Tạo Code Theo Thứ Tự

```
1. Kiểm tra entity/repository đã đủ chưa; nếu thiếu thì tạo luôn phần tối thiểu cần thiết
2. DTO Request  (nếu có body)
3. DTO Response (mapping với FE data structure)
4. Service method hoặc nhóm methods liên quan
5. Controller endpoint hoặc nhóm endpoints cùng feature
6. Exception cases (nếu cần)
7. Unit test cho service/controller nếu endpoint có validation hoặc business rule quan trọng
```

### Bước 3 — Checklist Chất Lượng

Trước khi kết thúc, verify:
- [ ] Endpoint khớp phase và FE page mục tiêu
- [ ] URL theo chuẩn REST: danh từ số nhiều, lowercase, hyphen
- [ ] HTTP status code đúng (201 cho create, 200 cho read, 204 cho delete)
- [ ] Response bọc trong `ApiResponse<T>`
- [ ] Input validation với `@Valid` + annotations
- [ ] Phân trang `Pageable` nếu là list endpoint
- [ ] Không expose password_hash, internal IDs không cần thiết
- [ ] Javadoc ngắn cho endpoint phức tạp

## Standards Áp Dụng

```java
// URL pattern
GET    /api/v1/{resources}           // list
POST   /api/v1/{resources}           // create
GET    /api/v1/{resources}/{id}      // get one
PATCH  /api/v1/{resources}/{id}      // partial update
DELETE /api/v1/{resources}/{id}      // delete

// Response wrapper
ApiResponse.success(data)            // 200/201
ApiResponse.error(errorCode, msg)    // 4xx/5xx

// Controller annotation
@RestController
@RequestMapping("/api/v1")
@RequiredArgsConstructor
@Tag(name = "Books", description = "Book management APIs")
```

## Gợi Ý Dùng Ít Lệnh Hơn

- Nếu đang làm cả Phase feature như `cart`, `checkout`, `wishlist`, ưu tiên implement toàn bộ nhóm API liên quan trong một lần chạy prompt này.
- Chỉ tách sang `/be-entity` khi người dùng thật sự muốn sinh entity trước độc lập.
