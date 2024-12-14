package app.repository;

import app.entity.RatingReviews;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RatingReviewsRepository extends JpaRepository<RatingReviews, Long> {
    List<RatingReviews> findByStudentId(Long studentId);
    List<RatingReviews> findByTrainerId(Long trainerId);
    List<RatingReviews> findByCourseId(Long courseId);
}
