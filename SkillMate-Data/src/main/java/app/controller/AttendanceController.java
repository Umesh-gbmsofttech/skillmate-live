package app.controller;

import app.entity.Attendance;
import app.service.AttendanceService;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/attendances")
public class AttendanceController {

    @Autowired
    private AttendanceService attendanceService;

    // Get All Attendances
    @GetMapping("/fetch")
    public List<Attendance> getAllAttendances() {
        return attendanceService.getAllAttendances();
    }

    // Get Attendance by ID
    @GetMapping("/fetch/{id}")
    public ResponseEntity<Attendance> getAttendanceById(@PathVariable("id") Long id) {
        return attendanceService.getAttendanceById(id);
    }

    // Create or Update Attendance
    @PostMapping("/create")
    public ResponseEntity<Attendance> createOrUpdateAttendance(@Valid @RequestBody Attendance attendance) {
        Attendance savedAttendance = attendanceService.createOrUpdateAttendance(attendance);
        return ResponseEntity.status(201).body(savedAttendance); // Return HTTP 201 (Created)
    }

    // Delete Attendance by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteAttendance(@PathVariable("id") Long id) {
        return attendanceService.deleteAttendance(id);
    }

    // Get Attendances by Student ID
    @GetMapping("/student/{studentId}")
    public List<Attendance> getAttendancesByStudentId(@PathVariable("studentId") Long studentId) {
        return attendanceService.getAttendancesByStudentId(studentId);
    }
    
   

}
