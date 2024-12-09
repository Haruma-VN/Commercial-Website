package com.haruma.library.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.*;

import java.io.Serializable;

@Embeddable
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@EqualsAndHashCode
@Builder
public class CartItemKey implements Serializable {

    @Column(name = "cart_id")
    private Long cartId;

    @Column(name = "book_id")
    private Long bookId;

}

