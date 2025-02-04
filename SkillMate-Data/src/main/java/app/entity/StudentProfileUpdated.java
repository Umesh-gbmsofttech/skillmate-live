package app.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class StudentProfileUpdated {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private Long studentId;
	@Lob
	@Column(name = "profile_pic", columnDefinition = "LONGBLOB")
	private byte[] profilePic;
	private String fullName;
	private String mobileNumber;
	private String email;
	private String workingStatus;
	private String address;
	private String qualification;

	@Lob
	@Column(name = "resume", columnDefinition = "LONGBLOB")
	private byte[] resume;

	@Column(name = "deleted_at")
	private LocalDateTime deletedAt;
	
	@Column(name = "updated_at")
	private LocalDateTime updatedAt;

}
