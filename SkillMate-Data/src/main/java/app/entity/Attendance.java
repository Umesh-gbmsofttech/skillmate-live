package app.entity;

import java.sql.Time;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

@Entity
public class Attendance {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String studentName;
    private Time inTime;
    private Time outTime;
    @OneToOne
    private Course courseName;
    // @ManyToOne
    // private Student studentId;
    private Integer totalAttendance;
    private String remark;

    public Long getId() {
        return id;
    }

    public String getStudentName() {
        return studentName;
    }

    public Time getInTime() {
        return inTime;
    }

    public Time getOutTime() {
        return outTime;
    }

    public Course getCourseName() {
        return courseName;
    }

    public Integer getTotalAttendance() {
        return totalAttendance;
    }

    public String getRemark() {
        return remark;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public void setInTime(Time inTime) {
        this.inTime = inTime;
    }

    public void setOutTime(Time outTime) {
        this.outTime = outTime;
    }

    public void setCourseName(Course courseName) {
        this.courseName = courseName;
    }

    public void setTotalAttendance(Integer totalAttendance) {
        this.totalAttendance = totalAttendance;
    }

    public void setRemark(String remark) {
        this.remark = remark;
    }

    public Attendance(Long id, String studentName, Time inTime, Time outTime, Course courseName,
            Integer totalAttendance, String remark) {
        this.id = id;
        this.studentName = studentName;
        this.inTime = inTime;
        this.outTime = outTime;
        this.courseName = courseName;
        this.totalAttendance = totalAttendance;
        this.remark = remark;
    }

}
