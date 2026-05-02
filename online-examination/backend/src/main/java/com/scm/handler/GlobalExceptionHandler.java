package com.scm.handler;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.scm.exceptions.DuplicateResourceException;
import com.scm.exceptions.ResourceNotFoundException;
import com.scm.payload.ApiResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<ApiResponse<Object>> handleResourceNotFoundException(ResourceNotFoundException ex) {

		ApiResponse<Object> response = ApiResponse.<Object>builder().success(false).message(ex.getMessage()).data(ex)
				.build();

		return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);

	}

	@ExceptionHandler(DuplicateResourceException.class)
	public ResponseEntity<ApiResponse<Object>> handleDuplicateResourceException(DuplicateResourceException ex) {

		ApiResponse<Object> response = ApiResponse.builder().success(false).message(ex.getMessage()).data(null).build();

		return new ResponseEntity<>(response, HttpStatus.CONFLICT);
	}
}
