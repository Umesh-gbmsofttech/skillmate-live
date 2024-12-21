


package app.otplogin;


import java.util.concurrent.TimeUnit;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import app.repository.StudentRepository;
import app.repository.TrainerRepository;

@Service
public class MobileOtpService {

    private final Map<String, String> otpMap = new HashMap<>();
    private final Map<String, Long> otpExpiryMap = new HashMap<>();
    
    @Autowired
    private  StudentRepository studentRepository;
    private final TrainerRepository trainerRepository;

    // Constructor
    public MobileOtpService(StudentRepository studentRepository, TrainerRepository trainerRepository) {
        this.studentRepository = studentRepository;
        this.trainerRepository = trainerRepository;
    }

    // Inner Class for Request
    public static class OTPRequest {
        private String mobileNumber;
        private String otp;

       
        public OTPRequest() {}

        public OTPRequest(String mobileNumber, String otp) {
            this.mobileNumber = mobileNumber;
            this.otp = otp;
        }

    
        public String getMobileNumber() {
            return mobileNumber;
        }

        public void setMobileNumber(String mobileNumber) {
            this.mobileNumber = mobileNumber;
        }

        public String getOtp() {
            return otp;
        }

        public void setOtp(String otp) {
            this.otp = otp;
        }
    }

    
    public static class OTPResponse {
        private String message;
        private boolean success;

        // Constructors
        public OTPResponse() {}

        public OTPResponse(String message, boolean success) {
            this.message = message;
            this.success = success;
        }

        
        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }

        public boolean isSuccess() {
            return success;
        }

        public void setSuccess(boolean success) {
            this.success = success;
        }
    }

    // Send OTP
    public OTPResponse sendOtpToPhone(OTPRequest otpRequest) {
        String mobileNumber = otpRequest.getMobileNumber();

        // Check if the mobile number exists in either the student or trainer table
        boolean existsInStudent = studentRepository.existsByMobileNumber(mobileNumber);
        boolean existsInTrainer = trainerRepository.existsByMobileNumber(mobileNumber);

        if (!existsInStudent && !existsInTrainer) {
            return new OTPResponse("Mobile number not found in student or trainer records!", false);
        }

        String otp = generateOtp();

        try {
            otpMap.put(mobileNumber, otp);
            otpExpiryMap.put(mobileNumber, System.currentTimeMillis() + TimeUnit.MINUTES.toMillis(5)); // OTP expires in 5 minutes

            System.out.println("Generated OTP: " + otp); 
            return new OTPResponse("OTP sent successfully!", true);
        } catch (Exception e) {
            return new OTPResponse("Error sending OTP: " + e.getMessage(), false);
        }
    }

    // Validate OTP
    public OTPResponse validateOtp(OTPRequest otpRequest) {
        String mobileNumber = otpRequest.getMobileNumber();
        String otp = otpRequest.getOtp();

        if (!otpMap.containsKey(mobileNumber)) {
            return new OTPResponse("No OTP sent to this number!", false);
        }

        String storedOtp = otpMap.get(mobileNumber);
        long expiryTime = otpExpiryMap.get(mobileNumber);

        if (System.currentTimeMillis() > expiryTime) {
            otpMap.remove(mobileNumber);
            otpExpiryMap.remove(mobileNumber);
            return new OTPResponse("OTP has expired!", false);
        }

        if (storedOtp.equals(otp)) {
            otpMap.remove(mobileNumber);
            otpExpiryMap.remove(mobileNumber);
            return new OTPResponse("OTP validated successfully!", true);
        } else {
            return new OTPResponse("Incorrect OTP!", false);
        }
    }

    // Generate a 6-digit OTP
    private String generateOtp() {
        int otp = (int) (Math.random() * 1000000); 
        return String.format("%06d", otp);
    }




    }




