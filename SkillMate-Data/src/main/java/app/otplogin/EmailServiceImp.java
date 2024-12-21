package app.otplogin;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import app.repository.StudentRepository;
import app.repository.TrainerRepository;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class EmailServiceImp implements EmailService{

 @Autowired
    private EmailRepository emailRepository;
 
 @Autowired
 private StudentRepository studentRepository;
 @Autowired
 private TrainerRepository trainerRepository;

    @Autowired
    private JavaMailSender mailSender;

    private static final int EXPIRATION_MINUTES = 5;

    
//    @Override
//    public String generateAndSendOtp(String email) {
//        
//        if (!emailRepository.existsByEmail(email)) {
//            throw new IllegalArgumentException("Email does not exist in our records.");
//        }
//
//        // Generate OTP
//        String otp = String.valueOf((int) (Math.random() * 900000) + 100000); // 6-digit OTP
//        LocalDateTime now = LocalDateTime.now();
//        LocalDateTime expiration = now.plusMinutes(EXPIRATION_MINUTES);
//
//        // Fetch the existing email record or create a new one
//        EmailOtp emailOtp = emailRepository.findByEmail(email)
//                .orElse(new EmailOtp(email, otp, now, expiration));
//        
//        // Update OTP details
//        emailOtp.setOtp(otp);
//        emailOtp.setCreatedAt(now);
//        emailOtp.setExpiresAt(expiration);
//
//        
//        emailRepository.save(emailOtp);
//
//        // Send OTP email
//        sendOtpEmail(email, otp);
//
//        return "OTP sent successfully to: " + email;
//    }
//
//    
//    @Override
//    public boolean verifyOtp(String email, String otp) {
//        Optional<EmailOtp> otpOptional = emailRepository.findByEmail(email);
//
//        if (otpOptional.isPresent()) {
//            EmailOtp emailOtp = otpOptional.get();
//            if (emailOtp.getOtp().equals(otp) && emailOtp.getExpiresAt().isAfter(LocalDateTime.now())) {
//                
//                return true;
//            }
//        }
//        return false;
//    }
//
//   
//    private void sendOtpEmail(String email, String otp) {
//        SimpleMailMessage message = new SimpleMailMessage();
//        message.setTo(email);
//        message.setSubject("Your OTP Code");
//        message.setText("Your OTP code is: " + otp + "\nIt is valid for " + EXPIRATION_MINUTES + " minutes.");
//        mailSender.send(message);
//    }
    
    
    @Override
    public String generateAndSendOtp(String email) {
        // Check if the email exists in either the trainer or student tables
        boolean existsInStudent = studentRepository.existsByEmail(email);
        boolean existsInTrainer = trainerRepository.existsByEmail(email);

        if (!existsInStudent && !existsInTrainer) {
            throw new IllegalArgumentException("Email does not exist in our records.");
        }

        // Generate OTP
        String otp = String.valueOf((int) (Math.random() * 900000) + 100000); // 6-digit OTP
        LocalDateTime now = LocalDateTime.now();
        LocalDateTime expiration = now.plusMinutes(EXPIRATION_MINUTES);

        // Fetch the existing email record or create a new one
        EmailOtp emailOtp = emailRepository.findByEmail(email)
                .orElse(new EmailOtp(email, otp, now, expiration));
        
        // Update OTP details
        emailOtp.setOtp(otp);
        emailOtp.setCreatedAt(now);
        emailOtp.setExpiresAt(expiration);

        // Save the OTP record
        emailRepository.save(emailOtp);

        // Send OTP email
        sendOtpEmail(email, otp);

        return "OTP sent successfully to: " + email;
    }

    @Override
    public boolean verifyOtp(String email, String otp) {
        // Check if the email exists in either the trainer or student tables
        boolean existsInStudent = studentRepository.existsByEmail(email);
        boolean existsInTrainer = trainerRepository.existsByEmail(email);

        if (!existsInStudent && !existsInTrainer) {
            throw new IllegalArgumentException("Email does not exist in our records.");
        }

        // Verify the OTP
        Optional<EmailOtp> otpOptional = emailRepository.findByEmail(email);

        if (otpOptional.isPresent()) {
            EmailOtp emailOtp = otpOptional.get();
            if (emailOtp.getOtp().equals(otp) && emailOtp.getExpiresAt().isAfter(LocalDateTime.now())) {
                return true;
            }
        }
        return false;
    }

    private void sendOtpEmail(String email, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Your OTP Code");
        message.setText("Your OTP code is: " + otp + "\nIt is valid for " + EXPIRATION_MINUTES + " minutes.");
        mailSender.send(message);
    }

}
