package com.scm.service.impls;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.scm.entities.Faq;
import com.scm.repositories.FaqRepository;
import com.scm.services.FaqService;

@Service
public class FaqServiceImpl implements FaqService {

	
	@Autowired
	private FaqRepository faqRepo;
	
	public String getAnswer(String question) {
	    List<Faq> faqs = faqRepo.searchFaq(question);

	    System.out.println(faqs);
	    
	    if (!faqs.isEmpty()) {
	        return faqs.get(0).getAnswer();
	    }

	    return "Sorry, I don't have an answer for that.";
	}
	
	

}
