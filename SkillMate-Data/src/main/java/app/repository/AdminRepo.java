package app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import app.entity.Admin;

public interface AdminRepo extends JpaRepository<Admin, Long>{

}
