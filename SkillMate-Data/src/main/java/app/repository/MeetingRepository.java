package app.repository;

import app.entity.Meeting;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalTime;
import java.util.List;

@Repository
public interface MeetingRepository extends JpaRepository<Meeting, Long> {


//	 // Fetch the latest meeting for a given course, ordered by `created_at` descending
//    @Query("SELECT m FROM Meeting m JOIN m.courses c WHERE c.id = :courseId ORDER BY m.created_at DESC")
//    List<Meeting> findLatestMeetingByCourseId(@Param("courseId") Long courseId, Pageable pageable);
	
//	@Query("SELECT m FROM Meeting m JOIN m.courses c " +
//		       "WHERE c.id = :courseId " +
//		       "AND DATE(m.created_at) = CURRENT_DATE " + // Ensure meeting is created today
//		       "AND m.fromTime >= :currentTime " +        // fromTime should be in the future
//		       "ORDER BY m.fromTime ASC")                // Get the nearest upcoming meeting
//		List<Meeting> findValidLatestMeetingByCourseId(
//		    @Param("courseId") Long courseId,
//		    @Param("currentTime") LocalTime currentTime,
//		    Pageable pageable);
	@Query("SELECT m FROM Meeting m JOIN m.courses c " +
		       "WHERE c.id = :courseId " +
		       "AND m.fromTime >= :currentTime " +        // Modify if you want past meetings too
		       "ORDER BY m.fromTime ASC")                 // Get the nearest upcoming meeting
		List<Meeting> findValidLatestMeetingByCourseId(
		    @Param("courseId") Long courseId,
		    @Param("currentTime") LocalTime currentTime,
		    Pageable pageable);


	}


