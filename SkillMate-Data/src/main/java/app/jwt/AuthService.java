package app.jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class AuthService {

	@Autowired
	private UsersRepo usersRepository;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private JwtHelper jwtHelper;

	@Autowired
	private UserDetailsService userDetailsService;

	public UserDetails getUserDetailsFromToken(String token) {
		String username = jwtHelper.getUsernameFromToken(token);
		if (username != null) {
			return userDetailsService.loadUserByUsername(username);
		}
		return null;
	}

	public void registerUser(Users users) {
		users.setPassword(passwordEncoder.encode(users.getPassword()));
		users.setRoles(new HashSet<>()); // Assuming roles are set separately

		usersRepository.save(users);
	}
//    public void registerUser(Users users, Set<String> roles) {
//        users.setPassword(passwordEncoder.encode(users.getPassword()));
//        users.setRoles(roles); // Assign roles to the user
//
//        usersRepository.save(users);
//    }

	public String generateToken(UserDetails userDetails) {
		return jwtHelper.generateToken(userDetails);
	}
}
