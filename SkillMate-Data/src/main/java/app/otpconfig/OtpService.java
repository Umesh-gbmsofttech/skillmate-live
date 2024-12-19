//package app.otpconfig;
//
//
//import java.util.HashMap;
//import java.util.Map;
//import java.util.concurrent.TimeUnit;
//
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import com.twilio.rest.api.v2010.account.Message;
//import com.twilio.type.PhoneNumber;
//
//import app.otpconfig.OtpConfig;
//
//@Service
//public class OtpService {
//
//    @Autowired
//    private OtpConfig otpConfig;
//
//    private Map<String, String> otpMap = new HashMap<>();
//    private Map<String, Long> otpExpiryMap = new HashMap<>();
//
//    public String sendOtpToPhone(String mobile) {
//        String otp = generateOtp();
//        
//        try {
//            PhoneNumber recipientPhoneNumber = new PhoneNumber(mobile);
//            PhoneNumber senderPhoneNumber = new PhoneNumber(otpConfig.getMobile());  
//            String msgBody = "Your one-time password is: " + otp;
//    
//            
//            Message message = Message.creator(recipientPhoneNumber, senderPhoneNumber, msgBody).create();
//    
//            otpMap.put(mobile, otp);
//            otpExpiryMap.put(mobile, System.currentTimeMillis() + TimeUnit.MINUTES.toMillis(5));  // OTP expires in 5 minutes
//    
//            System.out.println("OTP sent to " + mobile + ". OTP Map: " + otpMap);
//            System.out.println("Expiry time for OTP: " + otpExpiryMap.get(mobile));
//            System.out.println("Generated OTP: " + otp);
//            System.out.println("OTP map after sending OTP: " + otpMap);
//
//    
//            return "OTP sent successfully!";
//        } catch (Exception e) {
//            
//            System.err.println("Error sending OTP: " + e.getMessage());
//            return "Error sending OTP: " + e.getMessage();
//        }
//    }
//    private String generateOtp() {
//       
//        int otp = (int) (Math.random() * 1000000);  
//        return String.format("%06d", otp);  
//    }
//
//    
//    public String validateOtp(String mobile, String otp) {
//        System.out.println("Received OTP: " + otp);
//        System.out.println("Stored OTP for number " + mobile + ": " + otpMap.get(mobile));
//    
//        if (!otpMap.containsKey(mobile)) {
//            return "No OTP sent to this number!";
//        }
//    
//        String storedOtp = otpMap.get(mobile);
//        long expiryTime = otpExpiryMap.get(mobile);
//    
//        if (System.currentTimeMillis() > expiryTime) {
//            otpMap.remove(mobile);  
//            otpExpiryMap.remove(mobile);  
//            return "OTP has expired!";
//        }
//    
//        if (storedOtp.equals(otp)) {
//            otpMap.remove(mobile);  
//            otpExpiryMap.remove(mobile);
//            return "OTP validated successfully!";
//        } else {
//            return "Incorrect OTP!";
//        }
//    }
//}
//














package app.otpconfig;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;



@Service
public class OtpService {

    @Autowired
    private OtpConfig otpConfig;

    @Autowired
    private StudentOtpRepository studentOtpRepository; // Inject the repository to access the student table

    private Map<String, String> otpMap = new HashMap<>();
    private Map<String, Long> otpExpiryMap = new HashMap<>();

    public String sendOtpToPhone(String mobile) {
        // Check if the mobile number exists in the student table
        boolean exists = studentOtpRepository.existsByMobile(mobile);
        if (!exists) {
            return "Mobile number not found in student records!";
        }

        String otp = generateOtp();

        try {
            PhoneNumber recipientPhoneNumber = new PhoneNumber(mobile);
            PhoneNumber senderPhoneNumber = new PhoneNumber(otpConfig.getMobile());
            String msgBody = "Your one-time password is: " + otp;

            Message message = Message.creator(recipientPhoneNumber, senderPhoneNumber, msgBody).create();

            otpMap.put(mobile, otp);
            otpExpiryMap.put(mobile, System.currentTimeMillis() + TimeUnit.MINUTES.toMillis(5)); // OTP expires in 5 minutes

            System.out.println("OTP sent to " + mobile + ". OTP Map: " + otpMap);
            System.out.println("Expiry time for OTP: " + otpExpiryMap.get(mobile));
            System.out.println("Generated OTP: " + otp);
            System.out.println("OTP map after sending OTP: " + otpMap);

            return "OTP sent successfully!";
        } catch (Exception e) {
            System.err.println("Error sending OTP: " + e.getMessage());
            return "Error sending OTP: " + e.getMessage();
        }
    }

    public String generateOtp() {
        int otp = (int) (Math.random() * 1000000); // Generate a random 6-digit OTP
        return String.format("%06d", otp);
    }

    public String validateOtp(String mobile, String otp) {
        System.out.println("Received OTP: " + otp);
        System.out.println("Stored OTP for number " + mobile + ": " + otpMap.get(mobile));

        if (!otpMap.containsKey(mobile)) {
            return "No OTP sent to this number!";
        }

        String storedOtp = otpMap.get(mobile);
        long expiryTime = otpExpiryMap.get(mobile);

        if (System.currentTimeMillis() > expiryTime) {
            otpMap.remove(mobile); 
            otpExpiryMap.remove(mobile);
            return "OTP has expired!";
        }

        if (storedOtp.equals(otp)) {
            otpMap.remove(mobile); 
            otpExpiryMap.remove(mobile);
            return "OTP validated successfully!";
        } else {
            return "Incorrect OTP!";
        }
    }
}


