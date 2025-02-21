package app.service;

import app.entity.Attendance;
import app.repository.AttendanceRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    public Attendance saveAttendance(Attendance attendance) {
        return attendanceRepository.save(attendance);
    }

    @GetMapping("/{studentId}")
    public List<Attendance> getAllAttendanceRecords(@PathVariable Long studentId) {
        return attendanceRepository.findByStudentId(studentId);
    }

    // for trainer to get the attendance of students by meeting id
    @GetMapping("/{studentId}/{meetingId}")
    public List<Attendance> getAllAttendanceRecords(@PathVariable Long studentId, @PathVariable Long meetingId) {
        return attendanceRepository.findByStudentIdAndMeetingId(studentId, meetingId);
    }

    public List<Attendance> getAllAttendanceRecords() {
        return attendanceRepository.findAll();
    }

    public Optional<Attendance> getAttendanceById(Long id) {
        return attendanceRepository.findById(id);
    }

    public void deleteAttendance(Long id) {
        attendanceRepository.deleteById(id);
    }
}
