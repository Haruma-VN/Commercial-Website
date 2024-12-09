package com.haruma.library.service;

import com.haruma.library.entity.Book;
import com.haruma.library.entity.Cart;
import com.haruma.library.entity.CartItem;
import com.haruma.library.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CartService {

    Cart addToCart(User user, Long bookId) throws Exception;

    Cart removeFromCart(User user, Long bookId) throws Exception;

    List<Book> getAllCartItem(User user) throws Exception;

    Boolean containCartItemInCart(User user, Long bookId) throws Exception;

}
