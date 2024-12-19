package app.repository;

import app.entity.Trainer;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrainerRepository extends JpaRepository<Trainer, Long> {
	 Optional<Trainer> findByFullName(String fullName);
	 Optional<Trainer> findByMobileNumber(String fullName);
}
