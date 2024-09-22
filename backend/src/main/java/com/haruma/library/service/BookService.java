package com.haruma.library.service;

import com.haruma.library.entity.Book;

import java.util.List;
import java.util.Optional;

public interface BookService {

    List<Book> findAllBook();

    void addBook(Book book);

    Optional<Book> findBookById(Long id);

    Optional<Book> updateBook(Book book);

    Optional<Book> deleteBookById(Long id);

    List<Book> findBookByTitle(String title);
}
