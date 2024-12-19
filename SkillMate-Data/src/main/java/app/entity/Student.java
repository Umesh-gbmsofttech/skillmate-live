package app.entity;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import jakarta.persistence.CascadeType;
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

@Entity
public class Student {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String profilePic;
    private String fullName;
    private String mobileNumber;
    private String email;
    private String workingStatus;
    private String address;
    private String qualification;

    @Lob
    private byte[] resume;

    @ManyToOne
    @JoinColumn(name = "trainer_id")
    private Trainer trainer;

    @ManyToMany
    @JoinTable(name = "student_courses", joinColumns = @JoinColumn(name = "student_id"), inverseJoinColumns = @JoinColumn(name = "course_id"))
    private List<Course> courses;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL) // Corrected mappedBy here
    private List<Attendance> attendance;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
    private List<RatingReviews> ratingReviews;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL)
    private List<Batch> batch;
    
    @ElementCollection(fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    private Set<Role> roles = new HashSet<>();  // This will initialize the Set

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getProfilePic() {
		return profilePic;
	}

	public void setProfilePic(String profilePic) {
		this.profilePic = profilePic;
	}

	public String getFullName() {
		return fullName;
	}

	public void setFullName(String fullName) {
		this.fullName = fullName;
	}

	public String getMobileNumber() {
		return mobileNumber;
	}

	public void setMobileNumber(String mobileNumber) {
		this.mobileNumber = mobileNumber;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getWorkingStatus() {
		return workingStatus;
	}

	public void setWorkingStatus(String workingStatus) {
		this.workingStatus = workingStatus;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public String getQualification() {
		return qualification;
	}

	public void setQualification(String qualification) {
		this.qualification = qualification;
	}

	public byte[] getResume() {
		return resume;
	}

	public void setResume(byte[] resume) {
		this.resume = resume;
	}

	public Trainer getTrainer() {
		return trainer;
	}

	public void setTrainer(Trainer trainer) {
		this.trainer = trainer;
	}

	public List<Course> getCourses() {
		return courses;
	}

	public void setCourses(List<Course> courses) {
		this.courses = courses;
	}

	public List<Attendance> getAttendance() {
		return attendance;
	}

	public void setAttendance(List<Attendance> attendance) {
		this.attendance = attendance;
	}

	public List<RatingReviews> getRatingReviews() {
		return ratingReviews;
	}

	public void setRatingReviews(List<RatingReviews> ratingReviews) {
		this.ratingReviews = ratingReviews;
	}

	public List<Batch> getBatch() {
		return batch;
	}

	public void setBatch(List<Batch> batch) {
		this.batch = batch;
	}

	public Set<Role> getRoles() {
		return roles;
	}

	public void setRoles(Set<Role> roles) {
		this.roles = roles;
	}

	public Student(Long id, String profilePic, String fullName, String mobileNumber, String email, String workingStatus,
			String address, String qualification, byte[] resume, Trainer trainer, List<Course> courses,
			List<Attendance> attendance, List<RatingReviews> ratingReviews, List<Batch> batch, Set<Role> roles) {
		super();
		this.id = id;
		this.profilePic = profilePic;
		this.fullName = fullName;
		this.mobileNumber = mobileNumber;
		this.email = email;
		this.workingStatus = workingStatus;
		this.address = address;
		this.qualification = qualification;
		this.resume = resume;
		this.trainer = trainer;
		this.courses = courses;
		this.attendance = attendance;
		this.ratingReviews = ratingReviews;
		this.batch = batch;
		this.roles = roles;
	}

	
    
}
