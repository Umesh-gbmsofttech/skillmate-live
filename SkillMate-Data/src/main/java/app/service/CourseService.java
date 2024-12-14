package app.service;

import app.entity.Course;
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

    // Update a Course
    public Course updateCourse(Course course) {
        return courseRepository.save(course);
    }

    // Delete a Course
    public void deleteCourse(Long id) {
        courseRepository.deleteById(id);
    }
}
