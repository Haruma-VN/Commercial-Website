package com.haruma.library.controller;

import com.haruma.library.entity.Checkout;
import com.haruma.library.service.CheckoutService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
@Tag(name="Checkout", description = "Checkout API")
public class CheckoutController {

    private final CheckoutService checkoutService;

    @Autowired
    public CheckoutController(CheckoutService checkoutService) {
        this.checkoutService = checkoutService;
    }

    @GetMapping("/checkout")
    @Operation(summary = "Get all checkout from database")
    public ResponseEntity<List<Checkout>> findAllCheckouts() {
        return new ResponseEntity<>(checkoutService.findAllCheckout(), HttpStatus.OK);
    }

    @GetMapping("/checkout/{checkoutId}")
    @Operation(summary = "Get a checkout from database by its id")
    public ResponseEntity<Checkout> findCheckoutById(@PathVariable(name="checkoutId") Long id) {
        var checkout = checkoutService.findCheckoutById(id);
        return checkout.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
    }

    @GetMapping("/checkout/search")
    @Operation(summary = "Search a checkout from database")
    public ResponseEntity<List<Checkout>> findCheckoutByEmailAndBookId(
            @RequestParam(name="bookId") Long bookId,
            @RequestParam(name = "userEmail") String userEmail
    ) {
        var checkout = checkoutService.findCheckoutByEmailAndBookId(userEmail, bookId);
        return new ResponseEntity<>(checkout, HttpStatus.OK);
    }

    @PostMapping("/checkout")
    @Operation(summary = "Add a checkout to database")
    public ResponseEntity<Checkout> addCheckout(@RequestBody Checkout checkout) {
        checkoutService.addCheckout(checkout);
        return new ResponseEntity<>(checkout, HttpStatus.OK);
    }

    @PutMapping("/checkout")
    @Operation(summary = "Update a checkout to database")
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
    @Operation(summary = "Delete a checkout from database")
    public ResponseEntity<Checkout> deleteCheckout(@PathVariable("checkoutId") Long checkoutId) {
        var checkout = checkoutService.deleteCheckoutById(checkoutId);
        return checkout.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
    }

}
