package app.entity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIdentityInfo;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.annotation.ObjectIdGenerators;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
//@JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView(JsonResoponse_View.BasicView.class)
    private Long id;

    @Lob
    @Column(name = "profile_pic", columnDefinition = "LONGBLOB")
    @JsonView(JsonResoponse_View.BasicView.class)
    private byte[] profilePic;

    @JsonView(JsonResoponse_View.BasicView.class)
    private String fullName;
    @JsonView(JsonResoponse_View.BasicView.class)
    private String mobileNumber;
    @JsonView(JsonResoponse_View.BasicView.class)
    private String email;
    @JsonView(JsonResoponse_View.BasicView.class)
    private String workingStatus;
    @JsonView(JsonResoponse_View.BasicView.class)
    private String address;
    @JsonView(JsonResoponse_View.BasicView.class)
    private String qualification;

    @Lob
    private byte[] resume;

    @ManyToMany
    @JoinTable(
            name = "student_trainers",
            joinColumns = @JoinColumn(name = "student_id"),
            inverseJoinColumns = @JoinColumn(name = "trainer_id")
        )
//    @JsonView(JsonResoponse_View.BasicView.class)
//    @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class, property = "id")
//    @JsonManagedReference
    private List<Trainer> trainer;

    @ManyToMany(mappedBy = "students", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JsonView(JsonResoponse_View.BasicView.class)
    private List<Course> courses = new ArrayList<>();

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    @JsonView(JsonResoponse_View.BasicView.class)
    private List<Attendance> attendance = new ArrayList<>();

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(
        name = "batch_students",
        joinColumns = @JoinColumn(name = "student_id"),
        inverseJoinColumns = @JoinColumn(name = "batch_id")
    )
    @JsonView(JsonResoponse_View.DetailedView.class)
    private List<Batch> batches = new ArrayList<>();


    @ManyToMany(mappedBy = "students", cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.LAZY)
    @JsonView(JsonResoponse_View.BasicView.class)
    private List<Meeting> meetings = new ArrayList<>();
    
    @OneToMany(mappedBy = "student", cascade = {CascadeType.ALL}, fetch = FetchType.LAZY)
//    @JsonView(JsonResoponse_View.BasicView.class)
    private List<RatingReviews> ratingReviews  = new ArrayList<>();

    @ElementCollection(fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    @JsonView(JsonResoponse_View.BasicView.class)
    private Set<Role> roles = new HashSet<>();
}
