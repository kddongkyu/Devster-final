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
import org.springframework.web.multipart.MultipartFile;

import data.dto.AcademyBoardDto;
import data.service.AcademyBoardService;
import naver.cloud.NcpObjectStorageService;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.apache.commons.text.StringEscapeUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


//academyboard CRUD 테스트 및 댓글, 좋아요, 사진 수정 필요 (230717, 12:28)
//우선적으로 댓글과 사진 수정 필요 
// (230719, 10:25) insert 에서 사진 어떻게할거야..   
// (230719, 11:16) login 필요한것과 필요없는것들 api 맵핑 맞춰주기.. 일단 다 짜고.! 
/*  (230720, 09:31) 오늘은.. academy,hboard ->  (1)페이징처리 (2)검색처리..?  (3)코드리팩토링..?  (4)insert,update  (5)chkgood 
    그리고 공지사항 (6)CRUD  -> getpagedNboard 완성..  업로드,수정,삭제, 조회 개발 해야 함 
    (230720, 11:08) academyboard 페이징 처리  -> ok 
    (230720, 11:20) academyboard, academycomment 에서 chkgood -> ok 
    (11:40) insert, update : academyboard, academycomment -> ok 
    (12:20) 검색처리  
    (12:50) 점심시간
    (14:10) noticeboard 업로드
    (16:00) noticeboard 조회 
    (16:30) noticeboard 수정
    (17:00) noticeboard 삭제 
    (17:30) 테스트 해보고 깃에 업로드 
*/


@RestController
@CrossOrigin
@RequestMapping("/api/academyboard")
public class AcademyBoardController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    AcademyBoardService academyBoardService;

    @Autowired
    private NcpObjectStorageService storageService;

    @PostMapping("/D1")
    public ResponseEntity<AcademyBoardDto> insertAcademyBoard(@RequestBody AcademyBoardDto dto, HttpSession session){
        return new ResponseEntity<AcademyBoardDto>(academyBoardService.insertAcademyBoard(dto,session), HttpStatus.OK);
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


    // @PostMapping("/D1")
    // public ResponseEntity<AcademyBoardDto> insert(@RequestBody AcademyBoardDto dto,List<MultipartFile> upload){
    //     return new ResponseEntity<AcademyBoardDto>(academyBoardService.insertAcademyBoard(escapeDto(dto),upload),HttpStatus.OK);
    // }

    // @GetMapping("/D0")
    // public ResponseEntity<List<AcademyBoardDto>> getAllData(){
    //     return new ResponseEntity<List<AcademyBoardDto>>(academyBoardService.getAllData(), HttpStatus.OK);
    // }

    @GetMapping("/D0")
    public ResponseEntity<Map<String, Object>> getPagedAcademyboard(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return new ResponseEntity<>(academyBoardService.getPagedAcademyboard(page, size), HttpStatus.OK);
    }


    @GetMapping("/D0/{ab_idx}")
    public Map<String,Object> getDetailPage(@PathVariable int ab_idx, int m_idx){
        return academyBoardService.getDetailPage(ab_idx,m_idx);
    }

    @DeleteMapping("/D1/{idx}")
    public ResponseEntity<Void> deleteAcademyBoard(@PathVariable Integer idx){
        academyBoardService.deleteAcademyBoard(idx);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // @GetMapping("/form/{idx}")
    // public ResponseEntity<AcademyBoardDto> updateAcademyBoardForm(@PathVariable Integer idx){
    //     return new ResponseEntity<AcademyBoardDto>(academyBoardService.findByAbIdx(idx),HttpStatus.OK);
    // }


    // @PutMapping("/D1")
    // public ResponseEntity<Void> update(@RequestBody AcademyBoardDto dto, MultipartFile upload, int currentPage){
    //     academyBoardService.updateAcademyBoard(escapeDto(dto),upload,currentPage);
    //     return new ResponseEntity<>(HttpStatus.OK);
    // }

    @PutMapping("/D1/{fb_idx}")
    public ResponseEntity<AcademyBoardDto> updateAcademyBoard(@PathVariable int ab_idx, @RequestBody AcademyBoardDto dto) {
        academyBoardService.updateAcademyBoard(ab_idx, dto);
        return new ResponseEntity<AcademyBoardDto>(HttpStatus.OK);
    }

    @PostMapping("/D1/photo/{fb_idx}")
    public ResponseEntity<Void> updatePhoto(@PathVariable Integer ab_idx, @RequestBody MultipartFile upload) {
        academyBoardService.updatePhoto(ab_idx,upload);
        return new ResponseEntity<>(HttpStatus.OK);
    }



    @PostMapping("/D1/like")   
    public ResponseEntity<Void> likeAcademyBoard(int ab_idx, int m_idx){
        academyBoardService.like(ab_idx,m_idx);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/D1/dislike")
    public ResponseEntity<Void> dislikeAcademyBoard(int ab_idx, int m_idx){
        academyBoardService.dislike(ab_idx,m_idx);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @GetMapping("/D1/{m_idx}/checkGood/{ab_idx}")
    public ResponseEntity<Boolean> checkGood(@PathVariable int m_idx, @PathVariable int ab_idx) {
        boolean isGood = academyBoardService.isAlreadyAddGoodRp(m_idx, ab_idx);
        return ResponseEntity.ok(isGood);
    }

    @GetMapping("/D1/{m_idx}/checkBad/{ab_idx}")
    public ResponseEntity<Boolean> checkBad(@PathVariable int m_idx, @PathVariable int ab_idx) {
        boolean isBad = academyBoardService.isAlreadyAddBadRp(m_idx, ab_idx);
        return ResponseEntity.ok(isBad);
    }


    public AcademyBoardDto escapeDto(AcademyBoardDto dto){
        dto.setAb_content(StringEscapeUtils.escapeHtml4(dto.getAb_content()));
        dto.setAb_subject(StringEscapeUtils.escapeHtml4(dto.getAb_subject()));

        return dto;
    }
}

