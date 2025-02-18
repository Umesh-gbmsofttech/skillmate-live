package app.controller;

import app.entity.Batch;
import app.service.BatchService;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/batches")
public class BatchController {

    @Autowired
    private BatchService batchService;

    // Get all batches
    @GetMapping
    public ResponseEntity<List<Batch>> getAllBatches() {
        List<Batch> batches = batchService.getAllBatches();
        return new ResponseEntity<>(batches, HttpStatus.OK);
    }

    // Get batch by ID
    @GetMapping("/{id}")
    public ResponseEntity<Batch> getBatchById(@PathVariable("id") Long id) {
        try {
            Batch batch = batchService.getBatchById(id);
            return new ResponseEntity<>(batch, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    // Create a new batch
    @PostMapping
    public ResponseEntity<Batch> createBatch(@Valid @RequestBody Batch batch) {
        try {
            Batch newBatch = batchService.createBatch(batch);
            return new ResponseEntity<>(newBatch, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    // Update an existing batch
    @PutMapping("/{id}")
    public ResponseEntity<Batch> updateBatch(@PathVariable("id") Long id, @Valid @RequestBody Batch batchDetails) {
        try {
            Batch updatedBatch = batchService.updateBatch(id, batchDetails);
            return new ResponseEntity<>(updatedBatch, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    // Delete a batch
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteBatch(@PathVariable("id") Long id) {
        try {
            batchService.deleteBatch(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
