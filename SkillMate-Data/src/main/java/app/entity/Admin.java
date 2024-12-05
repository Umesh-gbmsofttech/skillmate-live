package app.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;

@Entity
public class Admin {

	@Id
	Long id;
	
	@OneToOne
	Trainer trainer;
}
