package app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import app.entity.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByEnrollmentsStudentId(Long studentId);
}
