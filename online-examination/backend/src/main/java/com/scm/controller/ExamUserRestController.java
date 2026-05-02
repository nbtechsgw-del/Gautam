package com.scm.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.scm.entities.Exam;
import com.scm.services.ExamService;

@RestController
@RequestMapping("/api/user/exams")
@CrossOrigin(origins = "http://localhost:5173")
public class ExamUserRestController {

	private final ExamService examService;

	public ExamUserRestController(ExamService examService) {
		this.examService = examService;
	}

	// ➤ List exams
	@GetMapping
	public ResponseEntity<List<Exam>> getAllExams() {
		return ResponseEntity.ok(examService.getAll());
	}

	// ➤ Get single exam (for attempt)
	@GetMapping("/{id}")
	public ResponseEntity<Exam> getExam(@PathVariable("id") int id) {
		System.out.println(examService.getById(id));
		return ResponseEntity.ok(examService.getById(id));
	}
}