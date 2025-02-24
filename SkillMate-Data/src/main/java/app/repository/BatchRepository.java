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

    // @Query(value = "SELECT s.* FROM student s " +
    // "JOIN batch_students bs ON s.id = bs.student_id " +
    // "WHERE bs.batch_id = :batchId", nativeQuery = true)
    // List<Object[]> findStudentsByBatchIdRaw(@Param("batchId") Long batchId);

    // Use the named native query from the Student entity
    @Query(name = "BatchRepository.findStudentsByBatchId", nativeQuery = true)
    List<Student> findStudentsByBatchId(@Param("batchId") Long batchId);

    // fetch the batches for student id
    @Query(value = "SELECT b.* FROM batch b " +
            "JOIN batch_students bs ON b.id = bs.batch_id " +
            "WHERE bs.student_id = :studentId", nativeQuery = true)
    List<Batch> findBatchesByStudentId(@Param("studentId") Long studentId);

}
