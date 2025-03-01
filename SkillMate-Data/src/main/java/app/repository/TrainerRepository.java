package app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import app.entity.Trainer;
import jakarta.transaction.Transactional;

public interface TrainerRepository extends JpaRepository<Trainer, Long> {
	Optional<Trainer> findByName(String name);

	Optional<Trainer> findByMobileNumber(String mobileNumber);

	Optional<Trainer> findByEmail(String email);

	boolean existsByMobileNumber(String mobileNumber);

	boolean existsByEmail(String email);

	// @Modifying
	// @Transactional
	// @Query(value = """
	// DELETE FROM trainer_rating WHERE trainer_id = :trainerId;
	// DELETE FROM trainer_course WHERE trainer_id = :trainerId;
	// DELETE FROM trainer_technologies WHERE trainer_id = :trainerId;
	// DELETE FROM attendance WHERE meeting_id IN (SELECT id FROM meeting WHERE
	// trainer_id = :trainerId);
	// DELETE FROM meeting WHERE trainer_id = :trainerId;
	// DELETE FROM trainer_roles WHERE trainer_id = :trainerId;
	// DELETE FROM trainer WHERE id = :trainerId;
	// """, nativeQuery = true)
	// void deleteByTrainerId(@Param("trainerId") Long trainerId);

	@Modifying
	@Transactional
	@Query(value = "DELETE FROM trainer_rating WHERE trainer_id = :trainerId", nativeQuery = true)
	void deleteTrainerRatings(@Param("trainerId") Long trainerId);

	@Modifying
	@Transactional
	@Query(value = "DELETE FROM trainer_course WHERE trainer_id = :trainerId", nativeQuery = true)
	void deleteTrainerCourses(@Param("trainerId") Long trainerId);

	@Modifying
	@Transactional
	@Query(value = "DELETE FROM trainer_technologies WHERE trainer_id = :trainerId", nativeQuery = true)
	void deleteTrainerTechnologies(@Param("trainerId") Long trainerId);

	@Modifying
	@Transactional
	@Query(value = "DELETE FROM attendance WHERE meeting_id IN (SELECT id FROM meeting WHERE trainer_id = :trainerId)", nativeQuery = true)
	void deleteTrainerAttendance(@Param("trainerId") Long trainerId);

	@Modifying
	@Transactional
	@Query(value = "DELETE FROM meeting WHERE trainer_id = :trainerId", nativeQuery = true)
	void deleteTrainerMeetings(@Param("trainerId") Long trainerId);

	@Modifying
	@Transactional
	@Query(value = "DELETE FROM trainer_roles WHERE trainer_id = :trainerId", nativeQuery = true)
	void deleteTrainerRoles(@Param("trainerId") Long trainerId);

	@Modifying
	@Transactional
	@Query(value = "DELETE FROM trainer WHERE id = :trainerId", nativeQuery = true)
	void deleteTrainerById(@Param("trainerId") Long trainerId);

}
