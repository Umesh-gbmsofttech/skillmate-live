package app.repository;

import app.entity.Attendance;
import app.entity.Student;
import app.entity.Trainer;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

	

}
