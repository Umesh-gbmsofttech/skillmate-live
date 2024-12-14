package app.controller;

import app.entity.Meeting;
import app.service.MeetingService;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

// import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/meetings")
public class MeetingController {

    @Autowired
    private MeetingService meetingService;

    // Get All Meetings
    @GetMapping("/fetch")
    public List<Meeting> getAllMeetings() {
        return meetingService.getAllMeetings();
    }

    // Get Meeting by ID
    @GetMapping("/fetch/{id}")
    public ResponseEntity<Meeting> getMeetingById(@PathVariable("id") Long id) {
        return meetingService.getMeetingById(id);
    }

    // Create or Update Meeting
    @PostMapping("/create")
    public ResponseEntity<Meeting> createOrUpdateMeeting(@Valid @RequestBody Meeting meeting) {
        Meeting savedMeeting = meetingService.createOrUpdateMeeting(meeting);
        return ResponseEntity.status(201).body(savedMeeting); // Return HTTP 201 (Created)
    }

    // Delete Meeting by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteMeeting(@PathVariable("id") Long id) {
        return meetingService.deleteMeeting(id);
    }

    // Get Meetings by Trainer ID
    @GetMapping("/trainer/{trainerId}")
    public List<Meeting> getMeetingsByTrainerId(@PathVariable("trainerId") Long trainerId) {
        return meetingService.getMeetingsByTrainerId(trainerId);
    }
}
