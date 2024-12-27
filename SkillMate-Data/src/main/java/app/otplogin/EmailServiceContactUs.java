package app.otplogin;


import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailServiceContactUs  {

    private final JavaMailSender mailSender;

    public EmailServiceContactUs(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendEmail(String recipient, String subject, String messageBody) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(recipient);
        message.setSubject(subject);
        message.setText(messageBody);
        mailSender.send(message);
    }
}


