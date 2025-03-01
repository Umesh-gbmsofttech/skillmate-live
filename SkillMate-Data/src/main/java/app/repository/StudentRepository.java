package app.repository;

import app.entity.Student;
import jakarta.transaction.Transactional;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
	Optional<Student> findByName(String name);

	Optional<Student> findByMobileNumber(String mobileNumber);

	Optional<Student> findByEmail(String email);

	boolean existsByMobileNumber(String mobileNumber);

	boolean existsByEmail(String email);

	// @Modifying
	// @Transactional
	// @Query(value = """
	// DELETE FROM course_rating WHERE student_id = :studentId;
	// DELETE FROM trainer_rating WHERE student_id = :studentId;
	// DELETE FROM batch_students WHERE student_id = :studentId;
	// DELETE FROM attendance WHERE student_id = :studentId;
	// DELETE FROM student_roles WHERE student_id = :studentId;
	// DELETE FROM enrollment WHERE student_id = :studentId;
	// DELETE FROM student WHERE id = :studentId;
	// """, nativeQuery = true)
	// void deleteByStudentId(@Param("studentId") Long studentId);
	@Modifying
	@Transactional
	@Query(value = "DELETE FROM course_rating WHERE student_id = :studentId", nativeQuery = true)
	void deleteCourseRatings(@Param("studentId") Long studentId);

	@Modifying
	@Transactional
	@Query(value = "DELETE FROM trainer_rating WHERE student_id = :studentId", nativeQuery = true)
	void deleteTrainerRatings(@Param("studentId") Long studentId);

	@Modifying
	@Transactional
	@Query(value = "DELETE FROM batch_students WHERE student_id = :studentId", nativeQuery = true)
	void deleteBatchStudents(@Param("studentId") Long studentId);

	@Modifying
	@Transactional
	@Query(value = "DELETE FROM attendance WHERE student_id = :studentId", nativeQuery = true)
	void deleteAttendance(@Param("studentId") Long studentId);

	@Modifying
	@Transactional
	@Query(value = "DELETE FROM student_roles WHERE student_id = :studentId", nativeQuery = true)
	void deleteStudentRoles(@Param("studentId") Long studentId);

	@Modifying
	@Transactional
	@Query(value = "DELETE FROM enrollment WHERE student_id = :studentId", nativeQuery = true)
	void deleteEnrollments(@Param("studentId") Long studentId);

	@Modifying
	@Transactional
	@Query(value = "DELETE FROM student WHERE id = :studentId", nativeQuery = true)
	void deleteStudentById(@Param("studentId") Long studentId);

}