package app.service;

import app.entity.ContactUs;
import app.repository.ContactUsRepository;
import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;

// import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@Service
public class ContactUsService {

    @Autowired
    private ContactUsRepository contactUsRepository;

    // Create or update a ContactUs record
    public ResponseEntity<ContactUs> createOrUpdateContactUs(@Valid ContactUs contactUs, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            StringBuilder errorMessage = new StringBuilder();
            for (FieldError error : bindingResult.getFieldErrors()) {
                errorMessage.append(error.getField()).append(": ").append(error.getDefaultMessage()).append(" ");
            }
            return ResponseEntity.badRequest().body(null); // Return bad request if there are validation errors
        }

        try {
            ContactUs savedContactUs = contactUsRepository.save(contactUs);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedContactUs);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(null); // Return server error if something goes wrong
        }
    }

    // Get all ContactUs records
    public List<ContactUs> getAllContactUs() {
        return contactUsRepository.findAll();
    }

    // Get a ContactUs record by ID
    public ResponseEntity<ContactUs> getContactUsById(Long id) {
        Optional<ContactUs> contactUs = contactUsRepository.findById(id);
        if (contactUs.isPresent()) {
            return ResponseEntity.ok(contactUs.get());
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(null); // Return not found if record is not found
        }
    }

    // Delete a ContactUs record by ID
    public ResponseEntity<String> deleteContactUs(Long id) {
        Optional<ContactUs> contactUs = contactUsRepository.findById(id);
        if (contactUs.isPresent()) {
            contactUsRepository.deleteById(id);
            return ResponseEntity.ok("ContactUs record deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body("ContactUs record not found.");
        }
    }
}
