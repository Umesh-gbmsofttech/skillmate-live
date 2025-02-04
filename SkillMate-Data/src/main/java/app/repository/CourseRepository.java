package app.repository;

import app.entity.Course;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {

	List<Course> findAllByStudents_Id(Long studentId);

	List<Course> findAllByTrainer_Id(Long trainerId);

	// public List<Course> findByStudentId(Long students);
}
