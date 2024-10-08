package com.haruma.library.controller;

import com.haruma.library.entity.Book;
import com.haruma.library.entity.Cart;
import com.haruma.library.entity.User;
import com.haruma.library.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class CartController {

    private final CartService cartService;

    @Autowired
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping("/cart/{userEmail}/{bookId}")
    public ResponseEntity<Cart> addToCart(@PathVariable("userEmail") String userEmail, @PathVariable("bookId") Long bookId) {
        var cart = cartService.addToCart(User.builder().email(userEmail).build(), bookId);
        return new ResponseEntity<>(cart, HttpStatus.OK);
    }

    @DeleteMapping("/cart/{userEmail}/{bookId}")
    public ResponseEntity<Cart> removeFromCart(@PathVariable("userEmail") String userEmail, @PathVariable("bookId") Long bookId) {
        var cart = cartService.removeFromCart(User.builder().email(userEmail).build(), bookId);
        return new ResponseEntity<>(cart, HttpStatus.OK);
    }

    @GetMapping("/cart/{userEmail}")
    public ResponseEntity<List<Book>> getAllCartItem(@PathVariable("userEmail") String userEmail) {
        return new ResponseEntity<>(cartService.getAllCartItem(User.builder()
                .email(userEmail).build()), HttpStatus.OK);
    }

    @PostMapping("/cart/include/{userEmail}/{bookId}")
    public ResponseEntity<Boolean> containCartItemInCart(@PathVariable("userEmail") String userEmail, @PathVariable("bookId") Long bookId) {
        return new ResponseEntity<>(cartService.containCartItemInCart(User.builder()
                .email(userEmail).build(), bookId), HttpStatus.OK);
    }

}
