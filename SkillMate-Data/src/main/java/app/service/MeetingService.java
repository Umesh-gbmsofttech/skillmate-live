package app.service;

import app.entity.Meeting;
import app.repository.MeetingRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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
    public Optional<Meeting> getMeetingforStudent(Long batchId, Long courseId, Long trainerId) {
        Optional<Meeting> meeting = meetingRepository.findNextMeeting(batchId, courseId, trainerId);
        return meeting;
    }

    // find meetings for Trainer
    public List<Meeting> getMeetingForTrainer(Long trainerId) {
        List<Meeting> meeting = meetingRepository.findUpcomingMeetingsByTrainerId(trainerId);
        return meeting;
    }

    public void deleteMeeting(Long id) {
        meetingRepository.deleteById(id);
    }
}
