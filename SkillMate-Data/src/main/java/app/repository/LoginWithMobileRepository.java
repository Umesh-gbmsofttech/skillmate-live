package app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import app.entity.Login;

@Repository
public interface LoginWithMobileRepository extends JpaRepository<Login, Long> {

}
