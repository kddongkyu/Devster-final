package data.controller;

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
@RequestMapping("/api/aboard")
public class AcademyBoardController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    AcademyBoardService academyBoardService;

    @Autowired
    private NcpObjectStorageService storageService;

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
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String keyword,
            @RequestParam(defaultValue = "ABwriteday") String sortProperty,
            @RequestParam(defaultValue = "DESC") String sortDirection,
            HttpServletRequest request) {
        return new ResponseEntity<>(academyBoardService.getPagedAcademyboard(page, size, keyword, request,sortProperty,sortDirection), HttpStatus.OK);
    }


    @GetMapping("/D0/{ab_idx}")
    public Map<String,Object> getDetailPage(@PathVariable int ab_idx){
        return academyBoardService.getDetailPage(ab_idx);
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


    @GetMapping("/D1/{m_idx}/checkGood/{ab_idx}")
    public ResponseEntity<Boolean> checkGood(@PathVariable int ab_idx, @PathVariable int m_idx) {
        boolean isGood = academyBoardService.isAlreadyAddGoodRp(ab_idx, m_idx);
        return ResponseEntity.ok(isGood);
    }

    @GetMapping("/D1/{m_idx}/checkBad/{ab_idx}")
    public ResponseEntity<Boolean> checkBad(@PathVariable int ab_idx, @PathVariable int m_idx) {
        boolean isBad = academyBoardService.isAlreadyAddBadRp(ab_idx, m_idx);
        return ResponseEntity.ok(isBad);
    }


    public AcademyBoardDto escapeDto(AcademyBoardDto dto){
        dto.setAb_content(StringEscapeUtils.escapeHtml4(dto.getAb_content()));
        dto.setAb_subject(StringEscapeUtils.escapeHtml4(dto.getAb_subject()));

        return dto;
    }
}

