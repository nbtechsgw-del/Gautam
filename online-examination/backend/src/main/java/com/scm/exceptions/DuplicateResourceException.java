package com.scm.exceptions;

public class DuplicateResourceException extends RuntimeException{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	public DuplicateResourceException() {
		super();
	}

	public DuplicateResourceException(String message) {
		super(message);
	}
}
