package com.scm.dto;

import java.util.Map;

import lombok.Data;

@Data
public class ExamSubmission {

	private int examId;
	private Map<String, String> answers;
	
}
