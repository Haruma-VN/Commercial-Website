package com.haruma.library.repository;

import com.haruma.library.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    @Query(value = "select * from book as b where b.title like :title", nativeQuery = true)
    List<Book> findByTitle(@Param("title") String title);

    @Query(value = "select b.* from book as b " +
            "inner join cart_items as ci on ci.book_id = b.id " +
            "inner join cart as c on c.id = ci.cart_id " +
            "where c.user_id = :userId", nativeQuery = true)
    List<Book> findByUserId(@Param("userId") Long userId);

}
