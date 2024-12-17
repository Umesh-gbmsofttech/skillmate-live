package app.otpconfig;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import app.entity.Student;





@Service
public class StudentOtpService {

	@Autowired
	private StudentOtpRepository studentOtpRepository;
	
	public List<StudentOpt> findAllStudentOpts() {
		return studentOtpRepository.findAll();
	}

	public StudentOpt getStudentOptById(Long id) {
		return studentOtpRepository.findById(id).get();
	}

	public StudentOpt saveMechanic(StudentOpt studentOpt) {
		return studentOtpRepository.save(studentOpt);
	}

	public boolean findByMobile(String mobile) {
		
		
		return studentOtpRepository.existsByMobile(mobile);
	}
	

	public StudentOpt findUserByMobile(String mobile) {
	    return studentOtpRepository.findByMobile(mobile); // Fetch user details by mobile
	}

}
