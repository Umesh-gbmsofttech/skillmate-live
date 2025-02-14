package app.controller;

import app.entity.JsonResoponse_View;
import app.entity.Trainer;
import app.service.TrainerService;
import jakarta.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.fasterxml.jackson.annotation.JsonView;
import app.jwt.JwtResponse;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/trainers")
public class TrainerController {

	private static final Logger logger = LoggerFactory.getLogger(TrainerController.class);
	


	@Autowired
	private TrainerService trainerService;

//	create trainer and return jwt token and user data
	@PostMapping(value = "/create", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Object> createTrainer(@Valid @RequestBody Trainer trainer) {
		try {
			JwtResponse jwtResponse = trainerService.saveTrainer(trainer);
			return new ResponseEntity<>(jwtResponse, HttpStatus.CREATED);
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
	 public ResponseEntity<Trainer> updateTrainerProfile(@PathVariable Long id, @RequestBody Trainer trainer) {
	 	Trainer updatedTrainer = trainerService.updateTrainer(id, trainer);
	 	if (updatedTrainer == null) {
	 		return ResponseEntity.notFound().build();
	 	}
	 	return ResponseEntity.ok(updatedTrainer);
	 }

	// Delete a Trainer
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deleteTrainer(@PathVariable Long id) {
		try {
			trainerService.deleteTrainer(id);
			return ResponseEntity.ok("trainer profile deleted successfully");
		} catch (RuntimeException e) {
			return ResponseEntity.status(404).body(e.getMessage());
		}
	}

}
