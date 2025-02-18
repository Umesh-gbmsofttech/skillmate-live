package app.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "meeting")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Meeting {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private String meetingLink;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;// extra to store the id of course for each meeting
    @ManyToOne
    @JoinColumn(name = "trainer_id")
    private Trainer trainer;

    @OneToMany(mappedBy = "meeting")
    private List<Attendance> attendances;
}
