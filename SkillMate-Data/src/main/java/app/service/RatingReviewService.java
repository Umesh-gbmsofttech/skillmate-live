package app.service;

import app.entity.RatingReview;
import app.repository.RatingReviewsRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class RatingReviewService {

    @Autowired
    private RatingReviewsRepository ratingReviewRepository;

    public RatingReview saveRatingReview(RatingReview ratingReview) {
        return ratingReviewRepository.save(ratingReview);
    }

    public List<RatingReview> getAllRatingReviews() {
        return ratingReviewRepository.findAll();
    }

    public Optional<RatingReview> getRatingReviewById(Long id) {
        return ratingReviewRepository.findById(id);
    }

    public void deleteRatingReview(Long id) {
        ratingReviewRepository.deleteById(id);
    }
}
