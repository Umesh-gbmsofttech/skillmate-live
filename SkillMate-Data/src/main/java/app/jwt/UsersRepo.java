package app.jwt;

import org.springframework.data.jpa.repository.JpaRepository;


public interface UsersRepo extends JpaRepository<Users, String> {

	Users findByEmail(String email);
}
