package in.ayushdev.billingsoftware.repository;

import in.ayushdev.billingsoftware.entity.ItemEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface ItemRepository extends JpaRepository<ItemEntity, Long> {


    Optional<ItemEntity> findByItemId(String id);


    Integer countByCategoryId(Long id);


//    @Query("SELECT i FROM ItemEntity i WHERE i.itemId = :itemId")
//    Optional<ItemEntity> findByItemId(@Param("itemId") String itemId);


//    Integer countByCategory_CategoryId(String categoryId); // ✅ FIXED
}
