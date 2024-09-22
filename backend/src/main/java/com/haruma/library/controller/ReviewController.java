package com.haruma.library.controller;

import com.haruma.library.entity.Review;
import com.haruma.library.service.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1")
public class ReviewController {

    private final ReviewService reviewService;

    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping("/review")
    public ResponseEntity<List<Review>> findAllReview() {
        return new ResponseEntity<>(reviewService.findAllReview(), HttpStatus.OK);
    }

    @GetMapping("/review/{reviewId}")
    public ResponseEntity<Review> findReviewById(@PathVariable("reviewId") Long reviewId) {
        var review = reviewService.findReviewById(reviewId);
        return review.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
    }

    @GetMapping("/review/search/{reviewId}")
    public ResponseEntity<List<Review>> findReviewByBookId(@PathVariable("reviewId") Long reviewId) {
        var review = reviewService.findReviewByBookId(reviewId);
        return new ResponseEntity<>(review, HttpStatus.OK);
    }

    @PostMapping("/review")
    public ResponseEntity<Review> addReview(@RequestBody Review review) {
        reviewService.addReview(review);
        return new ResponseEntity<>(review, HttpStatus.OK);
    }

    @PutMapping("/review")
    public ResponseEntity<Review> updateReview(@RequestBody Review review) {
        var data = reviewService.updateReview(review);
        return data.map(value -> new ResponseEntity<>(review, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(null, HttpStatus.OK));
    }

    @DeleteMapping("/review/{reviewId}")
    public ResponseEntity<Review> deleteReviewById(@PathVariable("reviewId") Long reviewId) {
        var data = reviewService.deleteReviewById(reviewId);
        return data.map(value -> new ResponseEntity<>(data.get(), HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(null, HttpStatus.OK));

    }

}
