package app.repository;

import app.entity.TrainerCourse;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TrainerCourseRepository extends JpaRepository<TrainerCourse, Long> {
    List<TrainerCourse> findByTrainerId(Long trainerId);
}
