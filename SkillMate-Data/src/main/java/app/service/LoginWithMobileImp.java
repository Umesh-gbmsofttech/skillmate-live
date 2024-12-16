package app.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import app.entity.Login;
import app.repository.LoginWithMobileRepository;




@Service
public class LoginWithMobileImp implements LoginWithMobileService{

    @Autowired
    private LoginWithMobileRepository loginWithMobileRepository;

    @Override
    public Login saveLoginWithMobile(Login login) {
       
        return loginWithMobileRepository.save(login);
    }

    @Override
    public Login getUSerById(Long id) {
        
        return loginWithMobileRepository.findById(id).get();
    }

    
}
    
     