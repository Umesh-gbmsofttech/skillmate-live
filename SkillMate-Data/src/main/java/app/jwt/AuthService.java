package app.jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Service;

import app.entity.Trainer;
import app.entity.Student;
import app.repository.TrainerRepository;
import app.repository.StudentRepository;

import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AuthService {

    @Autowired
    private TrainerRepository trainerRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private JwtHelper jwtHelper;

    @Autowired
    private UserDetailsService userDetailsService;

    @Value("${app.admin.username}")
    private String adminUsername;

    @Value("${app.admin.password}")
    private String adminPassword;

    // Authenticate admin and generate token
    public String isAdmin(String username, String password) {
        if (username.equals(adminUsername) && password.equals(adminPassword)) {
            UserDetails adminUser = User.builder().username(adminUsername)
                    .password(adminPassword).roles("ADMIN").build();
            return jwtHelper.generateToken(adminUser);
        }
        throw new RuntimeException("Invalid admin credentials");
    }

    // Extract UserDetails from token
    public UserDetails getUserDetailsFromToken(String token) {
        String username = jwtHelper.getUsernameFromToken(token);
        return (username != null) ? userDetailsService.loadUserByUsername(username) : null;
    }

    // Generate JWT token
    public String generateToken(UserDetails userDetails) {
        return jwtHelper.generateToken(userDetails);
    }

    // Admin UserDetails
    public UserDetails getAdminUserDetails() {
        return User.builder().username(adminUsername)
                .password(adminPassword).roles("ADMIN").build();
    }

    // Trainer UserDetails
    public UserDetails getTrainerUserDetails(Trainer trainer) {
        return User.builder().username(trainer.getEmail()).password("")
                .authorities(trainer.getRoles().stream()
                        .map(role -> new SimpleGrantedAuthority(role.name()))
                        .collect(Collectors.toList()))
                .build();
    }

    // Student UserDetails
    public UserDetails getStudentUserDetails(Student student) {
        return User.builder().username(student.getEmail()).password("")
                .authorities(student.getRoles().stream()
                        .map(role -> new SimpleGrantedAuthority(role.name()))
                        .collect(Collectors.toList()))
                .build();
    }

    // Get user details by object
    public UserDetails getUserDetailsByObject(Object user) {
        if (user instanceof Trainer) {
            return getTrainerUserDetails((Trainer) user);
        } else if (user instanceof Student) {
            return getStudentUserDetails((Student) user);
        }
        throw new IllegalArgumentException("Unsupported user type: " + user.getClass().getSimpleName());
    }

    // Find user by identifier (mobile/email)
    public Optional<Object> findUserDetailsByIdentifier(String type, String identifier) {
        if ("mobile".equalsIgnoreCase(type)) {
            Optional<Object> trainer = trainerRepository.findByMobileNumber(identifier).map(Object.class::cast);
            if (trainer.isPresent()) {
                return trainer;
            }
            return studentRepository.findByMobileNumber(identifier).map(Object.class::cast);
        } else if ("email".equalsIgnoreCase(type)) {
            Optional<Object> trainer = trainerRepository.findByEmail(identifier).map(Object.class::cast);
            if (trainer.isPresent()) {
                return trainer;
            }
            return studentRepository.findByEmail(identifier).map(Object.class::cast);
        }
        return Optional.empty();
    }

}
//  