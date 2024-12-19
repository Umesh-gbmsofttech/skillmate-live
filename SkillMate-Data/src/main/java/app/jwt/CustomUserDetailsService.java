package app.jwt;

import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
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

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService implements UserDetailsService {

	private Logger logger;
	
    @Autowired
    private TrainerRepository trainerRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Value("${app.admin.username}")
    private String adminUsername;

    @Value("${app.admin.password}")
    private String adminPassword;

    private UserDetails mapTrainerToUserDetails(Trainer trainer) {
        if (trainer == null) {
            throw new UsernameNotFoundException("Trainer not found");
        }
        List<GrantedAuthority> authorities = trainer.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role.name()))
                .collect(Collectors.toList());
        return new User(trainer.getFullName(), "", authorities); // No password for OTP-based login
    }

    private UserDetails mapStudentToUserDetails(Student student) {
        if (student == null) {
            throw new UsernameNotFoundException("Student not found");
        }
        List<GrantedAuthority> authorities = student.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role.name()))
                .collect(Collectors.toList());
        return new User(student.getFullName(), "", authorities); // No password for OTP-based login
    }

    public UserDetails loadUserByMobile(String mobile) throws UsernameNotFoundException {
        Optional<Trainer> trainer = trainerRepository.findByMobileNumber(mobile);
        if (trainer.isPresent()) {
            return mapTrainerToUserDetails(trainer.get());
        }

        Optional<Student> student = studentRepository.findByMobileNumber(mobile);
        if (student.isPresent()) {
            return mapStudentToUserDetails(student.get());
        }

        throw new UsernameNotFoundException("User not found with mobile: " + mobile);
    }
//    @Override
//    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//        // Log for debugging
//        logger.info("Attempting to load user by username: {}", username);
//
//        // Check for admin user
//        if (username.equals(adminUsername)) {
//            logger.info("Admin user loaded");
//            return User.builder()
//                    .username(adminUsername)
//                    .password(passwordEncoder.encode(adminPassword))
//                    .roles("ADMIN")
//                    .build();
//        }
//
//        // Find Trainer by full name
//        Trainer trainer = trainerRepository.findByFullName(username)
//                .orElseThrow(() -> new UsernameNotFoundException("Trainer not found with username: " + username));
//
//        logger.info("Trainer found: {}", trainer.getFullName());
//
//        // Map roles to GrantedAuthorities
//        List<GrantedAuthority> authorities = trainer.getRoles().stream()
//                .map(role -> new SimpleGrantedAuthority("ROLE_" + role)) // Spring Security expects ROLE_ prefix
//                .collect(Collectors.toList());
//
//        // Return UserDetails object
//        return new org.springframework.security.core.userdetails.User(
//                trainer.getFullName(),
//                "", // Password is not used in this flow
//                authorities
//        );
//    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Check for admin
        if (username.equals(adminUsername)) {
        	logger.info("Admin user loaded");
            return User.builder()
                    .username(adminUsername)
                    .password(passwordEncoder.encode(adminPassword))
                    .roles("ADMIN")
                    .build();
            
        }

        // Check for Trainer or Student
        Optional<Trainer> trainer = trainerRepository.findByFullName(username);
        if (trainer.isPresent()) {
            return mapTrainerToUserDetails(trainer.get());
        }

        Optional<Student> student = studentRepository.findByFullName(username);
        if (student.isPresent()) {
            return mapStudentToUserDetails(student.get());
        }

        throw new UsernameNotFoundException("User not found with username: " + username);
    }
}
