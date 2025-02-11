package app.entity;

import java.time.LocalDate;
import java.util.ArrayList;
//import java.util.Arrays;
//import java.util.Base64;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.hibernate.annotations.ManyToAny;

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
public class Trainer {
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
	private String experience;
	@JsonView(JsonResoponse_View.BasicView.class)
	private String companyName;
	@JsonView(JsonResoponse_View.BasicView.class)
	private String address;
	@JsonView(JsonResoponse_View.BasicView.class)
	private String qualification;

	@ElementCollection(fetch = FetchType.EAGER)
	@JsonView(JsonResoponse_View.BasicView.class)
	private List<String> technologies;

	@Lob
	@JsonView(JsonResoponse_View.DetailedView.class)
	private byte[] resume;

	@OneToMany(mappedBy = "trainer", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	// @JsonView(JsonResoponse_View.BasicView.class)
	// @JsonIdentityInfo(generator = ObjectIdGenerators.PropertyGenerator.class,
	// property = "id")
	// @JsonView(JsonResoponse_View.BasicView.class)
	private List<Student> students;

	@OneToMany(mappedBy = "trainer", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JsonView(JsonResoponse_View.BasicView.class)
	private List<Course> courses;

	@OneToMany(mappedBy = "trainer", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JsonView(JsonResoponse_View.BasicView.class)
	private List<Attendance> attendance;

	// @ManyToMany(mappedBy = "trainer", cascade = CascadeType.ALL, fetch =
	// FetchType.LAZY)
	@ManyToMany
	// @JsonView(JsonResoponse_View.DetailedView.class)
	@JsonView(JsonResoponse_View.BasicView.class)
	// @JsonIgnore
	private List<Batch> batches;

	@OneToMany(mappedBy = "trainer", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	@JsonView(JsonResoponse_View.BasicView.class)
	private List<Meeting> meetings = new ArrayList<>();

	@OneToMany(mappedBy = "toTrainer", cascade = { CascadeType.ALL }, fetch = FetchType.LAZY)
	// @JsonView(JsonResoponse_View.BasicView.class)
	private List<RatingReviews> ratingReviews = new ArrayList<>();

	@ElementCollection(fetch = FetchType.EAGER)
	@Enumerated(EnumType.STRING)
	@JsonView(JsonResoponse_View.BasicView.class)
	private Set<Role> roles = new HashSet<>();
}
