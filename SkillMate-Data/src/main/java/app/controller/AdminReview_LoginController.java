package app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import app.service.RatingReviewService;
import app.entity.RatingReviews;
import app.jwt.AuthService;
import app.jwt.CustomUserDetailsService;
import app.jwt.JwtHelper;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/admin")
public class AdminReview_LoginController {

    @Autowired
    private RatingReviewService ratingReviewService;
    
    @Autowired
    private AuthService authService;
    
    @Autowired
    private JwtHelper jwtHelper;
    
    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @PostMapping("/review/create")
    public RatingReviews createAdminReview(
            @RequestParam String reviewText,
            @RequestParam(required = false) Long trainerId,
            @RequestParam(required = false) Long courseId,
            @RequestParam(required = false) Long studentId) {
        
        return ratingReviewService.createAdminReview(reviewText, courseId, trainerId, studentId);
    }
    
    @PostMapping("/login")
    public String adminLogin(@RequestBody LoginRequest loginRequest) {
        try {
            return authService.isAdmin(loginRequest.getUsername(), loginRequest.getPassword());
        } catch (RuntimeException e) {
            throw new RuntimeException("Invalid username or password");
        }
    }

    // DTO Class for LoginRequest
    public static class LoginRequest {
        private String username;
        private String password;

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }
}
