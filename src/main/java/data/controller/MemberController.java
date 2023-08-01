package data.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import data.dto.MemberDto;
import data.dto.message.MessageResponseDto;
import data.entity.AcademyInfoEntity;
import data.service.LoginService;
import data.service.MailService;
import data.service.MemberService;
import data.service.MessageService;
import jwt.setting.settings.JwtService;
import org.apache.commons.text.StringEscapeUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.UnsupportedEncodingException;
import java.net.URISyntaxException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/api/member")
public class MemberController {

    private final MemberService memberService;

    private final MailService mailService;
    private final JwtService jwtService;
    private final MessageService messageService;

    public MemberController(MemberService memberservice, MailService mailService, LoginService loginService, JwtService jwtService, MessageService messageService){
        this.memberService = memberservice;
        this.mailService = mailService;
        this.jwtService = jwtService;
        this.messageService = messageService;
    }

    @PostMapping("/D1/check")
    public void check() {
    }

    @GetMapping("/D1")
    public ResponseEntity<List<MemberDto>> getAllMembers(){
        return new ResponseEntity<List<MemberDto>>(memberService.getAllMembers(),HttpStatus.OK);
    }

    @GetMapping("/D1/{idx}")
    public ResponseEntity<MemberDto> getOneMember(@PathVariable int idx){
        return new ResponseEntity<MemberDto>(memberService.getOneMember(idx),HttpStatus.OK);
    }

    @PostMapping("/D0/photo")
    public ResponseEntity<String> uploadPhoto(@RequestBody MultipartFile upload, HttpSession session) {
        return new ResponseEntity<String>(memberService.uploadPhoto(upload,session),HttpStatus.OK);
    }

    @PutMapping("/D0/photo/reset")

    public ResponseEntity<Void> resetPhoto(String photo, HttpSession session){
        memberService.resetPhoto(photo,session);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/D1")
    public ResponseEntity<Void> updateMember(@RequestBody MemberDto dto) {
        memberService.updateMember(escapeDto(dto));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/D1/photo")
    public ResponseEntity<Void> updatePhoto(@RequestBody MultipartFile upload, HttpServletRequest request) {
        memberService.updatePhoto(upload,request);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/D0/email")
    public boolean isDuplicateEmail(@RequestBody JsonNode json) {
        String safeEmail = StringEscapeUtils.escapeHtml4(json.get("m_email").asText());
        return memberService.isDuplicateEmail(safeEmail);
    }

    @GetMapping("/D0/nickname/{NN}")
    public boolean isDuplicateNickname(@PathVariable String NN) {
        String safeNickname = StringEscapeUtils.escapeHtml4(NN);
        return memberService.isDuplicateNickname(safeNickname);
    }

    @PostMapping("/D0/academy")
    public ResponseEntity<List<AcademyInfoEntity>> academyInfoSearch(@RequestBody JsonNode json) {
        return new ResponseEntity<List<AcademyInfoEntity>>(memberService.academyNameSearch(json.get("name").asText()),HttpStatus.OK);
    }

    @GetMapping("/D1/academy/{ai_idx}")
    public ResponseEntity<String> academyName(@PathVariable int ai_idx) {
        return new ResponseEntity<String>(memberService.academyName(ai_idx),HttpStatus.OK);
    }

    @PostMapping("/D0/email/validation")
    public ResponseEntity<String> emailValidation(@RequestBody JsonNode json) throws Exception {
        String safeEmail = StringEscapeUtils.escapeHtml4(json.get("m_email").asText());
        return new ResponseEntity<String>(mailService.sendSimpleMessage(safeEmail),HttpStatus.OK);
    }

    @GetMapping("/D0/id/{id}")
    public boolean isDuplicateId(@PathVariable String id) {
        String safeId = StringEscapeUtils.escapeHtml4(id);
        return memberService.isDuplicateId(safeId);
    }

    @PostMapping("/D0")
    public String signUp(@RequestBody MemberDto dto,HttpSession session) throws Exception {
        memberService.registerMember(dto,session);
        return "일반회원 회원가입 성공";
    }

    @GetMapping("/D1/logout")
    public String logOut(@RequestHeader(name = "Authorization")String token) {
        memberService.logout(token);
        return "로그아웃 성공";
    }

    @PostMapping("/D1/checkphoto")
    public ResponseEntity<Void> checkPhoto(@RequestBody MultipartFile upload , HttpServletRequest request) {
        memberService.checkPhoto(upload,request);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PatchMapping("/D1")
    public ResponseEntity<String> confirmRole(@RequestBody JsonNode json) {
        return new ResponseEntity<String>(memberService.confirmRole(json.get("m_idx").asInt(),json.get("sign").asBoolean()),HttpStatus.OK);
    }


    @PostMapping("/D0/id")
    public ResponseEntity<String> findId(@RequestBody JsonNode json) {
        String returnText = memberService.findId(json.get("email").asText());
        if(returnText.startsWith("해")) {
            return new ResponseEntity<String>(returnText,HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<String>(returnText,HttpStatus.OK);
        }
    }

    @PostMapping("/D0/password")
    public ResponseEntity<String> resetPassword(@RequestBody JsonNode json) {
        String returnText = memberService.resetPass(json.get("email").asText(),json.get("password").asText());
        if(returnText.startsWith("해")) {
            return new ResponseEntity<String>(returnText,HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<String>(returnText,HttpStatus.OK);
        }
    }

    @DeleteMapping("/D1")
    public ResponseEntity<String> signoutMember(HttpServletRequest request) {
        return new ResponseEntity<String>(memberService.deleteMember(request),HttpStatus.OK);
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
