package com.scm.services;

import java.util.List;

import com.scm.dto.ExamRequest;
import com.scm.entities.Exam;

public interface ExamService {

	Exam createExam(ExamRequest exam);

	List<Exam> getAll();

	Exam getById(int id);
}
