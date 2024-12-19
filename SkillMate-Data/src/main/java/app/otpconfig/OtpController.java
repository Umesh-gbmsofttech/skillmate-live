package app.otpconfig;




import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import app.entity.Student;
import jakarta.validation.Valid;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RequestMapping("/otp")
@RestController
public class OtpController {

    @Autowired
    private OtpService otpService;
    
    @Autowired 
    private StudentOtpService studentOtpService;

    
    
   
    @PostMapping("/sendOtp")
    public String sendOtp(@RequestBody Map<String, String> payload) {
    String mobile = payload.get("mobile");
    return otpService.sendOtpToPhone(mobile);
  }

    @PostMapping("/verifyOtp")
    public ResponseEntity<String> verifyOtp(@RequestBody Map<String, String> payload) {
    String mobile = payload.get("mobile");
    String otp = payload.get("otp");

    if (mobile == null || otp == null) {
        return ResponseEntity.status(HttpStatus.SC_BAD_REQUEST).body("Invalid request. Number or OTP is missing.");
    }

    String result = otpService.validateOtp(mobile, otp);

    if ("OTP validated successfully!".equals(result)) {
    	//here need to implement find the user which has this mobile number
        return ResponseEntity.ok(result);
    } else {
        return ResponseEntity.status(HttpStatus.SC_BAD_REQUEST).body(result);
    }
  }
    
    
    @PostMapping("/save")
	public ResponseEntity<StudentOpt> savestudents(@RequestBody StudentOpt studentOpt){
		StudentOpt savestudents = studentOtpService.saveMechanic(studentOpt);
		return ResponseEntity.ok().body(savestudents);
	}

	
    
	
	

	@GetMapping("/get/{id}")
	public ResponseEntity<StudentOpt> getStudentById(@PathVariable("id") Long id) {
		StudentOpt getMechanic = studentOtpService.getStudentOptById(id);
		return ResponseEntity.ok().body(getMechanic);
	}
	
	
	
	@GetMapping("/fetch/{mobile}")
	public ResponseEntity<?> findUserByMobile(@PathVariable String mobile) {
	    boolean studentExists = studentOtpService.findByMobile(mobile);

	    if (studentExists) {
	        
	        StudentOpt student = studentOtpService.findUserByMobile(mobile); 
	        return ResponseEntity.ok(student); 
	    } else {
	        return ResponseEntity.status(HttpStatus.SC_NOT_FOUND).body("User not found");
	    }
	}



}


