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
        return meetingRepository.save(meeting);
    }

    public List<Meeting> getAllMeetings() {
        return meetingRepository.findAll();
    }

    public Optional<Meeting> getMeetingById(Long id) {
        return meetingRepository.findById(id);
    }

    // find meeting for student course
    public Optional<Meeting> getMeetingForStudent(Long batchId, Long courseId) {
        LocalTime currentTime = LocalTime.now();
        LocalTime currentTimePlus30 = currentTime.plusMinutes(30);
        LocalDateTime yesterday = LocalDateTime.now().minusDays(1); // 24 hours ago

        return meetingRepository.findLatestMeeting(batchId, courseId, currentTime, currentTimePlus30, yesterday);
    }

    // find meetings for Trainer
    public List<Meeting> getMeetingsForTrainer(Long trainerId, Long courseId) {
        LocalDateTime yesterday = LocalDateTime.now().minusDays(1);
        LocalTime currentTime = LocalTime.now();
        return meetingRepository.findUpcomingMeetingsByTrainerIdAndCourseId(trainerId, courseId, currentTime,
                yesterday);
    }

    public void deleteMeeting(Long id) {
        meetingRepository.deleteById(id);
    }
}
