package app.controller;

import app.entity.ContactUs;
import app.service.ContactUsService;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

// import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("/contact-us")
public class ContactUsController {

    @Autowired
    private ContactUsService contactUsService;

    // Get all ContactUs records
    @GetMapping("/fetch")
    public List<ContactUs> getAllContactUs() {
        return contactUsService.getAllContactUs();
    }

    // Get ContactUs by ID
    @GetMapping("/fetch/{id}")
    public ResponseEntity<ContactUs> getContactUsById(@PathVariable Long id) {
        return contactUsService.getContactUsById(id);
    }

    // Create or update a ContactUs record
    @PostMapping("/create")
    public ResponseEntity<ContactUs> createOrUpdateContactUs(@Valid @RequestBody ContactUs contactUs,
            BindingResult bindingResult) {
        return contactUsService.createOrUpdateContactUs(contactUs, bindingResult);
    }

    // Delete ContactUs by ID
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<String> deleteContactUs(@PathVariable Long id) {
        return contactUsService.deleteContactUs(id);
    }
}
