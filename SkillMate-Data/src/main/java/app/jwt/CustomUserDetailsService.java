package app.jwt;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserLoginRepo userRepository;

    @Override
    public UserDetails loadUserByUsername(String mobile) throws UsernameNotFoundException {
        Users user = userRepository.findByMobile(mobile); // Changed to find by mobile
        if (user == null) {
            throw new UsernameNotFoundException("User not found with mobile: " + mobile);
        }
        List<GrantedAuthority> authorities = user.getRoles().stream()
                .map(role -> new SimpleGrantedAuthority("ROLE_" + role))
                .collect(Collectors.toList());
        return new org.springframework.security.core.userdetails.User(
                user.getMobile(), user.getPassword(), authorities);
    }
}
