package app.controller;

import app.entity.RatingReviews;
import app.exception.EntityNotFoundException;
import app.service.RatingReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.logging.Logger;

@RestController
@RequestMapping("/rating-reviews")
public class RatingReviewsController {

    private static final Logger logger = Logger.getLogger(RatingReviewsController.class.getName());

    @Autowired
    private RatingReviewService ratingReviewService;

    // Get reviews for a student
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<RatingReviews>> getReviewsForStudent(@PathVariable Long studentId) {
        try {
            List<RatingReviews> reviews = ratingReviewService.getReviewsForStudent(studentId);
            return ResponseEntity.ok(reviews);
        } catch (Exception e) {
            logger.severe("Error fetching reviews for student ID: " + studentId + " - " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Get reviews for a trainer
    @GetMapping("/trainer/{trainerId}")
    public ResponseEntity<List<RatingReviews>> getReviewsForTrainer(@PathVariable Long trainerId) {
        try {
            List<RatingReviews> reviews = ratingReviewService.getReviewsForTrainer(trainerId);
            return ResponseEntity.ok(reviews);
        } catch (Exception e) {
            logger.severe("Error fetching reviews for trainer ID: " + trainerId + " - " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Get reviews for a course
    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<RatingReviews>> getReviewsForCourse(@PathVariable Long courseId) {
        try {
            List<RatingReviews> reviews = ratingReviewService.getReviewsForCourse(courseId);
            return ResponseEntity.ok(reviews);
        } catch (Exception e) {
            logger.severe("Error fetching reviews for course ID: " + courseId + " - " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    // Create an admin review
    @PostMapping("/admin/create")
    public ResponseEntity<RatingReviews> createAdminReview(
            @RequestParam String reviewText,
            @RequestParam(required = false) Long courseId,
            @RequestParam(required = false) Long trainerId,
            @RequestParam(required = false) Long studentId) {
        try {
            RatingReviews createdReview = ratingReviewService.createAdminReview(reviewText, courseId, trainerId,
                    studentId);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdReview);
        } catch (EntityNotFoundException e) {
            logger.severe("Error creating admin review: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        } catch (Exception e) {
            logger.severe("Error creating admin review: " + e.getMessage());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }
}
