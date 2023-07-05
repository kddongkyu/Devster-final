package data.controller;

import data.dto.MemberDto;
import data.service.Memberservice;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.lang.reflect.Member;
import java.util.List;

@RestController
@CrossOrigin
@Slf4j
@RequestMapping("/member")
public class MemberController {

    private final Logger logger = LoggerFactory.getLogger(this.getClass());

    private final Memberservice memberService;

    public MemberController(Memberservice memberservice){
        this.memberService = memberservice;
    }

    @GetMapping
    public ResponseEntity<List<MemberDto>> getAllMembers(){
        return new ResponseEntity<List<MemberDto>>(memberService.getAllMembers(),HttpStatus.OK);
    }

    @GetMapping("/{idx}")
    public ResponseEntity<MemberDto> getOneMember(@PathVariable int idx){
        return new ResponseEntity<MemberDto>(memberService.getOneMember(idx),HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<MemberDto> insert(@RequestBody MemberDto dto) {
        return new ResponseEntity<MemberDto>(memberService.insertMember(dto), HttpStatus.OK);
    }

    @PostMapping("/photo")
    public ResponseEntity<String> uploadPhoto(@RequestBody MultipartFile upload) {
        return new ResponseEntity<String>(memberService.uploadPhoto(upload),HttpStatus.OK);
    }

    @PutMapping("/photo/reset")
    public ResponseEntity<Void> resetPhoto(String photo){
        memberService.resetPhoto(photo);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<Void> updateMember(@RequestBody MemberDto dto) {
        memberService.updateMember(dto);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/photo/{m_idx}")
    public ResponseEntity<Void> updatePhoto(@PathVariable Integer m_idx,@RequestBody MultipartFile upload) {
        memberService.updatePhoto(m_idx,upload);
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
