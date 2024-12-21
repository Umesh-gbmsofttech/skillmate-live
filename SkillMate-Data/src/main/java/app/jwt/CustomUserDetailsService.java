package app.jwt;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

    private static final Logger logger = LoggerFactory.getLogger(CustomUserDetailsService.class);

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
        logger.info("Trainer found:", trainer);
        System.out.println(trainer);
        logger.info("Trainer authorities: {}", authorities);

        return new User(trainer.getEmail(), "", authorities);
    }

    private UserDetails mapStudentToUserDetails(Student student) {
        if (student == null) {
            throw new UsernameNotFoundException("Student not found");
        }
        List<GrantedAuthority> authorities = student.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role.name()))
                .collect(Collectors.toList());
        logger.info("Student found: {}", student);
        logger.info("Student authorities: {}", authorities);

        return new User(student.getEmail(), "", authorities);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        if (email.equals(adminUsername)) {
            logger.info("Admin user loaded: {}", email);
            return User.builder()
                    .username(adminUsername)
                    .password(passwordEncoder.encode(adminPassword))
                    .roles("ADMIN")
                    .build();
        }

        Optional<Trainer> trainer = trainerRepository.findByEmail(email);
        if (trainer.isPresent()) {
            return mapTrainerToUserDetails(trainer.get());
        }

        Optional<Student> student = studentRepository.findByEmail(email);
        if (student.isPresent()) {
            return mapStudentToUserDetails(student.get());
        }

        throw new UsernameNotFoundException("User not found with email: " + email);
    }
}