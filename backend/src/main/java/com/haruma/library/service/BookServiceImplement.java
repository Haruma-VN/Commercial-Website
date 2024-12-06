package com.haruma.library.service;

import com.haruma.library.entity.Book;
import com.haruma.library.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BookServiceImplement implements BookService {

    private final BookRepository bookRepository;

    @Autowired
    public BookServiceImplement(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    @Override
    public Page<Book> findAllBook(Integer page, Integer limit) {
        var pagable = PageRequest.of(page, limit);
        return bookRepository.findAll(pagable);
    }

    @Override
    public void addBook(Book book) {
        bookRepository.save(book);
    }

    @Override
    public Optional<Book> findBookById(Long id) {
        return bookRepository.findById(id);
    }

    @Override
    public Optional<Book> updateBook(Book book) {
        var currentBookOpt = bookRepository.findById(book.getId());
        if (currentBookOpt.isPresent()) {
            Book currentBook = currentBookOpt.get();
            currentBook.setTitle(book.getTitle());
            currentBook.setAuthor(book.getAuthor());
            currentBook.setDescription(book.getDescription());
            currentBook.setCopies(book.getCopies());
            currentBook.setCopiesAvailable(book.getCopiesAvailable());
            currentBook.setImage(book.getImage());
            bookRepository.save(currentBook);
            return Optional.of(currentBook);
        }
        return Optional.empty();
    }

    @Override
    public Optional<Book> deleteBookById(Long id) {
        var book = bookRepository.findById(id);
        book.ifPresent(bookRepository::delete);
        return book;
    }

    @Override
    public Page<Book> findBookByTitle(String title, Integer page, Integer limit) {
        var pagable = PageRequest.of(page, limit);
        return bookRepository.findByTitle(title, pagable);
    }

    @Override
    public Page<Book> findBookByCategoryId(Long categoryId, Integer page, Integer limit) {
        var pagable = PageRequest.of(page, limit);
        return bookRepository.findByCategoryId(categoryId, pagable);
    }
}
