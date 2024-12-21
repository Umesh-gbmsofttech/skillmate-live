package app.controller;

import app.entity.Trainer;
import app.service.TrainerService;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import app.jwt.JwtResponse;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/trainers")
public class TrainerController {

    @Autowired
    private TrainerService trainerService;

    @PostMapping("/create")
    public ResponseEntity<Object> createTrainer(@Valid @RequestBody Trainer trainer) {
        try {
            String jwtToken = trainerService.createTrainer(trainer);          
            // Return response with the JWT token
            return new ResponseEntity<>(new JwtResponse(jwtToken), HttpStatus.CREATED);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

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

    @GetMapping("/fetch/{id}")
    public ResponseEntity<Trainer> getTrainerById(@PathVariable("id") Long id) {
        Optional<Trainer> trainerData = trainerService.getTrainerById(id);
        if (trainerData.isPresent()) {
            return new ResponseEntity<>(trainerData.get(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

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
