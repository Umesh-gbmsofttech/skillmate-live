package app.repository;

import app.entity.Student;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;


@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
	 Optional<Student> findByName(String name);
	 Optional<Student>findByMobileNumber(String mobileNumber);
	 Optional<Student> findByEmail(String email);
	 boolean existsByMobileNumber(String mobileNumber);
	 boolean existsByEmail(String email);
	 
	 
 }