package app.dto;

public class StudentAttendanceDTO {
    private Long studentId;
    private String studentName;
    private String studentEmail;
    private Integer totalAttendance;
    private String remark;

    // Getters and setters

    public StudentAttendanceDTO(Long studentId, String studentName, String studentEmail, Integer totalAttendance, String remark) {
        this.studentId = studentId;
        this.studentName = studentName;
        this.studentEmail = studentEmail;
        this.totalAttendance = totalAttendance;
        this.remark = remark;
    }

	public Long getStudentId() {
		return studentId;
	}

	public void setStudentId(Long studentId) {
		this.studentId = studentId;
	}

	public String getStudentName() {
		return studentName;
	}

	public void setStudentName(String studentName) {
		this.studentName = studentName;
	}

	public String getStudentEmail() {
		return studentEmail;
	}

	public void setStudentEmail(String studentEmail) {
		this.studentEmail = studentEmail;
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

    // Getters and setters
}
