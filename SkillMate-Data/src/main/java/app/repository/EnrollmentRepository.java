package app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import app.entity.Course;
import app.entity.Enrollment;

public interface EnrollmentRepository extends JpaRepository<Enrollment, Long> {
    Enrollment findByStudentIdAndCourseId(Long studentId, Long courseId);
    @Query("SELECT e.course FROM Enrollment e WHERE e.student.id = :studentId")
    List<Course> findByStudentId(Long studentId);
}
