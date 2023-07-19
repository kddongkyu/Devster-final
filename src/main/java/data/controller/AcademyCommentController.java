package data.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import data.dto.AcademyCommentDto;
import data.service.AcademyCommentService;
import naver.cloud.NcpObjectStorageService;

import java.util.List;
import java.util.Map;

import org.apache.commons.text.StringEscapeUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/* 
    230718, 화요일 
    1.Comment 테스트 돌리고   -> ok 
    2.Comment에 좋아요 추가  -> ok 
    3.Academyboard도 테스트 돌리고  
    4.동규씨 코드 보고 리팩토링  (json 값 하나로 wrapping)  
    5.(aboard, hboard) 프론트  
*/  
    

@RestController
@CrossOrigin
@RequestMapping("/api/academycomment")
public class AcademyCommentController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    AcademyCommentService academyCommentService;
  
    @GetMapping("/D0")
    public List<Map<String,Object>> list(@RequestParam int ab_idx){
        return academyCommentService.getAllCommentList(ab_idx);
    }

    @PostMapping("/D1")
    public ResponseEntity<AcademyCommentDto> insert(@RequestBody AcademyCommentDto dto){
        return new ResponseEntity<AcademyCommentDto>(academyCommentService.insertAcademyComment(escapeDto(dto)),HttpStatus.OK);
    }


    @DeleteMapping("/D1/{abc_idx}")
    public ResponseEntity<Void> delete(@PathVariable Integer abc_idx){
        academyCommentService.deleteAcademyComment(abc_idx);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // @GetMapping("/updateform")
    // public ResponseEntity<AcademyCommentDto> updateform(int abc_idx){
    //     return new ResponseEntity<AcademyCommentDto>(academyCommentService.getAcademyComment(abc_idx),HttpStatus.OK);
    // }

    @PutMapping("/D1/update")
    public ResponseEntity<Void> update(@RequestBody AcademyCommentDto dto){
        academyCommentService.updateAcademyComment(dto);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @PostMapping("/D1/insertreply")
    public ResponseEntity<AcademyCommentDto> insertreply(@RequestBody AcademyCommentDto dto){
        return new ResponseEntity<AcademyCommentDto>(academyCommentService.insertAcademyReply(escapeDto(dto)),HttpStatus.OK);
    }


    @GetMapping("/D0/recommentlist")
    public List<Map<String,Object>> replylist(@RequestParam int abc_idx){
        return academyCommentService.getReplyOfAbcIdx(abc_idx);
    }

    public AcademyCommentDto escapeDto(AcademyCommentDto dto){
        dto.setAbc_content(StringEscapeUtils.escapeHtml4(dto.getAbc_content()));
        return dto;
    }

    @PostMapping("/D1/like")   
    public ResponseEntity<Void> likeAcademyComment(int abc_idx, int m_idx){
        academyCommentService.like(abc_idx,m_idx);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/dislike")   
    public ResponseEntity<Void> dislikeAcademyComment(int abc_idx, int m_idx){
        academyCommentService.dislike(abc_idx,m_idx);
        return new ResponseEntity<>(HttpStatus.OK);
    }

}