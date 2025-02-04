package app.entity;

import com.fasterxml.jackson.annotation.JsonView;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "rating_reviews")
public class RatingReviews {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @JsonView(JsonResoponse_View.BasicView.class)
    private String review;

    @Column(nullable = false)
    @JsonView(JsonResoponse_View.BasicView.class)
    private double rating;//it should be double for 2.3, 4.5 .... 5

    @Column(nullable = false, updatable = false)
    @JsonView(JsonResoponse_View.BasicView.class)
    private LocalDate reviewDate = LocalDate.now();

    @ManyToOne
    @JoinColumn(name = "rating_giver_student_id", nullable = true)
    @JsonView(JsonResoponse_View.BasicView.class)
    private Student ratingGiverStudent;

    @ManyToOne
    @JoinColumn(name = "rating_giver_trainer_id", nullable = true)
    @JsonView(JsonResoponse_View.BasicView.class)
    private Trainer ratingGiverTrainer;

    @JsonView(JsonResoponse_View.BasicView.class)
    @Column(nullable = false)
    private boolean isGivenByAdmin;

    @ManyToOne
    @JoinColumn(name = "to_student_id", nullable = true)
    @JsonView(JsonResoponse_View.BasicView.class)
    private Student toStudent;

    @ManyToOne
    @JoinColumn(name = "to_trainer_id", nullable = true)
    @JsonView(JsonResoponse_View.BasicView.class)
    private Trainer toTrainer;

    @ManyToOne
    @JoinColumn(name = "to_course_id", nullable = true)
    @JsonView(JsonResoponse_View.BasicView.class)
    private Course toCourse;

}

//package app.entity;
//
//import jakarta.persistence.*;
//import java.time.LocalDate;
//
//import com.fasterxml.jackson.annotation.JsonBackReference;
//import com.fasterxml.jackson.annotation.JsonManagedReference;
//import com.fasterxml.jackson.annotation.JsonView;
//
//import lombok.Getter;
//import lombok.Setter;
//import lombok.AllArgsConstructor;
//import lombok.NoArgsConstructor;
//
//@Entity
//@Getter
//@Setter
//@NoArgsConstructor
//@AllArgsConstructor
//@Table(indexes = {
//    @Index(name = "idx_student_id", columnList = "student_id"),
//    @Index(name = "idx_trainer_id", columnList = "trainer_id"),
//    @Index(name = "idx_course_id", columnList = "course_id")
//})
//public class RatingReviews {
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @JsonView(JsonResoponse_View.BasicView.class)
//    private Long id;
//    
//    @JsonView(JsonResoponse_View.BasicView.class)
//    private String review;
//    
//    @JsonView(JsonResoponse_View.BasicView.class)
//    private double rating; 
//    
//    @JsonView(JsonResoponse_View.BasicView.class)
//    private LocalDate reviewDate; 
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "student_id", referencedColumnName = "id")
//    @JsonView(JsonResoponse_View.BasicView.class)
//    private Student student;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "trainer_id", referencedColumnName = "id")
//    @JsonView(JsonResoponse_View.BasicView.class)
//    private Trainer trainer;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JoinColumn(name = "course_id", referencedColumnName = "id")
//    @JsonView(JsonResoponse_View.BasicView.class)
//    private Course course;
//
//    @JsonView(JsonResoponse_View.BasicView.class)
//    private boolean isGivenToTrainer;
//    
//    @JsonView(JsonResoponse_View.BasicView.class)
//    private boolean isGivenToStudent;
//    
//    @JsonView(JsonResoponse_View.BasicView.class)
//    private boolean isGivenToCourse;
//    
//    @JsonView(JsonResoponse_View.BasicView.class)
//    private boolean isGivenByAdmin;
//}
