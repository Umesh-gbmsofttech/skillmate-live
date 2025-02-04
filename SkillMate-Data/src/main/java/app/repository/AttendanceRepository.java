package app.repository;

import app.dto.StudentAttendanceDTO;
import app.entity.Attendance;
import app.entity.Batch;
import app.entity.Student;
import app.entity.Trainer;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

	@Query("SELECT new app.dto.StudentAttendanceDTO(s.id, s.fullName, s.email, a.totalAttendance, a.remark) " +
		       "FROM Attendance a JOIN a.student s WHERE a.batch.id = :batchId")
		List<StudentAttendanceDTO> findAttendanceByBatchId(@Param("batchId") Long batchId);
	
	
	//to get latest and single attendance of student by student id
	@Query("SELECT a FROM Attendance a WHERE a.student.id = :studentId ORDER BY a.inTime DESC LIMIT 1")
	Optional<Attendance> findLatestAttendanceByStudentId(@Param("studentId") Long studentId);

	//to get all attendances of student by student id
	@Query("SELECT a FROM Attendance a WHERE a.student.id = :studentId")
	List<Attendance> findByStudentId(@Param("studentId") Long studentId);


}
