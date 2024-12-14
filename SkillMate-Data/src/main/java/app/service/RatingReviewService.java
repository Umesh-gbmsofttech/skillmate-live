package app.service;

import app.entity.*;
import app.exception.EntityNotFoundException;
import app.repository.RatingReviewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.sql.Date;
import java.util.List;
import java.util.Optional;
import java.util.logging.Logger;

@Service
public class RatingReviewService {

	private static final Logger logger = Logger.getLogger(RatingReviewService.class.getName());

	@Autowired
	private RatingReviewsRepository ratingReviewsRepository;

	@Autowired
	private TrainerService trainerService;

	@Autowired
	private CourseService courseService;

	@Autowired
	private StudentService studentService;

	// Get reviews for a student
	public List<RatingReviews> getReviewsForStudent(Long studentId) {
		return ratingReviewsRepository.findByStudentId(studentId);
	}

	// Get reviews for a trainer
	public List<RatingReviews> getReviewsForTrainer(Long trainerId) {
		return ratingReviewsRepository.findByTrainerId(trainerId);
	}

	// Get reviews for a course
	public List<RatingReviews> getReviewsForCourse(Long courseId) {
		return ratingReviewsRepository.findByCourseId(courseId);
	}

	// Create an admin review for a trainer or course
	@Transactional
	public RatingReviews createAdminReview(String reviewText, Long courseId, Long trainerId, Long studentId) {
		RatingReviews review = new RatingReviews();

		review.setReview(reviewText); // Set the review text
		review.setReviewDate(new Date(System.currentTimeMillis())); // Set current date
		review.setGivenByAdmin(true); // Set the "isGivenByAdmin" flag to true

		if (studentId != null) {
			Optional<Student> existingStudent = studentService.getStudentById(studentId);
			if (existingStudent.isPresent()) {
				review.setStudent(existingStudent.get());
			} else {
				throw new EntityNotFoundException("Student not found with ID: " + studentId);
			}
		}

		if (trainerId != null) {
			Optional<Trainer> existingTrainer = trainerService.getTrainerById(trainerId);
			if (existingTrainer.isPresent()) {
				review.setTrainer(existingTrainer.get());
			} else {
				throw new EntityNotFoundException("Trainer not found with ID: " + trainerId);
			}
		}

		if (courseId != null) {
			Optional<Course> existingCourse = courseService.getCourseById(courseId);
			if (existingCourse.isPresent()) {
				review.setCourse(existingCourse.get());
			} else {
				throw new EntityNotFoundException("Course not found with ID: " + courseId);
			}
		}

		// Log the creation of a review
		logger.info("Creating new admin review for Course ID: " + courseId + ", Trainer ID: " + trainerId
				+ ", Student ID: " + studentId);

		return ratingReviewsRepository.save(review);
	}
}
