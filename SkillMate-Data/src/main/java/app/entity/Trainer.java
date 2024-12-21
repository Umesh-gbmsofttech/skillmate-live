package app.entity;

import java.util.Arrays;
import java.util.Base64;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

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
import jakarta.persistence.JoinTable;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;
import jakarta.persistence.JoinColumn;

@Entity
public class Trainer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Lob
	   @Column(name="profile_pic",columnDefinition = "LONGBLOB")
     private byte[] profilePic;
    private String fullName;
    private String mobileNumber;
    private String email;
    private String workingStatus;
    private String experience;
    private String companyName;
    private String address;
    private String qualification;

    private List<String> technologies;

    @Lob
    private byte[] resume;

    @OneToMany(mappedBy = "trainer", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private List<Student> students;

    @OneToMany(mappedBy = "trainer", cascade = CascadeType.ALL, fetch=FetchType.EAGER)
    private List<Course> courses;

    @OneToMany(mappedBy = "trainer", cascade = CascadeType.ALL, fetch=FetchType.EAGER)
    private List<Attendance> attendance;

    @OneToMany(mappedBy = "trainer", cascade = CascadeType.ALL, fetch=FetchType.EAGER)
    private List<Meeting> meetings;

    @OneToMany(mappedBy = "trainer", cascade = CascadeType.ALL, fetch=FetchType.EAGER)
    private List<RatingReviews> ratingReviews;

    @OneToMany(mappedBy = "trainer", cascade = CascadeType.ALL, fetch=FetchType.EAGER)
    private List<Batch> batch;

    @ElementCollection(fetch = FetchType.EAGER)
    @Enumerated(EnumType.STRING)
    private Set<Role> roles = new HashSet<>();  // This will initialize the Set

	public Trainer() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public byte[] getProfilePic() {
		return profilePic;
	}

	public void setProfilePic(byte[] profilePic) {
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

	public String getExperience() {
		return experience;
	}

	public void setExperience(String experience) {
		this.experience = experience;
	}

	public String getCompanyName() {
		return companyName;
	}

	public void setCompanyName(String companyName) {
		this.companyName = companyName;
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

	public List<String> getTechnologies() {
		return technologies;
	}

	public void setTechnologies(List<String> technologies) {
		this.technologies = technologies;
	}

	public byte[] getResume() {
		return resume;
	}

	public void setResume(byte[] resume) {
		this.resume = resume;
	}

	public List<Student> getStudents() {
		return students;
	}

	public void setStudents(List<Student> students) {
		this.students = students;
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

	public List<Meeting> getMeetings() {
		return meetings;
	}

	public void setMeetings(List<Meeting> meetings) {
		this.meetings = meetings;
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

	public Trainer(Long id, byte[] profilePic, String fullName, String mobileNumber, String email, String workingStatus,
			String experience, String companyName, String address, String qualification, List<String> technologies,
			byte[] resume, List<Student> students, List<Course> courses, List<Attendance> attendance,
			List<Meeting> meetings, List<RatingReviews> ratingReviews, List<Batch> batch, Set<Role> roles) {
		super();
		this.id = id;
		this.profilePic = profilePic;
		this.fullName = fullName;
		this.mobileNumber = mobileNumber;
		this.email = email;
		this.workingStatus = workingStatus;
		this.experience = experience;
		this.companyName = companyName;
		this.address = address;
		this.qualification = qualification;
		this.technologies = technologies;
		this.resume = resume;
		this.students = students;
		this.courses = courses;
		this.attendance = attendance;
		this.meetings = meetings;
		this.ratingReviews = ratingReviews;
		this.batch = batch;
		this.roles = roles;
	}

	@Override
	public String toString() {
		return "Trainer [id=" + id + ", profilePic=" + Arrays.toString(profilePic) + ", fullName=" + fullName
				+ ", mobileNumber=" + mobileNumber + ", email=" + email + ", workingStatus=" + workingStatus
				+ ", experience=" + experience + ", companyName=" + companyName + ", address=" + address
				+ ", qualification=" + qualification + ", technologies=" + technologies + ", resume="
				+ Arrays.toString(resume) + ", students=" + students + ", courses=" + courses + ", attendance="
				+ attendance + ", meetings=" + meetings + ", ratingReviews=" + ratingReviews + ", batch=" + batch
				+ ", roles=" + roles + "]";
	}


    // Getters and setters for all fields, including technologies
   

}
