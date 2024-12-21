package app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import app.entity.StudentProfileUpdated;

@Repository
public interface StudentProfileUpdatedRepository extends JpaRepository<StudentProfileUpdated, Long>{
	
	Optional<StudentProfileUpdated> findByStudentId(Long id);
}
