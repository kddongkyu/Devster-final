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

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/fboard")
public class FreeBoardController {

    private final FreeBoardService freeBoardService;

    @Autowired
    public FreeBoardController(FreeBoardService freeBoardService) {
        this.freeBoardService = freeBoardService;
    }

    @GetMapping
    public ResponseEntity<List<FreeBoardDto>> getAllFboard(){
        return new ResponseEntity<List<FreeBoardDto>>(freeBoardService.getAllFboard(), HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<FreeBoardDto> insertFreeBoard(@RequestBody FreeBoardDto dto){
        return new ResponseEntity<FreeBoardDto>(freeBoardService.insertFreeBoard(dto), HttpStatus.OK);
    }

    @PostMapping("/photo/upload")
    public ResponseEntity<String> uploadPhoto(@RequestBody MultipartFile upload) {
        return new ResponseEntity<String>(freeBoardService.uploadPhoto(upload),HttpStatus.OK);
    }

    @PutMapping("/photo/reset")
    public ResponseEntity<Void> resetPhoto(String photo){
        freeBoardService.resetPhoto(photo);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/{fb_idx}")
    public ResponseEntity<FreeBoardDto> getOneFboard(@PathVariable int fb_idx) {
        return new ResponseEntity<FreeBoardDto>(freeBoardService.getOneFboard(fb_idx), HttpStatus.OK);
    }

    @DeleteMapping("/{fb_idx}")
    public ResponseEntity<Void> deleteById(@PathVariable int fb_idx){
        freeBoardService.deleteById(fb_idx);
        return  new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/{fb_idx}")
    public ResponseEntity<FreeBoardDto> updateFreeBoard(@PathVariable int fb_idx, @RequestBody FreeBoardDto dto) {
        freeBoardService.updateFreeBoard(fb_idx, dto);
        return new ResponseEntity<FreeBoardDto>(HttpStatus.OK);
    }

    @PostMapping("/photo/{fb_idx}")
    public ResponseEntity<Void> updatePhoto(@PathVariable Integer fb_idx, @RequestBody MultipartFile upload) {
        freeBoardService.updatePhoto(fb_idx,upload);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    public FreeBoardDto escapeDto(FreeBoardDto dto) {
        dto.setFb_subject(StringEscapeUtils.escapeHtml4(dto.getFb_subject()));
        dto.setFb_content(StringEscapeUtils.escapeHtml4(dto.getFb_content()));
        dto.setFb_photo(StringEscapeUtils.escapeHtml4(dto.getFb_photo()));
        return dto;
    }

}
