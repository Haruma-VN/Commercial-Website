package com.haruma.library.repository;

import com.haruma.library.entity.Cart;
import com.haruma.library.entity.CartItem;
import com.haruma.library.entity.CartItemKey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CartItemRepository extends JpaRepository<CartItem, CartItemKey> {
    List<CartItem> findByCart(Cart cart);
}