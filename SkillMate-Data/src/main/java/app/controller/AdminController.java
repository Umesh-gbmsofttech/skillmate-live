package app.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

import app.service.AdminService;

@RestController
public class AdminController {

	@Autowired
	AdminService adminService;
}
