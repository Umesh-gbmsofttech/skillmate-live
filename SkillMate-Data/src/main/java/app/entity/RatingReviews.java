package app.entity;

import jakarta.persistence.*;
import java.sql.Date;
import lombok.Getter;
import lombok.Setter;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RatingReviews {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String review;
	private Date reviewDate;

	@ManyToOne
	@JoinColumn(name = "student_id", nullable = true)
	private Student student;

	@ManyToOne
	@JoinColumn(name = "trainer_id", nullable = true)
	private Trainer trainer;

	@ManyToOne
	@JoinColumn(name = "course_id", nullable = true)
	private Course course;

	private boolean isGivenByAdmin;

}
