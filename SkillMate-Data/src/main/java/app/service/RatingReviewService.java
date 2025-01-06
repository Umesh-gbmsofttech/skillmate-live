package app.service;

import app.entity.*;
import app.exception.EntityNotFoundException;
import app.repository.RatingReviewsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.sql.Date;
import java.time.LocalDate;
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

	// Get reviews for a Course
	public List<RatingReviews> getReviewsForCourse(Long courseId) {
		return ratingReviewsRepository.findByCourseId(courseId);
	}

	// Get reviews for a Trainer
	public List<RatingReviews> getReviewsForTrainer(Long trainerId) {
		return ratingReviewsRepository.findByTrainerId(trainerId);
	}

	// Get reviews for a Student
	public List<RatingReviews> getReviewsForStudent(Long studentId) {
		return ratingReviewsRepository.findByStudentId(studentId);
	}

	// Create a Rating for a Course
	public RatingReviews createCourseRating(Long courseId, RatingReviews ratingReview) {
		Course course = courseService.getCourseById(courseId).get();
		logger.info("course found is: " + course);
		ratingReview.setCourse(course);
		return ratingReviewsRepository.save(ratingReview);
	}

	// Create a Rating for a Trainer
	public RatingReviews createTrainerRating(Long trainerId, RatingReviews ratingReview) {
		Trainer trainer = trainerService.getTrainerById(trainerId).get();
		logger.info("trainer found is: " + trainer);
		ratingReview.setTrainer(trainer);
		return ratingReviewsRepository.save(ratingReview);
	}

	// Create a Rating for a Student
	public RatingReviews createStudentRating(Long studentId, RatingReviews ratingReview) {
		Student student = studentService.getStudentById(studentId).get();
		logger.info("student found is: " + student);
		ratingReview.setStudent(student);
		return ratingReviewsRepository.save(ratingReview);
	}

	// Create an admin review for a trainer or course
	@Transactional
	public RatingReviews createAdminReview(String reviewText, Long courseId, Long trainerId, Long studentId) {
		RatingReviews review = new RatingReviews();

		review.setReview(reviewText); // Set the review text
//		review.setReviewDate(new LocalDate(System.currentTimeMillis())); // Set current date
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

	public RatingReviews createRating(RatingReviews ratinReview) {
		return ratingReviewsRepository.save(ratinReview);
	}

	public List<RatingReviews> fetchAllRatingReviews() {
		return ratingReviewsRepository.findAll();
	}

	public List<RatingReviews> getReviewsWithStudent() {
		return ratingReviewsRepository.findByStudentIsNotNull();
	}

	public List<RatingReviews> getReviewsWithTrainer() {
		return ratingReviewsRepository.findByTrainerIsNotNull();
	}

	public List<RatingReviews> getReviewsWithCourse() {
		return ratingReviewsRepository.findByCourseIsNotNull();
	}
	
	// Get all RatingReviews where 'isGivenToTrainer' is true
    public List<RatingReviews> getReviewsByTrainer(boolean isGivenToTrainer) {
        return ratingReviewsRepository.findByIsGivenToTrainer(isGivenToTrainer);
    }

    // Get all RatingReviews where 'isGivenToStudent' is true
    public List<RatingReviews> getReviewsByStudent(boolean isGivenToStudent) {
        return ratingReviewsRepository.findByIsGivenToStudent(isGivenToStudent);
    }

    // Get all RatingReviews where 'isGivenToCourse' is true
    public List<RatingReviews> getReviewsByCourse(boolean isGivenToCourse) {
        return ratingReviewsRepository.findByIsGivenToCourse(isGivenToCourse);
    }

    // Get all RatingReviews where 'isGivenByAdmin' is true
    public List<RatingReviews> getReviewsByAdmin(boolean isGivenByAdmin) {
        return ratingReviewsRepository.findByIsGivenByAdmin(isGivenByAdmin);
    }

    // Get all RatingReviews where 'isGivenToTrainer' is true and filter by trainerId
    public List<RatingReviews> getReviewsByTrainerAndId(boolean isGivenToTrainer, Long trainerId) {
        return ratingReviewsRepository.findByIsGivenToTrainerAndTrainerId(isGivenToTrainer, trainerId);
    }

    // Get all RatingReviews where 'isGivenToStudent' is true and filter by studentId
    public List<RatingReviews> getReviewsByStudentAndId(boolean isGivenToStudent, Long studentId) {
        return ratingReviewsRepository.findByIsGivenToStudentAndStudentId(isGivenToStudent, studentId);
    }

    // Get all RatingReviews where 'isGivenToCourse' is true and filter by courseId
    public List<RatingReviews> getReviewsByCourseAndId(boolean isGivenToCourse, Long courseId) {
        return ratingReviewsRepository.findByIsGivenToCourseAndCourseId(isGivenToCourse, courseId);
    }
}
