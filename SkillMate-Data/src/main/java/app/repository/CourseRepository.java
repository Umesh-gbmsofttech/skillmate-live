package app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import app.entity.Course;

public interface CourseRepository extends JpaRepository<Course, Long> {
}