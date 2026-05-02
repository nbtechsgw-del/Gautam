package com.scm.controller;

import java.util.HashMap;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.scm.dto.LoginResponse;
import com.scm.entities.Role;
import com.scm.entities.User;
import com.scm.payload.ApiResponse;
import com.scm.requests.LoginRequest;
import com.scm.services.UserServices;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:5173")
public class UserRestController {
	
	private final UserServices userService;
	
	public UserRestController(UserServices userService) {
		this.userService=userService;
	}
	
	
	@PostMapping("/register")
	public ResponseEntity<ApiResponse<User>> register(@RequestBody User user){
		user.setRole(user.getRole() != null ? user.getRole() : Role.USER);
		ApiResponse<User> response = userService.registerUser(user);
		return ResponseEntity.status(HttpStatus.CREATED).body(response);
	}
	
	
	@PostMapping("/login")
	public ResponseEntity<ApiResponse<LoginResponse>> login(@RequestBody LoginRequest request){
		System.out.println(request);
		LoginResponse loginResponse = userService.loginUser(request);
		ApiResponse<LoginResponse> response = ApiResponse.<LoginResponse>builder()
				                                                       .success(true)
				                                                       .data(loginResponse)
				                                                       .message("Login Success")
				                                                       .build();
		return ResponseEntity.status(HttpStatus.OK).body(response);
	}

	
	  @PostMapping("/logout")
	    public String logout(HttpServletRequest request) {

	        String header = request.getHeader("Authorization");

	        if (header != null && header.startsWith("Bearer ")) {
	            String token = header.substring(7);
	            userService.logoutUser(token);
	        }

	        return "Logged out successfully";
	    }
	
	  @GetMapping("/profile")
	  public User getProfile(Authentication auth) {
	      String email = auth.getName();
	      return userService.getUserByEmail(email);
	  }
	  
	  @GetMapping("/dashboard")
	  public Map<String, Object> getDashboard(Authentication auth) {
		  System.out.println("call this api");
	      String email = auth.getName();
	      System.out.println(userService.getDashboard(email));
	      return userService.getDashboard(email);
	  }
}
