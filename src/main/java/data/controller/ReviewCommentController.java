package data.controller;

import data.dto.ReviewCommentDto;
import data.entity.ReviewEntity;
import data.service.ReviewCommentService;
import org.apache.commons.text.StringEscapeUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api/reviewcomment")
public class ReviewCommentController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    ReviewCommentService reviewcommentserview;

    public ReviewCommentDto escapeDto(ReviewCommentDto dto){
        dto.setRbc_content(StringEscapeUtils.escapeHtml4(dto.getRbc_content()));
        return dto;
    }
    @GetMapping("/D0")
    public List<Map<String,Object>>list(@RequestParam int rb_idx){
        return reviewcommentserview.getAllCommentList(rb_idx);
    }

    @PostMapping("/D1")
    public ResponseEntity<ReviewCommentDto> inset(@RequestBody ReviewCommentDto dto){
        return new ResponseEntity<ReviewCommentDto>(reviewcommentserview.insertReviewComment(escapeDto(dto)), HttpStatus.OK);

    }

    @DeleteMapping("/D1/{rbc_idx}")
    public ResponseEntity<Void> delete(@PathVariable Integer rbc_idx){
        reviewcommentserview.deleteReviewComment(rbc_idx);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/D1/{rbc_idx}")
    public ResponseEntity<Void> update(@RequestParam ReviewCommentDto  dto){
        reviewcommentserview.updateReviewComment(dto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/D1/insertreply")
    public ResponseEntity<ReviewCommentDto> insertreply(@RequestParam ReviewCommentDto dto){
        return new ResponseEntity<ReviewCommentDto>(reviewcommentserview.insertReviewReply(escapeDto(dto)),HttpStatus.OK);
    }

    @GetMapping("/D0/getlistreply")
    public List<Map<String,Object>> replylist(@RequestParam int rbc_idx){
        return reviewcommentserview.getReplyOfRbcIdx(rbc_idx);

    }
}
