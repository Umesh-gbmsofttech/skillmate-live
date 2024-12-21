package app.otplogin;

public class EmailOtpRequest {
    private String email;

    public EmailOtpRequest() {}

    public EmailOtpRequest(String email) {
        this.email = email;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
