package app.repository;

import app.entity.Student;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
	 Optional<Student> findByFullName(String fullName);
	 Optional<Student> findByMobileNumber(String fullName);
}
