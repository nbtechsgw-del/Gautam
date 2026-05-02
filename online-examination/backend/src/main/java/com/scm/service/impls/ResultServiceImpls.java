package com.scm.service.impls;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import com.scm.dto.ExamSubmission;
import com.scm.dto.ResultDto;
import com.scm.entities.Exam;
import com.scm.entities.Question;
import com.scm.entities.Result;
import com.scm.entities.Role;
import com.scm.entities.User;
import com.scm.repositories.ExamRepository;
import com.scm.repositories.ResultRepository;
import com.scm.repositories.UserRepository;
import com.scm.services.ResultService;

@Service
public class ResultServiceImpls implements ResultService {

	private final ResultRepository resultRepository;
	private final ExamRepository examRepository;
	private final UserRepository userRepository;

	public ResultServiceImpls(ResultRepository resultRepository, ExamRepository examRepository,
			UserRepository userRepository) {
		this.resultRepository = resultRepository;
		this.examRepository = examRepository;
		this.userRepository = userRepository;
	}

	@Override
	public ResultDto evaluate(ExamSubmission submission) {
       System.out.println("call evalute api");
		Exam exam = examRepository.findById(submission.getExamId())
				.orElseThrow(() -> new RuntimeException("Exam not found"));

		String email = SecurityContextHolder.getContext().getAuthentication().getName();

		User user = userRepository.findByEmail(email);

		int score = 0;

		for (Question q : exam.getQuestions()) {

			String correct = q.getCorrectAnswer();

			String given = submission.getAnswers()
			        .get(String.valueOf(q.getId())); // ✅ FIXED

			System.out.println("QID: " + q.getId());
			System.out.println("Correct: " + correct);
			System.out.println("Given: " + given); // 🔥 ADD THIS

			if (correct != null && given != null && correct.trim().equalsIgnoreCase(given.trim())) {
				score++;
			}
		}

		System.out.println("Score -> " + score);

		Result result = new Result();
		result.setExam(exam);
		result.setUser(user);
		result.setScore(score);
	    resultRepository.save(result);
	    
	    ResultDto resultDto = new ResultDto();
	    resultDto.setExamTitle(exam.getTitle());
	    resultDto.setUserName(user.getUserName());
	    resultDto.setScore(score);
	    return resultDto;
	}

	@Override
	public List<ResultDto> getAll() {
		return resultRepository.findAll().stream().map(r -> {

			ResultDto dto = new ResultDto();

			if (r.getUser() != null) {
				dto.setUserName(r.getUser().getUserName());
			}

			if (r.getExam() != null) {
				dto.setExamTitle(r.getExam().getTitle());
			}

			dto.setScore(r.getScore());

			return dto;
		}).toList();
	}

	@Override
	public List<ResultDto> getByUser(int userId) {
	    List<Result> results = resultRepository.findByUserId(userId);

	    return results.stream()
	            .map(result -> new ResultDto(
	                    result.getUser().getUserName(),
	                    result.getExam().getTitle(),
	                    result.getScore()
	            ))
	            .toList();
	}
	

	@Override
	public Map<String, Long> getCounts() {
		
		Map<String, Long> data = new HashMap<>();
		data.put("exams", examRepository.count());
		data.put("users", userRepository.countByRole(Role.USER));
		data.put("results", resultRepository.count());
		
		return data;
	}

}
