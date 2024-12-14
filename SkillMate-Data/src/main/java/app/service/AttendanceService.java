package app.service;

import app.entity.Attendance;
import app.repository.AttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import java.util.List;
import java.util.Optional;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    // Create or Update Attendance
    public Attendance createOrUpdateAttendance(Attendance attendance) {
        try {
            return attendanceRepository.save(attendance);
        } catch (Exception e) {
            throw new RuntimeException("Failed to save attendance record: " + e.getMessage());
        }
    }

    // Get Attendance by ID
    public ResponseEntity<Attendance> getAttendanceById(Long id) {
        Optional<Attendance> attendance = attendanceRepository.findById(id);
        if (attendance.isPresent()) {
            return ResponseEntity.ok(attendance.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(null);
        }
    }

    // Get All Attendances
    public List<Attendance> getAllAttendances() {
        return attendanceRepository.findAll();
    }

    // Delete Attendance by ID
    public ResponseEntity<String> deleteAttendance(Long id) {
        try {
            if (attendanceRepository.existsById(id)) {
                attendanceRepository.deleteById(id);
                return ResponseEntity.ok("Attendance record deleted successfully.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Attendance record not found.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to delete attendance record: " + e.getMessage());
        }
    }

    // Get Attendance by Student ID
    public List<Attendance> getAttendancesByStudentId(Long studentId) {
        // Custom query can be added here if needed for retrieving by student ID
        // For now, we assume a method in the repository exists that fetches attendances
        // by student ID.
        // return attendanceRepository.findByStudentId(studentId);
        return attendanceRepository.findAll(); // Placeholder
    }
}
