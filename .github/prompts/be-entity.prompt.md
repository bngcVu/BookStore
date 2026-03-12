---
agent: 'agent'
description: '🗄️ Tạo JPA Entity từ database_schema.md cho BookStore'
---

# BookStore Backend — Tạo JPA Entity

## Ngữ Cảnh

Dự án: **BookStore** — Spring Boot 3.x, JPA/Hibernate, MySQL 8.

File tham chiếu:
- **DB Schema** (nguồn sự thật): [backend/sql/database/database_schema.md](../../backend/sql/database/database_schema.md)
- **SQL gốc**: [backend/sql/database/create_tables.sql](../../backend/sql/database/create_tables.sql)
- **Java skill**: [.antigravity/skills/java-pro/SKILL.md](../../.antigravity/skills/java-pro/SKILL.md)
- **Clean code**: [.antigravity/skills/clean-code/SKILL.md](../../.antigravity/skills/clean-code/SKILL.md)
- **Refactor cleanup**: [.antigravity/skills/code-refactoring-refactor-clean/SKILL.md](../../.antigravity/skills/code-refactoring-refactor-clean/SKILL.md)

## Người Dùng Sẽ Nói

> Tên bảng hoặc nhóm bảng cần tạo Entity (ví dụ: "tạo entity cho bảng users và customer_tiers")

Người dùng cũng có thể nói theo phase, ví dụ:
- `Phase 1 entities`
- `Phase 2 catalog entities`
- `Phase 3 order entities`

## Quy Trình

### Bước 1 — Đọc Schema
Tìm bảng trong `database_schema.md`, lấy đúng:
- Tên cột và kiểu dữ liệu
- Khóa chính / khóa ngoại
- Constraints (NOT NULL, UNIQUE, ENUM values)

Nếu người dùng chỉ nêu phase, hãy tra trong `BACKEND-IMPLEMENTATION-PHASES.md` để lấy toàn bộ entity của phase đó và tạo theo batch hợp lý, không buộc người dùng phải gọi lại nhiều lần cho từng bảng.

### Bước 2 — Mapping Rules

| SQL Type | Java Type | Note |
|----------|-----------|------|
| BIGINT | Long | |
| VARCHAR | String | |
| TEXT | String | thêm `@Lob` nếu > 255 chars |
| DECIMAL | BigDecimal | |
| INT, TINYINT | Integer | |
| DATETIME | LocalDateTime | |
| DATE | LocalDate | |
| ENUM | String + @Enumerated | hoặc Java enum |
| JSON | String | thêm converter nếu cần |
| TINYINT(1) | Boolean | `@Column(columnDefinition = "TINYINT(1)")` |

### Bước 3 — Entity Template

```java
@Entity
@Table(name = "table_name")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class XxxEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "column_name", nullable = false, length = 255)
    private String fieldName;

    // FK Many-to-One
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "fk_column_id")
    private OtherEntity other;

    // Timestamps
    @Column(name = "created_at", updatable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    @UpdateTimestamp
    private LocalDateTime updatedAt;

    // Soft delete
    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;
}
```

### Bước 4 — Repository

Tạo kèm repository interface:
```java
public interface XxxRepository extends JpaRepository<XxxEntity, Long> {
    // Custom queries dựa trên use case trong BACKEND-IMPLEMENTATION-PHASES.md
    Optional<XxxEntity> findBySlug(String slug);
    List<XxxEntity> findByIsActiveTrue();
}
```

## Batch Theo Phase

Khi làm theo phase, mặc định group như sau:
- Phase 1: `CustomerTierEntity`, `UserEntity`, `AdminEntity`, `OtpCodeEntity`
- Phase 2: `CategoryEntity`, `AuthorEntity`, `PublisherEntity`, `BookEntity`, `BookAuthorEntity`, `BookImageEntity`, `BookVariantEntity`
- Phase 3: `ProvinceEntity`, `DistrictEntity`, `UserAddressEntity`, `CartEntity`, `InventoryEntity`, `ShippingCarrierEntity`, `ShippingRateEntity`, `OrderEntity`, `OrderItemEntity`, `OrderStatusHistoryEntity`, `PaymentEntity`
- Phase 4+: lấy danh sách entity trực tiếp từ phase docs và tạo theo nhóm feature

## Checklist Sau Khi Tạo

- [ ] `@Table(name = ...)` khớp đúng tên bảng trong SQL
- [ ] `@Column(name = ...)` khớp tên cột snake_case
- [ ] FK sử dụng `FetchType.LAZY` (default)
- [ ] Không có circular dependency giữa các entities
- [ ] `application.yaml` dùng `ddl-auto: validate` → entity phải khớp 100% với schema
- [ ] Nếu tạo theo phase, repository cơ bản cho các entity chính cũng phải được tạo cùng batch
