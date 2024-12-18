package com.haruma.library.service.impl;

import com.haruma.library.dto.request.BookRequest;
import com.haruma.library.dto.response.BookResponse;
import com.haruma.library.entity.Book;
import com.haruma.library.repository.BookRepository;
import com.haruma.library.repository.CategoryRepository;
import com.haruma.library.repository.RoleRepository;
import com.haruma.library.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class BookServiceImplement implements BookService {

    private final BookRepository bookRepository;

    private final CategoryRepository categoryRepository;


    @Autowired
    public BookServiceImplement(BookRepository bookRepository, CategoryRepository categoryRepository) {
        this.bookRepository = bookRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public Page<BookResponse> findAllBook(Integer page, Integer limit) {
        var pageable = PageRequest.of(page, limit);
        Page<Book> bookPage = bookRepository.findAll(pageable);
        Page<BookResponse> bookResponsePage = bookPage.map(book -> buildBookResponse(book));
        return bookResponsePage;
    }


    @Override
    public void addBook(BookRequest book) {
        var newBook = Book.builder()
                .author(book.getAuthor())
                .title(book.getTitle())
                .image(book.getImage())
                .price(book.getPrice())
                .description(book.getDescription())
                .quantity(book.getQuantity())
                .category(categoryRepository.findById(book.getCategoryId()).orElse(null))
                .build();
        bookRepository.save(newBook);
    }

    @Override
    public Optional<BookResponse> findBookById(Long id) {
        var book = bookRepository.findById(id);
        if (book.isEmpty()) {
            return Optional.empty();
        }
        return Optional.of(buildBookResponse(book.get()));
    }

    @Override
    public Optional<Book> findBookByBookId(Long id) {
        return bookRepository.findById(id);
    }

    private BookResponse buildBookResponse(Book book) {
        return BookResponse.builder()
                .image(book.getImage())
                .price(book.getPrice())
                .title(book.getTitle())
                .author(book.getAuthor())
                .description(book.getDescription())
                .categoryId(book.getCategory() != null ? book.getCategory().getId() : null)
                .id(book.getId())
                .quantity(book.getQuantity())
                .build();
    }

    @Override
    public Optional<BookResponse> updateBook(BookRequest book) {
        var currentBookOpt = bookRepository.findById(book.getId());
        if (currentBookOpt.isPresent()) {
            Book currentBook = currentBookOpt.get();
            currentBook.setTitle(book.getTitle());
            currentBook.setAuthor(book.getAuthor());
            currentBook.setDescription(book.getDescription());
            currentBook.setQuantity(book.getQuantity());
            currentBook.setPrice(book.getPrice());
            currentBook.setImage(book.getImage());
            currentBook.setCategory(categoryRepository.findById(book.getCategoryId()).orElse(null));
            bookRepository.save(currentBook);
            return Optional.of(buildBookResponse(currentBook));
        }
        return Optional.empty();
    }

    @Override
    public Optional<BookResponse> deleteBookById(Long id) {
        var book = bookRepository.findById(id);
        book.ifPresent(bookRepository::delete);
        return Optional.of(buildBookResponse(book.get()));
    }

    @Override
    public Page<BookResponse> findBookByTitle(String title, Integer page, Integer limit) {
        var pagable = PageRequest.of(page, limit);
        return bookRepository.findByTitle(title, pagable).map((book) -> buildBookResponse(book));
    }

    @Override
    public Page<BookResponse> findBookByCategoryId(Long categoryId, Integer page, Integer limit) {
        var pagable = PageRequest.of(page, limit);
        return bookRepository.findByCategoryId(categoryId, pagable).map((book) -> buildBookResponse(book));
    }
}
