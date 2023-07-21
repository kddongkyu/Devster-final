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



@RestController
@CrossOrigin
@RequestMapping("/api/hboard")
public class HireBoardController {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    
    @Autowired
    HireBoardService hireBoardService;

    @Autowired
    private NcpObjectStorageService storageService;

    String photo;

    @Value("${aws.s3.bucketName}")
    private String bucketName;


    @PostMapping("/D1/upload")
    public String photoUpload(MultipartFile upload)
    {
        if(photo!=null){
            storageService.deleteFile(bucketName,"devster/hboard",photo);
        }
        photo=storageService.uploadFile(bucketName,"devster/hboard",upload);
        return photo;
    }

    @PostMapping("/D1/insert")
    public void insert(@RequestBody HireBoardDto dto){
        hireBoardService.insertHireBoard(escapeDto(dto));
    }



    // @PostMapping
    // public ResponseEntity<HireBoardDto> insert(@RequestBody HireBoardDto dto){
    //     dto.setHb_photo(photo);
    //     photo=null;
    //     return new ResponseEntity<HireBoardDto>(hireBoardService.insertHireBoard(escapeDto(dto)),HttpStatus.OK);
    // }


    // @GetMapping
    // public ResponseEntity<List<HireBoardDto>> getAllData(@RequestParam(defaultValue="1") int currentPage){
    //     return new ResponseEntity<List<HireBoardDto>>(hireBoardService.getAllData(), HttpStatus.OK);
    // }

    // @GetMapping("/list")
    // public Map<String,Object> list(int currentPage){
    //     return hireBoardService.list(currentPage);
    // }

    // @GetMapping("/D0/list")
    // public Map<String,Object> list(@RequestParam(defaultValue = "1") int currentPage){
    //     return hireBoardService.list(currentPage);
    // }    

    @GetMapping("/D0")
    public ResponseEntity<Map<String, Object>> getPagedHboard(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "5") int size,
        @RequestParam(required = false) String keyword){
            return new ResponseEntity<>(hireBoardService.getPagedHboard(page,size,keyword),HttpStatus.OK);
        }
    

    // @GetMapping("/{idx}")
    // public ResponseEntity<HireBoardDto> getDetailPage(@PathVariable Integer idx){
    //     return new ResponseEntity<HireBoardDto>(hireBoardService.findByHbIdx(idx),HttpStatus.OK);
    // }

    @GetMapping("/D0/{hb_idx}")
    public Map<String,Object> getDetailPage(@PathVariable int hb_idx, int m_idx){
        return hireBoardService.getDetailPage(hb_idx,m_idx);
    }



    @DeleteMapping("/D1/{idx}")
    public ResponseEntity<Void> deleteHireBoard(@PathVariable Integer idx){
        hireBoardService.deleteHireBoard(idx);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/D1/form/{idx}")
    public ResponseEntity<HireBoardDto> updateHireBoardForm(@PathVariable Integer idx){
        return new ResponseEntity<HireBoardDto>(hireBoardService.findByHbIdx(idx),HttpStatus.OK);
    }

    // @PostMapping
    // public ResponseEntity<Void> update(@RequestBody HireBoardDto dto, MultipartFile upload){
    //     hireBoardService.updateHireBoard(escapeDto(dto),upload);
    //     return new ResponseEntity<>(HttpStatus.OK);
    // }

    @PutMapping("/D1/hireupdate")
    public void update(@RequestBody HireBoardDto dto){
        hireBoardService.updateHireBoard(escapeDto(dto));
    }
    

    @GetMapping("/D1/increaseBkmk")
    public void increaseBkmk(Integer hb_idx, Integer m_idx){
        hireBoardService.addBkmk(hb_idx,m_idx);
    }

    public HireBoardDto escapeDto(HireBoardDto dto){
        dto.setHb_content(StringEscapeUtils.escapeHtml4(dto.getHb_content()));
        dto.setHb_subject(StringEscapeUtils.escapeHtml4(dto.getHb_subject()));

        return dto;
    }

}



