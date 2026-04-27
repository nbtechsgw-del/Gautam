package com.scm.rest.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.scm.response.FaqResponse;
import com.scm.services.FaqService;

@RestController
@RequestMapping("/api/faq")
@CrossOrigin(origins = "*")
public class FaqController {

	private final FaqService service;

	public FaqController(FaqService service) {
		this.service = service;
	}

	
	 @GetMapping
	    public ResponseEntity<FaqResponse> getAnswer(
	            @RequestParam("question") String question) {

	        if (question == null || question.trim().isEmpty()) {
	            return ResponseEntity
	                    .badRequest()
	                    .body(new FaqResponse("Question cannot be empty"));
	        }

	        String answer = service.getAnswer(question.trim());

	        return ResponseEntity.ok(new FaqResponse(answer));
	    }
}