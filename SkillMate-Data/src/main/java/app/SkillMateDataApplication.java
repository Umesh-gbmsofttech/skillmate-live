package app;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import app.otpconfiguration.OtpConfig;
import jakarta.annotation.PostConstruct;
import com.twilio.Twilio;

@SpringBootApplication
public class SkillMateDataApplication {

	@Autowired
    private OtpConfig otpConfig;

    @PostConstruct
    public void setup() {
        Twilio.init(otpConfig.getAccountSID(), otpConfig.getAuthToken());
    }

	public static void main(String[] args) {
		SpringApplication.run(SkillMateDataApplication.class, args);
	}

}
