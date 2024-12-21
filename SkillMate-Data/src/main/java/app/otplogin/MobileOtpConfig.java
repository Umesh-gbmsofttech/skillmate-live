package app.otplogin;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "twilio")
public class MobileOtpConfig {
    
 private String accountSID;
 private String authToken;
 private String mobileNumber;
 
public String getAccountSID() {
    return accountSID;
}
public void setAccountSID(String accountSID) {
    this.accountSID = accountSID;
}
public String getAuthToken() {
    return authToken;
}
public void setAuthToken(String authToken) {
    this.authToken = authToken;
}


public MobileOtpConfig(){

}

public String getMobileNumber() {
	return mobileNumber;
}
public void setMobileNumber(String mobileNumber) {
	this.mobileNumber = mobileNumber;
}
@Override
public String toString() {
	return "OtpConfig [accountSID=" + accountSID + ", authToken=" + authToken + ", mobile=" + mobileNumber + "]";
}
public MobileOtpConfig(String accountSID, String authToken, String mobile) {
	super();
	this.accountSID = accountSID;
	this.authToken = authToken;
	this.mobileNumber = mobile;
}


}
