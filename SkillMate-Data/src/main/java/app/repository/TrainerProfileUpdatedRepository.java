package app.repository;


import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import app.entity.TrainerProfileUpdated;

@Repository
public interface TrainerProfileUpdatedRepository extends JpaRepository<TrainerProfileUpdated, Long>{

	Optional<TrainerProfileUpdated> findByTrainerId(Long trainerId);
}
