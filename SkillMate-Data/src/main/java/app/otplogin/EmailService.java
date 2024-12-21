package app.otplogin;

public interface EmailService {

	 String generateAndSendOtp(String email);
	    boolean verifyOtp(String email, String otp);
}
