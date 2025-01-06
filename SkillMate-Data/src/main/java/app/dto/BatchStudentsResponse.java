package app.dto;

import java.util.List;

import app.entity.Student;

public class BatchStudentsResponse {
    private Long batchId;
    private String batchName;
    private List<Student> students;
    private int totalStudents;
	public Long getBatchId() {
		return batchId;
	}
	public void setBatchId(Long batchId) {
		this.batchId = batchId;
	}
	public String getBatchName() {
		return batchName;
	}
	public void setBatchName(String batchName) {
		this.batchName = batchName;
	}
	public List<Student> getStudents() {
		return students;
	}
	public void setStudents(List<Student> students) {
		this.students = students;
	}
	public int getTotalStudents() {
		return totalStudents;
	}
	public void setTotalStudents(int totalStudents) {
		this.totalStudents = totalStudents;
	}
	public BatchStudentsResponse(Long batchId, String batchName, List<Student> students, int totalStudents) {
		super();
		this.batchId = batchId;
		this.batchName = batchName;
		this.students = students;
		this.totalStudents = totalStudents;
	}
	public BatchStudentsResponse() {
		super();
		// TODO Auto-generated constructor stub
	}


}
