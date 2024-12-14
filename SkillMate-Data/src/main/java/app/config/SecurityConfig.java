//package app.config;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.security.config.annotation.web.builders.HttpSecurity;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
//import org.springframework.security.crypto.password.PasswordEncoder;
//import org.springframework.security.provisioning.InMemoryUserDetailsManager;
//import org.springframework.security.core.userdetails.User;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.web.SecurityFilterChain;
//
//import static org.springframework.security.config.Customizer.withDefaults;
//
//@Configuration
//public class SecurityConfig {
//
//        @Bean
//        public InMemoryUserDetailsManager userDetailsService() {
//                UserDetails admin = User.builder()
//                                .username("admin")
//                                .password(passwordEncoder().encode("adminpass"))
//                                .roles("ADMIN")
//                                .build();
//
//                UserDetails trainer = User.builder()
//                                .username("trainer")
//                                .password(passwordEncoder().encode("trainerpass"))
//                                .roles("TRAINER")
//                                .build();
//
//                UserDetails student = User.builder()
//                                .username("student")
//                                .password(passwordEncoder().encode("studentpass"))
//                                .roles("STUDENT")
//                                .build();
//
//                return new InMemoryUserDetailsManager(admin, trainer, student);
//        }
//
//        @Bean
//        public PasswordEncoder passwordEncoder() {
//                return new BCryptPasswordEncoder();
//        }
//
//        @Bean
//        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//                http
//                                .csrf(csrf -> csrf.disable()) // Disable CSRF protection for stateless APIs
//                                .authorizeHttpRequests(auth -> auth
//                                                .requestMatchers("/admin/**").hasRole("ADMIN")
//                                                .requestMatchers("/trainers/**").hasRole("TRAINER")
//                                                .requestMatchers("/students/**").hasRole("STUDENT")
//                                                .anyRequest().authenticated())
//                                .httpBasic(withDefaults());
//
//                return http.build();
//        }
//}
