package app.controller;

import app.entity.CourseRating;
import app.entity.TrainerRating;
import app.service.RatingReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/ratings-reviews")
public class RatingReviewController {

    @Autowired
    private RatingReviewService ratingReviewService;

    @PostMapping("/course")
    public ResponseEntity<CourseRating> rateToCourse(@RequestBody CourseRating ratingReview) {
        try {
            CourseRating savedRating = ratingReviewService.saveRatingReviewOfCourse(ratingReview);
            return new ResponseEntity<>(savedRating, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping("/trainer")
    public ResponseEntity<TrainerRating> rateToTrainer(@RequestBody TrainerRating ratingReview) {
        try {
            TrainerRating savedRating = ratingReviewService.saveRatingReviewOfTrainer(ratingReview);
            return new ResponseEntity<>(savedRating, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public ResponseEntity<List<Object>> getAllRatings() {
        try {
            List<Object> ratings = ratingReviewService.getAllRatings();
            if (ratings.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(ratings, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/course")
    public ResponseEntity<List<CourseRating>> getAllCourseRatings() {
        try {
            List<CourseRating> ratings = ratingReviewService.getAllCourseRatings();
            if (ratings.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(ratings, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/trainer")
    public ResponseEntity<List<TrainerRating>> getAllTrainerRatings() {
        try {
            List<TrainerRating> ratings = ratingReviewService.getAllTrainerRatings();
            if (ratings.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(ratings, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/courses/{id}")
    public ResponseEntity<CourseRating> getCourseRatingById(@PathVariable("id") Long id) {
        try {
            CourseRating rating = ratingReviewService.getCourseRatingById(id);
            if (rating != null) {
                return new ResponseEntity<>(rating, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<CourseRating>> getCourseRatingByCourseId(@PathVariable Long courseId) {
        try {
            List<CourseRating> rating = ratingReviewService.getCourseRatingByCourseId(courseId);
            if (rating != null && !rating.isEmpty()) {
                return new ResponseEntity<>(rating, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/trainers/{id}")
    public ResponseEntity<TrainerRating> getTrainerRatingById(@PathVariable("id") Long id) {
        try {
            TrainerRating rating = ratingReviewService.getTrainerRatingById(id);
            if (rating != null) {
                return new ResponseEntity<>(rating, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/trainer/{trainerId}")
    public ResponseEntity<List<TrainerRating>> getTrainerRatingByTrainerId(@PathVariable("trainerId") Long trainerId) {
        try {
            List<TrainerRating> rating = ratingReviewService.getTrainerRatingByTrainerId(trainerId);
            if (rating != null && !rating.isEmpty()) {
                return new ResponseEntity<>(rating, HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.NOT_FOUND);
            }
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/course/{id}")
    public ResponseEntity<HttpStatus> deleteCourseRating(@PathVariable("id") Long id) {
        try {
            ratingReviewService.deleteCourseRating(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping("/trainer/{id}")
    public ResponseEntity<HttpStatus> deleteTrainerRating(@PathVariable("id") Long id) {
        try {
            ratingReviewService.deleteTrainerRating(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
