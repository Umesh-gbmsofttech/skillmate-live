package app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import app.entity.Assignment;

public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    
}
