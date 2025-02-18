package app.repository;

import app.entity.TrainerCourse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrainerCourseRepository extends JpaRepository<TrainerCourse, Long> {

}
