package com.haruma.library.repository;

import com.haruma.library.entity.Review;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query(value="select * from review as r where r.book_id = :bookId", nativeQuery = true)
    List<Review> findReviewByBookId(@Param("bookId") Long bookId);

}
