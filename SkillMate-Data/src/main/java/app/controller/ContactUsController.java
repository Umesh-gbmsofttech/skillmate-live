package app.controller;

import app.entity.ContactUs;
import app.repository.ContactUsRepository;
import app.service.ContactUsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.Map;

// import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/contact-us")
public class ContactUsController {

    @Autowired
    private ContactUsService contactUsService;

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private ContactUsRepository contactUsRepository;

    // Get all ContactUs records
    @GetMapping
    public List<ContactUs> getAllContactUs() {
        return contactUsService.getAllContactUs();
    }

    // Get ContactUs by ID
    @GetMapping("/{id}")
    public ResponseEntity<ContactUs> getContactUsById(@PathVariable Long id) {
        return contactUsService.getContactUsById(id);
    }

    // Delete ContactUs by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteContactUs(@PathVariable Long id) {
        return contactUsService.deleteContactUs(id);
    }

    @PostMapping
    public ResponseEntity<String> createEnquiry(@RequestBody Map<String, String> formData) {
        try {
            // Save the full form data in the database
            ContactUs enquiry = new ContactUs(
                    formData.get("fullName"),
                    formData.get("email"),
                    formData.get("contactNumber"),
                    formData.get("qualification"),
                    formData.get("query"));
            contactUsRepository.save(enquiry);

            // Send email with the query
            String subject = "New Enquiry Query";
            String body = "Query: " + formData.get("query");
            String userEmail = formData.get("email");

            sendEmail(userEmail, subject, body);

            return ResponseEntity.ok("Enquiry submitted successfully");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Failed to submit enquiry");
        }
    }

    private void sendEmail(String userEmail, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setFrom(userEmail);
        message.setTo("skillmate001@gmail.com");
        message.setSubject(subject);
        message.setText(body);

        mailSender.send(message); // Send the email
    }

}
