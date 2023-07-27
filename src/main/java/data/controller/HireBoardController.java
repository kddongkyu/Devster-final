package data.controller;
import data.dto.HireBoardDto;
import data.service.HireBoardService;
import naver.cloud.NcpObjectStorageService;

import org.apache.commons.text.StringEscapeUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.data.web.SpringDataWebProperties.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Vector;

import javax.servlet.http.HttpSession;



@RestController
@CrossOrigin
@RequestMapping("/api")
public class HireBoardController {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    
    @Autowired
    HireBoardService hireBoardService;

    @Autowired
    private NcpObjectStorageService storageService;

    String photo;

    @Value("${aws.s3.bucketName}")
    private String bucketName;


    @PostMapping("/compmember/hboard/D1")
    public ResponseEntity<HireBoardDto> insertFreeBoard(@RequestBody HireBoardDto dto, HttpSession session) {
        return new ResponseEntity<HireBoardDto>(hireBoardService.insertHireBoard(dto, session), HttpStatus.OK);
    }

    @PostMapping("/compmember/hboard/D1/photo/upload")
    public ResponseEntity<List<String>> uploadPhoto(@RequestBody List<MultipartFile> upload, HttpSession session) {
        return new ResponseEntity<List<String>>(hireBoardService.uploadPhoto(upload, session), HttpStatus.OK);
    }

    @PutMapping("/compmember/hboard/D1/photo/reset")
    public ResponseEntity<Void> resetPhoto(String photo) {
        hireBoardService.resetPhoto(photo);
        return new ResponseEntity<>(HttpStatus.OK);
    }

 

    @GetMapping("/hboard/D0")
    public ResponseEntity<Map<String, Object>> getPagedHboard(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "10") int size,
        @RequestParam(defaultValue = "HBwriteday") String sortProperty,
        @RequestParam(defaultValue = "DESC") String sortDirection,
        @RequestParam(required = false) String keyword){
            return new ResponseEntity<>(hireBoardService.getPagedHboard(page, size, sortProperty, sortDirection, keyword),HttpStatus.OK);
        }
    



    @GetMapping("/hboard/D0/{hb_idx}")
    public Map<String,Object> getDetailPage(@PathVariable int hb_idx, int m_idx){
        return hireBoardService.getDetailPage(hb_idx,m_idx);
    }



    @DeleteMapping("/compmember/hboard/D1/{idx}")
    public ResponseEntity<Void> deleteHireBoard(@PathVariable Integer idx){
        hireBoardService.deleteHireBoard(idx);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @PutMapping("/compmember/hboard/D1/{hb_idx}")
    public ResponseEntity<HireBoardDto> updateHireBoard(@PathVariable int hb_idx, @RequestBody HireBoardDto dto) {
        hireBoardService.updateHireBoard(hb_idx,dto);
        return new ResponseEntity<HireBoardDto>(HttpStatus.OK);
    }

    @PostMapping("/compmember/hboard/D1/photo/{hb_idx}")
    public ResponseEntity<String> updatePhoto(@PathVariable Integer hb_idx, @RequestBody List<MultipartFile> upload){
        return new ResponseEntity<String>(hireBoardService.updatePhoto(hb_idx,upload),HttpStatus.OK);
    }

    @DeleteMapping("compmember/hboard/D1/photo/{hb_idx}/{imageFileName}")
    public ResponseEntity<Void> deletePhoto(@PathVariable Integer hb_idx, @PathVariable String imageFileName){
        hireBoardService.deletePhoto(hb_idx, imageFileName);
        return new ResponseEntity<>(HttpStatus.OK);
    }


    @GetMapping("/compmember/hboard/D1/form/{idx}")
    public ResponseEntity<HireBoardDto> updateHireBoardForm(@PathVariable Integer idx){
        return new ResponseEntity<HireBoardDto>(hireBoardService.findByHbIdx(idx),HttpStatus.OK);
    }



    // @PutMapping("/compmember/hboard/D1/hireupdate")
    // public void update(@RequestBody HireBoardDto dto){
    //     hireBoardService.updateHireBoard(escapeDto(dto));
    // }
    

    @PostMapping("/hboard/D1/{m_idx}/increaseBkmk/{hb_idx}")
    public void increaseBkmk(@PathVariable int hb_idx, @PathVariable int m_idx){
        hireBoardService.addBkmk(hb_idx,m_idx);
        System.out.println("addBkmk 테스트");
    }

    public HireBoardDto escapeDto(HireBoardDto dto){
        dto.setHb_content(StringEscapeUtils.escapeHtml4(dto.getHb_content()));
        dto.setHb_subject(StringEscapeUtils.escapeHtml4(dto.getHb_subject()));

        return dto;
    }

}



