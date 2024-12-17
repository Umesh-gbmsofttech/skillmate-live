package app.otpwithemail;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmailRepository extends JpaRepository<EmailOtp, Long>{

	Optional<EmailOtp> findByEmail(String email);
}
