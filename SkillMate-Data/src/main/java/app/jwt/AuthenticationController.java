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
import app.otplogin.MobileOtpService;
import app.otplogin.MobileOtpService.OTPRequest;
import app.otplogin.MobileOtpService.OTPResponse;
import app.entity.Student;
import app.otplogin.EmailOtpRequest;
import app.otplogin.EmailService;
import app.repository.TrainerRepository;
import app.repository.StudentRepository;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;


@RestController
@RequestMapping("/auth")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

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

    @Value("${app.admin.username}")
    private String adminUsername;

    @Value("${app.admin.password}")
    private String adminPassword;

    
    @PostMapping("/otp/mobile")
    public ResponseEntity<OTPResponse> sendOtp(@RequestBody OTPRequest otpRequest) {
        OTPResponse response = mobileOtpService.sendOtpToPhone(otpRequest);
        return ResponseEntity.ok(response);  
    }



    @PostMapping("/otp/email")
    public ResponseEntity<String> sendOtp(@RequestBody EmailOtpRequest request) {
        try {
            String response = emailService.generateAndSendOtp(request.getEmail());
            return ResponseEntity.ok(response);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send OTP. Please try again.");
        }
    }
//    @PostMapping("/verifyOtp/mobile")
//    public ResponseEntity<?> verifyOtpMobile(@RequestParam OTPRequest otpRequest) {
//        if ("OTP validated successfully!".equals(mobileOtpService.validateOtp(otpRequest))) {
//            Trainer trainer = trainerRepository.findAll().stream()
//                .filter(t -> t.getMobileNumber().equals(mobileNumber))
//                .findFirst()
//                .orElse(null);
//
//            if (trainer != null) {
//                UserDetails userDetails = new org.springframework.security.core.userdetails.User(
//                        trainer.getEmail(), // Use email as the username
//                        "", // Password is not needed for OTP flow
//                        trainer.getRoles().stream()
//                                .map(role -> new SimpleGrantedAuthority(role.name()))
//                                .collect(Collectors.toList())
//                );
//                String token = jwtHelper.generateToken(userDetails);
//                return ResponseEntity.ok(new JwtResponse(token));
//            }
//
//            // Check if it's a student
//            Student student = studentRepository.findAll().stream()
//                .filter(s -> s.getMobileNumber().equals(mobileNumber))
//                .findFirst()
//                .orElse(null);
//
//            if (student != null) {
//                UserDetails userDetails = new org.springframework.security.core.userdetails.User(
//                        student.getEmail(), // Use email as the username
//                        "", // Password is not needed for OTP flow
//                        student.getRoles().stream()
//                                .map(role -> new SimpleGrantedAuthority(role.name()))
//                                .collect(Collectors.toList())
//                );
//                String token = jwtHelper.generateToken(userDetails);
//                return ResponseEntity.ok(new JwtResponse(token));
//            }
//
//            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("User not found");
//        }
//
//        return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid OTP");
//    }
    
    @PostMapping("/verifyOtp/mobile")
    public ResponseEntity<?> verifyOtpMobile(@RequestBody OTPRequest otpRequest) {
        OTPResponse otpResponse = mobileOtpService.validateOtp(otpRequest);

        if (otpResponse.isSuccess()) {
            String mobileNumber = otpRequest.getMobileNumber();

            // Check if it's a Trainer
            Trainer trainer = trainerRepository.findAll().stream()
                .filter(t -> t.getMobileNumber().equals(mobileNumber))
                .findFirst()
                .orElse(null);

            if (trainer != null) {
                UserDetails userDetails = new org.springframework.security.core.userdetails.User(
                    trainer.getEmail(),  // Use email as the username
                    "",  // Password is not needed for OTP flow
                    trainer.getRoles().stream()
                        .map(role -> new SimpleGrantedAuthority(role.name()))
                        .collect(Collectors.toList())
                );
                String token = jwtHelper.generateToken(userDetails);
                return ResponseEntity.ok(new JwtResponse(token));
            }

            // Check if it's a Student
            Student student = studentRepository.findAll().stream()
                .filter(s -> s.getMobileNumber().equals(mobileNumber))
                .findFirst()
                .orElse(null);

            if (student != null) {
                UserDetails userDetails = new org.springframework.security.core.userdetails.User(
                    student.getEmail(),  // Use email as the username
                    "",  // Password is not needed for OTP flow
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
        } else if (emailService.verifyOtp(email, otp)) {
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


