package com.haruma.library.service;

import com.haruma.library.entity.Review;

import java.util.List;
import java.util.Optional;

public interface ReviewService {

    List<Review> findAllReview();

    void addReview(Review review);

    Optional<Review> findReviewById(Long id);

    Optional<Review> updateReview(Review review);

    Optional<Review> deleteReviewById(Long id);

    List<Review> findReviewByBookId(Long id);
}
