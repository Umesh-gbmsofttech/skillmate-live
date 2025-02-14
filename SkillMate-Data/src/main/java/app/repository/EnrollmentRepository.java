package app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import app.entity.Enrollment;

public interface EnrollmentRepository extends JpaRepository <Enrollment, Long>{
    
}
