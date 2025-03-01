package app.controller;

import app.entity.Meeting;
import app.service.MeetingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/meetings")
public class MeetingController {

    @Autowired
    private MeetingService meetingService;

    @PostMapping
    public Meeting addMeeting(@RequestBody Meeting meeting) {
        return meetingService.saveMeeting(meeting);
    }

    @GetMapping
    public List<Meeting> getAllMeetings() {
        return meetingService.getAllMeetings();
    }

    @GetMapping("/{id}")
    public Optional<Meeting> getMeetingById(@PathVariable Long id) {
        return meetingService.getMeetingById(id);
    }

    // find meeting for student's course
    // Find meeting for student's course
    @GetMapping("/student/{batchId}/{courseId}")
    public Optional<Meeting> getMeetingForStudent(@PathVariable Long batchId, @PathVariable Long courseId) {
        System.err.println("batchId: " + batchId + " courseId: " + courseId);
        System.err.println(meetingService.getUpcomingMeetingForStudent(batchId, courseId));
        return meetingService.getUpcomingMeetingForStudent(batchId, courseId);
    }

    // find meetings for trainer
    @GetMapping("/trainer/{trainerId}/{courseId}")
    public ResponseEntity<Meeting> getLatestUpcomingMeetingForTrainer(
            @PathVariable Long trainerId,
            @PathVariable Long courseId) {
        Meeting meeting = meetingService.getLatestUpcomingMeetingForTrainer(trainerId, courseId);
        return meeting != null ? ResponseEntity.ok(meeting) : ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public void deleteMeeting(@PathVariable Long id) {
        meetingService.deleteMeeting(id);
    }
}
