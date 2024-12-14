package app.controller;

import app.entity.Trainer;
import app.service.TrainerService;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/trainers")
public class TrainerController {

    @Autowired
    private TrainerService trainerService;

    // Create a new Trainer
    @PostMapping("/create")
    public ResponseEntity<Trainer> createTrainer(@Valid @RequestBody Trainer trainer) {
        try {
            Trainer createdTrainer = trainerService.createTrainer(trainer);
            return new ResponseEntity<>(createdTrainer, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Get all Trainers
    @GetMapping("/fetch")
    public ResponseEntity<List<Trainer>> getAllTrainers() {
        try {
            List<Trainer> trainers = trainerService.getAllTrainers();
            return trainers.isEmpty() ? new ResponseEntity<>(HttpStatus.NO_CONTENT)
                    : new ResponseEntity<>(trainers, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Get a Trainer by ID
    @GetMapping("/fetch/{id}")
    public ResponseEntity<Trainer> getTrainerById(@PathVariable("id") Long id) {
        Optional<Trainer> trainerData = trainerService.getTrainerById(id);
        if (trainerData.isPresent()) {
            return new ResponseEntity<>(trainerData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Update a Trainer
    @PutMapping("/update/{id}")
    public ResponseEntity<Trainer> updateTrainer(@PathVariable("id") Long id, @Valid @RequestBody Trainer trainer) {
        Optional<Trainer> existingTrainer = trainerService.getTrainerById(id);

        if (existingTrainer.isPresent()) {
            trainer.setId(id);
            Trainer updatedTrainer = trainerService.updateTrainer(trainer);
            return new ResponseEntity<>(updatedTrainer, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    // Delete a Trainer
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<HttpStatus> deleteTrainer(@PathVariable("id") Long id) {
        try {
            trainerService.deleteTrainer(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
