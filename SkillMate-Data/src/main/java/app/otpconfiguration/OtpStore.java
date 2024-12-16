package app.otpconfiguration;

import java.util.HashMap;
import java.util.Map;

import org.springframework.stereotype.Component;

@Component
public class OtpStore {


    private Map<String, String> otpMap = new HashMap<>();
    private Map<String, Long> otpExpiryMap = new HashMap<>();

    public String getOtp(String number) {
        return otpMap.get(number);
    }

    public Long getExpiry(String number) {
        return otpExpiryMap.get(number);
    }

    public void storeOtp(String number, String otp, long expiry) {
        otpMap.put(number, otp);
        otpExpiryMap.put(number, expiry);
    }
}


