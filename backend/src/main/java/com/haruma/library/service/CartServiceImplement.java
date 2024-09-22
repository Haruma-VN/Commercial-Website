package com.haruma.library.service;

import com.haruma.library.entity.*;
import com.haruma.library.repository.BookRepository;
import com.haruma.library.repository.CartItemRepository;
import com.haruma.library.repository.CartRepository;
import com.haruma.library.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class CartServiceImplement implements CartService {

    private final CartRepository cartRepository;

    private final CartItemRepository cartItemRepository;

    private final UserRepository userRepository;

    private final BookRepository bookRepository;

    @Autowired
    public CartServiceImplement(CartRepository cartRepository, CartItemRepository cartItemRepository,
                                UserRepository userRepository, BookRepository bookRepository) {
        this.cartItemRepository = cartItemRepository;
        this.cartRepository = cartRepository;
        this.userRepository = userRepository;
        this.bookRepository = bookRepository;
    }

    @Override
    public Cart addToCart(User user, Long bookId) {
        var cart = cartRepository.findByUser(userRepository.findUserByEmail(user.getEmail()));
        cart.ifPresent(value -> {
            CartItemKey key = new CartItemKey();
            key.setCartId(value.getId());
            key.setBookId(bookId);
            var book = bookRepository.findById(bookId);
            CartItem cartItem = cartItemRepository.findById(key)
                    .orElse(CartItem.builder().id(key).cart(value).book(book.get()).quantity(1).build());
            value.getCartItems().add(cartItem);
            cartItemRepository.save(cartItem);
            book.ifPresent(e -> {
                e.setCopiesAvailable(e.getCopiesAvailable() - 1);
                bookRepository.save(e);
            });
        });
        return cart.get();
    }

    @Override
    public Cart removeFromCart(User user, Long bookId) {
        var optionalCart = cartRepository.findByUser(userRepository.findUserByEmail(user.getEmail()));
        optionalCart.ifPresent(cart -> {
            CartItemKey key = new CartItemKey();
            key.setCartId(cart.getId());
            key.setBookId(bookId);
            cartItemRepository.findById(key).ifPresent(cartItem -> {
                cart.getCartItems().remove(cartItem);
                cartItemRepository.delete(cartItem);
                bookRepository.findById(bookId).ifPresent(e -> {
                    e.setCopiesAvailable(e.getCopiesAvailable() + 1);
                    bookRepository.save(e);
                });
            });
        });
        return optionalCart.get();
    }

    @Override
    public List<Book> getAllCartItem(User user) {
        var currentUser = userRepository.findUserByEmail(user.getEmail());
        return cartRepository.findByUser(currentUser)
                .map(e -> bookRepository.findByUserId(currentUser.getId())).orElseGet(ArrayList::new);
    }

    @Override
    public Boolean containCartItemInCart(User user, Long bookId) {
        var optionalCart = cartRepository.findByUser(userRepository.findUserByEmail(user.getEmail()));
        return optionalCart.map(cart -> cart.getCartItems().stream()
                .anyMatch(cartItem -> cartItem.getBook().getId().equals(bookId))).orElse(false);
    }

}
