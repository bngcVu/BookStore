---
agent: 'agent'
description: '🔄 Phân tích FE page → xác định API endpoint cần implement'
---

# BookStore — FE → API Requirements Sync

## Ngữ Cảnh

Toàn bộ Frontend đang dùng mock data từ `mockData.ts`. Cần xác định chính xác API nào Backend phải implement để FE có thể kết nối thật.

File tham chiếu:
- **Mock data** (nguồn sự thật FE): [bookstore-frontend/src/lib/mockData.ts](../../bookstore-frontend/src/lib/mockData.ts)
- **Implementation phases**: [docs/BACKEND-IMPLEMENTATION-PHASES.md](../../docs/BACKEND-IMPLEMENTATION-PHASES.md)
- **API design skill**: [.antigravity/skills/api-design-principles/SKILL.md](../../.antigravity/skills/api-design-principles/SKILL.md)
- **Fullstack skill**: [.antigravity/skills/senior-fullstack/SKILL.md](../../.antigravity/skills/senior-fullstack/SKILL.md)

## Người Dùng Sẽ Nói

> Tên page hoặc feature FE cần sync (ví dụ: "phân tích trang /checkout", "FE catalog cần API gì?")

## Quy Trình

### Bước 1 — Đọc FE Page

Đọc file page.tsx tương ứng trong `bookstore-frontend/src/app/`:
- Xác định data đang được dùng từ mockData
- Xác định user actions (button click, form submit, filter, pagination)
- Xác định state management cần thiết

### Bước 2 — Extract API Requirements

Với mỗi data source trong FE, xác định:

```
FE sử dụng: mockData.xxx
→ Cần API: [METHOD] /api/v1/xxx
→ Request: { field1, field2, ... }
→ Response: { data: [...], pagination: {...} }
→ Auth required: YES/NO, role: USER/ADMIN
→ Phase triển khai: Phase X trong BACKEND-IMPLEMENTATION-PHASES.md
```

### Bước 3 — Response Shape Mapping

So sánh mockData structure với DB schema để xác định JOIN cần thiết:

```
mockData.books[0] = {
  id, title, slug, price, originalPrice, rating, reviewCount,
  category, author, images, variants
}

→ Cần JOIN:
  books + book_variants (price, stock) + categories + images
  + aggregate(reviews) cho rating/reviewCount
```

### Bước 4 — API Contract

Tạo API contract document:

```markdown
### [GET] /api/v1/products

**Description**: Danh sách sản phẩm với filter và pagination

**Auth**: Public (không cần token)

**Query Params**:
| Param | Type | Description |
|-------|------|-------------|
| page | int | Trang (default: 0) |
| size | int | Số item (default: 20) |
| category | String | slug category |
| minPrice | BigDecimal | |
| maxPrice | BigDecimal | |
| sort | String | price_asc, price_desc, newest, best_seller |

**Request Body**: N/A

**Response 200**:
```json
{
  "success": true,
  "data": {
    "content": [...],
    "totalElements": 100,
    "totalPages": 5,
    "pageNumber": 0
  }
}
```

**Response 400**: Invalid filter params
```

### Bước 5 — Migration Guide

Hướng dẫn thay thế mock bằng real API trong FE:
```typescript
// ❌ Mock (hiện tại)
const products = mockData.books;

// ✅ Real API (sau khi BE ready)
const { data } = await fetch('/api/v1/products?page=0&size=20');
const products = data.content;
```

### Bước 6 — Output

1. **Danh sách API cần implement** (ưu tiên theo FE page)
2. **API contracts** chi tiết
3. **DB joins cần thiết** cho mỗi endpoint
4. **Phase triển khai** theo BACKEND-IMPLEMENTATION-PHASES.md
5. **FE migration snippet** để replace mock data
