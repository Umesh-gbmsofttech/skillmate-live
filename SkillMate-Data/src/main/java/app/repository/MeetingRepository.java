package app.repository;

import app.entity.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MeetingRepository extends JpaRepository<Meeting, Long> {

    // Custom query to find the most recent meeting for a specific student
    @Query("SELECT m FROM Meeting m WHERE m.batch.id = :batchId " +
            "AND m.course.id = :courseId " +
            "AND m.trainer.id = :trainerId " +
            "AND m.startTime > CURRENT_TIMESTAMP " +
            "AND (m.endTime IS NULL OR m.endTime > CURRENT_TIMESTAMP) " +
            "ORDER BY m.startTime DESC")
    Optional<Meeting> findNextMeeting(Long batchId, Long courseId, Long trainerId);

    // Custom query to find upcoming meetings for a specific trainer
    @Query("SELECT m FROM Meeting m WHERE m.trainer.id = :trainerId " +
            "AND m.startTime > CURRENT_TIMESTAMP " +
            "AND (m.endTime IS NULL OR m.endTime > CURRENT_TIMESTAMP) " +
            "ORDER BY m.startTime DESC")
    List<Meeting> findUpcomingMeetingsByTrainerId(Long trainerId);
}
