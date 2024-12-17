package app.jwt;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
public class JwtResponse {
    public String jwtToken;
    public String mobile;  // Return mobile instead of username
}
