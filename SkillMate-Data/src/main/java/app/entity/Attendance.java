package app.entity;

import java.sql.Time;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

@Entity
public class Attendance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Removed studentName and used the student entity directly
    @ManyToOne
    @JoinColumn(name = "student_id") // Foreign key to the Student entity
    private Student student;

    private Time inTime;
    private Time outTime;

    @OneToOne
    @JoinColumn(name = "course_id") // Foreign key to the Course entity
    private Course course;

    @ManyToOne
    @JoinColumn(name = "trainer_id") // Foreign key to the Trainer entity
    private Trainer trainer;

    private Integer totalAttendance;
    private String remark;

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public Time getInTime() {
        return inTime;
    }

    public void setInTime(Time inTime) {
        this.inTime = inTime;
    }

    public Time getOutTime() {
        return outTime;
    }

    public void setOutTime(Time outTime) {
        this.outTime = outTime;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Trainer getTrainer() {
        return trainer;
    }

    public void setTrainer(Trainer trainer) {
        this.trainer = trainer;
    }

    public Integer getTotalAttendance() {
        return totalAttendance;
    }

    public void setTotalAttendance(Integer totalAttendance) {
        this.totalAttendance = totalAttendance;
    }

    public String getRemark() {
        return remark;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    // Constructor
    public Attendance(Long id, Student student, Time inTime, Time outTime, Course course, Trainer trainer,
            Integer totalAttendance, String remark) {
        this.id = id;
        this.student = student;
        this.inTime = inTime;
        this.outTime = outTime;
        this.course = course;
        this.trainer = trainer;
        this.totalAttendance = totalAttendance;
        this.remark = remark;
    }

    // Default constructor
    public Attendance() {
    }
}
