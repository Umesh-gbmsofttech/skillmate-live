package app.entity;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "course")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Lob
    private byte[] image;

    private String title;
    private String description;
    private int days;
    private int price;

    private LocalDate startDate;
    private LocalDate endDate;
    // private LocalTime startTime;
    // private LocalTime endTime;

    @JsonIgnore
    @OneToMany(mappedBy = "course")
    private List<Enrollment> enrollments;// this is causing problem when serialization and deserialization

    @JsonIgnore
    @OneToMany(mappedBy = "course")
    private List<TrainerCourse> trainerCourses;

    @JsonIgnore
    @OneToMany(mappedBy = "course")
    private List<Batch> batchs;
}
