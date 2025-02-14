package app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import app.entity.ContactUs;

public interface ContactUsRepository extends JpaRepository<ContactUs,Long>{
    
}
