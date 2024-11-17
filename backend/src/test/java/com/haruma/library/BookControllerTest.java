package com.haruma.library;

import com.haruma.library.controller.BookController;
import com.haruma.library.entity.Book;
import com.haruma.library.service.BookService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
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
class BookControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private BookService bookService;

    @Test
    void testFindBookById() throws Exception {
        Book book = new Book();
        book.setId(1L);
        book.setTitle("Test Book");

        Mockito.when(bookService.findBookById(1L)).thenReturn(Optional.of(book));

        mockMvc.perform(get("/api/v1/book/1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1))
                .andExpect(jsonPath("$.title").value("Test Book"));
    }

    @Test
    void testAddBook() throws Exception {
        Mockito.doNothing().when(bookService).addBook(any(Book.class));

        mockMvc.perform(post("/api/v1/book")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"title\": \"New Book\"}"))
                .andExpect(status().isOk());

        Mockito.verify(bookService).addBook(any(Book.class));
    }

    @Test
    void testUpdateBook() throws Exception {
        Book book = new Book();
        book.setId(1L);
        book.setTitle("Updated Book");

        Mockito.when(bookService.updateBook(any(Book.class))).thenReturn(Optional.of(book));

        mockMvc.perform(put("/api/v1/book")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content("{\"id\": 1, \"title\": \"Updated Book\"}"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.title").value("Updated Book"));
    }

    @Test
    void testDeleteBook() throws Exception {
        Book book = new Book();
        book.setId(1L);
        book.setTitle("Book to delete");

        Mockito.when(bookService.deleteBookById(1L)).thenReturn(Optional.of(book));

        mockMvc.perform(delete("/api/v1/book/1"))
                .andExpect(status().isOk());
    }
}
