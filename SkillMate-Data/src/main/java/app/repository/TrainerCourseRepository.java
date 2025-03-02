package app.repository;

import app.entity.TrainerCourse;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface TrainerCourseRepository extends JpaRepository<TrainerCourse, Long> {
    List<TrainerCourse> findByTrainerId(Long trainerId);

    boolean existsByTrainerIdAndCourseId(@Param("trainerId") Long trainerId, @Param("courseId") Long courseId);

}
