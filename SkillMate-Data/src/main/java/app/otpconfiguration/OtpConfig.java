package app.otpconfiguration;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "twilio")
public class OtpConfig {
    
 private String accountSID;
 private String authToken;
 private String number;
 
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
public String getNumber() {
    return number;
}
public void setNumber(String number) {
    this.number = number;
}
@Override
public String toString() {
    return "OtpConfig [accountSID=" + accountSID + ", authToken=" + authToken + ", number=" + number + "]";
}
public OtpConfig(String accountSID, String authToken, String number) {
    this.accountSID = accountSID;
    this.authToken = authToken;
    this.number = number;
}


}