package data.controller;

import com.fasterxml.jackson.databind.JsonNode;
import data.dto.MemberDto;
import data.entity.AcademyInfoEntity;
import data.service.LoginService;
import data.service.MailService;
import data.service.MemberService;
import jwt.setting.settings.JwtService;
import org.apache.commons.text.StringEscapeUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;

    private final MailService mailService;


    private final JwtService jwtService;

    public MemberController(MemberService memberservice, MailService mailService, LoginService loginService, JwtService jwtService){
        this.memberService = memberservice;
        this.mailService = mailService;
        this.jwtService = jwtService;
    }

    @PostMapping("/check")
    public void check() {

    }

    @GetMapping
    public ResponseEntity<List<MemberDto>> getAllMembers(){
        return new ResponseEntity<List<MemberDto>>(memberService.getAllMembers(),HttpStatus.OK);
    }

    @GetMapping("/{idx}")
    public ResponseEntity<MemberDto> getOneMember(@PathVariable int idx){
        return new ResponseEntity<MemberDto>(memberService.getOneMember(idx),HttpStatus.OK);
    }

    @PostMapping("/sign-up/photo")
    public ResponseEntity<String> uploadPhoto(@RequestBody MultipartFile upload, HttpSession session) {
        return new ResponseEntity<String>(memberService.uploadPhoto(upload,session),HttpStatus.OK);
    }

    @PutMapping("/sign-up/photo/reset")
    public ResponseEntity<Void> resetPhoto(String photo){
        memberService.resetPhoto(photo);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<Void> updateMember(@RequestBody MemberDto dto) {
        memberService.updateMember(escapeDto(dto));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/photo/{m_idx}")
    public ResponseEntity<Void> updatePhoto(@PathVariable Integer m_idx, @RequestBody MultipartFile upload) {
        memberService.updatePhoto(m_idx,upload);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/sign-up/email")
    public boolean isDuplicateEmail(@RequestBody JsonNode jsonNode) {
        String safeEmail = StringEscapeUtils.escapeHtml4(jsonNode.get("m_email").asText());
        return memberService.isDuplicateEmail(safeEmail);
    }

    @GetMapping("/sign-up/nickname/{NN}")
    public boolean isDuplicateNickname(@PathVariable String NN) {
        String safeNickname = StringEscapeUtils.escapeHtml4(NN);
        return memberService.isDuplicateNickname(safeNickname);
    }

    @GetMapping("/sign-up/academy/{name}")
    public ResponseEntity<List<AcademyInfoEntity>> academyInfoSearch(@PathVariable String name) {
        return new ResponseEntity<List<AcademyInfoEntity>>(memberService.academyNameSearch(name),HttpStatus.OK);
    }

    @PostMapping("/sign-up/email/validation")
    public ResponseEntity<String> emailValidation(@RequestBody JsonNode jsonNode) throws Exception {
        String safeEmail = StringEscapeUtils.escapeHtml4(jsonNode.get("m_email").asText());
        return new ResponseEntity<String>(mailService.sendSimpleMessage(safeEmail),HttpStatus.OK);
    }

    @GetMapping("/sign-up/id/{id}")
    public boolean isDuplicateId(@PathVariable String id) {
        String safeId = StringEscapeUtils.escapeHtml4(id);
        return memberService.isDuplicateId(safeId);
    }

    @PostMapping("/sign-up")
    public String signUp(@RequestBody MemberDto dto,HttpSession session) throws Exception {
        memberService.registerMember(dto,session);
        return "일반회원 회원가입 성공";
    }

    @GetMapping("/logout")
    public String logOut(@RequestHeader(name = "Authorization")String token) {
        memberService.logout(token);

        return "로그아웃 성공";
    }

    public MemberDto escapeDto(MemberDto dto) {

        dto.setM_email(StringEscapeUtils.escapeHtml4(dto.getM_email()));
        dto.setM_id(StringEscapeUtils.escapeHtml4(dto.getM_nickname()));
        dto.setM_name(StringEscapeUtils.escapeHtml4(dto.getM_name()));
        dto.setM_pass(StringEscapeUtils.escapeHtml4(dto.getM_pass()));
        dto.setM_nickname(StringEscapeUtils.escapeHtml4(dto.getM_nickname()));

        return dto;
    }

}
