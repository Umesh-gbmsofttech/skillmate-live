package app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import app.entity.TrainerRating;

public interface TrainerRatingRepository extends JpaRepository<TrainerRating, Long> {

    List<TrainerRating> findByTrainerId(Long trainerId);

    // @Query("SELECT tr FROM TrainerRating tr WHERE tr.trainer.id = :trainerId")
    // List<TrainerRating> getTrainerRatingsByTrainerId(@Param("trainerId") Long
    // trainerId);
}
