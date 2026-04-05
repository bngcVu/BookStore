package com.bookstore.domain.repository;

import com.bookstore.domain.entity.InventoryEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface InventoryRepository extends JpaRepository<InventoryEntity, Long> {

    /** Tăng reserve khi người dùng đặt hàng */
    @Transactional
    @Modifying
    @Query("UPDATE InventoryEntity i SET i.reservedQuantity = i.reservedQuantity + :qty WHERE i.variantId = :variantId AND (i.quantity - i.reservedQuantity) >= :qty")
    int reserveQuantity(Long variantId, int qty);

    /** Giảm tồn kho thực sau khi đơn hoàn tất (và giải phóng reserve) */
    @Transactional
    @Modifying
    @Query("UPDATE InventoryEntity i SET i.quantity = i.quantity - :qty, i.reservedQuantity = i.reservedQuantity - :qty WHERE i.variantId = :variantId")
    void confirmSale(Long variantId, int qty);

    /** Giải phóng reserve khi huỷ đơn */
    @Transactional
    @Modifying
    @Query("UPDATE InventoryEntity i SET i.reservedQuantity = i.reservedQuantity - :qty WHERE i.variantId = :variantId")
    void releaseReserve(Long variantId, int qty);
}
