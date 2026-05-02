package com.scm.controller;

import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.scm.dto.ExamSubmission;
import com.scm.dto.ResultDto;
import com.scm.services.ResultService;

@RestController
@RequestMapping("/api/user/results")
@CrossOrigin(origins = "http://localhost:5173")

public class ResultUserRestController {

    private final ResultService resultService;

    public ResultUserRestController(ResultService resultService) {
        this.resultService = resultService;
    }

    // ➤ Submit exam (evaluate)
    @PostMapping("/submit")
    public ResponseEntity<ResultDto> submit(@RequestBody ExamSubmission submission) {
        return ResponseEntity.ok(resultService.evaluate(submission));
    }
    
    // ➤ Get results by user
    @GetMapping("/{userId}")
    public ResponseEntity<List<ResultDto>> getByUser(@PathVariable("userId") int userId) {
    	System.out.println("call all result api");
        return ResponseEntity.ok(resultService.getByUser(userId));
    }
}