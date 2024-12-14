package app.service;

import app.entity.Batch;
import app.repository.BatchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BatchService {

    @Autowired
    private BatchRepository batchRepository;

    // Create or Update Batch
    public Batch createOrUpdateBatch(Batch batch) {
        try {
            return batchRepository.save(batch);
        } catch (Exception e) {
            throw new RuntimeException("Failed to save batch record: " + e.getMessage());
        }
    }

    // Get Batch by ID
    public ResponseEntity<Batch> getBatchById(Long id) {
        Optional<Batch> batch = batchRepository.findById(id);
        if (batch.isPresent()) {
            return ResponseEntity.ok(batch.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(null);
        }
    }

    // Get All Batches
    public List<Batch> getAllBatches() {
        return batchRepository.findAll();
    }

    // Delete Batch by ID
    public ResponseEntity<String> deleteBatch(Long id) {
        try {
            if (batchRepository.existsById(id)) {
                batchRepository.deleteById(id);
                return ResponseEntity.ok("Batch record deleted successfully.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Batch record not found.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to delete batch record: " + e.getMessage());
        }
    }

    // Get Batches by Trainer ID (Optional method based on requirements)
    public List<Batch> getBatchesByTrainerId(Long trainerId) {
        return batchRepository.findAll(); // Placeholder method
    }
}
