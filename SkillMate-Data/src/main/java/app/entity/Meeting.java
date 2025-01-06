package app.entity;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonView;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Meeting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView(JsonResoponse_View.BasicView.class)
    private Long id;

    @JsonView(JsonResoponse_View.BasicView.class)
    private String meetingLink;
    private LocalTime fromTime;
    private LocalTime toTime;
    private String message;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trainer_id", nullable = false)
    private Trainer trainer;

    @ManyToMany
    @JoinTable(
        name = "meeting_students",
        joinColumns = @JoinColumn(name = "meeting_id"),
        inverseJoinColumns = @JoinColumn(name = "student_id")
    )
    private List<Student> students;
    
    @ManyToMany
    @JoinTable(
    		name = "meeting_courses",
    		joinColumns = @JoinColumn(name = "meeting_id"),
    		inverseJoinColumns = @JoinColumn(name = "course_id")
    		)
    private List<Course> courses;
}
