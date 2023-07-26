package data.controller;

import data.dto.FreeBoardDto;
import data.entity.FreeBoardEntity;
import data.service.FreeBoardService;
import org.apache.commons.lang3.StringEscapeUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin
@RequestMapping("/api/fboard")
public class FreeBoardController {

    private final FreeBoardService freeBoardService;

    public FreeBoardController(FreeBoardService freeBoardService) {
        this.freeBoardService = freeBoardService;
    }

    @GetMapping("/D0")
    public ResponseEntity<Map<String, Object>> getPagedFboard(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "FBwriteDay") String sortProperty,
            @RequestParam(defaultValue = "DESC") String sortDirection,
            @RequestParam(required = false) String keyword){
        return new ResponseEntity<>(freeBoardService.getPagedFboard(page, size, sortProperty, sortDirection, keyword), HttpStatus.OK);
    }


    @PostMapping("/D1")
    public ResponseEntity<FreeBoardDto> insertFreeBoard(@RequestBody FreeBoardDto dto, HttpSession session){
        return new ResponseEntity<FreeBoardDto>(freeBoardService.insertFreeBoard(dto,session), HttpStatus.OK);
    }

    @PostMapping("/D1/photo/upload")
    public ResponseEntity<List<String>> uploadPhoto(@RequestBody List<MultipartFile> upload, HttpSession session) {
        return new ResponseEntity<List<String>>(freeBoardService.uploadPhoto(upload, session),HttpStatus.OK);
    }

    @PutMapping("/D1/photo/reset")
    public ResponseEntity<Void> resetPhoto(String photo){
        freeBoardService.resetPhoto(photo);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/D0/{fb_idx}")
    public ResponseEntity<Map<String, Object>> getOneFboard(@PathVariable int fb_idx) {
        return new ResponseEntity<>(freeBoardService.getOneFboard(fb_idx), HttpStatus.OK);
    }

    @DeleteMapping("/D1/{fb_idx}")
    public ResponseEntity<Void> deleteById(@PathVariable int fb_idx){
        freeBoardService.deleteById(fb_idx);
        return  new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/D1/{fb_idx}")
    public ResponseEntity<FreeBoardDto> updateFreeBoard(@PathVariable int fb_idx, @RequestBody FreeBoardDto dto) {
        freeBoardService.updateFreeBoard(fb_idx, dto);
        return new ResponseEntity<FreeBoardDto>(HttpStatus.OK);
    }

    @PostMapping("/D1/photo/{fb_idx}")
    public ResponseEntity<String> updatePhoto(@PathVariable Integer fb_idx,@RequestBody List<MultipartFile> upload) {
        return new ResponseEntity<String>(freeBoardService.updatePhoto(fb_idx,upload),HttpStatus.OK);
    }
    @DeleteMapping("/D1/photo/{fb_idx}/{imageFileName}")
    public ResponseEntity<Void> deletePhoto(@PathVariable Integer fb_idx, @PathVariable String imageFileName) {
        freeBoardService.deletePhoto(fb_idx, imageFileName);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    // 좋아요 싫어요 관련 controller
    @PostMapping("/D1/{m_idx}/like/{fb_idx}")
    public ResponseEntity<FreeBoardDto> likeFboard(@PathVariable int fb_idx, @PathVariable int m_idx) {
        freeBoardService.like(m_idx, fb_idx);
        FreeBoardDto dto = new FreeBoardDto();
        return ResponseEntity.ok(dto);
    }

    @PostMapping("/D1/{m_idx}/dislike/{fb_idx}")
    public ResponseEntity<FreeBoardDto> dislikeFboard(@PathVariable int fb_idx, @PathVariable int m_idx) {
        freeBoardService.dislike(m_idx, fb_idx);
        FreeBoardDto dto = new FreeBoardDto();
        return ResponseEntity.ok(dto);

    }

    @GetMapping("/D1/{m_idx}/checkGood/{fb_idx}")
    public ResponseEntity<Boolean> checkGood(@PathVariable int m_idx, @PathVariable int fb_idx) {
        boolean isGood = freeBoardService.isAlreadyAddGoodRp(m_idx, fb_idx);
        return ResponseEntity.ok(isGood);
    }

    @GetMapping("/D1/{m_idx}/checkBad/{fb_idx}")
    public ResponseEntity<Boolean> checkBad(@PathVariable int m_idx, @PathVariable int fb_idx) {
        boolean isBad = freeBoardService.isAlreadyAddBadRp(m_idx, fb_idx);
        return ResponseEntity.ok(isBad);
    }


    public FreeBoardDto escapeDto(FreeBoardDto dto) {
        dto.setFb_subject(StringEscapeUtils.escapeHtml4(dto.getFb_subject()));
        dto.setFb_content(StringEscapeUtils.escapeHtml4(dto.getFb_content()));
        dto.setFb_photo(StringEscapeUtils.escapeHtml4(dto.getFb_photo()));
        return dto;
    }

}
