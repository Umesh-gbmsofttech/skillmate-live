package app.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

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

    @JsonFormat(pattern = "HH:mm:ss") // Ensure time is in hh:mm:ss format
    private LocalTime inTime = LocalTime.now();

    @JsonFormat(pattern = "HH:mm:ss") // Ensure time is in hh:mm:ss format
    private LocalTime outTime;

    @JsonBackReference
    @ManyToOne
    @JoinColumn(name = "meeting_id")
    private Meeting meeting;

    @ManyToOne
    @JoinColumn(name = "student_id")
    private Student student;

    @JsonFormat(pattern = "dd-MM-yyyy") // Ensure date is in dd-mm-yyyy format
    private LocalDateTime attendanceTimestamp = LocalDateTime.now();
}
