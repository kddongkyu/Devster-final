package data.controller;

import data.dto.PostMessage.PostMessageDetailDto;
import data.dto.PostMessage.PostMessageDto;
import data.dto.PostMessage.PostMessageRespnoseDto;
import data.service.PostMessageService;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/message")
public class PostMessageController {

    private final PostMessageService postMessageService;

    public PostMessageController(PostMessageService postMessageService) {
        this.postMessageService = postMessageService;
    }

    @GetMapping("/D1/list/{currentPage}")
    public ResponseEntity<PostMessageRespnoseDto> getAllPostMessage(HttpServletRequest request, @PathVariable int currentPage) {
        return new ResponseEntity<PostMessageRespnoseDto>(postMessageService.getAllPostMessages(request,currentPage), HttpStatus.OK);
    }
    @GetMapping("/D1/{idx}")
    public ResponseEntity<PostMessageDetailDto> getOnePostMessage(@PathVariable int idx) {
        if(postMessageService.getOnePostMessage(idx) == null) {
            return new ResponseEntity<PostMessageDetailDto>(postMessageService.getOnePostMessage(idx), HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<PostMessageDetailDto>(postMessageService.getOnePostMessage(idx), HttpStatus.OK);
        }
    }

    @GetMapping("/D1/search/{keyword}")
    public ResponseEntity<PostMessageRespnoseDto> getSearchList(HttpServletRequest request, @PathVariable String keyword) {
        return new ResponseEntity<PostMessageRespnoseDto>(postMessageService.getSearchList(request,keyword), HttpStatus.OK);
    }

    @PostMapping("/D1")
    public ResponseEntity<String> sendPostMessage(@RequestBody PostMessageDto dto,HttpServletRequest request) {
        return new ResponseEntity<String>(postMessageService.sendPostMessage(dto,request), HttpStatus.OK);
    }

    @DeleteMapping("/D1")
    public ResponseEntity<String> deleteAllPostMessages(HttpServletRequest request){
        return new ResponseEntity<String>(postMessageService.deleteAllPostMessages(request), HttpStatus.OK);
    }

    @DeleteMapping("/D1/{idx}")
    public ResponseEntity<String> deletePostMessage(@PathVariable int idx) {
        if(postMessageService.deletePostMessage(idx)) {
            return new ResponseEntity<String>(idx + "번 쪽지 삭제 완료.", HttpStatus.OK);
        } else {
            return new ResponseEntity<String>(idx + "번 쪽지가 존재하지 않습니다.", HttpStatus.BAD_REQUEST);
        }

    }
}
