package app.controller;

import app.entity.Course;
import app.entity.Enrollment;
import app.service.EnrollmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/enrollments")
public class EnrollmentController {

    @Autowired
    private EnrollmentService enrollmentService;

    @PostMapping
    public Enrollment addEnrollment(@RequestBody Enrollment enrollment) {
        return enrollmentService.saveEnrollment(enrollment);
    }

    @GetMapping
    public List<Enrollment> getAllEnrollments() {
        return enrollmentService.getAllEnrollments();
    }

    @GetMapping("/{id}")
    public Optional<Enrollment> getEnrollmentById(@PathVariable Long id) {
        return enrollmentService.getEnrollmentById(id);
    }

    @DeleteMapping("/{id}")
    public void deleteEnrollment(@PathVariable Long id) {
        enrollmentService.deleteEnrollment(id);
    }
    
    // API to enroll a student in a course
    @PostMapping("/enroll")
    public Enrollment enrollStudentInCourse(@RequestParam Long studentId, @RequestParam Long courseId) {
        return enrollmentService.enrollStudentInCourse(studentId, courseId);
    }

    // API to get all courses a student is enrolled in
    @GetMapping("/enrolled/{studentId}")
    public List<Course> getCoursesForStudent(@PathVariable Long studentId) {
        return enrollmentService.getCoursesForStudent(studentId);
    }
}
