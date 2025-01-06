package app.controller;

import app.entity.Attendance;
import app.entity.JsonResoponse_View;
import app.service.AttendanceService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.fasterxml.jackson.annotation.JsonView;

import java.util.List;

@RestController
@RequestMapping("/attendances")
public class AttendanceController {

	@Autowired
	private AttendanceService attendanceService;

	// Get All Attendances
	@GetMapping("/fetch")
	@JsonView(JsonResoponse_View.DetailedView.class)
	public ResponseEntity<List<Attendance>> getAllAttendances() {
		List<Attendance> attendances = attendanceService.getAllAttendances();
		return ResponseEntity.ok(attendances);
	}

	// Get Attendance by ID
//    @GetMapping("/fetch/{id}")
//    public ResponseEntity<Attendance> getAttendanceById(@PathVariable("id") Long id) {
//    	return attendanceService.getAttendanceById(id)
//    			.map(attendance -> ResponseEntity.ok(attendance))
//    			.orElse(ResponseEntity.notFound().build());  // Correctly mapping Optional to ResponseEntity
//    }
	@GetMapping("/fetch/{id}")
	@JsonView(JsonResoponse_View.DetailedView.class)
	public ResponseEntity<Attendance> getAttendanceById(@PathVariable("id") Long id) {
		return attendanceService.getAttendanceById(id);
	}

	// Create Attendance
	@PostMapping("/create")
	@JsonView(JsonResoponse_View.DetailedView.class)
	public ResponseEntity<Attendance> createAttendance(@Valid @RequestBody Attendance attendance) {
		return attendanceService.createAttendance(attendance);
	}

	// Update Attendance by ID
	@PutMapping("/update/{id}")
	@JsonView(JsonResoponse_View.DetailedView.class)
	public ResponseEntity<Attendance> updateAttendance(@PathVariable("id") Long id,
			@RequestBody Attendance attendance) {
		return attendanceService.updateAttendance(id, attendance);
	}

	// Delete Attendance by ID
	@DeleteMapping("/delete/{id}")
	public ResponseEntity<String> deleteAttendance(@PathVariable("id") Long id) {
		return attendanceService.deleteAttendance(id);
	}

	// Get Attendances by Student ID
	@GetMapping("/student/{studentId}")
	@JsonView(JsonResoponse_View.DetailedView.class)
	public ResponseEntity<List<Attendance>> getAttendancesByStudentId(@PathVariable("studentId") Long studentId) {
		List<Attendance> attendances = attendanceService.getAttendancesByStudentId(studentId);
		return ResponseEntity.ok(attendances);
	}
}
