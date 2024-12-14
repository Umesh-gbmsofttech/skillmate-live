package app.controller;

import app.entity.Batch;
import app.service.BatchService;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/batches")
public class BatchController {

    @Autowired
    private BatchService batchService;

    // Get All Batches
    @GetMapping("/fetch")
    public List<Batch> getAllBatches() {
        return batchService.getAllBatches();
    }

    // Get Batch by ID
    @GetMapping("/fetch/{id}")
    public ResponseEntity<Batch> getBatchById(@PathVariable("id") Long id) {
        return batchService.getBatchById(id);
    }

    // Create or Update Batch
    @PostMapping("/create")
    public ResponseEntity<Batch> createOrUpdateBatch(@Valid @RequestBody Batch batch) {
        Batch savedBatch = batchService.createOrUpdateBatch(batch);
        return ResponseEntity.status(201).body(savedBatch); // Return HTTP 201 (Created)
    }

    // Delete Batch by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteBatch(@PathVariable("id") Long id) {
        return batchService.deleteBatch(id);
    }

    // Get Batches by Trainer ID (Optional)
    @GetMapping("/trainer/{trainerId}")
    public List<Batch> getBatchesByTrainerId(@PathVariable("trainerId") Long trainerId) {
        return batchService.getBatchesByTrainerId(trainerId);
    }
}
