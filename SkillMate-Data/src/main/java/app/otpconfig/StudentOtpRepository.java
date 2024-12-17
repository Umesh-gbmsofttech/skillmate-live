package app.otpconfig;


	import org.springframework.data.jpa.repository.JpaRepository;
	import org.springframework.stereotype.Repository;


	@Repository
	public  interface StudentOtpRepository extends JpaRepository<StudentOpt, Long> {
	    
		boolean existsByMobile(String mobile); // Query to check if a mobile number exists

		StudentOpt save(StudentOpt student);
		
		StudentOpt findByMobile(String mobile);
	}