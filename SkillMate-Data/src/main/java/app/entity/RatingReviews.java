package app.entity;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class RatingReviews {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String ratingReviewsTo;
    private String whichUserIsGiveThisRating;
    // private Trainer trainer;
    // private Student student;
    // private Course course;

    private Date reviewDate;
    private String review;
}
