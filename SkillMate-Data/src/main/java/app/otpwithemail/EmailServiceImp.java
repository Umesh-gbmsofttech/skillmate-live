package app.otpwithemail;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class EmailServiceImp implements EmailService{

    @Autowired
    private EmailRepository emailRepository;

    @Autowired
    private JavaMailSender mailSender;

    private static final int EXPIRATION_MINUTES = 5;

    public String generateOtp(String email) {
        String otp = String.valueOf((int) (Math.random() * 900000) + 100000); // 6-digit OTP

        LocalDateTime now = LocalDateTime.now();
        LocalDateTime expiration = now.plusMinutes(EXPIRATION_MINUTES);

    
        EmailOtp otpEntity = new EmailOtp(email, otp, now, expiration);
        emailRepository.save(otpEntity);

        return otp;
    }

    public void sendOtpEmail(String email, String otp) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Your OTP Code");
        message.setText("Your OTP code is: " + otp);
        mailSender.send(message);
    }

    public boolean verifyOtp(String email, String otp) {
        Optional<EmailOtp> otpOptional = emailRepository.findByEmail(email);

        if (otpOptional.isPresent()) {
            EmailOtp otpEntity = otpOptional.get();
            if (otpEntity.getOtp().equals(otp) && otpEntity.getExpiresAt().isAfter(LocalDateTime.now())) {
               emailRepository.delete(otpEntity); 
                return true;
            }
        }
        return false;
    }

	
}
