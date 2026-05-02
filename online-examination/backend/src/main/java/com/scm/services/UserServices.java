package com.scm.services;

import java.util.Map;

import com.scm.dto.LoginResponse;
import com.scm.entities.User;
import com.scm.payload.ApiResponse;
import com.scm.requests.LoginRequest;

public interface UserServices {
	
	 ApiResponse<User> registerUser(User user);
	 LoginResponse loginUser(LoginRequest request); 
     void logoutUser(String token);
     User getUserByEmail(String email);
     Map<String,Object> getDashboard(String email);
}
