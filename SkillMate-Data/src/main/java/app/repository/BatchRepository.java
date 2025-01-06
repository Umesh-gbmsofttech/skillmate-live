package app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import app.entity.Batch;

public interface BatchRepository extends JpaRepository<Batch, Long> {
    List<Batch> findByTrainerId(Long trainerId);
    Page<Batch> findAll(Pageable pageable);  // Supports pagination
	List<Batch> findByStudentsId(Long studentId);
}
