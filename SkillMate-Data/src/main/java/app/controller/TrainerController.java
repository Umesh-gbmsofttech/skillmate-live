package app.controller;

import app.dto.MeetingDto;
import app.dto.StudentAttendanceDTO;
import app.entity.Attendance;
import app.entity.Batch;
import app.entity.Course;
import app.entity.JsonResoponse_View;
import app.entity.Meeting;
import app.entity.Student;
import app.entity.Trainer;
import app.entity.TrainerProfileUpdated;
import app.exception.EntityNotFoundException;
import app.exception.GlobalExceptionHandler;
import app.service.TrainerService;
import jakarta.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.annotation.RequestScope;
import org.springframework.web.multipart.MultipartFile;

import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.databind.ObjectMapper;

import app.jwt.JwtResponse;
import app.repository.AttendanceRepository;
import app.repository.BatchRepository;
import app.repository.CourseRepository;
import app.repository.StudentRepository;
import app.repository.TrainerRepository;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/trainers")
public class TrainerController {

	private static final Logger logger = LoggerFactory.getLogger(TrainerController.class);
	
	@Autowired
	BatchRepository batchRepository;

	@Autowired
	TrainerRepository trainerRepository;

	@Autowired
	CourseRepository courseRepository;

	@Autowired
	StudentRepository studentRepository;

	@Autowired
	private AttendanceRepository attendanceRepository;

	@Autowired
	private TrainerService trainerService;

//	create trainer and return jwt token and user data
	@PostMapping(value = "/create", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
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
		Trainer trainer = trainerRepository.findById(id)
				.orElseThrow(() -> new EntityNotFoundException("Trainer not found"));
		Course course = courseRepository.findById(courseId)
				.orElseThrow(() -> new EntityNotFoundException("Course not found"));
		trainer.getCourses().add(course);
		trainerRepository.save(trainer);
		return ResponseEntity.ok("Course added to trainer");
	}
	
////	  Get Meeting by Trainer ID
////	 Get all meetings for a specific trainer
//    @GetMapping("/{trainerId}/meetings")
//    @JsonView(JsonResoponse_View.BasicView.class)  // Using JsonView to control the response format
//    public List<Meeting> getMeetingsByTrainer(@PathVariable Long trainerId) {
//        return trainerService.getMeetingsByTrainer(trainerId);
//    }


	@GetMapping("/fetch")
	@JsonView(JsonResoponse_View.DetailedView.class)
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
	@JsonView(JsonResoponse_View.DetailedView.class)
	public ResponseEntity<Trainer> getTrainerById(@PathVariable("id") Long id) {
		Optional<Trainer> trainerData = trainerService.getTrainerById(id);
		if (trainerData.isPresent()) {
			return new ResponseEntity<>(trainerData.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

//	@PutMapping(value = "/update/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
////	@JsonView(JsonResponse_View.DetailedView.class)
//	public ResponseEntity<TrainerProfileUpdated> updateTrainerProfile(
//	        @PathVariable("id") Long id,
//	        @RequestParam("profilePic") MultipartFile profilePic, // Use MultipartFile for image
//	        @ModelAttribute Trainer trainer) throws IOException {
//
//	    Optional<Trainer> existingTrainer = trainerService.getTrainerById(id);
//
//	    if (existingTrainer.isPresent()) {
//	        // Convert the MultipartFile to a byte array
//	        byte[] profilePicBytes =profilePic.getBytes();
//	        trainer.setProfilePic(profilePicBytes); // Set byte[] for profilePic
//	        TrainerProfileUpdated updatedProfile = trainerService.updateTrainerWithHistory(id, trainer);
//	        return new ResponseEntity<>(updatedProfile, HttpStatus.OK);
//	    } else {
//	        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//	    }
//	}
	
//	@PutMapping("/update/{id}")
//	public ResponseEntity<Trainer> updateTrainerProfile(@PathVariable Long id, 
//			@RequestParam(value = "profilePic", required = false) MultipartFile profilePic, 
//			@ModelAttribute Trainer trainer) throws IOException {
//		// Handle file as MultipartFile and convert to byte[] before saving in database
//		if (profilePic != null && !profilePic.isEmpty()) {
//			byte[] profilePicBytes = profilePic.getBytes();  // Convert file to byte array
//			trainer.setProfilePic(profilePicBytes);
//		}
//		// Save the updated trainer object
//		Trainer updatedTrainer = trainerService.updateTrainer(id, trainer);
//		return ResponseEntity.ok(updatedTrainer);
@PutMapping("/update/{id}")
public ResponseEntity<Trainer> updateTrainerProfile(@PathVariable Long id, @RequestBody Trainer trainer) {
	Trainer updatedTrainer = trainerService.updateTrainer(id, trainer);
	if (updatedTrainer == null) {
		return ResponseEntity.notFound().build();
	}
	return ResponseEntity.ok(updatedTrainer);
}

//	@PutMapping(value = "/update/{id}", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE}, produces = MediaType.APPLICATION_JSON_VALUE)
//	public ResponseEntity<Object> updateTrainerProfile(@PathVariable Long id,
//	                                                  @RequestParam("trainer") String trainerJson,
//	                                                  @RequestParam(value = "profilePic", required = false) MultipartFile profilePic) {
//	    try {
//	        // Deserialize the trainer data
//	        Trainer updatedTrainer = new ObjectMapper().readValue(trainerJson, Trainer.class);
//
//	        // Check if a profile picture was uploaded, and handle it if present
//	        if (profilePic != null && !profilePic.isEmpty()) {
//	            byte[] fileName = saveFile(profilePic);  // Save the new profile picture
//	            updatedTrainer.setProfilePic(fileName);  // Set the new profile picture in the trainer object
//	        }
//
//	        trainerService.updateTrainerProfile(id, updatedTrainer);  // Update the trainer in the service layer
//	        return ResponseEntity.ok().build();
//	    } catch (Exception e) {
//	        e.printStackTrace();
//	        return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//	    }
//	}
//
//	private String saveFile(MultipartFile file) {
//	    // Generate a unique file name using UUID
//	    String fileName = UUID.randomUUID().toString() + "-" + file.getOriginalFilename();
//
//	    try {
//	        // Save the file to a folder (e.g., uploads/ directory)
//	        Path path = Paths.get("uploads/" + fileName);
//	        Files.copy(file.getInputStream(), path);
//	    } catch (IOException e) {
//	        throw new RuntimeException("File upload failed: " + e.getMessage());
//	    }
//
//	    return fileName;  // Return the file name after saving it
//	}

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

//	 Fetch students by batch ID
//	@GetMapping("/batch/fetch/{batchId}")
//	@JsonView(JsonResoponse_View.DetailedView.class)
//	public ResponseEntity<List<Student>> getStudentsByBatchId(@PathVariable Long batchId) {
//		try {
//			// Retrieve the batch by ID
//			Optional<Batch> batchOptional = batchRepository.findById(batchId);
//			if (batchOptional.isEmpty()) {
//				return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//			}
//
//			Batch batches = batchOptional.get();
//			logger.info("Batch request received: {}",batches);
//
//			// Retrieve students from the batch
//			List<Student> students = studentRepository.findAllByBatches(batches);
//			logger.info("Batch request received: {}",students);
//
//			if (students.isEmpty()) {
//				return new ResponseEntity<>(HttpStatus.NO_CONTENT);
//			}
//
//			return new ResponseEntity<>(students, HttpStatus.OK);
//		} catch (Exception e) {
//			e.printStackTrace();
//			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
//		}
//	}

}
