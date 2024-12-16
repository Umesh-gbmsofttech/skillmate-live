package app.service;

import app.entity.Login;

public interface LoginWithMobileService {

    public Login saveLoginWithMobile(Login login);
   
    public Login getUSerById(Long id);

}
