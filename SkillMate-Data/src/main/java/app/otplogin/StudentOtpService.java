package app.otplogin;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class StudentOtpService {

	@Autowired
	private MobiletOtpRepo mobiletOtpRepo;
	
	public List<MobileOtp> findAllStudentOpts() {
		return mobiletOtpRepo.findAll();
	}

	public MobileOtp getStudentOptById(Long id) {
		return mobiletOtpRepo.findById(id).get();
	}

	public MobileOtp saveMechanic(MobileOtp studentOpt) {
		return mobiletOtpRepo.save(studentOpt);
	}

	public boolean findByMobile(String mobile) {
		
		
		return mobiletOtpRepo.existsByMobile(mobile);
	}
	

	public MobileOtp findUserByMobile(String mobile) {
	    return mobiletOtpRepo.findByMobile(mobile); // Fetch user details by mobile
	}

}
