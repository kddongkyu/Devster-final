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
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import data.dto.AcademyBoardDto;
import data.service.AcademyBoardService;
import naver.cloud.NcpObjectStorageService;

import java.util.List;

import org.apache.commons.text.StringEscapeUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@CrossOrigin
@RequestMapping("/academyboard")
public class AcademyBoardController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    AcademyBoardService academyBoardService;

    @Autowired
    private NcpObjectStorageService storageService;

    @PostMapping
    public ResponseEntity<AcademyBoardDto> insert(@RequestBody AcademyBoardDto dto,List<MultipartFile> upload){
        return new ResponseEntity<AcademyBoardDto>(academyBoardService.insertAcademyBoard(escapeDto(dto),upload),HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<AcademyBoardDto>> getAllData(){
        return new ResponseEntity<List<AcademyBoardDto>>(academyBoardService.getAllData(), HttpStatus.OK);
    }
    
    @GetMapping("/{idx}")
    public ResponseEntity<AcademyBoardDto> getDetailPage(@PathVariable Integer idx){
        return new ResponseEntity<AcademyBoardDto>(academyBoardService.findByAbIdx(idx),HttpStatus.OK);
    }

    @DeleteMapping("/{idx}")
    public ResponseEntity<Void> deleteAcademyBoard(@PathVariable Integer idx){
        academyBoardService.deleteAcademyBoard(idx);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/form/{idx}")
    public ResponseEntity<AcademyBoardDto> updateAcademyBoardForm(@PathVariable Integer idx){
        return new ResponseEntity<AcademyBoardDto>(academyBoardService.findByAbIdx(idx),HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<Void> update(@RequestBody AcademyBoardDto dto, MultipartFile upload, int currentPage){
        academyBoardService.updateAcademyBoard(escapeDto(dto),upload,currentPage);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @PostMapping("/like")
    public ResponseEntity<Void> likeAcademyBoard(int ab_idx, int m_idx){
        academyBoardService.like(ab_idx,m_idx);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/dislike")
    public ResponseEntity<Void> dislikeAcademyBoard(int ab_idx, int m_idx){
        academyBoardService.dislike(ab_idx,m_idx);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    public AcademyBoardDto escapeDto(AcademyBoardDto dto){
        dto.setAb_content(StringEscapeUtils.escapeHtml4(dto.getAb_content()));
        dto.setAb_subject(StringEscapeUtils.escapeHtml4(dto.getAb_subject()));

        return dto;
    }
}

