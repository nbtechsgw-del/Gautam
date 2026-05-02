package com.scm.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.scm.dto.ResultDto;
import com.scm.services.ResultService;

@RestController
@RequestMapping("/api/admin/results")
@CrossOrigin(origins = "http://localhost:5173")
public class ResultAdminRestController {

    private final ResultService resultService;

    public ResultAdminRestController(ResultService resultService) {
        this.resultService = resultService;
    }

    // ➤ View all results
    @GetMapping
    public ResponseEntity<List<ResultDto>> getAll() {
        return ResponseEntity.ok(resultService.getAll());
    }
    
    @GetMapping("/counts")
    public ResponseEntity<Map<String, Long>> getCounts(){
    	return ResponseEntity.ok(resultService.getCounts());
    }
}