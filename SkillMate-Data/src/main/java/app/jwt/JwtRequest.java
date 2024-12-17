package app.jwt;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class JwtRequest {
    private String mobile;  // Changed from email to mobile
    private String password;
}
