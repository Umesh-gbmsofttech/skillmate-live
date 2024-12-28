package app.controller;

import app.entity.Attendance;
import app.entity.Course;
import app.entity.Student;
import app.entity.StudentProfileUpdated;
import app.exception.EntityNotFoundException;
import app.jwt.JwtResponse;
import app.repository.AttendanceRepository;
import app.repository.CourseRepository;
import app.repository.StudentRepository;
import app.service.StudentService;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

//import javax.validation.Valid;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/students")
public class StudentController {

	@Autowired
	StudentRepository studentRepository;
	
	@Autowired
	private AttendanceRepository attendanceRepository;
	
	@Autowired
	CourseRepository courseRepository;
	
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
	@PutMapping("/students/{id}/add-course")
    public ResponseEntity<?> addCourseToStudent(@PathVariable Long id, @RequestBody Long courseId) {
        Student student = studentRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Student not found"));
        Course course = courseRepository.findById(courseId).orElseThrow(() -> new EntityNotFoundException("Course not found"));
        student.getCourses().add(course);
        studentRepository.save(student);
        return ResponseEntity.ok("Course added to student");
    }

    // Get all courses for a student
    @GetMapping("/fetch/my-courses/{id}")
    public ResponseEntity<List<Course>> getAllMyCourses(@PathVariable Long id) {
        try {
            Student student = studentRepository.findById(id).orElseThrow(() -> new EntityNotFoundException("Student not found"));
            List<Course> courses = student.getCourses();
            return courses.isEmpty() ? new ResponseEntity<>(HttpStatus.NO_CONTENT)
                    : new ResponseEntity<>(courses, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
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
//	@PutMapping("/students/{studentId}")
//	public ResponseEntity<Attendance> updateStudentAttendanceDetails(
//	    @PathVariable Long studentId, 
//	    @RequestBody Map<String, Object> updatedFields) {
//	    
//	    // Step 1: Retrieve the student from the repository (if needed for validation)
//	    Student student = studentRepository.findById(studentId)
//	        .orElseThrow(); 
//	    // Step 2: Retrieve the attendance record for the student
//	    Attendance attendance = attendanceRepository.findByStudent(student)
//	        .orElseThrow();
//
//	    // Step 3: Update the attendance fields based on the input
//	    updatedFields.forEach((key, value) -> {
//	        switch (key) {
//	            case "inTime":
//	                attendance.setOutTime((String) value);
//	                break;
//	            case "outTime":
//	                attendance.setOutTime((String) value);
//	                break;
//	            case "remark":
//	                attendance.setRemark((String) value);
//	                break;
//	            default:
//	                break;
//	        }
//	    });
//	    
//	    // Step 4: Save the updated attendance record
//	    attendanceRepository.save(attendance);
//	    
//	    // Step 5: Return the updated attendance record
//	    return ResponseEntity.ok(attendance);
//	}


}
