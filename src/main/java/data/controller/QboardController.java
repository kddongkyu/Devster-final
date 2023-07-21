package data.controller;

import data.dto.QboardDto;
import data.dto.QboardDetailDto;
import data.dto.QboardResponseDto;
import data.service.QboardService;
import org.apache.commons.lang3.StringEscapeUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/qboard")
public class QboardController {

    private final QboardService qboardService;

    public QboardController(QboardService qboardService) {
        this.qboardService = qboardService;
    }

    @GetMapping("/D0")
    public ResponseEntity<QboardResponseDto> getPagedQboard(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return new ResponseEntity<>(qboardService.getPagedQboard(page, size), HttpStatus.OK);
    }

    @PostMapping("/D1")
    public ResponseEntity<QboardDto> insertQboard(@RequestBody QboardDto dto, HttpSession session){
        return new ResponseEntity<QboardDto>(qboardService.insertQboard(dto,session), HttpStatus.OK);
    }

    @PostMapping("/D1/photo/upload")
    public ResponseEntity<List<String>> uploadPhoto(@RequestBody List<MultipartFile> upload, HttpSession session) {
        return new ResponseEntity<List<String>>(qboardService.uploadPhoto(upload, session),HttpStatus.OK);
    }

    @PutMapping("/D1/photo/reset")
    public ResponseEntity<Void> resetPhoto(String photo){
        qboardService.resetPhoto(photo);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/D0/{qb_idx}")
    public ResponseEntity<QboardDetailDto> getOneQboard(@PathVariable int qb_idx) {
        return new ResponseEntity<QboardDetailDto>(qboardService.getOneQboard(qb_idx), HttpStatus.OK);
    }

    @DeleteMapping("/D1/{qb_idx}")
    public ResponseEntity<Void> deleteById(@PathVariable int qb_idx){
        qboardService.deleteById(qb_idx);
        return  new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/D1/{qb_idx}")
    public ResponseEntity<Void> updateFreeBoard(@PathVariable int qb_idx, @RequestBody QboardDto dto) {
        qboardService.updateQboard(qb_idx, dto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/D1/photo/{qb_idx}")
    public ResponseEntity<Void> updatePhoto(@PathVariable Integer qb_idx, @RequestBody MultipartFile upload) {
        qboardService.updatePhoto(qb_idx,upload);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    public QboardDto escapeDto(QboardDto dto) {
        dto.setQb_subject(StringEscapeUtils.escapeHtml4(dto.getQb_subject()));
        dto.setQb_content(StringEscapeUtils.escapeHtml4(dto.getQb_content()));
        dto.setQb_photo(StringEscapeUtils.escapeHtml4(dto.getQb_photo()));
        return dto;
    }



}
