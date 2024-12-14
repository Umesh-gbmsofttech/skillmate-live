package app.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.OneToMany;

@Entity
public class Trainer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String profilePic;
    private String fullName;
    private String mobileNumber;
    private String email;
    private String workingStatus;
    private String experience;
    private String companyName;
    private String address;
    private String qualification;

    @ElementCollection
    private List<String> technologies;

    @Lob
    private byte[] resume;

    @OneToMany(mappedBy = "trainer", cascade = CascadeType.ALL)
    private List<Student> students;

    @OneToMany(mappedBy = "trainer", cascade = CascadeType.ALL)
    private List<Course> courses;

    @OneToMany(mappedBy = "trainer", cascade = CascadeType.ALL)
    private List<Attendance> attendance;

    @OneToMany(mappedBy = "trainer", cascade = CascadeType.ALL)
    private List<Meeting> meetings;

    @OneToMany(mappedBy = "trainer", cascade = CascadeType.ALL)
    private List<RatingReviews> ratingReviews;

    // Getters and Setters
}
