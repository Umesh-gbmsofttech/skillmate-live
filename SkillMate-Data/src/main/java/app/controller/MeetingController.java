package app.controller;

import app.entity.Meeting;
import app.service.MeetingService;
import org.springframework.beans.factory.annotation.Autowired;
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
    @GetMapping("/student/{batchId}/{courseId}/{trainerId}")
    public Optional<Meeting> getMeetingforStudent(@PathVariable Long batchId, @PathVariable Long courseId,
            @PathVariable Long trainerId) {
        return meetingService.getMeetingforStudent(batchId, courseId, trainerId);
    }

    // find meetings for trainer
    @GetMapping("/trainer/{trainerId}")
    public List<Meeting> getMeetingforStudent(
            @PathVariable Long trainerId) {
        return meetingService.getMeetingForTrainer(trainerId);
    }

    @DeleteMapping("/{id}")
    public void deleteMeeting(@PathVariable Long id) {
        meetingService.deleteMeeting(id);
    }
}
