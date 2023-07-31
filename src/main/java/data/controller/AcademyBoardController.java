package data.controller;

import data.dto.AcademyCommentDto;
import data.dto.AcademyCommentResponseDto;
import data.dto.AcademyCommentlikeResponseDto;
import data.service.AcademyCommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpRequest;
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
import org.springframework.web.multipart.MultipartFile;

import data.dto.AcademyBoardDto;
import data.service.AcademyBoardService;
import naver.cloud.NcpObjectStorageService;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.text.StringEscapeUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;






@RestController
@CrossOrigin
@RequestMapping("/api/academyboard")
public class AcademyBoardController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private final AcademyBoardService academyBoardService;

    private final AcademyCommentService academyCommentService;
    public AcademyBoardController(AcademyBoardService academyBoardService,
                                  AcademyCommentService academyCommentServic){
        this.academyBoardService=academyBoardService;
        this.academyCommentService = academyCommentServic;
    }

    @GetMapping("/D1")
    public ResponseEntity<Map<String, Object>> getPagedAcademyboard(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "ABwriteday") String sortProperty,
            @RequestParam(defaultValue = "DESC") String sortDirection,
            HttpServletRequest request) {
        return new ResponseEntity<>(academyBoardService.getPagedAcademyboard(page, size, keyword, request,sortProperty,sortDirection), HttpStatus.OK);
    }

    //다른점 HttpServletRequest request
    @PostMapping("/D1")
    public ResponseEntity<AcademyBoardDto> insertAcademyBoard(@RequestBody AcademyBoardDto dto, HttpSession session, HttpServletRequest request){
        return new ResponseEntity<AcademyBoardDto>(academyBoardService.insertAcademyBoard(dto,session,request), HttpStatus.OK);
    }

    @PostMapping("/D1/photo/upload")
    public ResponseEntity<List<String>> uploadPhoto(@RequestBody List<MultipartFile> upload, HttpSession session) {
        return new ResponseEntity<List<String>>(academyBoardService.uploadPhoto(upload, session),HttpStatus.OK);
    }

    @PutMapping("/D1/photo/reset")
    public ResponseEntity<Void> resetPhoto(String photo){
        academyBoardService.resetPhoto(photo);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @GetMapping("/D0/{ab_idx}")
    public ResponseEntity<Map<String,Object>> getOneAboard(@PathVariable int ab_idx){
        return new ResponseEntity<>(academyBoardService.getDetailPage(ab_idx),HttpStatus.OK);
    }


    @DeleteMapping("/D1/{ab_idx}")
    public ResponseEntity<Void> deleteAcademyBoard(@PathVariable Integer idx){
        academyBoardService.deleteAcademyBoard(idx);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @PutMapping("/D1/{ab_idx}")
    public ResponseEntity<AcademyBoardDto> updateAcademyBoard(@PathVariable int ab_idx, @RequestBody AcademyBoardDto dto) {
        academyBoardService.updateAcademyBoard(ab_idx, dto);
        return new ResponseEntity<AcademyBoardDto>(HttpStatus.OK);
    }


    @PostMapping("/D1/photo/{ab_idx}")
    public ResponseEntity<String> updatePhoto(@PathVariable Integer ab_idx, @RequestBody List<MultipartFile> upload) {
        return new ResponseEntity<String>(academyBoardService.updatePhoto(ab_idx,upload),HttpStatus.OK);
    }


    @DeleteMapping("/D1/photo/{ab_idx}/{imageFileName}")
    public ResponseEntity<Void> deletephoto(@PathVariable Integer ab_idx,@PathVariable String imageFileName){
        academyBoardService.deletePhoto(ab_idx,imageFileName);
        return new ResponseEntity<>(HttpStatus.OK);
    }



    //좋아요 싫어요 로직
    @PostMapping("/D1/{m_idx}/like/{ab_idx}")
    public ResponseEntity<Void> likeAcademyBoard(@PathVariable int ab_idx,@PathVariable int m_idx){
        academyBoardService.like(ab_idx,m_idx);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/D1/{m_idx}/dislike/{ab_idx}")
    public ResponseEntity<Void> dislikeAcademyBoard(@PathVariable int ab_idx,@PathVariable int m_idx){
        academyBoardService.dislike(ab_idx,m_idx);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @GetMapping("/D0/{m_idx}/checkGood/{ab_idx}")
    public ResponseEntity<Boolean> checkGood(@PathVariable int ab_idx, @PathVariable int m_idx) {
        boolean isGood = academyBoardService.isAlreadyAddGoodRp(ab_idx, m_idx);
        return ResponseEntity.ok(isGood);
    }

    @GetMapping("/D0/{m_idx}/checkBad/{ab_idx}")
    public ResponseEntity<Boolean> checkBad(@PathVariable int ab_idx, @PathVariable int m_idx) {
        boolean isBad = academyBoardService.isAlreadyAddBadRp(ab_idx, m_idx);
        return ResponseEntity.ok(isBad);
    }


    public AcademyBoardDto escapeDto(AcademyBoardDto dto){
        dto.setAb_content(StringEscapeUtils.escapeHtml4(dto.getAb_content()));
        dto.setAb_subject(StringEscapeUtils.escapeHtml4(dto.getAb_subject()));

        return dto;
    }


    @GetMapping("/D0/comment/{ab_idx}")
    public ResponseEntity<AcademyCommentResponseDto> comment (@PathVariable int ab_idx){
        return new ResponseEntity<AcademyCommentResponseDto>(academyCommentService.getAllCommentList(ab_idx),HttpStatus.OK);
    }

    @PostMapping("/D1/comment")
    public ResponseEntity<String> insertComment(@RequestBody AcademyCommentDto dto) {
        return new ResponseEntity<>(academyCommentService.insert(dto),HttpStatus.OK);
    }

    @DeleteMapping("/D1/comment/{abc_idx}")
    public ResponseEntity<String> deleteComment(@PathVariable int abc_idx) {
        boolean returnResult = academyCommentService.delete(abc_idx);
        if(returnResult) {
            return new ResponseEntity<>("aboard" + abc_idx + "번 댓글 삭제완료",HttpStatus.OK);
        } else {
            return new ResponseEntity<>("aboard" + abc_idx + "번 댓글이 존재하지 않습니다.",HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/D1/comment/{abc_idx}")
    public ResponseEntity<String> updateComment(@RequestBody AcademyCommentDto dto) {
        boolean returnResult = academyCommentService.update(dto);
        if(returnResult) {
            return new ResponseEntity<>("aboard" + dto.getAbc_idx() + "번 댓글 업데이트 완료",HttpStatus.OK);
        } else {
            return new ResponseEntity<>("aboard" + dto.getAbc_idx() + "번 댓글이 존재하지 않습니다.",HttpStatus.BAD_REQUEST);
        }
    }


    @PostMapping("/D1/comment/{m_idx}/like/{abc_idx}")
    public ResponseEntity<AcademyCommentlikeResponseDto> likeReviewcomment(@PathVariable int abc_idx, @PathVariable int m_idx) {
        // like 메서드는 이제 ReviewCommentlikeResponseDto를 반환합니다.
        AcademyCommentlikeResponseDto AcademyCommentlikeResponseDto = academyCommentService.like(m_idx, abc_idx);
        return ResponseEntity.ok(AcademyCommentlikeResponseDto);
    }


    @PostMapping("/D1/comment/{m_idx}/dislike/{abc_idx}")
    public ResponseEntity<AcademyCommentlikeResponseDto> dislikeReviewcomment(@PathVariable int abc_idx, @PathVariable int m_idx) {

        AcademyCommentlikeResponseDto AcademyCommentlikeResponseDto = academyCommentService.dislike(m_idx, abc_idx);
        return ResponseEntity.ok(AcademyCommentlikeResponseDto);

    }
    @GetMapping("/D0/comment/{m_idx}/checkGood/{abc_idx}")
    public ResponseEntity<Boolean> checkGoodcomment(@PathVariable int m_idx, @PathVariable int abc_idx) {
        boolean isGood = academyCommentService.isAlreadyAddGoodRp(m_idx, abc_idx);
        return ResponseEntity.ok(isGood);
    }

    @GetMapping("/D0/comment/{m_idx}/checkBad/{abc_idx}")
    public ResponseEntity<Boolean> checkBadcomment(@PathVariable int m_idx, @PathVariable int abc_idx) {
        boolean isBad = academyCommentService.isAlreadyAddBadRp(m_idx, abc_idx);
        return ResponseEntity.ok(isBad);
    }


}

