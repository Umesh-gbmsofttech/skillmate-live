package app.controller;

import app.entity.JsonResoponse_View;
import app.entity.Meeting;
import app.service.MeetingService;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.fasterxml.jackson.annotation.JsonView;

// import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/meetings")
public class MeetingController {

    @Autowired
    private MeetingService meetingService;

    // Get All Meetings
    @GetMapping("/fetch")
    @JsonView(JsonResoponse_View.DetailedView.class)
    public List<Meeting> getAllMeetings() {
        return meetingService.getAllMeetings();
    }

    // Get Meeting by ID
    @GetMapping("/fetch/{id}")
    @JsonView(JsonResoponse_View.DetailedView.class)
    public ResponseEntity<Meeting> getMeetingById(@PathVariable("id") Long id) {
        return meetingService.getMeetingById(id);
    }
    
//    // Endpoint to get the latest 4 meetings
//    @GetMapping("/meetings/latest")
//    @JsonView(JsonResoponse_View.BasicView.class)
//    public ResponseEntity<List<Meeting>> getLatestMeetings() {
//        List<Meeting> latestMeetings = meetingService.getLatestMeetings();
//        return ResponseEntity.ok(latestMeetings);
//    }
//    // Get Meeting by Student ID
//    @GetMapping("/student/my-meetings/fetch/{studentId}")
//    @JsonView(JsonResoponse_View.DetailedView.class)
//    public ResponseEntity<Meeting> getStudentMeetings(@PathVariable("studentId") Long id) {
//    	return meetingService.getMyMeetingsForStudent(id);
//    }
//    // Get Meeting by Trainer ID
//    @GetMapping("/trainer/my-meetings/fetch/{trainerId}")
//    @JsonView(JsonResoponse_View.DetailedView.class)
//    public ResponseEntity<Meeting> getTrainerMeetings(@PathVariable("trainerId") Long id) {
//    	return meetingService.getMyMeetingsForTrainer(id);
//    }

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
    @JsonView(JsonResoponse_View.DetailedView.class)
    public List<Meeting> getMeetingsByTrainerId(@PathVariable("trainerId") Long trainerId) {
        return meetingService.getMeetingsByTrainerId(trainerId);
    }
    // Get Meetings by Student ID
//    @GetMapping("/student/{studentId}")
//    @JsonView(JsonResoponse_View.DetailedView.class)
//    public List<Meeting> getMeetingsByStudentId(@PathVariable("studentId") Long studentId) {
//    	return meetingService.getMeetingsByStudentId(studentId);
//    }
}
