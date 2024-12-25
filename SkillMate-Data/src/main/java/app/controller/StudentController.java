package app.controller;

import app.entity.Student;
import app.entity.StudentProfileUpdated;
import app.jwt.JwtResponse;
import app.service.StudentService;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/students")
public class StudentController {

	@Autowired
	private StudentService studentService;

	//create student and return jwt token and user data
	@PostMapping("/create")
	public ResponseEntity<Object> createStudent(@Valid @RequestBody Student student) {
		try {
			JwtResponse jwtResponse = studentService.createStudent(student);
			return new ResponseEntity<>(jwtResponse, HttpStatus.CREATED);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}


	// Get all Students
	@GetMapping("/fetch")
	public ResponseEntity<List<Student>> getAllStudents() {
		try {
			List<Student> students = studentService.getAllStudents();
			return students.isEmpty() ? new ResponseEntity<>(HttpStatus.NO_CONTENT)
					: new ResponseEntity<>(students, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	// Get a Student by ID
	@GetMapping("/fetch/{id}")
	public ResponseEntity<Student> getStudentById(@PathVariable("id") Long id) {
		Optional<Student> studentData = studentService.getStudentById(id);
		if (studentData.isPresent()) {
			return new ResponseEntity<>(studentData.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PutMapping("/update/{id}")
	public ResponseEntity<StudentProfileUpdated> updateStudentProfile(@PathVariable("id") Long id,
			@Valid @RequestBody Student updatedStudent) {
		try {
			StudentProfileUpdated updatedProfile = studentService.updateStudentWithHistory(id, updatedStudent);
			return new ResponseEntity<>(updatedProfile, HttpStatus.OK);
		} catch (RuntimeException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("delete/{id}")
	public ResponseEntity<String> deleteStudent(@PathVariable Long id) {
		try {
			studentService.deleteStudent(id);
			return ResponseEntity.ok("Student profile deleted successfully");
		} catch (RuntimeException e) {
			return ResponseEntity.status(404).body(e.getMessage());
		}
	}

}
