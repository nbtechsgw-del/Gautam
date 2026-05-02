package com.scm.service.impls;

import java.util.List;

import org.springframework.stereotype.Service;

import com.scm.entities.Question;
import com.scm.repositories.QuestionRepository;
import com.scm.services.QuestionService;

@Service
public class QuestionServiceImpl implements QuestionService {

	  private final QuestionRepository questionRepository;

	    public QuestionServiceImpl(QuestionRepository questionRepository) {
	        this.questionRepository = questionRepository;
	    }

	    @Override
	    public Question save(Question question) {
	        return questionRepository.save(question);
	    }

	    @Override
	    public List<Question> getAll() {
	        return questionRepository.findAll();
	    }

	    @Override
	    public Question getById(int id) {
	        return questionRepository.findById(id)
	            .orElseThrow(() -> new RuntimeException("Question not found"));
	    }

	    @Override
	    public void delete(int id) {
	        questionRepository.deleteById(id);
	    }

}
