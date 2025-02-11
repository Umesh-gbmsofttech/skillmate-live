package app.repository;

import app.entity.Batch;
import app.entity.Student;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Repository;
import java.util.List;


@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
	 Optional<Student> findByFullName(String fullName);
	 Optional<Student>findByMobileNumber(String mobileNumber);
	 Optional<Student> findByEmail(String email);
	 boolean existsByMobileNumber(String mobileNumber);
	 
	 boolean existsByEmail(String email);
     List<Student> findAllByBatches(Batch batches);
     List<Student> findByBatches_Id(Long batchId);

	 
//	Optional< List<Attendance>> getAttendancesByBatchId(Long batchId);
     
     @Modifying
     @Transactional
     @Query(value = "DELETE FROM batch_students WHERE student_id = :studentId", nativeQuery = true)
     void deleteBatchStudentsByStudentId(Long studentId);

     @Modifying
     @Transactional
     @Query(value = "DELETE FROM course_students WHERE student_id = :studentId", nativeQuery = true)
     void deleteCourseStudentsByStudentId(Long studentId);

     @Modifying
     @Transactional
     @Query(value = "DELETE FROM rating_reviews WHERE to_student_id = :studentId", nativeQuery = true)
     void deleteRatingReviewsForStudent(Long studentId);

     @Modifying
     @Transactional
     @Query(value = "DELETE FROM rating_reviews WHERE rating_giver_student_id = :studentId", nativeQuery = true)
     void deleteRatingReviewsByStudent(Long studentId);

//     @Modifying
//     @Transactional
//     @Query(value = "DELETE FROM meeting_batches WHERE meeting_id IN (SELECT id FROM meeting WHERE student_id = :studentId)", nativeQuery = true)
//     void deleteMeetingBatchesByStudentId(Long studentId);

     @Modifying
     @Transactional
     @Query(value = "DELETE FROM student_roles WHERE student_id = :studentId", nativeQuery = true)
     void deleteStudentRolesByStudentId(Long studentId);
}


//delete a student:
//DELETE FROM batch_students WHERE student_id = 2;
//DELETE FROM course_students WHERE student_id = 2;
//DELETE FROM rating_reviews WHERE to_student_id = 2;
//DELETE FROM rating_reviews WHERE rating_giver_student_id = 2;
//DELETE FROM meeting_batches WHERE meeting_id IN (SELECT id FROM meeting WHERE student_id = 2);
//DELETE FROM student_roles WHERE student_id = 2;
//DELETE FROM student WHERE id = 2;