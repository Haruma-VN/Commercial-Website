package com.haruma.library.controller;

import com.haruma.library.entity.Checkout;
import com.haruma.library.service.CheckoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class CheckoutController {

    private final CheckoutService checkoutService;

    @Autowired
    public CheckoutController(CheckoutService checkoutService) {
        this.checkoutService = checkoutService;
    }

    @GetMapping("/checkout")
    public ResponseEntity<List<Checkout>> findAllCheckouts() {
        return new ResponseEntity<>(checkoutService.findAllCheckout(), HttpStatus.OK);
    }

    @GetMapping("/checkout/{checkoutId}")
    public ResponseEntity<Checkout> findCheckoutById(@PathVariable(name="checkoutId") Long id) {
        var checkout = checkoutService.findCheckoutById(id);
        return checkout.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
    }

    @GetMapping("/checkout/search")
    public ResponseEntity<List<Checkout>> findCheckoutByEmailAndBookId(
            @RequestParam(name="bookId") Long bookId,
            @RequestParam(name = "userEmail") String userEmail
    ) {
        var checkout = checkoutService.findCheckoutByEmailAndBookId(userEmail, bookId);
        return new ResponseEntity<>(checkout, HttpStatus.OK);
    }

    @PostMapping("/checkout")
    public ResponseEntity<Checkout> addCheckout(@RequestBody Checkout checkout) {
        checkoutService.addCheckout(checkout);
        return new ResponseEntity<>(checkout, HttpStatus.OK);
    }

    @PutMapping("/checkout")
    public ResponseEntity<Checkout> updateCheckout(@RequestBody Checkout checkout) {
        var data = checkoutService.updateCheckout(checkout);
        if (data.isPresent()) {
            return new ResponseEntity<>(checkout, HttpStatus.OK);
        }
        else {
            return new ResponseEntity<>(checkout, HttpStatus.NOT_FOUND);
        }
    }

    @DeleteMapping("/Checkout/{checkoutId}")
    public ResponseEntity<Checkout> deleteCheckout(@PathVariable("checkoutId") Long checkoutId) {
        var checkout = checkoutService.deleteCheckoutById(checkoutId);
        return checkout.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
    }

}
