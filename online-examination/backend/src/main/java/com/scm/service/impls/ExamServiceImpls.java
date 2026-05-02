package com.scm.service.impls;

import java.util.List;
import org.springframework.stereotype.Service;
import com.scm.dto.ExamRequest;
import com.scm.entities.Exam;
import com.scm.entities.Question;
import com.scm.repositories.ExamRepository;
import com.scm.repositories.QuestionRepository;
import com.scm.services.ExamService;

@Service
public class ExamServiceImpls implements ExamService {

	private final ExamRepository examRepository;
	private final QuestionRepository questionRepository;

	public ExamServiceImpls(ExamRepository examRepository, QuestionRepository questionRepository) {
		this.examRepository = examRepository;
		this.questionRepository = questionRepository;
	}

	@Override
	public Exam createExam(ExamRequest request) {

		List<Question> questions = questionRepository.findAllById(request.getQuestionIds());

		Exam exam = new Exam();
		exam.setTitle(request.getTitle());
		exam.setDuration(request.getDuration());
		exam.setQuestions(questions);

		return examRepository.save(exam);
	}

	@Override
	public List<Exam> getAll() {
		return examRepository.findAll();
	}

	@Override
	public Exam getById(int id) {
		return examRepository.findById(id).orElseThrow(() -> new RuntimeException("Exam not found"));
	}

}
