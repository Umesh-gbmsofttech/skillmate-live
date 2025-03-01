package app.service;

import app.entity.Meeting;
import app.repository.MeetingRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class MeetingService {

    @Autowired
    private MeetingRepository meetingRepository;

    public Meeting saveMeeting(Meeting meeting) {
        meeting.setCreatedAt(LocalDateTime.now());
        return meetingRepository.save(meeting);
    }

    public List<Meeting> getAllMeetings() {
        return meetingRepository.findAll();
    }

    public Optional<Meeting> getMeetingById(Long id) {
        return meetingRepository.findById(id);
    }

    // Find the latest meeting for a student’s batch and course
    public Optional<Meeting> getUpcomingMeetingForStudent(Long batchId, Long courseId) {
        LocalDateTime currentTime = LocalDateTime.now();
        LocalDateTime currentTimePlus30 = currentTime.plusMinutes(30);
        LocalDateTime yesterday = currentTime.minusDays(1);

        System.out.println("Finding meetings for Batch: " + batchId + ", Course: " + courseId);
        System.out.println("Current Time: " + currentTime);
        System.out.println("Current Time + 30: " + currentTimePlus30);
        System.out.println("Yesterday: " + yesterday);

        List<Meeting> meetings = meetingRepository.findUpcomingMeeting(batchId, courseId, currentTime,
                currentTimePlus30, yesterday);

        if (meetings.isEmpty()) {
            System.out.println("No meetings found.");
            return Optional.empty();
        } else {
            System.out.println("Meeting found: " + meetings.get(0));
            return Optional.of(meetings.get(0));
        }
    }

    // Find the next upcoming meeting for a trainer in a course
    public Meeting getLatestUpcomingMeetingForTrainer(Long trainerId, Long courseId) {
        LocalDateTime timeThreshold = LocalDateTime.now().minusDays(1); // Last 24 hours
        LocalDateTime currentDateTime = LocalDateTime.now();

        List<Meeting> meetings = meetingRepository.findUpcomingMeetingsByTrainerAndCourse(
                trainerId, courseId, currentDateTime, timeThreshold);

        return meetings.isEmpty() ? null : meetings.get(0); // Return the first upcoming meeting
    }

    public void deleteMeeting(Long id) {
        meetingRepository.deleteById(id);
    }
}
