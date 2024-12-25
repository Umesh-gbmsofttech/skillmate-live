package app.jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import app.otplogin.MobileOtpService;
import app.otplogin.EmailOtpRequest;
import app.otplogin.EmailService;
import app.repository.TrainerRepository;
import app.repository.StudentRepository;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    private JwtHelper jwtHelper;

    @Autowired
    private MobileOtpService mobileOtpService;

    @Autowired
    private EmailService emailService;

    @Autowired
    private TrainerRepository trainerRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private AuthService authService;

    @Value("${app.admin.username}")
    private String adminUsername;

    @Value("${app.admin.password}")
    private String adminPassword;

    @PostMapping("/otp/mobile")
    public ResponseEntity<String> sendOtpToMobile(@RequestBody Map<String, String> payload) {
        String mobile = payload.get("mobileNumber");
        if (mobile == null || mobile.isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Mobile number is required.");
        }
        return ResponseEntity.ok(mobileOtpService.sendOtpToPhone(mobile));
    }

    @PostMapping("/otp/email")
    public ResponseEntity<String> sendOtpToEmail(@RequestBody EmailOtpRequest request) {
        try {
            String response = emailService.generateAndSendOtp(request.getEmail());
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send OTP. Please try again.");
        }
    }

    @PostMapping("/verifyOtp")
    public ResponseEntity<?> verifyOtp(@RequestParam String identifier, @RequestParam String otp, @RequestParam String type) {
        boolean isOtpValid = validateOtp(identifier, otp, type);
        if (!isOtpValid) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid OTP.");
        }

        // Check for Admin authentication
        if (identifier.equals(adminUsername) && otp.equals(adminPassword)) {
            UserDetails adminUser = authService.getAdminUserDetails();
            return generateTokenResponse(adminUser.getUsername(), List.of(new SimpleGrantedAuthority("ROLE_ADMIN")), adminUser);
        }

        // Fetch and check user data (Trainer or Student)
        Optional<Object> userDetails = authService.findUserDetailsByIdentifier(type, identifier);
        if (userDetails.isPresent()) {
            Object user = userDetails.get();
            UserDetails springUser = authService.getUserDetailsByObject(user);

            // Generate token and return response
            return generateTokenResponse(springUser.getUsername(), springUser.getAuthorities().stream()
                    .map(authority -> new SimpleGrantedAuthority(authority.getAuthority()))
                    .collect(Collectors.toList()), user);
        }
        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User not found.");
    }

    private boolean validateOtp(String identifier, String otp, String type) {
        if ("mobile".equalsIgnoreCase(type)) {
            return "OTP validated successfully!".equals(mobileOtpService.validateOtp(identifier, otp));
        } else if ("email".equalsIgnoreCase(type)) {
            return emailService.verifyOtp(identifier, otp);
        }
        return false;
    }


    private ResponseEntity<?> generateTokenResponse(String username, List<SimpleGrantedAuthority> authorities, Object userData) {
        UserDetails userDetails = new org.springframework.security.core.userdetails.User(username, "", authorities);
        String token = jwtHelper.generateToken(userDetails);
        return ResponseEntity.ok(new JwtResponse(token, userData));
    }
}
