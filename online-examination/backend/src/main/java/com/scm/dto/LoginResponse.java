package com.scm.dto;

import lombok.Data;

@Data
public class LoginResponse {

	private int userId;
	private String token;
}
