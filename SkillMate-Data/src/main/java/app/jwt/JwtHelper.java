package app.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.spec.SecretKeySpec;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

@Component
public class JwtHelper {

    @Value("${jwt.secret}")
    private String secret; // Load from application.properties or environment variables

    // Token validity in seconds (5 hours)
    public static final long JWT_TOKEN_VALIDITY = 5 * 60 * 60;

    // Retrieve username from JWT token
    public String getUsernameFromToken(String token) {
        return getClaimFromToken(token, Claims::getSubject);
    }

    // Retrieve expiration date from JWT token
    public Date getExpirationDateFromToken(String token) {
        return getClaimFromToken(token, Claims::getExpiration);
    }

    public <T> T getClaimFromToken(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = getAllClaimsFromToken(token);
        return claimsResolver.apply(claims);
    }

    // Parse JWT token and get all claims
    public Claims getAllClaimsFromToken(String token) {
        return Jwts.parserBuilder()
                   .setSigningKey(getSigningKey())
                   .build()
                   .parseClaimsJws(token)
                   .getBody();
    }

    // Check if the token has expired
    private Boolean isTokenExpired(String token) {
        final Date expiration = getExpirationDateFromToken(token);
        return expiration.before(new Date());
    }

    // Generate JWT token for user
    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        // You can add custom claims here as needed, e.g., roles, permissions
        return doGenerateToken(claims, userDetails.getUsername());
    }

    // Create JWT token
    private String doGenerateToken(Map<String, Object> claims, String subject) {
        Key signingKey = getSigningKey();
        
        return Jwts.builder()
                   .setClaims(claims)
                   .setSubject(subject)
                   .setIssuedAt(new Date())
                   .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 1000))
                   .signWith(signingKey, SignatureAlgorithm.HS512)
                   .compact();
    }

    // Validate JWT token
    public Boolean validateToken(String token, UserDetails userDetails) {
        final String username = getUsernameFromToken(token);
        return (username.equals(userDetails.getUsername()) && !isTokenExpired(token));
    }

    // Create signing key from secret
    private Key getSigningKey() {
        byte[] keyBytes = secret.getBytes();
        return new SecretKeySpec(keyBytes, SignatureAlgorithm.HS512.getJcaName());
    }
}