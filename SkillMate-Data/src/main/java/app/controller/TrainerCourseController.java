package app.controller;

import app.entity.Course;
import app.entity.TrainerCourse;
import app.exception.ResourceNotFoundException;
import app.service.TrainerCourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/trainer-courses")
public class TrainerCourseController {

    private final TrainerCourseService trainerCourseService;

    @Autowired
    public TrainerCourseController(TrainerCourseService trainerCourseService) {
        this.trainerCourseService = trainerCourseService;
    }

    // Create a new TrainerCourse
    @PostMapping
    public ResponseEntity<TrainerCourse> createTrainerCourse(@RequestBody TrainerCourse trainerCourse) {
        TrainerCourse createdTrainerCourse = trainerCourseService.createTrainerCourse(trainerCourse);
        return new ResponseEntity<>(createdTrainerCourse, HttpStatus.CREATED);
    }

    // Get all TrainerCourses
    @GetMapping
    public ResponseEntity<List<TrainerCourse>> getAllTrainerCourses() {
        List<TrainerCourse> trainerCourses = trainerCourseService.getAllTrainerCourses();
        return ResponseEntity.ok(trainerCourses);
    }

    // Get a TrainerCourse by ID
    @GetMapping("/{id}")
    public ResponseEntity<TrainerCourse> getTrainerCourseById(@PathVariable Long id) {
        TrainerCourse trainerCourse = trainerCourseService.getTrainerCourseById(id);
        return ResponseEntity.ok(trainerCourse);
    }

    // Get courses by trainer id
    @GetMapping("/courses/{trainerId}")
    public ResponseEntity<List<TrainerCourse>> getCoursesByTrainerId(@PathVariable Long trainerId) {
        List<TrainerCourse> trainerCourses = trainerCourseService.getCoursesByTrainerId(trainerId);
        return ResponseEntity.ok(trainerCourses);
    }

    // Update a TrainerCourse
    @PutMapping("/{id}")
    public ResponseEntity<TrainerCourse> updateTrainerCourse(
            @PathVariable Long id, @RequestBody TrainerCourse trainerCourseDetails) {
        TrainerCourse updatedTrainerCourse = trainerCourseService.updateTrainerCourse(id, trainerCourseDetails);
        return ResponseEntity.ok(updatedTrainerCourse);
    }

    // Delete a TrainerCourse
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTrainerCourse(@PathVariable Long id) {
        trainerCourseService.deleteTrainerCourse(id);
        return ResponseEntity.noContent().build();
    }

    // Exception handler for ResourceNotFoundException
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<String> handleResourceNotFoundException(ResourceNotFoundException ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
    }

    // Global exception handler for general errors
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGeneralException(Exception ex) {
        return new ResponseEntity<>(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
