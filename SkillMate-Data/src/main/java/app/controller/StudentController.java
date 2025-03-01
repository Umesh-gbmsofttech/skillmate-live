package app.controller;

import app.entity.Course;
import app.entity.Student;
import app.jwt.JwtResponse;
import app.service.StudentService;
import jakarta.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController()
@RequestMapping("/students")
public class StudentController {

	private static final Logger logger = LoggerFactory.getLogger(StudentController.class);

	@Autowired
	private StudentService studentService;

	// create student and return jwt token and user data
	@PostMapping
	public ResponseEntity<Object> createStudent(@Valid @RequestBody Student student) {
		try {
			JwtResponse jwtResponse = studentService.saveStudent(student);
			return new ResponseEntity<>(jwtResponse, HttpStatus.CREATED);
		} catch (Exception e) {
			e.printStackTrace();
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@GetMapping("/my-courses/{id}")
	public ResponseEntity<List<Course>> getAllMyCourses(@PathVariable Long id) {
		return null;
	}

	// Get all Students
	@GetMapping
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
	@GetMapping("/{id}")
	public ResponseEntity<Student> getStudentById(@PathVariable("id") Long id) {
		Optional<Student> studentData = studentService.getStudentById(id);
		if (studentData.isPresent()) {
			return new ResponseEntity<>(studentData.get(), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PutMapping("/{id}")
	public ResponseEntity<Student> updateStudentProfile(@PathVariable("id") Long id,
			@Valid @RequestBody Student updatedStudent) {
		try {
			Student updatedProfile = studentService.updateStudentWithHistory(id, updatedStudent);
			return new ResponseEntity<>(updatedProfile, HttpStatus.OK);
		} catch (RuntimeException e) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteStudent(@PathVariable Long id) {
		try {
			studentService.deleteStudent(id);
			return new ResponseEntity<>("Student deleted successfully", HttpStatus.OK);
		} catch (RuntimeException e) {
			return new ResponseEntity<>(e.getMessage(), HttpStatus.NOT_FOUND);
		}
	}

}
