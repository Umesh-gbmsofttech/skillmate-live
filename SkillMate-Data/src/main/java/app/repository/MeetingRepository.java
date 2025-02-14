package app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import app.entity.Meeting;

public interface MeetingRepository extends JpaRepository<Meeting, Long> {
    
}
