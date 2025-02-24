package app.repository;

import app.entity.Meeting;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface MeetingRepository extends JpaRepository<Meeting, Long> {

        // Custom query to find the most recent meeting for a specific student
        @Query("SELECT m FROM Meeting m WHERE m.batch.id = :batchId " +
                        "AND m.course.id = :courseId " +
                        "AND (:currentTime BETWEEN m.startTime AND m.endTime " +
                        "OR :currentTimePlus30 BETWEEN m.startTime AND m.endTime) " +
                        "AND m.createdAt >= :yesterday " +
                        "ORDER BY m.createdAt DESC, m.startTime DESC")
        Optional<Meeting> findLatestMeeting(@Param("batchId") Long batchId,
                        @Param("courseId") Long courseId,
                        @Param("currentTime") LocalTime currentTime,
                        @Param("currentTimePlus30") LocalTime currentTimePlus30,
                        @Param("yesterday") LocalDateTime yesterday);

        // Custom query to find upcoming meetings for a specific trainer
        @Query("SELECT m FROM Meeting m WHERE m.trainer.id = :trainerId " +
                        "AND m.course.id = :courseId " +
                        "AND m.createdAt >= :yesterday " + // Only consider meetings from the last 24 hours
                        "AND (m.startTime >= :currentTime OR (m.startTime <= :currentTime AND m.endTime >= :currentTime)) "
                        +
                        "ORDER BY m.startTime ASC")
        List<Meeting> findUpcomingMeetingsByTrainerIdAndCourseId(
                        @Param("trainerId") Long trainerId,
                        @Param("courseId") Long courseId,
                        @Param("currentTime") LocalTime currentTime,
                        @Param("yesterday") LocalDateTime yesterday);

}
