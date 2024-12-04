package app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import app.repository.AdminRepo;

@Service
public class AdminService {

	@Autowired
	AdminRepo adminRepo;
}
