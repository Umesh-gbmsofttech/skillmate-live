package app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import app.entity.RatingReview;

public interface RatingReviewsRepository extends JpaRepository <RatingReview, Long> {
    
}
