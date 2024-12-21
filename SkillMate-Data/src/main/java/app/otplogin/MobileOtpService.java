


package app.otplogin;

import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import app.otplogin.MobiletOtpRepo;
import app.repository.StudentRepository;
import app.repository.TrainerRepository;



@Service
public class MobileOtpService {

    @Autowired
    private MobileOtpConfig otpConfig;

    @Autowired
    private StudentRepository studentRepository;
    
    @Autowired
    private TrainerRepository trainerRepository;

    private Map<String, String> otpMap = new HashMap<>();
    private Map<String, Long> otpExpiryMap = new HashMap<>();

//    public String sendOtpToPhone(String mobile) {
//    
//        boolean exists = studentRepository.existsByMobile(mobile);
//        if (!exists) {
//            return "Mobile number not found in student records!";
//        }
//
//        String otp = generateOtp();
//
//        try {
//            PhoneNumber recipientPhoneNumber = new PhoneNumber(mobile);
//            PhoneNumber senderPhoneNumber = new PhoneNumber(otpConfig.getMobile());
//            String msgBody = "Your one-time password is: " + otp;
//
//            Message message = Message.creator(recipientPhoneNumber, senderPhoneNumber, msgBody).create();
//
//            otpMap.put(mobile, otp);
//            otpExpiryMap.put(mobile, System.currentTimeMillis() + TimeUnit.MINUTES.toMillis(5)); // OTP expires in 5 minutes
//
//            System.out.println("OTP sent to " + mobile + ". OTP Map: " + otpMap);
//            System.out.println("Expiry time for OTP: " + otpExpiryMap.get(mobile));
//            System.out.println("Generated OTP: " + otp);
//            System.out.println("OTP map after sending OTP: " + otpMap);
//
//            return "OTP sent successfully!";
//        } catch (Exception e) {
//            System.err.println("Error sending OTP: " + e.getMessage());
//            return "Error sending OTP: " + e.getMessage();
//        }
//    }

    public String sendOtpToPhone(String mobileNumber) {
        // Check if the mobile number exists in either the student or trainer table
        boolean existsInStudent = studentRepository.existsByMobileNumber(mobileNumber);
        boolean existsInTrainer = trainerRepository.existsByMobileNumber(mobileNumber);

        System.out.println("Exists in Student: " + existsInStudent);
        System.out.println("Exists in Trainer: " + existsInTrainer);

        if (!existsInStudent && !existsInTrainer) {
            return "Mobile number not found in student or trainer records!";
        }

        String otp = generateOtp();

        try {
            PhoneNumber recipientPhoneNumber = new PhoneNumber(mobileNumber);
            PhoneNumber senderPhoneNumber = new PhoneNumber(otpConfig.getMobileNumber());
            String msgBody = "Your one-time password is: " + otp;

            Message message = Message.creator(recipientPhoneNumber, senderPhoneNumber, msgBody).create();

            otpMap.put(mobileNumber, otp);
            otpExpiryMap.put(mobileNumber, System.currentTimeMillis() + TimeUnit.MINUTES.toMillis(5)); // OTP expires in 5 minutes

            System.out.println("OTP sent to " + mobileNumber + ". OTP Map: " + otpMap);
            System.out.println("Expiry time for OTP: " + otpExpiryMap.get(mobileNumber));
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

    
    //validate otp
    public String validateOtp(String mobileNumber, String otp) {
        System.out.println("Received OTP: " + otp);
        System.out.println("Stored OTP for number " + mobileNumber + ": " + otpMap.get(mobileNumber));

        if (!otpMap.containsKey(mobileNumber)) {
            return "No OTP sent to this number!";
        }

        String storedOtp = otpMap.get(mobileNumber);
        long expiryTime = otpExpiryMap.get(mobileNumber);

        if (System.currentTimeMillis() > expiryTime) {
            otpMap.remove(mobileNumber); 
            otpExpiryMap.remove(mobileNumber);
            return "OTP has expired!";
        }

        if (storedOtp.equals(otp)) {
            otpMap.remove(mobileNumber); 
            otpExpiryMap.remove(mobileNumber);
            return "OTP validated successfully!";
        } else {
            return "Incorrect OTP!";
        }
    }
}


