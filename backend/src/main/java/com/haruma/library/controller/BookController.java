package com.haruma.library.controller;

import com.haruma.library.dto.request.BookRequest;
import com.haruma.library.entity.Book;
import com.haruma.library.service.BookService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/book")
@Tag(name="Book", description = "Book API")
public class BookController {

    private final BookService bookService;

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping
    @Operation(summary="Get all book")
    public ResponseEntity<Page<?>> findAllBooks(@RequestParam(defaultValue = "0") Integer page,
                                                   @RequestParam(defaultValue = "10") Integer limit) {
        return new ResponseEntity<>(bookService.findAllBook(page, limit), HttpStatus.OK);
    }

    @GetMapping("/{bookId}")
    @Operation(summary = "Find a book by its id")
    public ResponseEntity<?> findBookById(@PathVariable(name="bookId") Long id) {
        var book = bookService.findBookById(id);
        return book.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
    }

    @GetMapping("/category/{categoryId}")
    @Operation(summary = "Find a list of book by category id")
    public ResponseEntity<Page<?>> findBookByCategoryId(@PathVariable(name="categoryId") Long id, @RequestParam(defaultValue = "0") Integer page,
                                                           @RequestParam(defaultValue = "10") Integer limit) {
        var book = bookService.findBookByCategoryId(id, page, limit);
        return new ResponseEntity<>(book, HttpStatus.OK);
    }

    @Operation(summary = "Find a book by its title")
    @GetMapping("/search/title/{title}")
    public ResponseEntity<Page<?>> findBookByTitle(@PathVariable(name="title") String title,
                                                      @RequestParam(defaultValue = "0") Integer page,
                                                      @RequestParam(defaultValue = "10") Integer limit) {
        var book = bookService.findBookByTitle("%" + title + "%", page, limit);
        return new ResponseEntity<>(book, HttpStatus.OK);
    }

    @PostMapping
    @Operation(summary = "Add a book to database")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> addBook(@RequestBody BookRequest book) {
        bookService.addBook(book);
        return new ResponseEntity<>(book, HttpStatus.OK);
    }

    @PutMapping
    @Operation(summary = "Update a book to database")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> updateBook(@RequestBody BookRequest book) {
        var data = bookService.updateBook(book);
        return data.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
    }

    @DeleteMapping("/{bookId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    @Operation(summary = "Delete a book from database")
    public ResponseEntity<?> deleteBook(@PathVariable("bookId") Long bookId) {
        var book = bookService.deleteBookById(bookId);
        return book.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
    }

}
