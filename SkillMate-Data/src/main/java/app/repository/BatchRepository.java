package app.repository;

import app.entity.Batch;
import app.entity.Student;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface BatchRepository extends JpaRepository<Batch, Long> {

    // @Query("SELECT b FROM Batch b WHERE b.trainer.id = :trainerId")
    @Query("SELECT b FROM Batch b WHERE b.trainer_id = :trainerId")
    List<Batch> findByTrainerId(Long trainerId);

    @Query(value = "SELECT * FROM skillmate.batch_students WHERE batch_id = :batchId", nativeQuery = true)
    List<Student> findBatchStudentsByBatchId(@Param("batchId") Long batchId);
}
