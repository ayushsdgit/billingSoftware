//package in.ayushdev.billingsoftware.controller;
//
//
//import in.ayushdev.billingsoftware.io.CategoryRequest;
//import in.ayushdev.billingsoftware.io.CategoryResponse;
//import in.ayushdev.billingsoftware.service.CategoryService;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.HttpStatus;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.server.ResponseStatusException;
//
//import java.util.List;
//

package in.ayushdev.billingsoftware.controller;

import in.ayushdev.billingsoftware.io.CategoryRequest;
import in.ayushdev.billingsoftware.io.CategoryResponse;
import in.ayushdev.billingsoftware.service.CategoryService;
import in.ayushdev.billingsoftware.service.SupabaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.IOException;
import java.util.List;
//@RestController
//@RequestMapping("/categories")
//@RequiredArgsConstructor
//
//public class CategoryController {
//
//    private final CategoryService categoryService;
//
//    @PostMapping
//    @ResponseStatus(HttpStatus.CREATED)
//    public CategoryResponse addCategory(@RequestBody CategoryRequest request){
//
//        return categoryService.add(request);
//    }

@RestController

@RequiredArgsConstructor
@CrossOrigin("*")
public class CategoryController {

    private final CategoryService categoryService;
    private final SupabaseService supabaseService; // ✅ ADD THIS

//    private final FileUploadService fileUploadService;
    // 🔥 THIS METHOD CHANGE
    @PostMapping(value = "/admin/categories", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(HttpStatus.CREATED)
    public CategoryResponse addCategory(
            @RequestParam("name") String name,
            @RequestParam("description") String description,
            @RequestParam("bgColor") String bgColor,
            @RequestParam("image") MultipartFile file
    ) throws IOException {

        String imageUrl =supabaseService.uploadFile(file);
        CategoryRequest request = new CategoryRequest();
        request.setName(name);
        request.setDescription(description);
        request.setBgColor(bgColor);
        request.setImageUrl(imageUrl);

        return categoryService.add(request);
    }
    @GetMapping("/categories")
    public List<CategoryResponse> fetchCategories(){
       return categoryService.read();
    }
    @DeleteMapping("/admin/categories/{categoryId}")
    public void remove(@PathVariable String categoryId){
        try{
            categoryService.delete(categoryId);
        }catch (Exception e){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Category Not Found:" +e.getMessage());
        }
    }
}
