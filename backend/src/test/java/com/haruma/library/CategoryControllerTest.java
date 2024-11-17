package com.haruma.library;

import com.haruma.library.entity.Category;
import com.haruma.library.service.CategoryService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;
import java.util.Optional;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyLong;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@AutoConfigureMockMvc
@SpringBootTest(classes = LibraryApplication.class)
class CategoryControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CategoryService categoryService;

    @Test
    void testFindAllCategory() throws Exception {
        Category category = new Category();
        category.setId(1L);
        category.setName("Test Category");

        Mockito.when(categoryService.findAllCategory()).thenReturn(List.of(category));

        mockMvc.perform(get("/api/v1/category"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$[0].id").value(1))
                .andExpect(jsonPath("$[0].name").value("Test Category"));
    }

    @Test
    void testCountCategory() throws Exception {
        Mockito.when(categoryService.count()).thenReturn(10L);

        mockMvc.perform(get("/api/v1/category/count"))
                .andExpect(status().isOk())
                .andExpect(content().string("10"));
    }

    @Test
    void testFindCategoryById() throws Exception {
        Category category = new Category();
        category.setId(1L);
        category.setName("Test Category");

        Mockito.when(categoryService.findCategoryById(1L)).thenReturn(Optional.of(category));

        mockMvc.perform(get("/api/v1/category/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.name").value("Test Category"));
    }

    @Test
    void testFindCategoryById_NotFound() throws Exception {
        Mockito.when(categoryService.findCategoryById(1L)).thenReturn(Optional.empty());

        mockMvc.perform(get("/api/v1/category/1"))
                .andExpect(status().isNotFound());
    }

    @Test
    void testAddCategory() throws Exception {
        Category category = new Category();
        category.setId(1L);
        category.setName("New Category");

        Mockito.doNothing().when(categoryService).addCategory(any(Category.class));

        mockMvc.perform(post("/api/v1/category")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"name\": \"New Category\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("New Category"));
    }

    @Test
    void testUpdateCategory() throws Exception {
        Category category = new Category();
        category.setId(1L);
        category.setName("Updated Category");

        Mockito.when(categoryService.updateCategory(any(Category.class))).thenReturn(Optional.of(category));

        mockMvc.perform(put("/api/v1/category")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"id\": 1, \"name\": \"Updated Category\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Updated Category"));
    }

    @Test
    void testUpdateCategory_NotFound() throws Exception {
        Mockito.when(categoryService.updateCategory(any(Category.class))).thenReturn(Optional.empty());

        mockMvc.perform(put("/api/v1/category")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"id\": 1, \"name\": \"Nonexistent Category\"}"))
                .andExpect(status().isOk())
                .andExpect(content().string(""));
    }

    @Test
    void testDeleteCategoryById() throws Exception {
        Category category = new Category();
        category.setId(1L);
        category.setName("Category to Delete");

        Mockito.when(categoryService.deleteCategoryById(1L)).thenReturn(Optional.of(category));

        mockMvc.perform(delete("/api/v1/category/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.name").value("Category to Delete"));
    }

    @Test
    void testDeleteCategoryById_NotFound() throws Exception {
        Mockito.when(categoryService.deleteCategoryById(anyLong())).thenReturn(Optional.empty());

        mockMvc.perform(delete("/api/v1/category/1"))
                .andExpect(status().isOk())
                .andExpect(content().string(""));
    }
}
