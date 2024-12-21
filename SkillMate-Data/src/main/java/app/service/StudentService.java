package app.service;

import app.entity.Role;
import app.entity.Student;
import app.entity.Trainer;
import app.jwt.AuthService;
import app.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class StudentService {
	
    @Autowired
    private AuthService authService;  // Inject AuthService

    @Autowired
    private StudentRepository studentRepository;

    // Create a new Student with role
//    public Student createStudent(Student student) {
//        student.getRoles().add(Role.STUDENT);
//        return studentRepository.save(student);
//    }

    public String createStudent(Student student) {
        if (student.getRoles() == null) {
        	student.setRoles(new HashSet<>());
        }
        student.getRoles().add(Role.STUDENT);
        Student savedTrainer = studentRepository.save(student);

        // Generate JWT token for the saved trainer using AuthService
        return authService.generateToken(new org.springframework.security.core.userdetails.User(
                savedTrainer.getEmail(), 
                "", // Empty password as you might not be using passwords for trainers
                savedTrainer.getRoles().stream()
                    .map(role -> new org.springframework.security.core.authority.SimpleGrantedAuthority(role.name()))
                    .collect(Collectors.toList())
        ));
    }
    // Get all Students
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    // Get Student by ID
    public Optional<Student> getStudentById(Long studentId) {
        return studentRepository.findById(studentId);
    }

    // Update Student
    public Student updateStudent(Student student) {
        return studentRepository.save(student);
    }

    // Delete Student by ID
    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }
}
