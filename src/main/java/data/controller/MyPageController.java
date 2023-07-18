package data.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import data.dto.HireBoardDto;
import data.dto.Re_carDto;
import data.dto.Re_licDto;
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
  public ResumeDto resume(@PathVariable Integer m_idx)
  {
	  return resumeservice.getDataresume(m_idx);
  }
  
  @GetMapping("/resumelic/{m_idx}")
  public List<Re_licDto> resumeLicList(@PathVariable Integer m_idx)
  {
	  return resumeservice.getDatare_lic(m_idx);
  }
  
  @GetMapping("/resumecar/{m_idx}")
  public List<Re_carDto> resumeCarList(@PathVariable Integer m_idx)
  {
	  return resumeservice.getDatare_car(m_idx);
  }

}
