package app.entity;

import com.fasterxml.jackson.annotation.JsonView;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

@Entity
public class ContactUs {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonView(JsonResoponse_View.BasicView.class)
    private Long id;

    @NotEmpty(message = "Full name is required")
    @Size(min = 3, max = 100, message = "Full name must be between 3 and 100 characters")
    private String fullName;

    @NotEmpty(message = "Email is required")
    @Email(message = "Please provide a valid email address")
    private String email;

    @NotNull(message = "Contact number is required")
    private String contactNumber; // Using String to handle international phone formats better

    @NotEmpty(message = "Qualification is required")
    @Size(min = 3, max = 100, message = "Qualification must be between 3 and 100 characters")
    private String qualification;

    @NotEmpty(message = "Query is required")
    @Size(min = 10, max = 500, message = "Query must be between 10 and 500 characters")
    private String query;

    // Default no-arg constructor
    public ContactUs() {
    }

    // Constructor without validation annotations
    public ContactUs(String fullName, String email, String contactNumber, String qualification, String query) {
        this.fullName = fullName;
        this.email = email;
        this.contactNumber = contactNumber;
        this.qualification = qualification;
        this.query = query;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getContactNumber() {
        return contactNumber;
    }

    public void setContactNumber(String contactNumber) {
        this.contactNumber = contactNumber;
    }

    public String getQualification() {
        return qualification;
    }

    public void setQualification(String qualification) {
        this.qualification = qualification;
    }

    public String getQuery() {
        return query;
    }

    public void setQuery(String query) {
        this.query = query;
    }

    // Override toString for better logging or debugging
    @Override
    public String toString() {
        return "ContactUs{" +
                "id=" + id +
                ", fullName='" + fullName + '\'' +
                ", email='" + email + '\'' +
                ", contactNumber='" + contactNumber + '\'' +
                ", qualification='" + qualification + '\'' +
                ", query='" + query + '\'' +
                '}';
    }
}
