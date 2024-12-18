package com.haruma.library.service;

import com.haruma.library.dto.request.BookRequest;
import com.haruma.library.dto.response.BookResponse;
import com.haruma.library.entity.Book;
import org.springframework.data.domain.Page;

import java.util.Optional;

public interface BookService {

    Page<BookResponse> findAllBook(Integer page, Integer limit);

    void addBook(BookRequest book);

    Optional<BookResponse> findBookById(Long id);

    Optional<Book> findBookByBookId(Long id);

    Optional<BookResponse> updateBook(BookRequest book);

    Optional<BookResponse> deleteBookById(Long id);

    Page<BookResponse> findBookByTitle(String title, Integer page, Integer limit);

    Page<BookResponse> findBookByCategoryId(Long categoryId, Integer page, Integer limit);
}
