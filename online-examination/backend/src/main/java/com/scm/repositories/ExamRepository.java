package com.scm.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.scm.entities.Exam;

public interface ExamRepository extends JpaRepository<Exam, Integer> {

}
