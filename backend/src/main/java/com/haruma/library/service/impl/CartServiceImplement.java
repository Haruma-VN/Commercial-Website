package com.haruma.library.service.impl;

import com.haruma.library.entity.*;
import com.haruma.library.repository.BookRepository;
import com.haruma.library.repository.CartItemRepository;
import com.haruma.library.repository.CartRepository;
import com.haruma.library.repository.UserRepository;
import com.haruma.library.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
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
    public Cart addToCart(User user, Long bookId) throws Exception {
        var currentUser = userRepository.findUserByEmail(user.getEmail());
        if (currentUser.isEmpty()) {
            throw new Exception("Không tìm thấy user");
        }
        var cart = cartRepository.findByUser(currentUser.get());
        cart.ifPresent(value -> {
            CartItemKey key = new CartItemKey();
            key.setCartId(value.getId());
            key.setBookId(bookId);
            var book = bookRepository.findById(bookId);
            CartItem cartItem = cartItemRepository.findById(key)
                    .orElse(CartItem.builder().id(key).cart(value).book(book.get()).quantity(1).build());
            value.getCartItems().add(cartItem);
            cartItemRepository.save(cartItem);
        });
        return cart.get();
    }

    @Override
    public Cart removeFromCart(User user, Long bookId) throws Exception {
        var currentUser = userRepository.findUserByEmail(user.getEmail());
        if (currentUser.isEmpty()) {
            throw new Exception("Không tìm thấy user");
        }
        var optionalCart = cartRepository.findByUser(currentUser.get());
        if (optionalCart.isEmpty()) {
            throw new Exception("Không tìm thấy giỏ hàng");
        }
        optionalCart.ifPresent(cart -> {
            CartItemKey key = new CartItemKey();
            key.setCartId(cart.getId());
            key.setBookId(bookId);
            cartItemRepository.findById(key).ifPresent(cartItem -> {
                cart.getCartItems().remove(cartItem);
                cartItemRepository.delete(cartItem);
            });
        });
        return optionalCart.get();
    }

    @Override
    public List<Book> getAllCartItem(Long userId) throws Exception {
        var currentUser = userRepository.findById(userId);
        if (currentUser.isEmpty()) {
            throw new Exception("Không tìm thấy user");
        }
        return cartRepository.findByUser(currentUser.get())
                .map(e -> bookRepository.findByUserId(currentUser.get().getId())).orElseGet(ArrayList::new);
    }

    @Override
    public Boolean containCartItemInCart(User user, Long bookId) throws Exception {
        var currentUser = userRepository.findUserByEmail(user.getEmail());
        if (currentUser.isEmpty()) {
            throw new Exception("Không tìm thấy user");
        }
        var optionalCart = cartRepository.findByUser(currentUser.get());
        return optionalCart.map(cart -> cart.getCartItems().stream()
                .anyMatch(cartItem -> cartItem.getBook().getId().equals(bookId))).orElse(false);
    }

}
