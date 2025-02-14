package app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import app.otplogin.ContactForm;
import app.otplogin.EmailServiceContactUs;

@RestController
@RequestMapping("/sendEmail")
public class EmailContactController {

    @Autowired
    private EmailServiceContactUs emailServiceContactUs;

    @PostMapping
    public String sendEmail(@RequestBody ContactForm contactForm) {
        String recipient = "skillmate001@gmail.com";
        String subject = "New Query from Contact Us Form";
        String messageBody = "Query: " + contactForm.getQuery() + "\n\n" +
                "Selected Option: " + contactForm.getSelectedOption();

        emailServiceContactUs.sendEmail(recipient, subject, messageBody);

        return "Email sent successfully!";
    }
}
