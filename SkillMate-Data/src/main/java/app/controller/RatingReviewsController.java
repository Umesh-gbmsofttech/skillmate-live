package app.controller;

import app.entity.JsonResoponse_View;
import app.entity.RatingReviews;
import app.exception.EntityNotFoundException;
import app.service.RatingReviewService;

import org.hibernate.annotations.Fetch;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.fasterxml.jackson.annotation.JsonView;

import java.util.List;
import java.util.logging.Logger;

@RestController
@RequestMapping("/rating-reviews")
public class RatingReviewsController {

    private static final Logger logger = Logger.getLogger(RatingReviewsController.class.getName());

    @Autowired
    private RatingReviewService ratingReviewService;

    // Get ratings for a Course
    @GetMapping("/course/{courseId}")
    @JsonView(JsonResoponse_View.BasicView.class)
    public ResponseEntity<List<RatingReviews>> getCourseRatings(@PathVariable Long courseId) {
        try {
            List<RatingReviews> reviews = ratingReviewService.getReviewsForCourse(courseId);
            return ResponseEntity.ok(reviews);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null); // Handle errors
        }
    }

    // Get ratings for a Trainer
    @GetMapping("/trainer/{trainerId}")
    @JsonView(JsonResoponse_View.BasicView.class)
    public ResponseEntity<List<RatingReviews>> getTrainerRatings(@PathVariable Long trainerId) {
        try {
            List<RatingReviews> reviews = ratingReviewService.getReviewsForTrainer(trainerId);
            return ResponseEntity.ok(reviews);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null); // Handle errors
        }
    }

    // Get ratings for a Student
    @GetMapping("/student/{studentId}")
    @JsonView(JsonResoponse_View.BasicView.class)
    public ResponseEntity<List<RatingReviews>> getStudentRatings(@PathVariable Long studentId) {
        try {
            List<RatingReviews> reviews = ratingReviewService.getReviewsForStudent(studentId);
            return ResponseEntity.ok(reviews);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null); // Handle errors
        }
    }

    // Create a Rating for a Course
    @PostMapping("/course/{courseId}/create")
    public ResponseEntity<RatingReviews> createCourseRating(@PathVariable Long courseId, @RequestBody RatingReviews ratingReview) {
        try {
            RatingReviews createdReview = ratingReviewService.createCourseRating(courseId, ratingReview);
            return ResponseEntity.status(201).body(createdReview);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null); // Handle errors
        }
    }

    // Create a Rating for a Trainer
    @PostMapping("/trainer/{trainerId}/create")
    public ResponseEntity<RatingReviews> createTrainerRating(@PathVariable Long trainerId, @RequestBody RatingReviews ratingReview) {
        try {
            RatingReviews createdReview = ratingReviewService.createTrainerRating(trainerId, ratingReview);
            return ResponseEntity.status(201).body(createdReview);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null); // Handle errors
        }
    }

    // Create a Rating for a Student
    @PostMapping("/student/{studentId}/create")
    public ResponseEntity<RatingReviews> createStudentRating(@PathVariable Long studentId, @RequestBody RatingReviews ratingReview) {
        try {
            RatingReviews createdReview = ratingReviewService.createStudentRating(studentId, ratingReview);
            return ResponseEntity.status(201).body(createdReview);
        } catch (Exception e) {
            return ResponseEntity.status(500).body(null); // Handle errors
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
    
    @PostMapping("/create")
    @JsonView(JsonResoponse_View.DetailedView.class)
    public RatingReviews create(@RequestBody RatingReviews ratinReview) {
    	return ratingReviewService.createRating(ratinReview);
    }
    @GetMapping("/fetch")
    @JsonView(JsonResoponse_View.DetailedView.class)
    public List<RatingReviews> fetchAll() {
    	return ratingReviewService.fetchAllRatingReviews();
    }
    
    //to get all rating and reviews by students
    @GetMapping("/student-reviews")
    @JsonView(JsonResoponse_View.DetailedView.class)
    public ResponseEntity<List<RatingReviews>> getReviewsForStudents() {
        List<RatingReviews> reviews = ratingReviewService.getReviewsWithStudent();
        return ResponseEntity.ok(reviews);
    }
    //to get all rating and reviews by Trainers
    @GetMapping("/trainer-reviews")
    @JsonView(JsonResoponse_View.DetailedView.class)
    public ResponseEntity<List<RatingReviews>> getReviewsForTrainers() {
    	List<RatingReviews> reviews = ratingReviewService.getReviewsWithTrainer();
    	return ResponseEntity.ok(reviews);
    }
    //to get all rating and reviews by courses
    @GetMapping("/course-reviews")
    @JsonView(JsonResoponse_View.DetailedView.class)
    public ResponseEntity<List<RatingReviews>> getReviewsForCourses() {
    	List<RatingReviews> reviews = ratingReviewService.getReviewsWithCourse();
    	return ResponseEntity.ok(reviews);
    }
    
 // Endpoint to get reviews where 'isGivenToTrainer' is true
    @GetMapping("/given-to/trainer")
    public List<RatingReviews> getReviewsByTrainer(@RequestParam boolean isGivenToTrainer) {
        return ratingReviewService.getReviewsByTrainer(isGivenToTrainer);
    }

    // Endpoint to get reviews where 'isGivenToStudent' is true
    @GetMapping("/given-to/student")
    public List<RatingReviews> getReviewsByStudent(@RequestParam boolean isGivenToStudent) {
        return ratingReviewService.getReviewsByStudent(isGivenToStudent);
    }

    // Endpoint to get reviews where 'isGivenToCourse' is true
    @GetMapping("/given-to/course")
    public List<RatingReviews> getReviewsByCourse(@RequestParam boolean isGivenToCourse) {
        return ratingReviewService.getReviewsByCourse(isGivenToCourse);
    }

    // Endpoint to get reviews where 'isGivenByAdmin' is true
//    @GetMapping("/admin")
//    public List<RatingReviews> getReviewsByAdmin(@RequestParam boolean isGivenByAdmin) {
//        return ratingReviewService.getReviewsByAdmin(isGivenByAdmin);
//    }

    // Endpoint to get reviews where 'isGivenToTrainer' is true and filter by trainerId
    @GetMapping("/given-to/trainer/{trainerId}")
    public List<RatingReviews> getReviewsByTrainerAndId(@RequestParam boolean isGivenToTrainer, @PathVariable Long trainerId) {
        return ratingReviewService.getReviewsByTrainerAndId(isGivenToTrainer, trainerId);
    }

    // Endpoint to get reviews where 'isGivenToStudent' is true and filter by studentId
    @GetMapping("/given-to/student/{studentId}")
    public List<RatingReviews> getReviewsByStudentAndId(@RequestParam boolean isGivenToStudent, @PathVariable Long studentId) {
        return ratingReviewService.getReviewsByStudentAndId(isGivenToStudent, studentId);
    }

    // Endpoint to get reviews where 'isGivenToCourse' is true and filter by courseId
    @GetMapping("/given-to/course/{courseId}")
    public List<RatingReviews> getReviewsByCourseAndId(@RequestParam boolean isGivenToCourse, @PathVariable Long courseId) {
        return ratingReviewService.getReviewsByCourseAndId(isGivenToCourse, courseId);
    }
}
