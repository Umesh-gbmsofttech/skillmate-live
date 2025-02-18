package app.service;

import app.entity.Course;
import app.entity.Enrollment;
import app.entity.Student;
import app.repository.CourseRepository;
import app.repository.EnrollmentRepository;
import app.repository.StudentRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class CourseService {

    @Autowired
    private CourseRepository courseRepository;

    public Course saveCourse(Course course) {
        return courseRepository.save(course);
    }

    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    public Optional<Course> getCourseById(Long id) {
        return courseRepository.findById(id);
    }

    public Optional<Course> updateCourseById(Long id, Course course) {
        Optional<Course> existingCourseOpt = courseRepository.findById(id);

        if (existingCourseOpt.isPresent()) {
            Course existingCourse = existingCourseOpt.get();
            if (course.getTitle() != null && !course.getTitle().isEmpty()) {
                existingCourse.setTitle(course.getTitle());
            }

            if (course.getDescription() != null && !course.getDescription().isEmpty()) {
                existingCourse.setDescription(course.getDescription());
            }

            if (course.getDays() > 0) {
                existingCourse.setDays(course.getDays());
            }

            if (course.getPrice() > 0) {
                existingCourse.setPrice(course.getPrice());
            }

            // if (course.getImage() != null && course.getImage().length > 0) {
            // existingCourse.setImage(course.getImage());
            // }

            return Optional.of(courseRepository.save(existingCourse));
        }

        return Optional.empty();
    }

    public void deleteCourse(Long id) {
        courseRepository.deleteById(id);
    }

}
