package app.service;

import app.entity.Course;
import app.exception.EntityNotFoundException;
import app.repository.CourseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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

    // Update a Course
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
            if (course.getTrainer() != null) {
                existingCourse.setTrainer(course.getTrainer());
            }
            if (course.getBatch() != null) {
                existingCourse.setBatch(course.getBatch());
            }
            if (course.getStudents() != null) {
                existingCourse.setStudents(course.getStudents());
            }
            if (course.getAttendance() != null) {
                existingCourse.setAttendance(course.getAttendance());
            }
            if (course.getRatingReviews() != null) {
                existingCourse.setRatingReviews(course.getRatingReviews());
            }
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
