package app.service;

import app.entity.Attendance;
import app.repository.AttendanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AttendanceService {

    @Autowired
    private AttendanceRepository attendanceRepository;

    // Create Attendance
    public ResponseEntity<Attendance> createAttendance(Attendance attendance) {
        try {
            Attendance savedAttendance = attendanceRepository.save(attendance);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedAttendance);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null);  // Or you can return an error message
        }
    }

    // Get Attendance by ID
    public ResponseEntity<Attendance> getAttendanceById(Long id) {
        Optional<Attendance> attendance = attendanceRepository.findById(id);
        return attendance.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    // Get All Attendances
    public List<Attendance> getAllAttendances() {
        return attendanceRepository.findAll();
    }

    // Delete Attendance by ID
    public ResponseEntity<String> deleteAttendance(Long id) {
        if (attendanceRepository.existsById(id)) {
            attendanceRepository.deleteById(id);
            return ResponseEntity.ok("Attendance record deleted successfully.");
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Attendance record not found.");
    }

    // Update Attendance by ID
    public ResponseEntity<Attendance> updateAttendance(Long id, Attendance newAttendance) {
        Optional<Attendance> existingAttendanceOpt = attendanceRepository.findById(id);
        if (existingAttendanceOpt.isPresent()) {
            Attendance existingAttendance = existingAttendanceOpt.get();
            updateAttendanceFields(existingAttendance, newAttendance);
            Attendance updatedAttendance = attendanceRepository.save(existingAttendance);
            return ResponseEntity.ok(updatedAttendance);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
    }

    private void updateAttendanceFields(Attendance existingAttendance, Attendance newAttendance) {
        if (newAttendance.getInTime() != null) existingAttendance.setInTime(newAttendance.getInTime());
        if (newAttendance.getOutTime() != null) existingAttendance.setOutTime(newAttendance.getOutTime());
        if (newAttendance.getTotalAttendance() != null) existingAttendance.setTotalAttendance(newAttendance.getTotalAttendance());
        if (newAttendance.getRemark() != null) existingAttendance.setRemark(newAttendance.getRemark());
        if (newAttendance.getTrainer() != null) existingAttendance.setTrainer(newAttendance.getTrainer());
        if (newAttendance.getStudent() != null) existingAttendance.setStudent(newAttendance.getStudent());
        if (newAttendance.getCourse() != null) existingAttendance.setCourse(newAttendance.getCourse());
        if (newAttendance.getBatch() != null) existingAttendance.setBatch(newAttendance.getBatch());
    }

    //Get single attendance by student id
    public ResponseEntity<Attendance> getLatestAttendanceByStudentId(Long studentId) {
        Optional<Attendance> latestAttendance = attendanceRepository.findLatestAttendanceByStudentId(studentId);
        return latestAttendance.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }

    // Get Attendance by Student ID
    public ResponseEntity<List<Attendance>> getAttendancesByStudentId(Long studentId) {
        List<Attendance> attendances = attendanceRepository.findByStudentId(studentId);
        if (attendances.isEmpty()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(null);
        }
        return ResponseEntity.ok(attendances);
    }

}
