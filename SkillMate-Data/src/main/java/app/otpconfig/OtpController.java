package app.otpconfig;




import org.apache.http.HttpStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;



import java.util.Map;

@RequestMapping("/otp")
@RestController
public class OtpController {

    @Autowired
    private OtpService otpService;

    
    
   
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
        return ResponseEntity.ok(result);
    } else {
        return ResponseEntity.status(HttpStatus.SC_BAD_REQUEST).body(result);
    }
  }

}


