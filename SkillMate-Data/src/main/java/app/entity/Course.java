package app.entity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonView;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Transient;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView(JsonResoponse_View.BasicView.class)
    private Long id;

    @Lob
    @Column(columnDefinition = "LONGTEXT")
    @JsonView(JsonResoponse_View.BasicView.class)
    private String coverImage;

    @JsonView(JsonResoponse_View.BasicView.class)
    private String courseName;
    @JsonView(JsonResoponse_View.BasicView.class)
    private String price;
    @JsonView(JsonResoponse_View.BasicView.class)
    private String description;
    @JsonView(JsonResoponse_View.BasicView.class)
    private String days;

    // @ManyToOne
    // @JoinColumn(name = "trainer_id")
    // private Trainer trainer;
    @ManyToMany
    @JsonView(JsonResoponse_View.DetailedView.class) // new added
    @JoinTable(name = "course_trainers", joinColumns = @JoinColumn(name = "course_id"), inverseJoinColumns = @JoinColumn(name = "trainer_id", nullable = true))
    private List<Trainer> trainer;

    @OneToMany
    // @JsonIgnore
    List<Batch> batch;

    @ManyToMany
    @JoinTable(name = "course_students", joinColumns = @JoinColumn(name = "course_id"), inverseJoinColumns = @JoinColumn(name = "student_id"))
    @JsonView(JsonResoponse_View.DetailedView.class)
    private List<Student> students;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Attendance> attendance;

    @OneToMany(mappedBy = "toCourse", cascade = { CascadeType.ALL }, fetch = FetchType.LAZY)
    // @JsonView(JsonResoponse_View.BasicView.class)
    private List<RatingReviews> ratingReviews = new ArrayList<>();

    @ManyToMany(mappedBy = "courses", cascade = { CascadeType.PERSIST, CascadeType.MERGE }, fetch = FetchType.LAZY)
    @JsonView(JsonResoponse_View.BasicView.class)
    private List<Meeting> meetings = new ArrayList<>();

    @ManyToMany(mappedBy = "course")
    // @JsonView(JsonResoponse_View.DetailedView.class)
    List<Batch> batches;

    Long batchId;

    public Course(String coverImageBase64, String courseName, String price, String description, String days) {
        this.coverImage = coverImageBase64;
        this.courseName = courseName;
        this.price = price;
        this.description = description;
        this.days = days;
    }

    @Transient
    private Meeting latestMeeting; // Non-persistent field for the latest meeting
}
