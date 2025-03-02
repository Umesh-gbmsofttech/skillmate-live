package app.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Attendance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private boolean attended;
    private Long batch_id;

    private String remark;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "meeting_id")
    private Meeting meeting;
    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @JsonFormat(pattern = "dd-MM-yyyy HH:mm:ss") // Ensure date-time format
    private LocalDateTime attendanceTimestamp;

    @PrePersist
    protected void onCreate() {
        this.attendanceTimestamp = LocalDateTime.now(); // Set timestamp before persisting
    }
}
