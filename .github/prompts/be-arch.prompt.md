---
agent: 'agent'
description: '🏛️ Quyết định kiến trúc (ADR) cho BookStore Backend'
---

# BookStore Backend — Architecture Decision Record

## Ngữ Cảnh

Dự án: **BookStore** — Clean Architecture + DDD, Spring Boot 3.x, 38 bảng, logic nghiệp vụ phức tạp.

File tham chiếu:
- **Architecture skill**: [.antigravity/skills/architecture/SKILL.md](../../.antigravity/skills/architecture/SKILL.md)
- **Trade-off analysis**: [.antigravity/skills/architecture/trade-off-analysis.md](../../.antigravity/skills/architecture/trade-off-analysis.md)
- **Pattern selection**: [.antigravity/skills/architecture/pattern-selection.md](../../.antigravity/skills/architecture/pattern-selection.md)
- **Architecture patterns**: [.antigravity/skills/architecture-patterns/SKILL.md](../../.antigravity/skills/architecture-patterns/SKILL.md)
- **Backend architect**: [.antigravity/skills/backend-architect/SKILL.md](../../.antigravity/skills/backend-architect/SKILL.md)
- **Khuyến nghị hiện tại**: [docs/BACKEND-ARCHITECTURE-RECOMMENDATION.md](../../docs/BACKEND-ARCHITECTURE-RECOMMENDATION.md)

## Người Dùng Sẽ Nói

> Vấn đề kiến trúc cần quyết định (ví dụ: "nên dùng Redis hay database để store refresh token?", "nên tách service thanh toán riêng không?")

## Quy Trình

### Bước 1 — Phân Tích Vấn Đề
- Xác định context và constraints của BookStore (monolith, Spring Boot, đội nhỏ)
- Liệt kê các options có thể
- Xác định quality attributes ảnh hưởng: Performance / Scalability / Maintainability / Security / Simplicity

### Bước 2 — Trade-off Analysis

Với mỗi option:
| Tiêu chí | Option A | Option B | Option C |
|----------|----------|----------|----------|
| Complexity | | | |
| Performance | | | |
| Maintainability | | | |
| Time to implement | | | |
| Risk | | | |

### Bước 3 — ADR Template

```markdown
## ADR-XXX: [Tiêu đề quyết định]

**Date**: [ngày]
**Status**: Proposed / Accepted / Deprecated

### Context
[Mô tả vấn đề và constraints]

### Decision
[Quyết định chọn gì]

### Rationale
[Tại sao chọn option này cho BookStore]

### Consequences
- ✅ [Lợi ích]
- ⚠️ [Đánh đổi / rủi ro]

### Alternatives Considered
- [Option A]: Tại sao không chọn
- [Option B]: Tại sao không chọn
```

### Bước 4 — BookStore Constraints Cần Nhớ

- **Monolith first**: Không over-engineer microservices cho giai đoạn hiện tại
- **ddl-auto: validate**: Schema đã fixed, không tự thay đổi DB
- **Phase tracking**: Quyết định phải align với [BACKEND-IMPLEMENTATION-PHASES.md](../../docs/BACKEND-IMPLEMENTATION-PHASES.md)
- **Frontend first**: FE mockData.ts định nghĩa response shape, BE phải match

### Bước 5 — Output

1. Trade-off analysis table
2. ADR document
3. Implementation guidance cụ thể cho BookStore (code snippet nếu cần)
