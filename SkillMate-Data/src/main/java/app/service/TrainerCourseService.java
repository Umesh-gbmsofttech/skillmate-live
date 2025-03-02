package app.service;

import app.entity.Course;
import app.entity.TrainerCourse;
import app.exception.EntityNotFoundException;
import app.repository.TrainerCourseRepository;
import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TrainerCourseService {

    private final TrainerCourseRepository trainerCourseRepository;

    @Autowired
    public TrainerCourseService(TrainerCourseRepository trainerCourseRepository) {
        this.trainerCourseRepository = trainerCourseRepository;
    }

    // Create a new TrainerCourse
    @Transactional
    public ResponseEntity<?> createTrainerCourse(TrainerCourse trainerCourse) {
        boolean exists = trainerCourseRepository.existsByTrainerIdAndCourseId(
                trainerCourse.getTrainer().getId(), trainerCourse.getCourse().getId());

        if (exists) {
            return ResponseEntity.status(HttpStatus.CONFLICT)
                    .body("Record already exists for this trainer and course.");
        }

        TrainerCourse savedTrainerCourse = trainerCourseRepository.save(trainerCourse);
        return new ResponseEntity<>(savedTrainerCourse, HttpStatus.CREATED);
    }

    // Get all TrainerCourses
    public List<TrainerCourse> getAllTrainerCourses() {
        return trainerCourseRepository.findAll();
    }

    // Get TrainerCourse by ID
    public TrainerCourse getTrainerCourseById(Long id) {
        Optional<TrainerCourse> trainerCourse = trainerCourseRepository.findById(id);
        if (trainerCourse.isPresent()) {
            return trainerCourse.get();
        } else {
            throw new EntityNotFoundException("TrainerCourse not found with id " + id);
        }
    }

    public List<TrainerCourse> getCoursesByTrainerId(Long trainerId) {
        List<TrainerCourse> trainerCourses = trainerCourseRepository.findByTrainerId(trainerId);
        if (trainerCourses.isEmpty()) {
            throw new EntityNotFoundException("No courses found for trainer ID " + trainerId);
        }
        return trainerCourses;
    }

    // Update TrainerCourse
    public TrainerCourse updateTrainerCourse(Long id, TrainerCourse trainerCourseDetails) {
        TrainerCourse existingTrainerCourse = getTrainerCourseById(id);

        // Update the fields of the existing trainerCourse
        existingTrainerCourse.setTrainer(trainerCourseDetails.getTrainer());
        existingTrainerCourse.setCourse(trainerCourseDetails.getCourse());

        return trainerCourseRepository.save(existingTrainerCourse);
    }

    // Delete TrainerCourse
    public void deleteTrainerCourse(Long id) {
        TrainerCourse trainerCourse = getTrainerCourseById(id);
        trainerCourseRepository.delete(trainerCourse);
    }
}
