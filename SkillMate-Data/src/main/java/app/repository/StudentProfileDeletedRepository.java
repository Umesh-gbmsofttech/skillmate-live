package app.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import app.entity.StudentProfileDeleted;



@Repository
public interface StudentProfileDeletedRepository extends JpaRepository<StudentProfileDeleted, Long>{

	 Optional<StudentProfileDeleted> findById(Long id);

}
