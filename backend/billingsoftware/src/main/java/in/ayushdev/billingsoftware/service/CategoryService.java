package in.ayushdev.billingsoftware.service;

import in.ayushdev.billingsoftware.io.CategoryRequest;
import in.ayushdev.billingsoftware.io.CategoryResponse;

import java.util.List;

public interface CategoryService {

    CategoryResponse add(CategoryRequest request);

    List<CategoryResponse> read();

    void delete(String categoryId);
}
