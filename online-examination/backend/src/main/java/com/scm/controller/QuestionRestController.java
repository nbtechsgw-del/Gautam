package com.scm.controller;

import java.util.List;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.scm.entities.Question;
import com.scm.services.QuestionService;

@RestController
@RequestMapping("/api/admin/questions")
@CrossOrigin(origins = "http://localhost:5173")
public class QuestionRestController {

    private final QuestionService questionService;

    public QuestionRestController(QuestionService questionService) {
        this.questionService = questionService;
    }

    // ➤ Add question
    @PostMapping
    public ResponseEntity<Question> addQuestion(@RequestBody Question question) {
        Question saved = questionService.save(question);
        return new ResponseEntity<>(saved, HttpStatus.CREATED);
    }

    // ➤ Get all questions
    @GetMapping
    public ResponseEntity<List<Question>> getAll() {
        return ResponseEntity.ok(questionService.getAll());
    }

    // ➤ Get by id
    @GetMapping("/{id}")
    public ResponseEntity<Question> getById(@PathVariable int id) {
        return ResponseEntity.ok(questionService.getById(id));
    }

    // ➤ Delete
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable int id) {
        questionService.delete(id);
        return ResponseEntity.noContent().build();
    }
}