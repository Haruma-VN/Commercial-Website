package com.haruma.library.service;

import com.haruma.library.entity.Book;
import com.haruma.library.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
    public List<Book> findAllBook() {
        return bookRepository.findAll();
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
    public List<Book> findBookByTitle(String title) {
        return bookRepository.findByTitle(title);
    }
}
