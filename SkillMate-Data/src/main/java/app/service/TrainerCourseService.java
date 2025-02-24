package app.service;

import app.entity.Course;
import app.entity.TrainerCourse;
import app.exception.EntityNotFoundException;
import app.repository.TrainerCourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
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
    public TrainerCourse createTrainerCourse(TrainerCourse trainerCourse) {
        return trainerCourseRepository.save(trainerCourse);
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
