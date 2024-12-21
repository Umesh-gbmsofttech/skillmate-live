package app.entity;


	import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
	import jakarta.persistence.GeneratedValue;
	import jakarta.persistence.GenerationType;
	import jakarta.persistence.Id;

	import jakarta.persistence.Lob;
	
	@Entity
	public class StudentProfileUpdated {
    
	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;
	    
	    private Long studentId; 
	    @Lob
	    @Column(name="profile_pic",columnDefinition = "LONGBLOB")
        private byte[] profilePic;
	    private String fullName;
	    private String mobileNumber;
	    private String email;
	    private String workingStatus;
	    private String address;
	    private String qualification;

	    @Lob
		@Column(name="resume",columnDefinition = "LONGBLOB")
	    private byte[] resume;

	    @Column(name = "deleted_at")
	    private LocalDateTime deletedAt;

	   

	    // Getters and setters
	    public Long getId() {
	        return id;
	    }

	    public void setId(Long id) {
	        this.id = id;
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

	    public LocalDateTime getDeletedAt() {
	        return deletedAt;
	    }

	    public void setDeletedAt(LocalDateTime deletedAt) {
	        this.deletedAt = deletedAt;
	    }


		public Long getStudentId() {
			return studentId;
		}

		public void setStudentId(Long studentId) {
			this.studentId = studentId;
		}

		public StudentProfileUpdated() {
			
		}

		public byte[] getProfilePic() {
			return profilePic;
		}

		public void setProfilePic(byte[] profilePic) {
			this.profilePic = profilePic;
		}

	    
	}

