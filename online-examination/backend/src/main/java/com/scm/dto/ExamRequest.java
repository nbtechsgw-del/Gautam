package com.scm.dto;

import java.util.List;
import lombok.Data;

@Data
public class ExamRequest {


    private String title;
    private int duration;
    private List<Integer> questionIds;
    
}
