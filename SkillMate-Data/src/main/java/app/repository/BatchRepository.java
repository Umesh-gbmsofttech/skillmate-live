package app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import app.entity.Batch;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface BatchRepository extends JpaRepository<Batch, Long> {
    List<Batch> findByTrainerId(Long trainerId);

    Page<Batch> findAll(Pageable pageable);

    List<Batch> findByStudentsId(Long studentId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM meeting_batches WHERE batch_id = :batchId", nativeQuery = true)
    void deleteMeetingBatchesByBatchId(Long batchId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM batch_trainers WHERE batch_id = :batchId", nativeQuery = true)
    void deleteBatchTrainersByBatchId(Long batchId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM batch_courses WHERE batch_id = :batchId", nativeQuery = true)
    void deleteBatchCoursesByBatchId(Long batchId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM batch_students WHERE batch_id = :batchId", nativeQuery = true)
    void deleteBatchStudentsByBatchId(Long batchId);
}



//delete a batch:
//DELETE FROM meeting_batches WHERE batch_id = 3;
//DELETE FROM batch_trainers WHERE batch_id = 3;
//DELETE FROM batch_courses WHERE batch_id = 3;
//DELETE FROM batch_students WHERE batch_id = 3;
//DELETE FROM batch WHERE id = 3;