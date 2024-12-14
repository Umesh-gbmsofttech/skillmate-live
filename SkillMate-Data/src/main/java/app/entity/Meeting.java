package app.entity;

import java.sql.Time;
import java.util.List;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;

@Entity
public class Meeting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String meetingLink;
    private Time from_time;
    private Time to_time;
    private String message;

    @ManyToOne
    private Trainer trainer;
    @ManyToMany
    private List<Student> students;
}
