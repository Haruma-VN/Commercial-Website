package com.haruma.library.controller;

import com.haruma.library.entity.Category;
import com.haruma.library.service.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@Tag(name="Category", description = "Category API")
public class CategoryController {

    private final CategoryService categoryService;

    @Autowired
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping("/category")
    @Operation(summary = "Add a category to database")
    public ResponseEntity<List<Category>> findAllCategory() {
        return new ResponseEntity<>(categoryService.findAllCategory(), HttpStatus.OK);
    }

    @GetMapping("/category/count")
    @Operation(summary = "Count all category from database")
    public ResponseEntity<Long> countCategory() {
        return new ResponseEntity<>(categoryService.count(), HttpStatus.OK);
    }

    @GetMapping("/category/{categoryId}")
    @Operation(summary = "Get a category from database by its id")
    public ResponseEntity<Category> findCategoryById(@PathVariable("categoryId") Long categoryId) {
        var category = categoryService.findCategoryById(categoryId);
        return category.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
    }

    @PostMapping("/category")
    @Operation(summary = "Add a category to database")
    public ResponseEntity<Category> addCategory(@RequestBody Category category) {
        categoryService.addCategory(category);
        return new ResponseEntity<>(category, HttpStatus.OK);
    }

    @PutMapping("/category")
    @Operation(summary = "Update a category to database")
    public ResponseEntity<Category> updateCategory(@RequestBody Category category) {
        var data = categoryService.updateCategory(category);
        return data.map(value -> new ResponseEntity<>(category, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(null, HttpStatus.OK));
    }

    @DeleteMapping("/category/{categoryId}")
    @Operation(summary = "Delete a category to database")
    public ResponseEntity<Category> deleteCategoryById(@PathVariable("categoryId") Long categoryId) {
        var data = categoryService.deleteCategoryById(categoryId);
        return data.map(value -> new ResponseEntity<>(data.get(), HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(null, HttpStatus.OK));

    }

}
