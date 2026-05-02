package com.scm.controller;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.scm.dto.ExamRequest;
import com.scm.entities.Exam;
import com.scm.services.ExamService;

@RestController
@RequestMapping("/api/admin/exams")
@CrossOrigin(origins = "http://localhost:5173")
public class ExamAdminRestController {

    private final ExamService examService;

    public ExamAdminRestController(ExamService examService) {
        this.examService = examService;
    }

    // ➤ Create exam (with question IDs already attached)
    @PostMapping
    public ResponseEntity<Exam> createExam(@RequestBody ExamRequest request) {
        return ResponseEntity.ok(examService.createExam(request));
    }

    // ➤ Get all exams
    @GetMapping
    public ResponseEntity<List<Exam>> getAll() {
        return ResponseEntity.ok(examService.getAll());
    }

    // ➤ Get exam by id
    @GetMapping("/{id}")
    public ResponseEntity<Exam> getById(@PathVariable int id) {
        return ResponseEntity.ok(examService.getById(id));
    }
}