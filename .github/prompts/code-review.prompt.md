---
agent: 'agent'
description: '👁️ Code review toàn diện cho BookStore (BE hoặc FE)'
---

# BookStore — Code Review Toàn Diện

## Ngữ Cảnh

Dự án BookStore: Spring Boot 3.x + Next.js App Router. Review theo tiêu chuẩn production-grade.

File tham chiếu:
- **Clean code**: [.antigravity/skills/clean-code/SKILL.md](../../.antigravity/skills/clean-code/SKILL.md)
- **Architecture patterns**: [.antigravity/skills/architecture-patterns/SKILL.md](../../.antigravity/skills/architecture-patterns/SKILL.md)
- **Security**: [.antigravity/skills/007/SKILL.md](../../.antigravity/skills/007/SKILL.md)
- **Java skill**: [.antigravity/skills/java-pro/SKILL.md](../../.antigravity/skills/java-pro/SKILL.md)
- **Unit test generation**: [.antigravity/skills/unit-testing-test-generate/SKILL.md](../../.antigravity/skills/unit-testing-test-generate/SKILL.md)
- **Refactor cleanup**: [.antigravity/skills/code-refactoring-refactor-clean/SKILL.md](../../.antigravity/skills/code-refactoring-refactor-clean/SKILL.md)

## Người Dùng Sẽ Nói

> File code hoặc snippet cần review (ví dụ: "review OrderService.java", "review checkout page.tsx")

## Quy Trình

### Bước 1 — Xác Định Context
- Backend hay Frontend?
- Layer nào: Entity / Service / Controller / DTO / Component / Hook?
- Phần nào của BACKEND-IMPLEMENTATION-PHASES.md?

### Bước 2 — Review Checklist

#### Backend (Spring Boot)
- [ ] **Layer violations**: Service không inject Repository trực tiếp nếu cần pass qua domain layer
- [ ] **Exception handling**: dùng custom exception, không để raw RuntimeException
- [ ] **Transaction**: `@Transactional` đúng chỗ (Service, không phải Controller)
- [ ] **DTO boundary**: Controller nhận/trả DTO, không expose Entity ra ngoài
- [ ] **ApiResponse wrapper**: tất cả response wrap trong `ApiResponse<T>`
- [ ] **Validation**: `@Valid` trên `@RequestBody`, DTOs có `@NotNull/@Size`
- [ ] **Null safety**: không gọi `.get()` trực tiếp trên Optional, dùng `orElseThrow()`
- [ ] **SOLID**: mỗi class một responsibility rõ ràng
- [ ] **Logging**: `@Slf4j`, log ở service level, không log password/sensitive data
- [ ] **Test coverage**: có unit test cho business logic

#### Frontend (Next.js TypeScript)
- [ ] **Type safety**: không có `any`, không có `as XxxType` workarounds
- [ ] **Error handling**: async/await có try-catch hoặc error boundary
- [ ] **Loading states**: skeleton / spinner khi fetch data
- [ ] **Mock data removal**: không còn hardcode data từ `mockData.ts` sau khi có API
- [ ] **Accessibility**: `alt` text, `aria-label`, keyboard navigation
- [ ] **Performance**: `useMemo`/`useCallback` cho expensive operations
- [ ] **Server vs Client components**: `"use client"` chỉ khi thực sự cần

### Bước 3 — Severity Rating

| Level | Ý Nghĩa |
|-------|---------|
| 🔴 CRITICAL | Bug, security hole, data loss risk — phải fix ngay |
| 🟠 HIGH | Logic sai, performance nghiêm trọng |
| 🟡 MEDIUM | Code smell, không theo convention |
| 🟢 LOW | Style, naming, có thể refactor |
| 💡 SUGGESTION | Cải tiến không bắt buộc |

### Bước 4 — Output Format

```
## Code Review: [Tên file]

### 🔴 CRITICAL
- [Dòng X]: Mô tả vấn đề → Fix code

### 🟠 HIGH  
- [Dòng X]: ...

### 💡 SUGGESTIONS
- ...

### ✅ Điểm tốt
- ...
```
