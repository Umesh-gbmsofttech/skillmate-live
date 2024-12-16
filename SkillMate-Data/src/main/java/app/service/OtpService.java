package app.service;



import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

import app.otpconfiguration.OtpConfig;

@Service
public class OtpService {

    @Autowired
    private OtpConfig otpConfig;

    private Map<String, String> otpMap = new HashMap<>();
    private Map<String, Long> otpExpiryMap = new HashMap<>();

    public String sendOtpToPhone(String number) {
        String otp = generateOtp();
        
        try {
            PhoneNumber recipientPhoneNumber = new PhoneNumber(number);
            PhoneNumber senderPhoneNumber = new PhoneNumber(otpConfig.getNumber());  
            String msgBody = "Your one-time password is: " + otp;
    
            @SuppressWarnings("unused")
            Message message = Message.creator(recipientPhoneNumber, senderPhoneNumber, msgBody).create();
    
            otpMap.put(number, otp);
            otpExpiryMap.put(number, System.currentTimeMillis() + TimeUnit.MINUTES.toMillis(5));  // OTP expires in 5 minutes
    
            System.out.println("OTP sent to " + number + ". OTP Map: " + otpMap);
            System.out.println("Expiry time for OTP: " + otpExpiryMap.get(number));
            System.out.println("Generated OTP: " + otp);
            System.out.println("OTP map after sending OTP: " + otpMap);

    
            return "OTP sent successfully!";
        } catch (Exception e) {
            
            System.err.println("Error sending OTP: " + e.getMessage());
            return "Error sending OTP: " + e.getMessage();
        }
    }
    private String generateOtp() {
       
        int otp = (int) (Math.random() * 1000000);  
        return String.format("%06d", otp);  
    }

    
    public String validateOtp(String number, String otp) {
        System.out.println("Received OTP: " + otp);
        System.out.println("Stored OTP for number " + number + ": " + otpMap.get(number));
    
        if (!otpMap.containsKey(number)) {
            return "No OTP sent to this number!";
        }
    
        String storedOtp = otpMap.get(number);
        long expiryTime = otpExpiryMap.get(number);
    
        if (System.currentTimeMillis() > expiryTime) {
            otpMap.remove(number);  
            otpExpiryMap.remove(number);  
            return "OTP has expired!";
        }
    
        if (storedOtp.equals(otp)) {
            otpMap.remove(number);  
            otpExpiryMap.remove(number);
            return "OTP validated successfully!";
        } else {
            return "Incorrect OTP!";
        }
    }
}

