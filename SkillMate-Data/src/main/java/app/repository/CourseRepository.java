package app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import app.entity.Course;
import jakarta.transaction.Transactional;

public interface CourseRepository extends JpaRepository<Course, Long> {
    List<Course> findByEnrollmentsStudentId(Long studentId);

    @Modifying
    @Transactional
    @Query(value = """
            DELETE FROM trainer_course WHERE course_id = :courseId;
            DELETE FROM enrollment WHERE course_id = :courseId;
            DELETE FROM course_rating WHERE course_id = :courseId;
            DELETE FROM attendance WHERE meeting_id IN (SELECT id FROM meeting WHERE course_id = :courseId);
            DELETE FROM meeting WHERE course_id = :courseId;
            DELETE FROM batch_students WHERE batch_id IN (SELECT id FROM batch WHERE course_id = :courseId);
            DELETE FROM batch WHERE course_id = :courseId;
            DELETE FROM course WHERE id = :courseId;
            """, nativeQuery = true)
    void deleteByCourseId(@Param("courseId") Long courseId);
}
