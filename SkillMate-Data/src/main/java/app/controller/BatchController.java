package app.controller;

import app.entity.Batch;
import app.entity.JsonResoponse_View;
import app.entity.Trainer;
import app.repository.TrainerRepository;
import app.service.BatchService;
import jakarta.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.fasterxml.jackson.annotation.JsonView;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/batches")
public class BatchController {

    private static final Logger logger = LoggerFactory.getLogger(BatchController.class);
    @Autowired
    private BatchService batchService;

    @Autowired
    private TrainerRepository trainerRepository;

    // Get All Batches (Optional Pagination)
    @GetMapping("/fetch")
    @JsonView(JsonResoponse_View.DetailedView.class)
    public ResponseEntity<List<Batch>> getAllBatches(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        List<Batch> batches = batchService.getAllBatches(page, size);
        return ResponseEntity.ok(batches);
    }

    // Get Batch by ID
    // @GetMapping("/fetch/{id}")
    // public ResponseEntity<Batch> getBatchById(@PathVariable("id") Long id) {
    // return batchService.getBatchById(id)
    // .map(batch -> ResponseEntity.ok(batch))
    // .orElse(ResponseEntity.notFound().build());
    // }
    @GetMapping("/fetch/{id}")
    @JsonView(JsonResoponse_View.DetailedView.class)
    public ResponseEntity<Batch> getBatchById(@PathVariable("id") Long id) {
        return batchService.getBatchById(id); // Return the ResponseEntity<Batch> directly
    }

    // Create Batch
    @PostMapping("/create")
    @JsonView(JsonResoponse_View.DetailedView.class)
    public ResponseEntity<Batch> createBatch(@Valid @RequestBody Batch batch) {
        // Optional<Trainer> opTrainer=trainerRepository.findById(null)
        logger.info("Batch request received: {}", batch.getTrainer());
        System.out.println("---------" + batch.getStudents().size() + "---------");
        if (batch.getCourse() != null) {
            System.out.println("---------" + batch.getCourse().size() + "---------");
        } else {
            System.out.println("---------course is empty/null---------");
        }
        return batchService.saveBatch(batch); // Return the ResponseEntity<Batch> directly
    }

    // Update Batch by ID
    @PutMapping("/update/{id}")
    @JsonView(JsonResoponse_View.DetailedView.class)
    public ResponseEntity<Batch> updateBatch(@Valid @PathVariable Long id, @RequestBody Batch batch) {
        return batchService.updateBatch(id, batch);
    }

    // Delete Batch by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteBatch(@PathVariable("id") Long id) {
        return batchService.deleteBatch(id);
    }

    // Get Batches by Trainer ID
    @GetMapping("/by-trainer/{trainerId}")
    @JsonView(JsonResoponse_View.DetailedView.class)
    public ResponseEntity<List<Batch>> getBatchesByTrainerId(@PathVariable("trainerId") Long trainerId) {
        List<Batch> batches = batchService.getBatchesByTrainerId(trainerId);
        return ResponseEntity.ok(batches);
    }

    // Get Batches by Stuent ID
    @GetMapping("/by-student/{studentId}")
    @JsonView(JsonResoponse_View.DetailedView.class)
    public ResponseEntity<List<Batch>> getBatchesStudentId(@PathVariable("studentId") Long studentId) {
        List<Batch> batches = batchService.getBatchesStudentId(studentId);
        return ResponseEntity.ok(batches);
    }

}
