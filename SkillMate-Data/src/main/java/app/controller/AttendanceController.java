package app.controller;

import app.entity.Attendance;
import app.exception.EntityNotFoundException;
import app.service.AttendanceService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/attendances")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    @PostMapping(consumes = "application/json", produces = "application/json")
    public ResponseEntity<Attendance> addAttendance(@Valid @RequestBody Attendance attendance) {
        Attendance savedAttendance = attendanceService.saveAttendance(attendance);
        return ResponseEntity.status(HttpStatus.CREATED).body(savedAttendance);
    }

    @GetMapping
    public ResponseEntity<List<Attendance>> getAllAttendanceRecords() {
        List<Attendance> attendanceList = attendanceService.getAllAttendanceRecords();
        return ResponseEntity.ok(attendanceList);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Attendance> getAttendanceById(@PathVariable Long id) {
        Attendance attendance = attendanceService.getAttendanceById(id);
        return ResponseEntity.ok(attendance);
    }

    // Get attendance records by BatchId of latest meeting
    @GetMapping("/batch/{batchId}")
    public ResponseEntity<List<Attendance>> getAttendanceByBatchId(@PathVariable(value = "batchId") Long batchId) {
        List<Attendance> attendanceList = attendanceService.getLatestAttendanceByBatchId(batchId);
        return ResponseEntity.ok(attendanceList);
    }

    @GetMapping("/meeting/{meetingId}")
    public ResponseEntity<List<Attendance>> getAttendanceByMeetingId(@PathVariable Long meetingId) {
        List<Attendance> attendanceList = attendanceService.getAttendanceByMeetingId(meetingId);
        return ResponseEntity.ok(attendanceList);
    }

    // to get the attendance of student by their id
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Attendance>> getAttendanceByStudentId(@PathVariable Long studentId) {
        List<Attendance> attendanceList = attendanceService.getAttendanceByStudentId(studentId);
        return ResponseEntity.ok(attendanceList);
    }

    // to get the attendance of student by their id and meeting id
    @GetMapping("/student/{studentId}/{meetingId}")
    public ResponseEntity<List<Attendance>> getAttendanceByStudentIdAndMeetingId(@PathVariable Long studentId,
            @PathVariable Long meetingId) {
        List<Attendance> attendanceList = attendanceService.getAttendanceByStudentIdAndMeetingId(studentId, meetingId);
        return ResponseEntity.ok(attendanceList);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteAttendance(@PathVariable Long id) {
        attendanceService.deleteAttendance(id);
        return ResponseEntity.ok("Attendance record deleted successfully.");
    }

    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<String> handleEntityNotFoundException(EntityNotFoundException ex) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(ex.getMessage());
    }
}
