package data.controller;

import com.fasterxml.jackson.databind.JsonNode;
import data.dto.MemberDto;
import data.entity.AcademyInfoEntity;
import data.service.LoginService;
import data.service.MailService;
import data.service.MemberService;
import oauth2.service.CustomOAuth2UserService;
import org.apache.commons.text.StringEscapeUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/member")
public class MemberController {

    private final MemberService memberService;

    private final MailService mailService;

    private final LoginService loginService;

    private final CustomOAuth2UserService customOAuth2UserService;
    public MemberController(MemberService memberservice, MailService mailService, LoginService loginService, CustomOAuth2UserService customOAuth2UserService){
        this.memberService = memberservice;
        this.mailService = mailService;
        this.loginService = loginService;
        this.customOAuth2UserService = customOAuth2UserService;
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
        return new ResponseEntity<MemberDto>(memberService.insertMember(escapeDto(dto)), HttpStatus.OK);
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
        memberService.updateMember(escapeDto(dto));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/photo/{m_idx}")
    public ResponseEntity<Void> updatePhoto(@PathVariable Integer m_idx, @RequestBody MultipartFile upload) {
        memberService.updatePhoto(m_idx,upload);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/email")
    public boolean isDuplicateEmail(@RequestBody JsonNode jsonNode) {
        String safeEmail = StringEscapeUtils.escapeHtml4(jsonNode.get("m_email").asText());
        return memberService.isDuplicateEmail(safeEmail);
    }

    @GetMapping("/academy/{name}")
    public ResponseEntity<List<AcademyInfoEntity>> academyInfoSearch(@PathVariable String name) {
        return new ResponseEntity<List<AcademyInfoEntity>>(memberService.academyNameSearch(name),HttpStatus.OK);
    }

    @PostMapping("/email/validation")
    public ResponseEntity<String> emailValidation(@RequestBody JsonNode jsonNode) throws Exception {
        String safeEmail = StringEscapeUtils.escapeHtml4(jsonNode.get("m_email").asText());
        return new ResponseEntity<String>(mailService.sendSimpleMessage(safeEmail),HttpStatus.OK);
    }

    @GetMapping("/id/{id}")
    public boolean isDuplicateId(@PathVariable String id) {
        String safeId = StringEscapeUtils.escapeHtml4(id);
        return memberService.isDuplicateId(safeId);
    }

    @PostMapping("/sign-up")
    public String signUp(@RequestBody MemberDto dto) throws Exception {
        memberService.registerMember(dto);
        return "회원가입 성공";
    }

    @GetMapping("/social/naver")
    public String socialSignUp(OAuth2UserRequest userRequest){
        customOAuth2UserService.loadUser(userRequest);
        return "소셜 회원가입 성공!";
    }

    public MemberDto escapeDto(MemberDto dto) {

        dto.setM_email(StringEscapeUtils.escapeHtml4(dto.getM_email()));
        dto.setM_id(StringEscapeUtils.escapeHtml4(dto.getM_nickname()));
        dto.setM_name(StringEscapeUtils.escapeHtml4(dto.getM_name()));
        dto.setM_tele(StringEscapeUtils.escapeHtml4(dto.getM_tele()));
        dto.setM_pass(StringEscapeUtils.escapeHtml4(dto.getM_pass()));
        dto.setM_nickname(StringEscapeUtils.escapeHtml4(dto.getM_nickname()));

        return dto;
    }

    @GetMapping("/jwt-test")
    public String jwtTest() {
        return "jwtTest 요청 성공";
    }

}
