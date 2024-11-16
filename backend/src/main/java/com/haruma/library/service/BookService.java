package com.haruma.library.service;

import com.haruma.library.entity.Book;
import org.springframework.data.domain.Page;

import java.util.Optional;

public interface BookService {

    Page<Book> findAllBook(Integer page, Integer limit);

    void addBook(Book book);

    Optional<Book> findBookById(Long id);

    Optional<Book> updateBook(Book book);

    Optional<Book> deleteBookById(Long id);

    Page<Book> findBookByTitle(String title, Integer page, Integer limit);
}
