package com.haruma.library.repository;

import com.haruma.library.entity.Checkout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CheckoutRepository extends JpaRepository<Checkout, Long> {

    @Query(value="select * from checkout as c where c.email = :email and c.book_id = :bookId", nativeQuery = true)
    List<Checkout> findByUserEmailAndBookId(String email, Long bookId);

}
