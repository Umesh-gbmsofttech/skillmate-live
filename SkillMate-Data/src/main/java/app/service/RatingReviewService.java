package app.service;

import app.entity.CourseRating;
import app.entity.TrainerRating;
import app.repository.CourseRatingRepository;
import app.repository.TrainerRatingRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class RatingReviewService {

    @Autowired
    private CourseRatingRepository courseRatingRepository;
    @Autowired
    private TrainerRatingRepository trainerRatingRepository;

    public CourseRating saveRatingReviewOfCourse(CourseRating ratingReview) {
        return courseRatingRepository.save(ratingReview);
    }

    public TrainerRating saveRatingReviewOfTrainer(TrainerRating ratingReview) {
        return trainerRatingRepository.save(ratingReview);
    }

    public List<Object> getAllRatings() {
        List<TrainerRating> tRating = trainerRatingRepository.findAll();
        List<CourseRating> cRating = courseRatingRepository.findAll();
        List<Object> ratings = List.of(tRating, cRating);
        return ratings;
    }

    public List<CourseRating> getAllCourseRatings() {
        return courseRatingRepository.findAll();
    }

    public List<TrainerRating> getAllTrainerRatings() {
        return trainerRatingRepository.findAll();
    }

    public CourseRating getCourseRatingById(Long id) {
        Optional<CourseRating> rating = courseRatingRepository.findById(id);
        return rating.orElse(null);
    }

    public List<CourseRating> getCourseRatingByCourseId(Long courseId) {
        return courseRatingRepository.findByCourseId(courseId);
    }

    public TrainerRating getTrainerRatingById(Long id) {
        Optional<TrainerRating> rating = trainerRatingRepository.findById(id);
        return rating.orElse(null);
    }

    public List<TrainerRating> getTrainerRatingByTrainerId(Long trainerId) {
        return trainerRatingRepository.findByTrainerId(trainerId);
    }

    public void deleteCourseRating(Long id) {
        courseRatingRepository.deleteById(id);
    }

    public void deleteTrainerRating(Long id) {
        trainerRatingRepository.deleteById(id);
    }

}
