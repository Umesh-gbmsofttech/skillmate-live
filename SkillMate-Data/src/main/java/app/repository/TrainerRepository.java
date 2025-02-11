package app.repository;

import app.entity.Trainer;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Repository
public interface TrainerRepository extends JpaRepository<Trainer, Long> {

    Optional<Trainer> findByFullName(String fullName);

    Optional<Trainer> findByMobileNumber(String fullName);

    Optional<Trainer> findByEmail(String email);

    boolean existsByMobileNumber(String mobileNumber);

    boolean existsByEmail(String email);

    Optional<Trainer> findById(Long id);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM batch_trainers WHERE trainer_id = :trainerId", nativeQuery = true)
    void deleteBatchTrainersByTrainerId(Long trainerId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM course_trainers WHERE trainer_id = :trainerId", nativeQuery = true)
    void deleteCourseTrainersByTrainerId(Long trainerId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM student_trainers WHERE trainer_id = :trainerId", nativeQuery = true)
    void deleteStudentTrainersByTrainerId(Long trainerId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM trainer_technologies WHERE trainer_id = :trainerId", nativeQuery = true)
    void deleteTrainerTechnologiesByTrainerId(Long trainerId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM rating_reviews WHERE to_trainer_id = :trainerId", nativeQuery = true)
    void deleteRatingReviewsForTrainer(Long trainerId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM rating_reviews WHERE rating_giver_trainer_id = :trainerId", nativeQuery = true)
    void deleteRatingReviewsByTrainer(Long trainerId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM meeting_students WHERE meeting_id IN (SELECT id FROM meeting WHERE trainer_id = :trainerId)", nativeQuery = true)
    void deleteMeetingStudentsByTrainerId(Long trainerId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM meeting_batches WHERE meeting_id IN (SELECT id FROM meeting WHERE trainer_id = :trainerId)", nativeQuery = true)
    void deleteMeetingBatchesByTrainerId(Long trainerId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM meeting WHERE trainer_id = :trainerId", nativeQuery = true)
    void deleteMeetingsByTrainerId(Long trainerId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM trainer_roles WHERE trainer_id = :trainerId", nativeQuery = true)
    void deleteTrainerRolesByTrainerId(Long trainerId);
}



//delete a trainer:
//DELETE FROM batch_trainers WHERE trainer_id = 1;
//DELETE FROM course_trainers WHERE trainer_id = 1;
//DELETE FROM student_trainers WHERE trainer_id = 1;
//DELETE FROM trainer_technologies WHERE trainer_id = 1;
//DELETE FROM rating_reviews WHERE to_trainer_id = 1;
//DELETE FROM rating_reviews WHERE rating_giver_trainer_id = 1;
//DELETE FROM meeting_students WHERE meeting_id IN (SELECT id FROM meeting WHERE trainer_id = 1);
//DELETE FROM meeting_batches WHERE meeting_id IN (SELECT id FROM meeting WHERE trainer_id = 1);
//DELETE FROM meeting WHERE trainer_id = 1;
//DELETE FROM trainer_roles WHERE trainer_id = 1;
//DELETE FROM trainer WHERE id = 1;