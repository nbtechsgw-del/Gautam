package com.scm.repositories;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import com.scm.entities.Faq;

public interface FaqRepository extends JpaRepository<Faq, Long>{


	@Query("SELECT f FROM Faq f WHERE LOWER(f.question) LIKE LOWER(CONCAT('%', :question, '%'))")
	List<Faq> searchFaq(@Param("question") String question);
	
}
