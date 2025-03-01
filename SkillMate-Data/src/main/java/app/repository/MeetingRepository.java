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

        // Find the most recent meeting for a specific student
        @Query("SELECT m FROM Meeting m WHERE m.batch.id = :batchId " +
                        "AND m.course.id = :courseId " +
                        "AND (m.startTime >= :currentTimePlus30 AND m.endTime > :currentTime " + // Meetings starting
                                                                                                 // ahead 30 mins
                        "OR m.endTime > :currentTime) " + // Ongoing meetings
                        "AND m.createdAt >= :yesterday " + // Created within last 24 hours
                        "ORDER BY m.startTime ASC")
        List<Meeting> findUpcomingMeeting(
                        @Param("batchId") Long batchId,
                        @Param("courseId") Long courseId,
                        @Param("currentTime") LocalDateTime currentTime,
                        @Param("currentTimePlus30") LocalDateTime currentTimePlus30,
                        @Param("yesterday") LocalDateTime yesterday);

        // Find upcoming meetings for a trainer and course
        @Query("SELECT m FROM Meeting m " +
                        "WHERE m.trainer.id = :trainerId " +
                        "AND m.course.id = :courseId " +
                        "AND m.endTime > :currentDateTime " + // Meeting has not ended yet
                        "AND m.createdAt >= :timeThreshold " +
                        "ORDER BY m.startTime ASC") // Next upcoming meeting first
        List<Meeting> findUpcomingMeetingsByTrainerAndCourse(
                        @Param("trainerId") Long trainerId,
                        @Param("courseId") Long courseId,
                        @Param("currentDateTime") LocalDateTime currentDateTime, // Now
                        @Param("timeThreshold") LocalDateTime timeThreshold); // Meetings from past 24h
}
