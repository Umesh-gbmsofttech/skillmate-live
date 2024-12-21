package app.jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import app.entity.Trainer;
import app.entity.Student;
import app.repository.TrainerRepository;
import app.repository.StudentRepository;

import java.util.HashSet;

@Service
public class AuthService {

    @Autowired
    private TrainerRepository trainerRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtHelper jwtHelper;

    @Autowired
    private UserDetailsService userDetailsService;

    @Value("${app.admin.username}")
    private String adminUsername;

    @Value("${app.admin.password}")
    private String adminPassword;

    public String isAdmin(String username, String password) {
        if (username.equals(adminUsername) && password.equals(adminPassword)) {
            UserDetails adminUser = User.builder()
                    .username(adminUsername)
                    .password(passwordEncoder.encode(adminPassword))
                    .roles("ADMIN")
                    .build();
            return jwtHelper.generateToken(adminUser);
        }
        throw new RuntimeException("Invalid admin credentials");
    }

    public UserDetails getUserDetailsFromToken(String token) {
        String username = jwtHelper.getUsernameFromToken(token);
        if (username != null) {
            return userDetailsService.loadUserByUsername(username);
        }
        return null;
    }

    public String generateToken(UserDetails userDetails) {
        return jwtHelper.generateToken(userDetails);
    }
}







  