package com.haruma.library.service;

import com.haruma.library.entity.Category;
import com.haruma.library.repository.CategoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImplement implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Autowired
    public CategoryServiceImplement(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public List<Category> findAllCategory() {
        return categoryRepository.findAll();
    }

    @Override
    public void addCategory(Category category) {
        categoryRepository.save(category);
    }

    @Override
    public Optional<Category> findCategoryById(Long id) {
        return categoryRepository.findById(id);
    }

    @Override
    public Optional<Category> updateCategory(Category category) {
        var currentCategory = categoryRepository.findById(category.getId());
        if (currentCategory.isPresent()) {
            categoryRepository.save(category);
            return Optional.of(category);
        }
        return Optional.empty();
    }

    @Override
    public Optional<Category> deleteCategoryById(Long id) {
        var data = categoryRepository.findById(id);
        data.ifPresent(categoryRepository::delete);
        return data;
    }

    @Override
    public Long count() {
        return categoryRepository.count();
    }
}
