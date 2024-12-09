package com.haruma.library.controller;

import com.haruma.library.dto.request.CategoryRequest;
import com.haruma.library.entity.Category;
import com.haruma.library.service.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/category")
@Tag(name="Category", description = "Category API")
public class CategoryController {

    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    @Operation(summary = "Get all category from database")
    public ResponseEntity<List<Category>> findAllCategory() {
        return new ResponseEntity<>(categoryService.findAllCategory(), HttpStatus.OK);
    }

    @GetMapping("/count")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @Operation(summary = "Count all category from database")
    public ResponseEntity<Long> countCategory() {
        return new ResponseEntity<>(categoryService.count(), HttpStatus.OK);
    }

    @GetMapping("/{categoryId}")
    @Operation(summary = "Get a category from database by its id")
    public ResponseEntity<Category> findCategoryById(@PathVariable("categoryId") Long categoryId) {
        var category = categoryService.findCategoryById(categoryId);
        return category.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
    }

    @PostMapping
    @Operation(summary = "Add a category to database")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> addCategory(@RequestBody CategoryRequest category) {
        var newCategory = categoryService.addCategory(Category.builder().name(category.getName()).build());
        return new ResponseEntity<>(newCategory, HttpStatus.OK);
    }

    @PutMapping
    @Operation(summary = "Update a category to database")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Category> updateCategory(@RequestBody Category category) {
        var data = categoryService.updateCategory(category);
        return data.map(value -> new ResponseEntity<>(category, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(null, HttpStatus.OK));
    }

    @DeleteMapping("/{categoryId}")
    @Operation(summary = "Delete a category to database")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Category> deleteCategoryById(@PathVariable("categoryId") Long categoryId) {
        var data = categoryService.deleteCategoryById(categoryId);
        return data.map(value -> new ResponseEntity<>(data.get(), HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(null, HttpStatus.OK));

    }

}
