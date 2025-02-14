package app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import app.entity.Trainer;

public interface TrainerRepository extends JpaRepository<Trainer, Long> {
      Optional<Trainer> findByName(String name);
	 Optional<Trainer>findByMobileNumber(String mobileNumber);
	 Optional<Trainer> findByEmail(String email);
	 boolean existsByMobileNumber(String mobileNumber);
	 boolean existsByEmail(String email);
}
