package app.entity;

import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonView;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
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
public class Batch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView(JsonResoponse_View.BasicView.class)
    private Long id;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "batch_trainers", joinColumns = @JoinColumn(name = "batch_id"), inverseJoinColumns = @JoinColumn(name = "trainer_id"))
    @JsonView(JsonResoponse_View.DetailedView.class)
    // @JsonBackReference
    private List<Trainer> trainer;

    // @ManyToMany(mappedBy = "batches", fetch = FetchType.EAGER)
    // // @JsonView(JsonResoponse_View.DetailedView.class)
    // private List<Student> students = new ArrayList<>();
    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "batch_students", joinColumns = @JoinColumn(name = "batch_id"), inverseJoinColumns = @JoinColumn(name = "student_id"))
    @JsonView(JsonResoponse_View.BasicView.class)
    private List<Student> students = new ArrayList<>();

    @ManyToMany(mappedBy = "batches", cascade = { CascadeType.PERSIST, CascadeType.MERGE }, fetch = FetchType.LAZY)
//    @JsonView(JsonResoponse_View.BasicView.class)
    private List<Meeting> meetings = new ArrayList<>();

    @ManyToMany(fetch = FetchType.EAGER)
    @JoinTable(name = "batch_courses", joinColumns = @JoinColumn(name = "batch_id"), inverseJoinColumns = @JoinColumn(name = "course_id"))
    @JsonView(JsonResoponse_View.DetailedView.class)
    private List<Course> course;

    // @OneToMany(mappedBy = "batch", cascade = {CascadeType.MERGE,
    // CascadeType.MERGE, CascadeType.REMOVE}, fetch = FetchType.LAZY, orphanRemoval
    // = true)
    //// @JsonView(BatchViews.DetailedView.class)
    // @JsonView(JsonResoponse_View.BasicView.class)
    // private List<Attendance> attendance = new ArrayList<>();
    @OneToMany
    @JsonView(JsonResoponse_View.BasicView.class)
    private List<Attendance> attendance = new ArrayList<>();

}

// package app.entity;
//
// import java.util.ArrayList;
// import java.util.List;
//
// import com.fasterxml.jackson.annotation.JsonBackReference;
// import com.fasterxml.jackson.annotation.JsonIgnore;
// import com.fasterxml.jackson.annotation.JsonManagedReference;
//
// import jakarta.persistence.CascadeType;
// import jakarta.persistence.Entity;
// import jakarta.persistence.FetchType;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.persistence.JoinColumn;
// import jakarta.persistence.JoinTable;
// import jakarta.persistence.ManyToMany;
// import jakarta.persistence.ManyToOne;
// import jakarta.persistence.OneToMany;
//
// import lombok.AllArgsConstructor;
// import lombok.Getter;
// import lombok.NoArgsConstructor;
// import lombok.Setter;
//
// @Entity
// @Getter
// @Setter
// @NoArgsConstructor
// @AllArgsConstructor
// public class Batch {
//
// @Id
// @GeneratedValue(strategy = GenerationType.IDENTITY)
// private Long id;
//
// @ManyToOne(fetch = FetchType.LAZY)
// @JoinColumn(name = "trainer_id")
// @JsonIgnore
// private Trainer trainer;
//
// @ManyToMany
// @JoinTable(
// name = "batch_students",
// joinColumns = @JoinColumn(name = "batch_id"),
// inverseJoinColumns = @JoinColumn(name = "student_id")
// )
// private List<Student> students = new ArrayList<>();
//
//
// @ManyToOne(fetch = FetchType.EAGER)
// @JoinColumn(name = "course_id")
// @JsonIgnore
// private Course course;
//
// @OneToMany(mappedBy = "batch", cascade = {CascadeType.MERGE,
// CascadeType.MERGE, CascadeType.REMOVE}, fetch = FetchType.LAZY, orphanRemoval
// = true)
// @JsonIgnore
// private List<Attendance> attendance = new ArrayList<>();
//
// }
