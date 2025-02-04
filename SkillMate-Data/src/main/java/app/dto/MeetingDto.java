package app.dto;

import java.time.LocalTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonView;

import app.entity.Batch;
import app.entity.Course;
import app.entity.JsonResoponse_View;
import app.entity.Student;
import app.entity.Trainer;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class MeetingDto {

	    @JsonView(JsonResoponse_View.BasicView.class)
	    private Long id;

	    @JsonView(JsonResoponse_View.BasicView.class)
	    private String meetingLink;
	    @JsonView(JsonResoponse_View.BasicView.class)
	    private LocalTime fromTime;
	    @JsonView(JsonResoponse_View.BasicView.class)
	    private LocalTime toTime;
	    @JsonView(JsonResoponse_View.BasicView.class)
	    private String message;
	    
	    @ManyToMany
	    @JoinTable(
	    		name = "meeting_batches",
	    		joinColumns = @JoinColumn(name = "meeting_id"),
	    		inverseJoinColumns = @JoinColumn(name = "batch_id")
	    		)
	    private List<Batch> batches;

	    @ManyToMany
	    @JoinTable(
	        name = "meeting_students",
	        joinColumns = @JoinColumn(name = "meeting_id"),
	        inverseJoinColumns = @JoinColumn(name = "student_id")
	    )
	    private List<Student> students;
	    
	    @ManyToMany
	    @JoinTable(
	    		name = "meeting_courses",
	    		joinColumns = @JoinColumn(name = "meeting_id"),
	    		inverseJoinColumns = @JoinColumn(name = "course_id")
	    		)
	    private List<Course> courses;
}
