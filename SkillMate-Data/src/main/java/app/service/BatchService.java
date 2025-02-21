package app.service;

import app.entity.Batch;
import app.entity.Student;
import app.exception.EntityNotFoundException;
import app.repository.BatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BatchService {

    @Autowired
    private BatchRepository batchRepository;

    // Get all batches
    public List<Batch> getAllBatches() {
        return batchRepository.findAll();
    }

    // Get batch by ID
    public Batch getBatchById(Long id) {
        Optional<Batch> batch = batchRepository.findById(id);
        if (batch.isPresent()) {
            return batch.get();
        } else {
            throw new EntityNotFoundException("Batch not found with id: " + id);
        }
    }

    // Get batch by Trainer ID
    public List<Batch> getBatchTrainerById(Long id) {
        List<Batch> batch = batchRepository.findByTrainerId(id);
        if (!batch.isEmpty()) {
            return batch;
        } else {
            throw new EntityNotFoundException("Batch not found with traier id: " + id);
        }
    }

    // Get batch by Trainer ID
    public List<Student> getStudentsByBatchId(Long batchId) {
        List<Student> students = batchRepository.findBatchStudentsByBatchId(batchId);
        if (!students.isEmpty()) {
            return students;
        } else {
            throw new EntityNotFoundException("Students not found with Batch id: " + batchId);
        }
    }

    // Create a new batch
    public Batch createBatch(Batch batch) {
        return batchRepository.save(batch);
    }

    // Update a batch
    public Batch updateBatch(Long id, Batch batchDetails) {
        Batch batch = getBatchById(id);

        batch.setCourse(batchDetails.getCourse());
        batch.setStudents(batchDetails.getStudents());

        return batchRepository.save(batch);
    }

    // Delete a batch
    public void deleteBatch(Long id) {
        Batch batch = getBatchById(id);
        batchRepository.delete(batch);
    }
}
