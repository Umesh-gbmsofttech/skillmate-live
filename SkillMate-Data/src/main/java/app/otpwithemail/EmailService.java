package app.otpwithemail;

public interface EmailService {

  

public String generateOtp(String email);

public void sendOtpEmail(String email, String otp);

public boolean verifyOtp(String email, String otp);
}
