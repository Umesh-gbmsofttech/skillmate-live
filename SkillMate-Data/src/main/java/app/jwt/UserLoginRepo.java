package app.jwt;

import org.springframework.data.jpa.repository.JpaRepository;

import app.repository.StudentRepository;
import app.repository.TrainerRepository;

public interface UserLoginRepo extends JpaRepository<Users, String> {

	Users findByEmail(String email);
	Users findByMobile(String mobile);
	
////	here i want to find users from the
//	TrainerRepository trainerRepository;
////	and
//	StudentRepository studentRepository;
}
