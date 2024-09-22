package com.haruma.library.service;

import com.haruma.library.entity.Review;
import com.haruma.library.repository.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReviewServiceImplement implements ReviewService {

    private final ReviewRepository reviewRepository;

    @Autowired
    public ReviewServiceImplement(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    @Override
    public List<Review> findAllReview() {
        return reviewRepository.findAll();
    }

    @Override
    public void addReview(Review review) {
        reviewRepository.save(review);
    }

    @Override
    public Optional<Review> findReviewById(Long id) {
        return reviewRepository.findById(id);
    }

    @Override
    public Optional<Review> updateReview(Review review) {
        var currentReview = reviewRepository.findById(review.getId());
        if (currentReview.isPresent()) {
            reviewRepository.save(review);
            return Optional.of(review);
        }
        return Optional.empty();
    }

    @Override
    public Optional<Review> deleteReviewById(Long id) {
        var data = reviewRepository.findById(id);
        data.ifPresent(reviewRepository::delete);
        return data;
    }

    @Override
    public List<Review> findReviewByBookId(Long id) {
        return reviewRepository.findReviewByBookId(id);
    }
}
