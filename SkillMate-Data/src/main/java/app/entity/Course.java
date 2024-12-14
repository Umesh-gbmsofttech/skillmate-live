package app.entity;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Course {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String courseName;
    private String coverImage;
    private Double price;
    private String description;
    private String days;

    @ManyToOne
    @JoinColumn(name = "trainer_id")
    private Trainer trainer;

    @ManyToMany(mappedBy = "courses")
    private List<Student> students;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
    private List<RatingReviews> ratingReviews;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCourseName() {
		return courseName;
	}

	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}

	public String getCoverImage() {
		return coverImage;
	}

	public void setCoverImage(String coverImage) {
		this.coverImage = coverImage;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getDays() {
		return days;
	}

	public void setDays(String days) {
		this.days = days;
	}

	public Trainer getTrainer() {
		return trainer;
	}

	public void setTrainer(Trainer trainer) {
		this.trainer = trainer;
	}

	public List<Student> getStudents() {
		return students;
	}

	public void setStudents(List<Student> students) {
		this.students = students;
	}

	public List<RatingReviews> getRatingReviews() {
		return ratingReviews;
	}

	public void setRatingReviews(List<RatingReviews> ratingReviews) {
		this.ratingReviews = ratingReviews;
	}

	public Course(Long id, String courseName, String coverImage, Double price, String description, String days,
			Trainer trainer, List<Student> students, List<RatingReviews> ratingReviews) {
		super();
		this.id = id;
		this.courseName = courseName;
		this.coverImage = coverImage;
		this.price = price;
		this.description = description;
		this.days = days;
		this.trainer = trainer;
		this.students = students;
		this.ratingReviews = ratingReviews;
	}
    
    

}
