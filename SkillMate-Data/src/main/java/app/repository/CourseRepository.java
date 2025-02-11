package app.repository;

import app.entity.Course;
import app.entity.Student;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {

	List<Course> findAllByStudents_Id(Long studentId);

	List<Course> findAllByTrainer_Id(Long trainerId);
	
	 // Get list of students by course id
    @Query("SELECT s FROM Student s JOIN s.courses c WHERE c.id = :courseId")
    List<Student> findStudentsByCourseId(@Param("courseId") Long courseId);

	@Modifying
    @Transactional
    @Query(value = "DELETE FROM batch_courses WHERE course_id = :courseId", nativeQuery = true)
    void deleteBatchCoursesByCourseId(Long courseId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM meeting_courses WHERE course_id = :courseId", nativeQuery = true)
    void deleteMeetingCoursesByCourseId(Long courseId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM course_students WHERE course_id = :courseId", nativeQuery = true)
    void deleteCourseStudentsByCourseId(Long courseId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM course_trainers WHERE course_id = :courseId", nativeQuery = true)
    void deleteCourseTrainersByCourseId(Long courseId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM attendance WHERE course_id = :courseId", nativeQuery = true)
    void deleteAttendanceByCourseId(Long courseId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM rating_reviews WHERE to_course_id = :courseId", nativeQuery = true)
    void deleteRatingReviewsByCourseId(Long courseId);
}


//delete a course:
//DELETE FROM batch_courses WHERE course_id = 3;
//DELETE FROM batch_courses WHERE course_id = 3;
//DELETE FROM meeting_courses WHERE course_id = 3;
//DELETE FROM course_students WHERE course_id = 3;
//DELETE FROM course_trainers WHERE course_id = 3;
//DELETE FROM attendance WHERE course_id = 3;
//DELETE FROM rating_reviews WHERE to_course_id = 3;
//DELETE FROM course WHERE id = 3;