package com.haruma.library.service;

import com.haruma.library.entity.Book;
import com.haruma.library.entity.Cart;
import com.haruma.library.entity.CartItem;
import com.haruma.library.entity.User;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CartService {

    Cart addToCart(User user, Long bookId);

    Cart removeFromCart(User user, Long bookId);

    List<Book> getAllCartItem(User user);

    Boolean containCartItemInCart(User user, Long bookId);

}
