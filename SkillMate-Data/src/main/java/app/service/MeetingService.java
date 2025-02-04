package app.service;

import app.dto.MeetingBatchDTO;
import app.entity.Meeting;
import app.repository.MeetingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
public class MeetingService {

    @Autowired
    private MeetingRepository meetingRepository;

    // Create or Update Meeting
    public Meeting createOrUpdateMeeting(Meeting meeting) {
        try {
            return meetingRepository.save(meeting);
        } catch (Exception e) {
            throw new RuntimeException("Failed to save meeting record: " + e.getMessage());
        }
    }

    // Get Meeting by ID
    public ResponseEntity<Meeting> getMeetingById(Long id) {
        Optional<Meeting> meeting = meetingRepository.findById(id);
        if (meeting.isPresent()) {
            return ResponseEntity.ok(meeting.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(null);
        }
    }
// // Method to fetch the latest 4 meetings
//    public List<Meeting> getLatestMeetings() {
//        return meetingRepository.findTop4LatestMeetings();
//    }
    // Get All Meetings
    public List<Meeting> getAllMeetings() {
        return meetingRepository.findAll();
    }

    // Delete Meeting by ID
    public ResponseEntity<String> deleteMeeting(Long id) {
        try {
            if (meetingRepository.existsById(id)) {
                meetingRepository.deleteById(id);
                return ResponseEntity.ok("Meeting record deleted successfully.");
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Meeting record not found.");
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Failed to delete meeting record: " + e.getMessage());
        }
    }

 // Method to fetch the latest valid meeting for a given course
//    public Meeting getLatestMeetingForCourse(Long courseId) {
//        LocalTime currentTime = LocalTime.now(); // Get current time
//        
//        Pageable pageable = PageRequest.of(0, 1); // Fetch only the latest meeting
//
//        List<Meeting> meetings = meetingRepository.findValidLatestMeetingByCourseId(courseId, currentTime, pageable);
//        
//        return meetings.isEmpty() ? null : meetings.get(0);
//    }
    public MeetingBatchDTO getLatestMeetingForCourse(Long courseId) {
        LocalTime currentTime = LocalTime.now(); // Get current time

        Pageable pageable = PageRequest.of(0, 1); // Fetch only the latest meeting

        List<Meeting> meetings = meetingRepository.findValidLatestMeetingByCourseId(courseId, currentTime, pageable);

        if (meetings.isEmpty()) {
            return null;
        } else {
            Meeting latestMeeting = meetings.get(0);
            Long batchId = latestMeeting.getBatches().isEmpty() ? null : latestMeeting.getBatches().get(0).getId();
            return new MeetingBatchDTO(latestMeeting, batchId);
        }
    }
        

    // Get Meetings by Trainer ID
    public List<Meeting> getMeetingsByTrainerId(Long trainerId) {
        return meetingRepository.findAll(); // Placeholder, can be updated with specific query if needed
    }

	public List<Meeting> getMeetingsByStudentId(Long studentId) {
		return meetingRepository.findAll();
	}

}
