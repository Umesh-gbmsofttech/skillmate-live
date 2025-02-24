package app.service;

import app.entity.Attendance;
import app.repository.AttendanceRepository;
import jakarta.persistence.EntityNotFoundException;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    public Attendance saveAttendance(Attendance attendance) {
        attendance.setAttendanceTimestamp(LocalDateTime.now()); // Explicitly set timestamp
        return attendanceRepository.save(attendance);
    }

    public List<Attendance> getAllAttendanceRecords() {
        return attendanceRepository.findAll();
    }

    public Attendance getAttendanceById(Long id) {
        return attendanceRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Attendance record not found with id: " + id));
    }

    public List<Attendance> getLatestAttendanceByBatchId(Long batchId) {
        List<Attendance> attendanceList = attendanceRepository.findLatestAttendanceByBatchId(batchId);

        if (attendanceList.isEmpty()) {
            throw new EntityNotFoundException("No attendance records found for Batch Id: " + batchId);
        }

        return attendanceList;
    }

    public List<Attendance> getAttendanceByMeetingId(Long meetingId) {
        List<Attendance> attendanceList = attendanceRepository.findByMeetingId(meetingId);
        if (attendanceList.isEmpty()) {
            throw new EntityNotFoundException("No attendance records found for meetingId: " + meetingId);
        }
        return attendanceList;
    }

    public List<Attendance> getAttendanceByStudentId(Long studentId) {
        List<Attendance> attendanceList = attendanceRepository.findByStudentId(studentId);
        if (attendanceList.isEmpty()) {
            throw new EntityNotFoundException("No attendance records found for studentId: " + studentId);
        }
        return attendanceList;
    }

    public List<Attendance> getAttendanceByStudentIdAndMeetingId(Long studentId, Long meetingId) {
        List<Attendance> attendanceList = attendanceRepository.findByStudentIdAndMeetingId(studentId, meetingId);
        if (attendanceList.isEmpty()) {
            throw new EntityNotFoundException("No attendance records found for studentId: " + studentId +
                    " and meetingId: " + meetingId);
        }
        return attendanceList;
    }

    public void deleteAttendance(Long id) {
        if (!attendanceRepository.existsById(id)) {
            throw new EntityNotFoundException("Attendance record not found with id: " + id);
        }
        attendanceRepository.deleteById(id);
    }
}
