package com.haruma.library.controller;

import com.haruma.library.entity.Book;
import com.haruma.library.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class BookController {

    private final BookService bookService;

    @Autowired
    public BookController(BookService bookService) {
        this.bookService = bookService;
    }

    @GetMapping("/book")
    public ResponseEntity<List<Book>> findAllBooks() {
        return new ResponseEntity<>(bookService.findAllBook(), HttpStatus.OK);
    }

    @GetMapping("/book/{bookId}")
    public ResponseEntity<Book> findBookById(@PathVariable(name="bookId") Long id) {
        var book = bookService.findBookById(id);
        return book.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
    }

    @GetMapping("/book/search/title/{title}")
    public ResponseEntity<List<Book>> findBookByTitle(@PathVariable(name="title") String title) {
        var book = bookService.findBookByTitle("%" + title + "%");
        return new ResponseEntity<>(book, HttpStatus.OK);
    }

    @PostMapping("/book")
    public ResponseEntity<Book> addBook(@RequestBody Book book) {
        bookService.addBook(book);
        return new ResponseEntity<>(book, HttpStatus.OK);
    }

    @PutMapping("/book")
    public ResponseEntity<List<Book>> updateBook(@RequestBody Book book) {
        var data = bookService.updateBook(book);
        if (data.isPresent()) {
            return new ResponseEntity<>(bookService.findAllBook(), HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/book/{bookId}")
    public ResponseEntity<Book> deleteBook(@PathVariable("bookId") Long bookId) {
        var book = bookService.deleteBookById(bookId);
        return book.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
    }

}
