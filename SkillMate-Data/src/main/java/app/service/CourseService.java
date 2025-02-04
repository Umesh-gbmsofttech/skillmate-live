package app.service;

import app.entity.Batch;
import app.entity.Course;
import app.entity.Student;
import app.entity.Trainer;
import app.exception.EntityNotFoundException;
import app.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    // Create a new Course
    public Course createCourse(Course course) {
        return courseRepository.save(course);
    }

    // Get all Courses
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    // Get a Course by ID
    public Optional<Course> getCourseById(Long id) {
        return courseRepository.findById(id);
    }

    public List<Course> getCoursesByStudentId(Long studentId) {
        return courseRepository.findAllByStudents_Id(studentId);
    }

    public List<Course> getCoursesByTrainerId(Long trainerId) {
        return courseRepository.findAllByTrainer_Id(trainerId);
    }

    public Course updateCourse(Long id, Course course) {
        // Retrieve the existing course from the database
        Optional<Course> existingCourseOptional = courseRepository.findById(id);
        if (existingCourseOptional.isPresent()) {
            Course existingCourse = existingCourseOptional.get();

            // Only update fields that are not null in the request
            if (course.getCoverImage() != null) {
                existingCourse.setCoverImage(course.getCoverImage());
            }
            if (course.getCourseName() != null) {
                existingCourse.setCourseName(course.getCourseName());
            }
            if (course.getPrice() != null) {
                existingCourse.setPrice(course.getPrice());
            }
            if (course.getDescription() != null) {
                existingCourse.setDescription(course.getDescription());
            }
            if (course.getDays() != null) {
                existingCourse.setDays(course.getDays());
            }

            // Update trainers: Add new ones only if they aren't already associated with the
            // course
            if (course.getTrainer() != null) {
                List<Trainer> updatedTrainers = new ArrayList<>(existingCourse.getTrainer());

                for (Trainer newTrainer : course.getTrainer()) {
                    boolean trainerExists = updatedTrainers.stream()
                            .anyMatch(trainer -> trainer.getId().equals(newTrainer.getId()));
                    if (!trainerExists) {
                        updatedTrainers.add(newTrainer); // Add new trainer if not already present
                    }
                }
                existingCourse.setTrainer(updatedTrainers);
            }

            // Update students: Add new ones only if they aren't already associated with the
            // course
            if (course.getStudents() != null) {
                List<Student> updatedStudents = new ArrayList<>(existingCourse.getStudents());

                for (Student newStudent : course.getStudents()) {
                    boolean studentExists = updatedStudents.stream()
                            .anyMatch(student -> student.getId().equals(newStudent.getId()));
                    if (!studentExists) {
                        updatedStudents.add(newStudent); // Add new student if not already present
                    }
                }
                existingCourse.setStudents(updatedStudents);
            }

            // Update batches: Add new ones only if they aren't already associated with the
            // course
            if (course.getBatch() != null) {
                List<Batch> updatedBatches = new ArrayList<>(existingCourse.getBatch());

                for (Batch newBatch : course.getBatch()) {
                    boolean batchExists = updatedBatches.stream()
                            .anyMatch(batch -> batch.getId().equals(newBatch.getId()));
                    if (!batchExists) {
                        updatedBatches.add(newBatch); // Add new batch if not already present
                    }
                }
                existingCourse.setBatch(updatedBatches);
            }

            // Update attendance and rating reviews if provided
            if (course.getAttendance() != null) {
                existingCourse.setAttendance(course.getAttendance());
            }
            if (course.getRatingReviews() != null) {
                existingCourse.setRatingReviews(course.getRatingReviews());
            }

            // Update meetings if provided
            if (course.getMeetings() != null) {
                existingCourse.setMeetings(course.getMeetings());
            }

            // Save and return the updated course
            return courseRepository.save(existingCourse);
        } else {
            throw new EntityNotFoundException("Course not found with id: " + id);
        }
    }

    // Delete a Course
    public void deleteCourse(Long id) {
        courseRepository.deleteById(id);
    }

}
