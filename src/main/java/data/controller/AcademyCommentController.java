package data.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
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
    댓글은 그냥 보이는거고.
    대댓글은 버튼 누르면 뜨는거고.
    ref 는 그냥 abc_idx로 불러오면 되고 
    depth는 0 이 댓글, 1이 대댓글 
    step은 필요 없음 
*/  
    
@RestController
@CrossOrigin
@RequestMapping("/academycomment")
public class AcademyCommentController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    AcademyCommentService academyCommentService;
  
    // @GetMapping
    // public List<Map<String,Object>> list(@RequestParam int ab_idx){
    //     // Entity 정보 fetch
    //     return academyCommentService.getAllCommentList(ab_idx);
    // }

    @PostMapping
    public ResponseEntity<AcademyCommentDto> insert(@RequestBody AcademyCommentDto dto){
        return new ResponseEntity<AcademyCommentDto>(academyCommentService.insertAcademyComment(escapeDto(dto)),HttpStatus.OK);
    }


    @DeleteMapping("/{idx}")
    public ResponseEntity<Void> delete(@PathVariable Integer idx){
        academyCommentService.deleteAcademyComment(idx);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/updateform")
    public ResponseEntity<AcademyCommentDto> updateform(int abc_idx){
        return new ResponseEntity<AcademyCommentDto>(academyCommentService.getAcademyComment(abc_idx),HttpStatus.OK);
    }

    @PostMapping("/update")
    public ResponseEntity<Void> update(@RequestBody AcademyCommentDto dto){
        academyCommentService.updateAcademyComment(dto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/recommentlist")
    public List<Map<String,Object>> replylist(@RequestParam int abc_idx){
        return academyCommentService.getReplyOfAbcIdx(abc_idx);
    }

    @PostMapping("/insertreply")
    public ResponseEntity<AcademyCommentDto> insertreply(@RequestBody AcademyCommentDto dto){
        return new ResponseEntity<AcademyCommentDto>(academyCommentService.insertAcademyReply(escapeDto(dto)),HttpStatus.OK);
    }

    public AcademyCommentDto escapeDto(AcademyCommentDto dto){
        dto.setAbc_content(StringEscapeUtils.escapeHtml4(dto.getAbc_content()));

        return dto;
    }



}