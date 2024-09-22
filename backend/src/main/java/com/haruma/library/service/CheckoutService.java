package com.haruma.library.service;

import com.haruma.library.entity.Checkout;

import java.util.List;
import java.util.Optional;

public interface CheckoutService {
    List<Checkout> findAllCheckout();

    void addCheckout(Checkout checkout);

    Optional<Checkout> findCheckoutById(Long id);

    Optional<Checkout> updateCheckout(Checkout checkout);

    Optional<Checkout> deleteCheckoutById(Long id);

    List<Checkout> findCheckoutByEmailAndBookId(String email, Long bookId);
}
