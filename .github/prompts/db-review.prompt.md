---
agent: 'agent'
description: '🗃️ Review database query / schema cho BookStore'
---

# BookStore Backend — Database Review

## Ngữ Cảnh

Dự án dùng MySQL 8, JPA/Hibernate. 38 bảng có sẵn với indexes và foreign keys.

File tham chiếu:
- **DB Design skill**: [.antigravity/skills/database-design/SKILL.md](../../.antigravity/skills/database-design/SKILL.md)
- **Java/JPA skill**: [.antigravity/skills/java-pro/SKILL.md](../../.antigravity/skills/java-pro/SKILL.md)
- **Schema đầy đủ**: [backend/sql/database/database_schema.md](../../backend/sql/database/database_schema.md)
- **Optimizations**: [backend/sql/database/database_optimizations.sql](../../backend/sql/database/database_optimizations.sql)
- **SQL gốc**: [backend/sql/database/create_tables.sql](../../backend/sql/database/create_tables.sql)

## Người Dùng Sẽ Nói

> JPQL / SQL query, Repository method, hoặc mô tả use case cần query (ví dụ: "lấy danh sách sản phẩm kèm filter trong admin catalog")

## Quy Trình

### Bước 1 — Phân Tích Query Hiện Tại

Đọc query được cung cấp, xác định:
- Bảng nào được join?
- Columns nào được select? (SELECT * là warning)
- Có WHERE clause optimize không?
- Sử dụng pagination chưa?

### Bước 2 — N+1 Detection

```java
// ❌ N+1 problem — sẽ gây N queries thêm
List<Order> orders = orderRepo.findAll();
orders.forEach(o -> o.getOrderItems().size()); // lazy load N lần

// ✅ Fix với JOIN FETCH
@Query("SELECT o FROM OrderEntity o LEFT JOIN FETCH o.orderItems WHERE o.userId = :userId")
List<OrderEntity> findByUserIdWithItems(@Param("userId") Long userId);

// ✅ Hoặc dùng @EntityGraph
@EntityGraph(attributePaths = {"orderItems", "orderItems.bookVariant"})
List<OrderEntity> findByUserId(Long userId);
```

### Bước 3 — Index Review

Kiểm tra trong `database_schema.md` xem columns trong WHERE / JOIN / ORDER BY có index chưa:

| Pattern | Cần Index |
|---------|-----------|
| `WHERE slug = ?` | ✅ UNIQUE index trên `slug` |
| `WHERE user_id = ? AND status = ?` | Composite index `(user_id, status)` |
| `ORDER BY created_at DESC` | Index trên `created_at` |
| `WHERE is_active = 1` | Partial index hoặc composite |

### Bước 4 — Pagination

```java
// ✅ Đúng — dùng Pageable
Page<BookEntity> findByIsActiveTrue(Pageable pageable);

// ❌ Sai — load toàn bộ rồi mới filter
List<BookEntity> findAll().stream().filter(...).collect(...)
```

### Bước 5 — Projection (chỉ lấy field cần)

```java
// ✅ Projection interface — không load cả entity
public interface BookSummary {
    Long getId();
    String getTitle();
    String getSlug();
    BigDecimal getPrice();
}

List<BookSummary> findByIsActiveTrue();
```

### Bước 6 — Output

1. **Issues tìm thấy** (N+1, full table scan, missing index)
2. **Optimized query** với giải thích
3. **Index recommendation** nếu cần thêm vào `database_optimizations.sql`
4. **Estimate cải thiện** (ví dụ: từ 100ms → 5ms)
