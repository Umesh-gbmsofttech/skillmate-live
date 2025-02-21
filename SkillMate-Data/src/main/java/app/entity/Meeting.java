package app.entity;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

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

    @JsonFormat(pattern = "HH:mm")
    private LocalTime startTime;
    @JsonFormat(pattern = "HH:mm")
    private LocalTime endTime;
    private String meetingLink;

    @ManyToOne
    @JoinColumn(name = "course_id")
    private Course course;// extra to store the id of course for each meeting

    // @JsonIgnore
    @ManyToOne
    @JoinColumn(name = "trainer_id")
    // @JsonManagedReference
    private Trainer trainer;

    @JsonManagedReference
    @OneToMany(mappedBy = "meeting", cascade = CascadeType.ALL)
    private List<Attendance> attendances;

    @ManyToOne
    @JoinColumn(name = "batch_id")
    // @JsonManagedReference
    private Batch batch;
}
