---
agent: 'agent'
description: '📊 Kiểm tra tiến độ implement theo phases BookStore'
---

# BookStore Backend — Kiểm Tra Tiến Độ

## Ngữ Cảnh

So sánh trạng thái code thực tế trong backend với kế hoạch phases.

File tham chiếu:
- **Implementation phases**: [docs/BACKEND-IMPLEMENTATION-PHASES.md](../../docs/BACKEND-IMPLEMENTATION-PHASES.md)
- **Architecture recommendation**: [docs/BACKEND-ARCHITECTURE-RECOMMENDATION.md](../../docs/BACKEND-ARCHITECTURE-RECOMMENDATION.md)
- **Java/Spring coding**: [.antigravity/skills/java-pro/SKILL.md](../../.antigravity/skills/java-pro/SKILL.md)
- **Unit test generation**: [.antigravity/skills/unit-testing-test-generate/SKILL.md](../../.antigravity/skills/unit-testing-test-generate/SKILL.md)
- **DB Schema**: [backend/sql/database/database_schema.md](../../backend/sql/database/database_schema.md)
- **Backend source**: [backend/src/main/java/com/bookstore/](../../backend/src/main/java/com/bookstore/)

## Người Dùng Sẽ Nói

> "check tiến độ", "phase mấy rồi?", hoặc "còn phải implement gì?"

## Quy Trình

### Bước 1 — Scan Backend Source Tree

Kiểm tra các package trong `backend/src/main/java/com/bookstore/`:
- `api/controller/` — Controllers đã có
- `api/entity/` — Entities đã có
- `repository/` hoặc `domain/repository/` — Repositories
- `service/` hoặc `application/service/` — Services
- `api/dto/` — DTOs
- `config/` — Security, JWT, etc.

### Bước 2 — Phase Completion Matrix

Với mỗi Phase trong BACKEND-IMPLEMENTATION-PHASES.md, kiểm tra:

| Phase | Component | Status |
|-------|-----------|--------|
| Phase 0 | SecurityConfig | ✅ / ❌ |
| Phase 0 | JwtUtil | ✅ / ❌ |
| Phase 0 | ApiResponse wrapper | ✅ / ❌ |
| Phase 0 | GlobalExceptionHandler | ✅ / ❌ |
| Phase 1 | UserEntity | ✅ / ❌ |
| Phase 1 | AuthController (login/register) | ✅ / ❌ |
| Phase 2 | BookEntity | ✅ / ❌ |
| Phase 2 | ProductController | ✅ / ❌ |
| ... | ... | ... |

### Bước 3 — Identify Gaps

Liệt kê:
- **Đã hoàn thành**: Các thành phần đã implement
- **Đang thiếu trong phase hiện tại**: Phải implement ngay
- **Blocked by**: Dependencies chưa có

### Bước 4 — Progress Report

```markdown
## 📊 BookStore Backend — Progress Report

**Ngày**: [hôm nay]

### ✅ Completed
- Phase 0: [X/Y components] — [danh sách]

### 🔄 In Progress  
- Phase X: [mô tả]

### ❌ Not Started
- Phase X → Phase Y

### ⚠️ Gaps Found
- [Component] missing trong [Phase] → cần tạo trước [Component khác]

### 🎯 Next Action
Implement [component tiếp theo] trong Phase [X]:
1. [Bước 1]
2. [Bước 2]
```

### Bước 5 — Suggest Next Task

Dựa trên analysis, gợi ý:
- Task cụ thể tiếp theo nên làm
- Slash command tối ưu nên dùng theo mức độ công việc:
	- `/be-phase` nếu cả phase hoặc sub-phase còn thiếu nhiều phần
	- `/be-api` nếu cần hoàn tất cả nhóm endpoint của một feature trong phase
	- `/be-entity` chỉ khi thiếu entity/repository nền tảng
- Ước lượng scope công việc còn lại

## Quy Tắc Gợi Ý Ít Prompt Nhất

- Nếu thiếu từ 3 thành phần trở lên trong cùng 1 phase, ưu tiên đề xuất 1 lệnh `/be-phase`
- Nếu entity đã đủ mà thiếu controller/service/DTO cho cùng 1 feature, ưu tiên 1 lệnh `/be-api`
- Chỉ đề xuất nhiều prompt khi các phần thiếu nằm ở nhiều phase khác nhau
