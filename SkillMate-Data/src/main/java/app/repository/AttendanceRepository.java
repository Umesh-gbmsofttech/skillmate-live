package app.repository;

import app.entity.Attendance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AttendanceRepository extends JpaRepository<Attendance, Long> {

    // Custom query to find attendance for a specific batch and of latest meeting
    @Query("SELECT a FROM Attendance a WHERE a.batch_id = :batchId AND a.meeting.id = (SELECT MAX(a2.meeting.id) FROM Attendance a2 WHERE a2.batch_id = :batchId)")
    List<Attendance> findLatestAttendanceByBatchId(Long batchId);

    // Custom query to find attendance for a specific student
    @Query("SELECT a FROM Attendance a WHERE a.student.id = :studentId")
    List<Attendance> findByStudentId(Long studentId);

    // Custom query to find attendance for a specific student and meeting
    @Query("SELECT a FROM Attendance a WHERE a.student.id = :studentId AND a.meeting.id = :meetingId")
    List<Attendance> findByStudentIdAndMeetingId(Long studentId, Long meetingId);

    // Custom query to find attendances for a specific meeting
    @Query("SELECT a FROM Attendance a WHERE a.meeting.id = :meetingId")
    List<Attendance> findByMeetingId(Long meetingId);

}
