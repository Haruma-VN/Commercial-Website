package com.haruma.library.service.impl;

import com.haruma.library.entity.Checkout;
import com.haruma.library.repository.CheckoutRepository;
import com.haruma.library.service.CheckoutService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CheckoutServiceImplement implements CheckoutService {

    private final CheckoutRepository checkoutRepository;

    @Autowired
    public CheckoutServiceImplement(CheckoutRepository checkoutRepository) {
        this.checkoutRepository = checkoutRepository;
    }

    @Override
    public List<Checkout> findAllCheckout() {
        return checkoutRepository.findAll();
    }

    @Override
    public void addCheckout(Checkout checkout) {
        checkoutRepository.save(checkout);
    }

    @Override
    public Optional<Checkout> findCheckoutById(Long id) {
        return checkoutRepository.findById(id);
    }

    @Override
    public Optional<Checkout> updateCheckout(Checkout checkout) {
        var currentCheckout = checkoutRepository.findById(checkout.getId());
        if (currentCheckout.isPresent()) {
            checkoutRepository.save(checkout);
            return Optional.of(checkout);
        }
        return Optional.empty();
    }

    @Override
    public Optional<Checkout> deleteCheckoutById(Long id) {
        var data = checkoutRepository.findById(id);
        data.ifPresent(checkoutRepository::delete);
        return data;
    }

    @Override
    public List<Checkout> findCheckoutByEmailAndBookId(String email, Long bookId) {
        return checkoutRepository.findByUserEmailAndBookId(email, bookId);
    }
}
