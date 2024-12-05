package app.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Trainer {

	@Id
	Long id;
	
	String FullName;
	String email;
	String mobileNumber;
	String Experience;
	String workStatus;
	String companyName;
	String technologies;
}
