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
public class EnrollmentService {

    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private EnrollmentRepository enrollmentRepository;
    

    public Enrollment saveEnrollment(Enrollment enrollment) {
        return enrollmentRepository.save(enrollment);
    }

    public List<Enrollment> getAllEnrollments() {
        return enrollmentRepository.findAll();
    }

    public Optional<Enrollment> getEnrollmentById(Long id) {
        return enrollmentRepository.findById(id);
    }

    public void deleteEnrollment(Long id) {
        enrollmentRepository.deleteById(id);
    }
    
    // Method to enroll a student in a course
    public Enrollment enrollStudentInCourse(Long studentId, Long courseId) {
        // Retrieve the student
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new RuntimeException("Student not found"));

        // Retrieve the course
        Course course = courseRepository.findById(courseId).orElseThrow(() -> new RuntimeException("Course not found"));

        // Check if the student is already enrolled in the course
        Enrollment existingEnrollment = enrollmentRepository.findByStudentIdAndCourseId(studentId, courseId);
        if (existingEnrollment != null) {
            throw new RuntimeException("Student is already enrolled in this course");
        }

        // Create the enrollment record
        Enrollment enrollment = new Enrollment();
        enrollment.setStudent(student);
        enrollment.setCourse(course);
        // enrollment.setEnrollmentDate(java.time.LocalDate.now());
        enrollmentRepository.save(enrollment);

        return enrollment;
    }

    // Method to get all courses a student is enrolled in
    public List<Course> getCoursesForStudent(Long studentId) {
        return enrollmentRepository.findByStudentId(studentId);
    }

}
