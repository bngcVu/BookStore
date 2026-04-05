package com.bookstore.domain.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import java.time.LocalDateTime;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.UpdateTimestamp;

@Getter
@Setter
@NoArgsConstructor
@Entity
@Table(name = "inventory")
public class InventoryEntity {

    /** variant_id = PK (shared PK pattern) */
    @Id
    @Column(name = "variant_id")
    private Long variantId;

    @OneToOne(fetch = FetchType.LAZY)
    @MapsId
    @JoinColumn(name = "variant_id")
    private BookVariantEntity variant;

    @Column(name = "quantity", nullable = false)
    private Integer quantity = 0;

    @Column(name = "reserved_quantity", nullable = false)
    private Integer reservedQuantity = 0;

    @Column(name = "min_stock_level")
    private Integer minStockLevel = 5;

    @Column(name = "last_restocked_at")
    private LocalDateTime lastRestockedAt;

    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    /** Tính số lượng tồn kho thực sự còn có thể bán */
    public int getAvailableQuantity() {
        return Math.max(0, quantity - reservedQuantity);
    }
}
