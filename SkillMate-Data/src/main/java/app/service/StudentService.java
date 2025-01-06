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
	public StudentProfileUpdated updateStudentWithHistory(Long id, Student updatedStudent) {

		Student existingStudent = studentRepository.findById(id)
				.orElseThrow(() -> new RuntimeException("Student not found with ID: " + id));

		Optional<StudentProfileUpdated> existingUpdatedProfile = studentProfileUpdatedRepository
				.findByStudentId(existingStudent.getId());

		StudentProfileUpdated studentProfileUpdated;

		if (existingUpdatedProfile.isPresent()) {

			studentProfileUpdated = existingUpdatedProfile.get();
		} else {

			studentProfileUpdated = new StudentProfileUpdated();
			studentProfileUpdated.setStudentId(existingStudent.getId());
		}

		studentProfileUpdated.setProfilePic(updatedStudent.getProfilePic());
		studentProfileUpdated.setFullName(updatedStudent.getFullName());
		studentProfileUpdated.setMobileNumber(updatedStudent.getMobileNumber());
		studentProfileUpdated.setEmail(updatedStudent.getEmail());
		studentProfileUpdated.setWorkingStatus(updatedStudent.getWorkingStatus());
		studentProfileUpdated.setAddress(updatedStudent.getAddress());
		studentProfileUpdated.setQualification(updatedStudent.getQualification());
		studentProfileUpdated.setResume(updatedStudent.getResume());
		studentProfileUpdated.setDeletedAt(LocalDateTime.now());

		return studentProfileUpdatedRepository.save(studentProfileUpdated);
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
