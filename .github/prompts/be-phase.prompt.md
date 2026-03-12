---
agent: 'agent'
description: '🚀 Bắt đầu implement một Phase backend BookStore (đọc plan + tạo code)'
---

# BookStore Backend — Bắt đầu Phase

## Ngữ Cảnh Dự Án

Bạn đang làm việc trên dự án **BookStore** — Spring Boot 3.x + MySQL 8 + Java 21.

Đọc các file sau để nắm toàn bộ context:
- Kế hoạch phases: [docs/BACKEND-IMPLEMENTATION-PHASES.md](../../docs/BACKEND-IMPLEMENTATION-PHASES.md)
- DB Schema (38 bảng): [backend/sql/database/database_schema.md](../../backend/sql/database/database_schema.md)
- Config hiện tại: [backend/src/main/resources/application.yaml](../../backend/src/main/resources/application.yaml)
- Code BE hiện có: thư mục `backend/src/main/java/com/bookstore/`

## Skills Tham Khảo

Đọc và áp dụng các skill sau khi implement:
- **Java 21 + Spring Boot**: [.antigravity/skills/java-pro/SKILL.md](../../.antigravity/skills/java-pro/SKILL.md)
- **Clean Code**: [.antigravity/skills/clean-code/SKILL.md](../../.antigravity/skills/clean-code/SKILL.md)
- **Unit Test Generation**: [.antigravity/skills/unit-testing-test-generate/SKILL.md](../../.antigravity/skills/unit-testing-test-generate/SKILL.md)
- **Refactor Cleanup**: [.antigravity/skills/code-refactoring-refactor-clean/SKILL.md](../../.antigravity/skills/code-refactoring-refactor-clean/SKILL.md)
- **Clean Architecture**: [.antigravity/skills/architecture-patterns/resources/implementation-playbook.md](../../.antigravity/skills/architecture-patterns/resources/implementation-playbook.md)
- **Backend Patterns**: [.antigravity/skills/backend-architect/SKILL.md](../../.antigravity/skills/backend-architect/SKILL.md)

## Nhiệm Vụ

Người dùng sẽ nói: *"Implement Phase X"* hoặc *"Bắt đầu Phase X"*

### Phase → Scope Mặc Định

Nếu người dùng chỉ nói tên phase, hãy tự hiểu scope mặc định như sau để giảm số lần phải gọi prompt:

| Phase | Scope mặc định phải làm |
|------|--------------------------|
| Phase 0 | config + security + exception + health endpoint |
| Phase 1 | auth entities + repositories + auth/profile APIs |
| Phase 2 | catalog entities + read APIs cho homepage/category/product |
| Phase 3 | address + cart + order flow end-to-end |
| Phase 4 | flash sale + voucher validation + admin marketing APIs |
| Phase 5 | wishlist + reviews + inventory APIs |
| Phase 6 | rewards + notifications |
| Phase 7 | admin APIs theo module |
| Phase 8 | cache + rate limit + query optimization |

Hãy thực hiện theo thứ tự:

1. **Đọc** checklist của phase đó trong `BACKEND-IMPLEMENTATION-PHASES.md`
2. **Tự nhóm việc theo vertical slice**, không tách nhỏ quá mức nếu phase đã rõ. Mặc định chia thành tối đa 3 batches:
   - Batch 1: entities + repositories
   - Batch 2: service + DTO + controller
   - Batch 3: test + verify
3. **Chỉ hỏi lại người dùng** nếu phase quá lớn hoặc business rule mơ hồ. Nếu không mơ hồ, tiến hành code luôn.
3. **Tạo** theo cấu trúc Clean Architecture:
   ```
   domain/entity/     → JPA Entities
   domain/repository/ → Spring Data interfaces
   service/           → Business logic
   controller/        → REST Controllers  
   dto/request/       → Request DTOs
   dto/response/      → Response DTOs
   exception/         → Custom exceptions (nếu cần)
   ```
4. **Tuân thủ** conventions:
   - Response wrapper: `ApiResponse<T>` với fields `status`, `message`, `data`, `timestamp`
   - Validation: `@Valid` + `@NotBlank`, `@Email`, v.v.
   - Security: endpoints cần auth thì note `// @PreAuthorize("hasRole('USER')")`
   - Lombok: dùng `@Data`, `@Builder`, `@RequiredArgsConstructor`
   - Viết unit test cho service logic quan trọng nếu phase có business rules rõ ràng

5. **Kết thúc** bằng checklist verify cho phase đó (từ docs)

## Output Mong Muốn

Khi hoàn thành một lần chạy prompt này, phải trả được:
- Phase nào đang làm
- Những file đã tạo/sửa trong batch hiện tại
- Những API hoặc entities đã hoàn chỉnh
- Verify checklist của phase
- Nếu phase còn dang dở, chỉ ra đúng batch tiếp theo cần làm

## Lưu Ý Quan Trọng

- **Không** tạo file ngoài `/backend/src/` trừ khi được yêu cầu
- **Ưu tiên** tạo đủ 1 tính năng hoàn chỉnh (Entity → Repo → Service → Controller → DTO) trước khi sang tính năng khác
- **Hỏi** nếu không rõ business logic từ `database_schema.md`
- Nếu người dùng nói `Implement Phase X` mà phase có thể hoàn thành trong một batch hợp lý, không yêu cầu họ gọi thêm `/be-entity` hoặc `/be-api`
