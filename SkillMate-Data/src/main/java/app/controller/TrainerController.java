package app.controller;

import app.entity.Course;
import app.entity.Trainer;
import app.entity.TrainerProfileUpdated;
import app.exception.EntityNotFoundException;
import app.exception.GlobalExceptionHandler;
import app.service.TrainerService;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import app.jwt.JwtResponse;
import app.repository.CourseRepository;
import app.repository.TrainerRepository;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/trainers")
public class TrainerController {
	
	@Autowired
	TrainerRepository trainerRepository;
	
	@Autowired
	CourseRepository courseRepository;

	@Autowired
	private TrainerService trainerService;

//	create trainer and return jwt token and user data
	@PostMapping("/create")
	public ResponseEntity<Object> createTrainer(@Valid @RequestBody Trainer trainer) {
		try {
			JwtResponse jwtResponse = trainerService.createTrainer(trainer);
			return new ResponseEntity<>(jwtResponse, HttpStatus.CREATED);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	  @PutMapping("/trainers/{id}/add-course")
	    public ResponseEntity<?> addCourseToTrainer(@PathVariable Long id, @RequestBody Long courseId) {
	        Trainer trainer = trainerRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Trainer not found"));
	        Course course = courseRepository.findById(courseId).orElseThrow(() -> new EntityNotFoundException("Course not found"));
	        trainer.getCourses().add(course);
	        trainerRepository.save(trainer);
	        return ResponseEntity.ok("Course added to trainer");
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
	public ResponseEntity<TrainerProfileUpdated> updateTrainerProfile(@PathVariable("id") Long id,
			@Valid @RequestBody Trainer trainer) {

		Optional<Trainer> existingTrainer = trainerService.getTrainerById(id);

		if (existingTrainer.isPresent()) {

			TrainerProfileUpdated updatedProfile = trainerService.updateTrainerWithHistory(id, trainer);
			return new ResponseEntity<>(updatedProfile, HttpStatus.OK);
		} else {

			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	// Delete a Trainer
	@DeleteMapping("/delete/{id}")

	public ResponseEntity<String> deleteStudent(@PathVariable Long id) {
		try {
			trainerService.deleteTrainer(id);
			return ResponseEntity.ok("trainer profile deleted successfully");
		} catch (RuntimeException e) {
			return ResponseEntity.status(404).body(e.getMessage());
		}
	}
}
