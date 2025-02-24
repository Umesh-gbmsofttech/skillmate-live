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
    // @GetMapping("/student/{batchId}/{courseId}/{trainerId}")
    @GetMapping("/student/{batchId}/{courseId}")
    public Optional<Meeting> getMeetingforStudent(@PathVariable Long batchId, @PathVariable Long courseId) {
        System.err.println("batchId: " + batchId + " courseId: " + courseId);
        System.err.println(meetingService.getMeetingForStudent(batchId, courseId));
        return meetingService.getMeetingForStudent(batchId, courseId);
    }

    // find meetings for trainer
    @GetMapping("/trainer/{trainerId}/{courseId}")
    public List<Meeting> getMeetingsforTrainer(
            @PathVariable Long trainerId, @PathVariable Long courseId) {
        System.err.println("trainerId: " + trainerId + " courseId: " + courseId);
        return meetingService.getMeetingsForTrainer(trainerId, courseId);
    }

    @DeleteMapping("/{id}")
    public void deleteMeeting(@PathVariable Long id) {
        meetingService.deleteMeeting(id);
    }
}
