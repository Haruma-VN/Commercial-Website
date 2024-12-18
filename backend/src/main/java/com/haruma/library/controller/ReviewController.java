package com.haruma.library.controller;

import com.haruma.library.entity.Review;
import com.haruma.library.service.BookService;
import com.haruma.library.service.ReviewService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/review")
@Tag(name="Review", description = "Review API")
public class ReviewController {

    private final ReviewService reviewService;

    private final BookService bookService;

    @Autowired
    public ReviewController(ReviewService reviewService, BookService bookService) {
        this.reviewService = reviewService;
        this.bookService = bookService;
    }

    @GetMapping
    @Operation(summary = "Get all reviews from database")
    public ResponseEntity<List<Review>> findAllReview() {
        return new ResponseEntity<>(reviewService.findAllReview(), HttpStatus.OK);
    }

    @GetMapping("/{reviewId}")
    @Operation(summary = "Get a review by its id from database")
    public ResponseEntity<Review> findReviewById(@PathVariable("reviewId") Long reviewId) {
        var review = reviewService.findReviewById(reviewId);
        return review.map(value -> new ResponseEntity<>(value, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
    }

    @GetMapping("/search/{reviewId}")
    @Operation(summary = "Get all review by its book id from database")
    public ResponseEntity<List<Review>> findReviewByBookId(@PathVariable("reviewId") Long reviewId) {
        var review = reviewService.findReviewByBookId(reviewId);
        return new ResponseEntity<>(review, HttpStatus.OK);
    }

    @PostMapping("/{bookId}")
    @Operation(summary = "Add a review to database")
    @PreAuthorize("hasRole('ROLE_USER') || hasRole('ROLE_ADMIN')")
    public ResponseEntity<Review> addReview(@RequestBody Review review, @PathVariable("bookId") Long bookId) {
        var book = bookService.findBookByBookId(bookId);
        return book.map(e -> {
            review.setBook(e);
            reviewService.addReview(review);
            return new ResponseEntity<>(review, HttpStatus.OK);
        }).orElseGet(() -> new ResponseEntity<>(null, HttpStatus.NOT_FOUND));
    }

    @PutMapping
    @Operation(summary = "Update a review to database")
    @PreAuthorize("hasRole('ROLE_USER') || hasRole('ROLE_ADMIN')")
    public ResponseEntity<Review> updateReview(@RequestBody Review review) {
        var data = reviewService.updateReview(review);
        return data.map(value -> new ResponseEntity<>(review, HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(null, HttpStatus.OK));
    }

    @DeleteMapping("/{reviewId}")
    @Operation(summary = "Delete a review from database")
    @PreAuthorize("hasRole('ROLE_USER') || hasRole('ROLE_ADMIN')")
    public ResponseEntity<Review> deleteReviewById(@PathVariable("reviewId") Long reviewId) {
        var data = reviewService.deleteReviewById(reviewId);
        return data.map(value -> new ResponseEntity<>(data.get(), HttpStatus.OK)).orElseGet(() -> new ResponseEntity<>(null, HttpStatus.OK));

    }

}
