package data.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
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

import data.dto.NoticeBoardDto;
import data.service.NoticeBoardService;

@RestController
@CrossOrigin
@RequestMapping("/api/nboard")
public class NoticeBoardController {
    
    private final NoticeBoardService noticeBoardService;

    public NoticeBoardController(NoticeBoardService noticeBoardService) {
        this.noticeBoardService = noticeBoardService;
    }

    @GetMapping("/D0/notice")
    public ResponseEntity<Map<String, Object>> getNewestNboard(){
        return new ResponseEntity<>(noticeBoardService.getNewestNboard(),HttpStatus.OK);
    }                


    @GetMapping("/D0")
    public ResponseEntity<Map<String, Object>> getPagedNboard(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return new ResponseEntity<>(noticeBoardService.getPagedNboard(page, size), HttpStatus.OK);
    }

    @PostMapping("/D1")
    public ResponseEntity<NoticeBoardDto> insertNoticeBoard(@RequestBody NoticeBoardDto dto, HttpSession session){
        return new ResponseEntity<NoticeBoardDto>(noticeBoardService.insertNoticeBoard(dto,session), HttpStatus.OK);
    }

    @GetMapping("/D0/{nb_idx}")
    public ResponseEntity<Map<String, Object>> getOneNboard(@PathVariable int nb_idx) {
        return new ResponseEntity<>(noticeBoardService.getOneNboard(nb_idx), HttpStatus.OK);
    }    

    @DeleteMapping("/D1/{nb_idx}")
    public ResponseEntity<Void> deleteById(@PathVariable int nb_idx){
        noticeBoardService.deleteById(nb_idx);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/D1/{nb_idx}")
    public ResponseEntity<NoticeBoardDto> updateNoticeBoard(@PathVariable int nb_idx, @RequestBody NoticeBoardDto dto) {
        noticeBoardService.updateNoticeBoard(nb_idx, dto);
        return new ResponseEntity<NoticeBoardDto>(HttpStatus.OK);

    }

//    @PostMapping("/D1/photo/{nb_idx}")
//    public ResponseEntity<Void> updatePhoto(@PathVariable Integer nb_idx, @RequestParam("upload") MultipartFile upload) {
//        noticeBoardService.updatePhoto(nb_idx,upload);
//        return new ResponseEntity<>(HttpStatus.OK);
//    }

    @PostMapping("/D1/photos/{nb_idx}")
    public ResponseEntity<List<String>> updatePhotos(@PathVariable Integer nb_idx , @RequestParam("upload") List<MultipartFile> uploads ) {
        List<String> fileNames = noticeBoardService.updatePhotos(nb_idx, uploads);
        return new ResponseEntity<>(fileNames, HttpStatus.OK);
    }

    @PostMapping("/D1/photo/upload")
    public ResponseEntity<List<String>> uploadPhoto(@RequestBody List<MultipartFile> upload, HttpSession session) {
        return new ResponseEntity<List<String>>(noticeBoardService.uploadPhoto(upload, session),HttpStatus.OK);
    }


    

}
