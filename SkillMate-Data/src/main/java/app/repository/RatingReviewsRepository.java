package app.repository;

import app.entity.RatingReviews;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RatingReviewsRepository extends JpaRepository<RatingReviews, Long> {

    // Find all reviews for a specific course
    List<RatingReviews> findByToCourseId(Long courseId);

    // Find all reviews for a specific trainer
    List<RatingReviews> findByToTrainerId(Long trainerId);

    // Find all reviews for a specific student
    List<RatingReviews> findByToStudentId(Long studentId);

    // Find reviews for a specific student (given by the student)
    List<RatingReviews> findByRatingGiverStudentId(Long studentId);

    // Find reviews for a specific trainer (given by the trainer)
    List<RatingReviews> findByRatingGiverTrainerId(Long trainerId);


	
	
	
	
//    List<RatingReviews> findByStudentId(Long studentId);
//    List<RatingReviews> findByTrainerId(Long trainerId);
//    List<RatingReviews> findByCourseId(Long courseId);
//    
//    
//    // Find all RatingReviews where student_id is not NULL
//    List<RatingReviews> findByStudentIsNotNull();
////    @Query("SELECT r FROM RatingReviews r WHERE r.student IS NOT NULL")
////    List<RatingReviews> findReviewsWithStudentNotNull();
//	List<RatingReviews> findByTrainerIsNotNull();
//	List<RatingReviews> findByCourseIsNotNull();
//	
//	
//	// Find all RatingReviews where 'isGivenToTrainer' is true
//    List<RatingReviews> findByIsGivenToTrainer(boolean isGivenToTrainer);
//
//    // Find all RatingReviews where 'isGivenToStudent' is true
//    List<RatingReviews> findByIsGivenToStudent(boolean isGivenToStudent);
//
//    // Find all RatingReviews where 'isGivenToCourse' is true
//    List<RatingReviews> findByIsGivenToCourse(boolean isGivenToCourse);
//
//    // Find all RatingReviews where 'isGivenByAdmin' is true
//    List<RatingReviews> findByIsGivenByAdmin(boolean isGivenByAdmin);
//    
//    // Find all RatingReviews where 'isGivenToTrainer' is true and 'trainer_id' matches
//    List<RatingReviews> findByIsGivenToTrainerAndTrainerId(boolean isGivenToTrainer, Long trainerId);
//    
//    // Find all RatingReviews where 'isGivenToStudent' is true and 'student_id' matches
//    List<RatingReviews> findByIsGivenToStudentAndStudentId(boolean isGivenToStudent, Long studentId);
//
//    // Find all RatingReviews where 'isGivenToCourse' is true and 'course_id' matches
//    List<RatingReviews> findByIsGivenToCourseAndCourseId(boolean isGivenToCourse, Long courseId);
}
