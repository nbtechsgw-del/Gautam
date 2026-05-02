package com.scm.service.impls;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.scm.dto.LoginResponse;
import com.scm.entities.User;
import com.scm.exceptions.DuplicateResourceException;
import com.scm.exceptions.ResourceNotFoundException;
import com.scm.payload.ApiResponse;
import com.scm.repositories.ExamRepository;
import com.scm.repositories.ResultRepository;
import com.scm.repositories.UserRepository;
import com.scm.requests.LoginRequest;
import com.scm.services.UserServices;
import com.scm.util.JwtUtil;

@Service
public class UserServiceImpls implements UserServices {

	private final UserRepository userRepository;
	private final ExamRepository examRepository;
	private  ResultRepository resultRepository;
	private final JwtUtil jwtUtil;
	private final PasswordEncoder passwordEncoder;
	private Set<String> blacklist = new HashSet<>();

	public UserServiceImpls(UserRepository userRepository, JwtUtil jwtUtil, PasswordEncoder passwordEncoder,ResultRepository resultRepository,ExamRepository examRepository) {
		this.userRepository = userRepository;
		this.jwtUtil = jwtUtil;
		this.passwordEncoder = passwordEncoder;
		this.examRepository=examRepository;
		this.resultRepository=resultRepository;
	}

	@Override
	public ApiResponse<User> registerUser(User user) {
		User existingUser = userRepository.findByEmail(user.getEmail());
		if (existingUser != null) {
			throw new DuplicateResourceException("Duplicate Email !");
		}
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		User savedUser = userRepository.save(user);
		ApiResponse<User> response = ApiResponse.<User>builder().success(true).message("User Register Successfylly")
				.data(savedUser).build();
		return response;
	}

	@Override
	public LoginResponse loginUser(LoginRequest request) {

		User user = userRepository.findByEmail(request.getEmail());
		System.out.println(user.toString());
		// ❌ User not found
		if (user == null) {
			System.out.println("user problem ");
			throw new ResourceNotFoundException("Invalid Email or Password");
		}

		// ❌ Wrong password
		if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
			System.out.println("password problem ");
			throw new ResourceNotFoundException("Invalid Email or Password");
		}

		// ✅ Generate JWT
		String token = jwtUtil.generateToken(user.getEmail(), user.getRole().toString());
		LoginResponse response = new LoginResponse();
		response.setUserId(user.getId());
		response.setToken(token);
		return response;
	}

	@Override
	public void logoutUser(String token) {
		blacklist.add(token);

	}

	@Override
	public User getUserByEmail(String email) {
		return userRepository.findByEmail(email);
	}

	@Override
	public Map<String, Object> getDashboard(String email) {
		long totalExams = examRepository.count();
	    long completedExams = resultRepository.countByUserEmail(email);
	    long availableExams = totalExams - completedExams;

	    Double avg = resultRepository.getAverageScore(email);

	    double avgScore = (avg != null) ? avg : 0.0;

	    Map<String, Object> map = new HashMap<>();
	    map.put("totalExams", totalExams);
	    map.put("completedExams", completedExams);
	    map.put("availableExams", availableExams);
	    map.put("avgScore", avgScore);
		return map;
	}
}
