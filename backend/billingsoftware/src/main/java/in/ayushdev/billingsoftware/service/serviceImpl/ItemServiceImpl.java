package in.ayushdev.billingsoftware.service.serviceImpl;

import in.ayushdev.billingsoftware.entity.CategoryEntity;
import in.ayushdev.billingsoftware.entity.ItemEntity;
import in.ayushdev.billingsoftware.io.ItemRequest;
import in.ayushdev.billingsoftware.io.ItemResponse;
import in.ayushdev.billingsoftware.repository.CategoryRepository;
import in.ayushdev.billingsoftware.repository.ItemRepository;
import in.ayushdev.billingsoftware.service.ItemService;
import in.ayushdev.billingsoftware.service.SupabaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor

public class ItemServiceImpl implements ItemService {

    private final SupabaseService supabaseService;
    private final CategoryRepository categoryRepository;
    private final ItemRepository itemRepository;


    @Override
    public List<ItemResponse> fetchItems() {
      return itemRepository.findAll()
               .stream()
               .map(itemEntity -> convertToResponse(itemEntity))
               .collect(Collectors.toList());
    }


//    @Override
//    public ItemResponse add(ItemRequest request, MultipartFile file) {
//        String imgUrl = supabaseService.uploadFile(file);
//        ItemEntity newItem = convertToEntity(request);
//        CategoryEntity existingCategory = categoryRepository.findByCategoryId(request.getCategoryId())
//                .orElseThrow(()-> new RuntimeException("Category not found: "+ request.getCategoryId()));
//        newItem.setCategory(existingCategory);
//        newItem.setImgUrl(imgUrl);
//        newItem = itemRepository.save(newItem);
//        return convertToResponse(newItem);
//    }
@Override
        public ItemResponse add(ItemRequest request, MultipartFile file) {
    String imgUrl = null;
    try {
        imgUrl = supabaseService.uploadFile(file);
    } catch (IOException e) {
        throw new RuntimeException(e);
    }
    ItemEntity newItem = convertToEntity(request);
            CategoryEntity existingCategory = categoryRepository.findByCategoryId(request.getCategoryId())
                    .orElseThrow(()-> new RuntimeException("Category not found: "+ request.getCategoryId()));
            newItem.setCategory(existingCategory);
            newItem.setImgUrl(imgUrl);
            newItem = itemRepository.save(newItem);
            return convertToResponse(newItem);
}
/// ////original written below
//    @Override
//    public void deleteItem(String itemId) {
//        System.out.println("Deleting itemId: "+ itemId);
//        ItemEntity existingItem = itemRepository.findByItemId(itemId)
//                .orElseThrow(()-> new RuntimeException("Item Not Found: "+ itemId));
//        boolean isFileDelete = supabaseService.deleteFile(existingItem.getImgUrl());
//        if(isFileDelete){
//            itemRepository.delete(existingItem);
//        }else{
//            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to delete the image");
//        }
//
//    }

@Override
public void deleteItem(String itemId) {
    System.out.println("Deleting itemId: "+ itemId);
    ItemEntity existingItem = itemRepository.findByItemId(itemId)
            .orElseThrow(()-> new RuntimeException("Item Not Found: "+ itemId));
/// ///////////////////////////////////////////////////////////
    String imageUrl = existingItem.getImgUrl();
    String fileName = imageUrl.substring(imageUrl.lastIndexOf("/") + 1);
    boolean isFileDelete = supabaseService.deleteFile(fileName);
    ////////////////////////////////////////////
    if(isFileDelete){
        itemRepository.delete(existingItem);
    }else{
        throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "Unable to delete the image");
    }

}

    private ItemResponse convertToResponse(ItemEntity newItem) {
        return ItemResponse.builder()
                .itemId(newItem.getItemId())
                .name(newItem.getName())
                .description(newItem.getDescription())
                .price(newItem.getPrice())
                .imgUrl(newItem.getImgUrl())
                .categoryName(newItem.getCategory().getName())
                .categoryId(newItem.getCategory().getCategoryId())
                .createdAt(newItem.getCreatedAt())
                .updatedaAt(newItem.getUpdatedAt())
                .build();
    }

    private ItemEntity convertToEntity(ItemRequest request) {
       return ItemEntity.builder()
                .itemId(UUID.randomUUID().toString())
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .build();
    }


}
