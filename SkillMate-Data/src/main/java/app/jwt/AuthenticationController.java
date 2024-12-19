package app.jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import app.entity.Role;
import app.entity.Trainer;
import app.entity.Student;
import app.otpconfig.OtpService;
import app.otpwithemail.EmailServiceImp;
import app.repository.TrainerRepository;
import app.repository.StudentRepository;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtHelper jwtHelper;

    @Autowired
    private OtpService otpService;

    @Autowired
    private EmailServiceImp emailServiceImp;

    @Autowired
    private TrainerRepository trainerRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Value("${app.admin.username}")
    private String adminUsername;

    @Value("${app.admin.password}")
    private String adminPassword;

    @PostMapping("/otp/mobile")
    public ResponseEntity<String> generateOtp(@RequestParam String mobile) {
        String otp = otpService.generateOtp();
        // Logic to send OTP to the mobile number
        return ResponseEntity.ok("OTP Sent");
    }

    @PostMapping("/otp/email")
    public ResponseEntity<String> generateOtpEmail(@RequestParam String email) {
        String otp = emailServiceImp.generateOtp(email);
        // Logic to send OTP to the email address
        return ResponseEntity.ok("OTP Sent");
    }

    @PostMapping("/verifyOtp/mobile")
    public ResponseEntity<?> verifyOtpMobile(@RequestParam String mobile, @RequestParam String otp) {
        if ("OTP validated successfully!".equals(otpService.validateOtp(mobile, otp))) {
            Trainer trainer = trainerRepository.findAll().stream()
                .filter(t -> t.getMobileNumber().equals(mobile))
                .findFirst()
                .orElse(null);

            if (trainer != null) {
                UserDetails userDetails = new org.springframework.security.core.userdetails.User(
                        trainer.getEmail(), // Use email as the username
                        "", // Password is not needed for OTP flow
                        trainer.getRoles().stream()
                                .map(role -> new SimpleGrantedAuthority(role.name()))
                                .collect(Collectors.toList())
                );
                String token = jwtHelper.generateToken(userDetails);
                return ResponseEntity.ok(new JwtResponse(token));
            }

            // Check if it's a student
            Student student = studentRepository.findAll().stream()
                .filter(s -> s.getMobileNumber().equals(mobile))
                .findFirst()
                .orElse(null);

            if (student != null) {
                UserDetails userDetails = new org.springframework.security.core.userdetails.User(
                        student.getEmail(), // Use email as the username
                        "", // Password is not needed for OTP flow
                        student.getRoles().stream()
                                .map(role -> new SimpleGrantedAuthority(role.name()))
                                .collect(Collectors.toList())
                );
                String token = jwtHelper.generateToken(userDetails);
                return ResponseEntity.ok(new JwtResponse(token));
            }

            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User not found");
        }

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid OTP");
    }

    @PostMapping("/verifyOtp/email")
    public ResponseEntity<?> verifyOtpEmail(@RequestParam String email, @RequestParam String otp) {
        if (email.equals(adminUsername) && otp.equals(adminPassword)) {
            UserDetails adminDetails = new org.springframework.security.core.userdetails.User(
                    adminUsername,
                    adminPassword,
                    List.of(new SimpleGrantedAuthority(Role.ADMIN.name()))
            );
            String token = jwtHelper.generateToken(adminDetails);
            return ResponseEntity.ok(new JwtResponse(token));
        } else if (emailServiceImp.verifyOtp(email, otp)) {
            Trainer trainer = trainerRepository.findAll().stream()
                .filter(t -> t.getEmail().equals(email))
                .findFirst()
                .orElse(null);

            if (trainer != null) {
                UserDetails userDetails = new org.springframework.security.core.userdetails.User(
                        trainer.getEmail(),
                        "", // Password is not needed for OTP flow
                        trainer.getRoles().stream()
                                .map(role -> new SimpleGrantedAuthority(role.name()))
                                .collect(Collectors.toList())
                );
                String token = jwtHelper.generateToken(userDetails);
                return ResponseEntity.ok(new JwtResponse(token));
            }

            Student student = studentRepository.findAll().stream()
                .filter(s -> s.getEmail().equals(email))
                .findFirst()
                .orElse(null);

            if (student != null) {
                UserDetails userDetails = new org.springframework.security.core.userdetails.User(
                        student.getEmail(),
                        "", // Password is not needed for OTP flow
                        student.getRoles().stream()
                                .map(role -> new SimpleGrantedAuthority(role.name()))
                                .collect(Collectors.toList())
                );
                String token = jwtHelper.generateToken(userDetails);
                return ResponseEntity.ok(new JwtResponse(token));
            }

            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User not found");
        }

        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid OTP");
    }
}
