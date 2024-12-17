package app.jwt;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtHelper jwtHelper;

    @Autowired
    private OtpService otpService;

    @PostMapping("/login")
    public ResponseEntity<JwtResponse> authenticateUser(@RequestBody JwtRequest jwtRequest) {
        // Authenticate using mobile and password
        // Create JWT token and return it
        // (Implement authentication with mobile and password)
    }

    @PostMapping("/otp")
    public ResponseEntity<String> generateOtp(@RequestParam String mobile) {
        String otp = otpService.generateOtp(mobile);
        // Send OTP (through SMS, for example)
        return ResponseEntity.ok("OTP Sent");
    }

    @PostMapping("/verifyOtp")
    public ResponseEntity<String> verifyOtp(@RequestParam String mobile, @RequestParam String otp) {
        if (otpService.validateOtp(mobile, otp)) {
            String token = jwtHelper.generateToken(new UserDetails(mobile, "password", List.of()));
            return ResponseEntity.ok(new JwtResponse(token, mobile));
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid OTP");
    }
}
