package app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import app.service.RatingReviewService;
import app.entity.RatingReviews;

@RestController
@RequestMapping("/admin/review")
public class AdminReviewController {

    @Autowired
    private RatingReviewService ratingReviewService;

    // POST /admin/review/create?reviewText=Great+trainer&trainerId=1&courseId=10
    @PostMapping("/create")
    public RatingReviews createAdminReview(
            @RequestParam String reviewText,
            @RequestParam(required = false) Long trainerId,
            @RequestParam(required = false) Long courseId,
            @RequestParam(required = false) Long studentId) {
        
        // If studentId is not provided, pass null to the service method
        return ratingReviewService.createAdminReview(reviewText, courseId, trainerId, studentId);
    }
}
