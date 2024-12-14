package app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import app.entity.Login;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;


@RestController
@RequestMapping("/login")
public class LoginController {

//	@Autowired
//	LoginService loginService;
	
//	login with mobile number otp
//	@PostMapping("/mobile")
//	public String postMethodName(@RequestBody Login login) {
//  return loginService.getAuth(login);
//	}
	
//	login with email otp
//	@PostMapping("/email")
//	public String postMethodName(@RequestBody Login login) {
//  return loginService.getAuth(login);
//	}
	
}
