package app.service;

import app.entity.Meeting;
import app.repository.MeetingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

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

    // Get Meetings by Trainer ID
    public List<Meeting> getMeetingsByTrainerId(Long trainerId) {
        return meetingRepository.findAll(); // Placeholder, can be updated with specific query if needed
    }
}
