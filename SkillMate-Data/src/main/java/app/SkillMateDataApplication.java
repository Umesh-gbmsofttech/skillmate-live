package app;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

import org.springframework.beans.factory.annotation.Autowired;
import jakarta.annotation.PostConstruct;
import com.twilio.Twilio;

import app.otplogin.MobileOtpConfig;



@SpringBootApplication
@ComponentScan
public class SkillMateDataApplication {
	
	@Autowired
    private MobileOtpConfig mobileOtpConfig;

    @PostConstruct
    public void setup() {
        Twilio.init(mobileOtpConfig.getAccountSID(), mobileOtpConfig.getAuthToken());
    }

	public static void main(String[] args) {
		SpringApplication.run(SkillMateDataApplication.class, args);
	}

}
