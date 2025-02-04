package app.service;

import app.entity.Role;
import app.entity.Student;
import app.entity.StudentProfileDeleted;
import app.entity.StudentProfileUpdated;
import app.entity.Trainer;
import app.jwt.AuthService;
import app.jwt.JwtResponse;
import app.otplogin.MobileOtpService;
import app.repository.StudentProfileDeletedRepository;
import app.repository.StudentProfileUpdatedRepository;
import app.repository.StudentRepository;
import app.repository.TrainerRepository;
import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StudentService {

	@Autowired
	private AuthService authService; 
	@Autowired
	private TrainerRepository trainerRepository; 
	@Autowired
	private StudentRepository studentRepository;

	@Autowired
	private StudentProfileUpdatedRepository studentProfileUpdatedRepository;

	@Autowired
	private StudentProfileDeletedRepository studentProfileDeletedRepository;

	// Create a new Student with role and return JWT token and user details
	public JwtResponse createStudent(Student student) {
		if (student.getRoles() == null) {
			student.setRoles(new HashSet<>());
		}
		student.getRoles().add(Role.STUDENT);
//		student.setTrainer(trainerRepository.findById(student.getTrainer().getId());
		Student savedStudent = studentRepository.save(student);
		// Generate JWT token for the saved student using AuthService
		String token = authService.generateToken(authService.getStudentUserDetails(savedStudent));
		// Return JWT token and user details
		return JwtResponse.builder().token(token).userData(savedStudent).build();
	}




	// Get all Students
	public List<Student> getAllStudents() {
		return studentRepository.findAll();
	}

	// Get Student by ID
	public Optional<Student> getStudentById(Long studentId) {
		return studentRepository.findById(studentId);
	}
//	public Optional<List<Student>> getCoursesByStudentId(Long id) {
//		return studentRepository;
//	}
//	
	@Transactional
	public Student updateStudentWithHistory(Long id, Student updatedStudent) {

	    // Fetch the existing student
	    Student existingStudent = studentRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Student not found with ID: " + id));

	    // Save the existing information in StudentProfileUpdated before updating
	    StudentProfileUpdated studentProfileUpdated = new StudentProfileUpdated();
	    studentProfileUpdated.setStudentId(existingStudent.getId());
	    studentProfileUpdated.setProfilePic(existingStudent.getProfilePic());
	    studentProfileUpdated.setFullName(existingStudent.getFullName());
	    studentProfileUpdated.setMobileNumber(existingStudent.getMobileNumber());
	    studentProfileUpdated.setEmail(existingStudent.getEmail());
	    studentProfileUpdated.setWorkingStatus(existingStudent.getWorkingStatus());
	    studentProfileUpdated.setAddress(existingStudent.getAddress());
	    studentProfileUpdated.setQualification(existingStudent.getQualification());
	    studentProfileUpdated.setResume(existingStudent.getResume());
	    studentProfileUpdated.setUpdatedAt(LocalDateTime.now());

	    studentProfileUpdatedRepository.save(studentProfileUpdated);

	    // Now update the Student entity only if fields are not null or empty
	    if (updatedStudent.getProfilePic() != null && updatedStudent.getProfilePic().length > 0) {
	        existingStudent.setProfilePic(updatedStudent.getProfilePic());
	    }
	    if (updatedStudent.getFullName() != null && !updatedStudent.getFullName().trim().isEmpty()) {
	        existingStudent.setFullName(updatedStudent.getFullName());
	    }
	    if (updatedStudent.getMobileNumber() != null && !updatedStudent.getMobileNumber().trim().isEmpty()) {
	        existingStudent.setMobileNumber(updatedStudent.getMobileNumber());
	    }
	    if (updatedStudent.getEmail() != null && !updatedStudent.getEmail().trim().isEmpty()) {
	        existingStudent.setEmail(updatedStudent.getEmail());
	    }
	    if (updatedStudent.getWorkingStatus() != null && !updatedStudent.getWorkingStatus().trim().isEmpty()) {
	        existingStudent.setWorkingStatus(updatedStudent.getWorkingStatus());
	    }
	    if (updatedStudent.getAddress() != null && !updatedStudent.getAddress().trim().isEmpty()) {
	        existingStudent.setAddress(updatedStudent.getAddress());
	    }
	    if (updatedStudent.getQualification() != null && !updatedStudent.getQualification().trim().isEmpty()) {
	        existingStudent.setQualification(updatedStudent.getQualification());
	    }
	    if (updatedStudent.getResume() != null && updatedStudent.getResume().length > 0) {
	        existingStudent.setResume(updatedStudent.getResume());
	    }

	    // Save and return the updated Student entity
	    return studentRepository.save(existingStudent);
	}



	@Transactional
	public synchronized void deleteStudent(Long id) {
		// Find the student by ID
		Student student = studentRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Student not found with ID: " + id));

		// Create a new deleted student profile record
		StudentProfileDeleted studentProfileDeleted = new StudentProfileDeleted();
		studentProfileDeleted.setStudentId(student.getId()); // Store student ID in the deleted profile
		studentProfileDeleted.setProfilePic(student.getProfilePic());
		studentProfileDeleted.setFullName(student.getFullName());
		studentProfileDeleted.setMobileNumber(student.getMobileNumber());
		studentProfileDeleted.setEmail(student.getEmail());
		studentProfileDeleted.setWorkingStatus(student.getWorkingStatus());
		studentProfileDeleted.setAddress(student.getAddress());
		studentProfileDeleted.setQualification(student.getQualification());
		studentProfileDeleted.setResume(student.getResume());
		studentProfileDeleted.setDeletedAt(LocalDateTime.now());

		synchronized (this) {
			// Save the deleted profile
			studentProfileDeleted = studentProfileDeletedRepository.save(studentProfileDeleted);

			// Delete the student record
			studentRepository.deleteById(id);
		}
	}




	public List<Student> getAllBatchesByBatchId(Long batchId) {
		return studentRepository.findByBatches_Id(batchId);
	}



}
