package app.service;

import app.entity.Student;
import app.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    // Create a new Student
    public Student createStudent(Student student) {
        return studentRepository.save(student);
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
