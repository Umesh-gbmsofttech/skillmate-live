package app.service;

import app.entity.Role;
import app.entity.Student;
import app.entity.Trainer;
import app.jwt.AuthService;
import app.jwt.JwtResponse;
import app.repository.StudentRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
  AuthService authService;
  
        public JwtResponse saveStudent(Student student) {
        if(student.getRoles()==null){
            student.setRoles(new HashSet<>());
        }
        student.getRoles().add(Role.STUDENT);
        Student saved= studentRepository.save(student);
        String token=authService.generateToken(authService.getStudentUserDetails(saved));
        return JwtResponse.builder().token(token).userData(saved).build();
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Optional<Student> getStudentById(Long id) {
        return studentRepository.findById(id);
    }

    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }
}
