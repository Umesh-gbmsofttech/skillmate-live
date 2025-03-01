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
        if (student.getRoles() == null) {
            student.setRoles(new HashSet<>());
        }
        student.getRoles().add(Role.STUDENT);
        Student saved = studentRepository.save(student);
        String token = authService.generateToken(authService.getStudentUserDetails(saved));
        return JwtResponse.builder().token(token).userData(saved).build();
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Optional<Student> getStudentById(Long id) {
        return studentRepository.findById(id);
    }

    public Student updateStudentWithHistory(Long id, Student updatedStudent) {
        return studentRepository.findById(id)
                .map(existingStudent -> {
                    // Update only non-null fields
                    if (updatedStudent.getName() != null) {
                        existingStudent.setName(updatedStudent.getName());
                    }
                    if (updatedStudent.getMobileNumber() != null) {
                        existingStudent.setMobileNumber(updatedStudent.getMobileNumber());
                    }
                    if (updatedStudent.getWorkingStatus() != null) {
                        existingStudent.setWorkingStatus(updatedStudent.getWorkingStatus());
                    }
                    if (updatedStudent.getEmail() != null) {
                        existingStudent.setEmail(updatedStudent.getEmail());
                    }
                    if (updatedStudent.getAddress() != null) {
                        existingStudent.setAddress(updatedStudent.getAddress());
                    }
                    if (updatedStudent.getQualification() != null) {
                        existingStudent.setQualification(updatedStudent.getQualification());
                    }
                    if (updatedStudent.getImage() != null) {
                        existingStudent.setImage(updatedStudent.getImage());
                    }
                    if (updatedStudent.getResume() != null) {
                        existingStudent.setResume(updatedStudent.getResume());
                    }
                    if (existingStudent.getRoles() == null) {
                        existingStudent.setRoles(new HashSet<>());
                    }
                    existingStudent.getRoles().add(Role.STUDENT);

                    return studentRepository.save(existingStudent);
                })
                .orElseThrow(() -> new RuntimeException("Student not found with ID: " + id));
    }

    // public void deleteStudent(Long id) {

    // studentRepository.deleteByStudentId(id);
    // }
    @Transactional
    public void deleteStudent(Long studentId) {
        studentRepository.deleteCourseRatings(studentId);
        studentRepository.deleteTrainerRatings(studentId);
        studentRepository.deleteBatchStudents(studentId);
        studentRepository.deleteAttendance(studentId);
        studentRepository.deleteStudentRoles(studentId);
        studentRepository.deleteEnrollments(studentId);
        studentRepository.deleteStudentById(studentId);
    }
}
