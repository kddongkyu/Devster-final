package data.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import data.dto.HireBoardDto;
import data.dto.ResumeDto;
import data.service.MyPageService;
import data.service.Resumeservice;

@RestController
public class MyPageController {
	
	@Autowired
	MyPageService myPageService;
	
	@Autowired
	Resumeservice resumeservice;
	
  @GetMapping("/bookmarks/{m_idx}")
  public List<HireBoardDto> list(@PathVariable Integer m_idx)
  {
	  return myPageService.getHireBookmarkList(m_idx);
  }
  
  @GetMapping("/resume/{m_idx}")
  public ResumeDto detailPage(@PathVariable Integer m_idx)
  {
	  return resumeservice.getDataresume(m_idx);
  }

}
