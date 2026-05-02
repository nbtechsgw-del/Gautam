package com.scm.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.scm.entities.Result;

public interface ResultRepository extends JpaRepository<Result, Integer> {

	List<Result> findByUserId(int id);

	long countByUserEmail(String email);

	@Query("SELECT AVG(r.score) FROM Result r WHERE r.user.email = :email")
	Double getAverageScore(@Param("email") String email);

}
