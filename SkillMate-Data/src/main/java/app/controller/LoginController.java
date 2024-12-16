package app.controller;



import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import app.entity.Login;
import app.service.LoginWithMobileService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;




@RestController
@RequestMapping("/login")
public class LoginController {


    @Autowired
    private LoginWithMobileService loginWithMobileService;

    @PostMapping("/save")
    public ResponseEntity<Login> saveLogin(@RequestBody Login login){

        Login logins=loginWithMobileService.saveLoginWithMobile(login);

        return ResponseEntity.ok().body(logins);
    }

    @GetMapping("/find-user/${id}")
    public ResponseEntity<Login> getUserNumber(@RequestParam("id") Long id) {
        Login logins=loginWithMobileService.getUSerById(id);
        return ResponseEntity.ok().body(logins);
    }
    







} 