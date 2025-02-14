package app.controller;

import app.entity.RatingReview;
import app.service.RatingReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/ratings-reviews")
public class RatingReviewController {

    @Autowired
    private RatingReviewService ratingReviewService;

    @PostMapping
    public RatingReview addRatingReview(@RequestBody RatingReview ratingReview) {
        return ratingReviewService.saveRatingReview(ratingReview);
    }

    @GetMapping
    public List<RatingReview> getAllRatingReviews() {
        return ratingReviewService.getAllRatingReviews();
    }

    @GetMapping("/{id}")
    public Optional<RatingReview> getRatingReviewById(@PathVariable Long id) {
        return ratingReviewService.getRatingReviewById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteRatingReview(@PathVariable Long id) {
        ratingReviewService.deleteRatingReview(id);
    }
}
