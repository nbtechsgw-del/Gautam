package com.scm.services;

import java.util.List;

import com.scm.entities.Question;

public interface QuestionService {

	Question save(Question question);

	List<Question> getAll();

	Question getById(int id);

	void delete(int id);
}
