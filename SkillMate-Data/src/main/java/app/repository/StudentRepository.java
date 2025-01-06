package app.repository;

import app.entity.Attendance;
import app.entity.Batch;
import app.entity.Student;
import app.otplogin.EmailOtp;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
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
}
