package app.otplogin;


	import org.springframework.data.jpa.repository.JpaRepository;
	import org.springframework.stereotype.Repository;


	@Repository
	public  interface MobiletOtpRepo extends JpaRepository<MobileOtp, Long> {
	    
		boolean existsByMobile(String mobile); // Query to check if a mobile number exists

		public MobileOtp save(MobileOtp mobileOtp);
		
		MobileOtp findByMobile(String mobile);
	}