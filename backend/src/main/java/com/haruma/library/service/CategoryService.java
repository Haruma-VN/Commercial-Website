package com.haruma.library.service;

import com.haruma.library.entity.Category;
import java.util.List;
import java.util.Optional;

public interface CategoryService {

    List<Category> findAllCategory();

    void addCategory(Category category);

    Optional<Category> findCategoryById(Long id);

    Optional<Category> updateCategory(Category category);

    Optional<Category> deleteCategoryById(Long id);

    Long count();
}
