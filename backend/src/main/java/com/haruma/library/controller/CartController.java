package com.haruma.library.controller;

import com.haruma.library.dto.request.CartGetRequest;
import com.haruma.library.dto.request.CartRequest;
import com.haruma.library.entity.Book;
import com.haruma.library.entity.Cart;
import com.haruma.library.entity.User;
import com.haruma.library.service.CartService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/cart")
@Tag(name="Cart", description = "Cart API")
public class CartController {

    private final CartService cartService;

    @Autowired
    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @PostMapping
    @Operation(summary = "Add a book to cart")
    @PreAuthorize("hasRole('ROLE_USER') || hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> addToCart(@RequestBody CartRequest cartRequest) throws Exception {
        var cart = cartService.addToCart(User.builder().email(cartRequest.getEmail()).build(), cartRequest.getBookId());
        return new ResponseEntity<>(cart, HttpStatus.OK);
    }

    @DeleteMapping
    @Operation(summary = "Remove a book from cart")
    @PreAuthorize("hasRole('ROLE_USER') || hasRole('ROLE_ADMIN')")
    public ResponseEntity<?> removeFromCart(@RequestBody CartRequest cartRequest) throws Exception {
        var cart = cartService.removeFromCart(User.builder().email(cartRequest.getEmail()).build(), cartRequest.getBookId());
        return new ResponseEntity<>(cart, HttpStatus.OK);
    }

    @GetMapping
    @Operation(summary = "Get all item from a cart")
    @PreAuthorize("hasRole('ROLE_USER') || hasRole('ROLE_ADMIN')")
    public ResponseEntity<List<Book>> getAllCartItem(@RequestParam Long userId) throws Exception {
        return new ResponseEntity<>(cartService.getAllCartItem(userId), HttpStatus.OK);
    }

    @PostMapping("/include")
    @Operation(summary = "Check if a book is in the cart")
    @PreAuthorize("hasRole('ROLE_USER') || hasRole('ROLE_ADMIN')")
    public ResponseEntity<Boolean> containCartItemInCart(@RequestBody CartRequest cartRequest) throws Exception {
        return new ResponseEntity<>(cartService.containCartItemInCart(User.builder()
                .email(cartRequest.getEmail()).build(), cartRequest.getBookId()), HttpStatus.OK);
    }

}
