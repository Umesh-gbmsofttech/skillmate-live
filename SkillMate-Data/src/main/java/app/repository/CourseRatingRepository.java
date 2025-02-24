package app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import app.entity.CourseRating;

public interface CourseRatingRepository extends JpaRepository<CourseRating, Long> {

    List<CourseRating> findByCourseId(Long courseId);

    // @Query("SELECT cr FROM CourseRating cr WHERE cr.course.id = :courseId")
    // List<CourseRating> getCourseRatingsByCourseId(@Param("courseId") Long
    // courseId);
}
