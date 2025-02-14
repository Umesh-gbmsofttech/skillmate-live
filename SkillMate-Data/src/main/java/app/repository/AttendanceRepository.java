package app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import app.entity.Attendance;

public interface AttendanceRepository  extends JpaRepository<Attendance,Long>{
     
}
