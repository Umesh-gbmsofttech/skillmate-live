package app.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonView;

import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(indexes = {
    @Index(name = "idx_student_id", columnList = "student_id"),
    @Index(name = "idx_trainer_id", columnList = "trainer_id"),
    @Index(name = "idx_course_id", columnList = "course_id")
})
public class RatingReviews {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView(JsonResoponse_View.BasicView.class)
    private Long id;
    
    @JsonView(JsonResoponse_View.BasicView.class)
    private String review;
    
    @JsonView(JsonResoponse_View.BasicView.class)
    private double rating; 
    
    @JsonView(JsonResoponse_View.BasicView.class)
    private LocalDate reviewDate; 

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", referencedColumnName = "id")
    @JsonView(JsonResoponse_View.BasicView.class)
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "trainer_id", referencedColumnName = "id")
    @JsonView(JsonResoponse_View.BasicView.class)
    private Trainer trainer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "course_id", referencedColumnName = "id")
    @JsonView(JsonResoponse_View.BasicView.class)
    private Course course;

    @JsonView(JsonResoponse_View.BasicView.class)
    private boolean isGivenToTrainer;
    
    @JsonView(JsonResoponse_View.BasicView.class)
    private boolean isGivenToStudent;
    
    @JsonView(JsonResoponse_View.BasicView.class)
    private boolean isGivenToCourse;
    
    @JsonView(JsonResoponse_View.BasicView.class)
    private boolean isGivenByAdmin;
}
