package app.otplogin;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
public class EmailOtp {

	    @Id
	    @GeneratedValue(strategy = GenerationType.IDENTITY)
	    private Long id;

	    @Column(nullable = false, unique = true)
	    private String email;

	    @Column(nullable = false)
	    private String otp;

	    @Column(nullable = false)
	    private LocalDateTime createdAt;

	    @Column(nullable = false)
	    private LocalDateTime expiresAt;

	    public EmailOtp() {
			
		}

	    public EmailOtp(String email, String otp, LocalDateTime createdAt, LocalDateTime expiresAt) {
	        this.email = email;
	        this.otp = otp;
	        this.createdAt = createdAt;
	        this.expiresAt = expiresAt;
	    }

		public Long getId() {
			return id;
		}

		public void setId(Long id) {
			this.id = id;
		}

		public String getEmail() {
			return email;
		}

		public void setEmail(String email) {
			this.email = email;
		}

		public String getOtp() {
			return otp;
		}

		public void setOtp(String otp) {
			this.otp = otp;
		}

		public LocalDateTime getCreatedAt() {
			return createdAt;
		}

		public void setCreatedAt(LocalDateTime createdAt) {
			this.createdAt = createdAt;
		}

		public LocalDateTime getExpiresAt() {
			return expiresAt;
		}

		public void setExpiresAt(LocalDateTime expiresAt) {
			this.expiresAt = expiresAt;
		}
	
	
}
