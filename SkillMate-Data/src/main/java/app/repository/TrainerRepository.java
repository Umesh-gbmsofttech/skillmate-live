package app.repository;

import app.entity.Trainer;
import app.otplogin.EmailOtp;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrainerRepository extends JpaRepository<Trainer, Long> {
	 Optional<Trainer> findByFullName(String fullName);
	 Optional<Trainer> findByMobileNumber(String fullName);
	 Optional<Trainer> findByEmail(String email);
	 boolean existsByMobileNumber(String mobileNumber);
	 
	 boolean existsByEmail(String email);
	 Optional<Trainer> findById(Long id);
	    
}
