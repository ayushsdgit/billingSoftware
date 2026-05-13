package in.ayushdev.billingsoftware.service.serviceImpl;

import in.ayushdev.billingsoftware.entity.CategoryEntity;
import in.ayushdev.billingsoftware.io.CategoryRequest;
import in.ayushdev.billingsoftware.io.CategoryResponse;
import in.ayushdev.billingsoftware.repository.CategoryRepository;
import in.ayushdev.billingsoftware.repository.ItemRepository;
import in.ayushdev.billingsoftware.service.CategoryService;
import in.ayushdev.billingsoftware.service.SupabaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;


@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {
    private final CategoryRepository categoryRepository;
    private final SupabaseService supabaseService;
    private final ItemRepository itemRepository;

    @Override
    public CategoryResponse add(CategoryRequest request) {
        CategoryEntity newCategory = convertToEntity(request);
        newCategory = categoryRepository.save(newCategory);
        return convertToResponse(newCategory);
    }
    @Override
    public void delete(String categoryId){
        CategoryEntity existingCategory = categoryRepository.findByCategoryId(categoryId)
                .orElseThrow(()-> new RuntimeException("Category not found:" + categoryId));

        String imageUrl = existingCategory.getImgUrl();
        String fileName = imageUrl.substring(imageUrl.lastIndexOf("/")+ 1);

        supabaseService.deleteFile(fileName);
        categoryRepository.delete(existingCategory);
    }

    @Override
    public List<CategoryResponse> read() {
        return categoryRepository.findAll()
                .stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

//    @Override
//    public void delete(String categoryId) {
//       CategoryEntity existingCategory= categoryRepository.findByCategoryId(categoryId)
//                .orElseThrow(()-> new RuntimeException("Category not found:" + categoryId));
//               categoryRepository.delete(existingCategory);
//    }


    private CategoryResponse convertToResponse(CategoryEntity newCategory) {
        Integer itemsCount = itemRepository.countByCategoryId(newCategory.getId());

        return  CategoryResponse.builder()
                .categoryId(newCategory.getCategoryId())
                .name(newCategory.getName())
                .description(newCategory.getDescription())
                .bgColor(newCategory.getBgColor())
                .imgUrl(newCategory.getImgUrl())
                .createdAt(newCategory.getCreatedAt())
                .updatedAt(newCategory.getUpdatedAt())
                .items(itemsCount)
                .build();
    }

    private CategoryEntity convertToEntity(CategoryRequest request) {
        return CategoryEntity.builder()
                .categoryId(UUID.randomUUID().toString())
                .name(request.getName())
                .description(request.getDescription())
                .bgColor(request.getBgColor())
                .imgUrl(request.getImageUrl())
                .build();
    }
}
