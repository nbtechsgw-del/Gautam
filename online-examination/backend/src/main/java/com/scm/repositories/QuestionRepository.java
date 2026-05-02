package com.scm.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.scm.entities.Question;

public interface QuestionRepository extends JpaRepository<Question, Integer> {

}
