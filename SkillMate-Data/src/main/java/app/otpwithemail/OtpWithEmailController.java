package app.otpwithemail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/email")
public class OtpWithEmailController {

    @Autowired
    private EmailService emailService;

    @PostMapping("/sendEmailOtp")
    public ResponseEntity<String> sendOtp(@RequestBody OtpRequest request) {
        String otp = emailService.generateOtp(request.getEmail());
        emailService.sendOtpEmail(request.getEmail(), otp);
        return ResponseEntity.ok("OTP sent successfully to: " + request.getEmail());
    }

    @PostMapping("/verify")
    public ResponseEntity<String> verifyOtp(@RequestBody OtpVerificationRequest request) {
        boolean isValid = emailService.verifyOtp(request.getEmail(), request.getOtp());
        if (isValid) {
//        	here need to implement the logic of find the user which has this email
            return ResponseEntity.ok("OTP verified successfully!");
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid or expired OTP!");
        }
    }
}
