package com.scm.services;

import java.util.List;
import java.util.Map;
import com.scm.dto.ExamSubmission;
import com.scm.dto.ResultDto;

public interface ResultService {

	    ResultDto evaluate(ExamSubmission submission);
	    List<ResultDto> getAll();
	    List<ResultDto> getByUser(int userId);
	    Map<String, Long> getCounts();
}
