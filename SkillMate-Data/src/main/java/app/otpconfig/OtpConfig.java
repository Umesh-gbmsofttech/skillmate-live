package app.otpconfig;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "twilio")
public class OtpConfig {
    
 private String accountSID;
 private String authToken;
 private String mobile;
 
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


public OtpConfig(){

}
public String getMobile() {
	return mobile;
}
public void setMobile(String mobile) {
	this.mobile = mobile;
}
@Override
public String toString() {
	return "OtpConfig [accountSID=" + accountSID + ", authToken=" + authToken + ", mobile=" + mobile + "]";
}
public OtpConfig(String accountSID, String authToken, String mobile) {
	super();
	this.accountSID = accountSID;
	this.authToken = authToken;
	this.mobile = mobile;
}


}
