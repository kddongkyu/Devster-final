package data.controller;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import data.dto.CompanyMemberDto;
import data.service.CompanyMemberService;
import data.service.MailService;
import data.service.MessageService;
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
@RequestMapping("/api/compmember")
public class CompanyMemberController {

    private final CompanyMemberService companyMemberService;
    private final MessageService messageService;

    private final MailService mailService;

    public CompanyMemberController(CompanyMemberService companyMemberService, MessageService messageService, MailService mailService) {
        this.companyMemberService = companyMemberService;
        this.messageService = messageService;
        this.mailService = mailService;
    }

    @PostMapping("/D1/check")
    public void check() {
    }

    @GetMapping("/D1")
    public ResponseEntity<List<CompanyMemberDto>> getAllCompanyMembers(){
        return new ResponseEntity<List<CompanyMemberDto>>(companyMemberService.getAllCompanyMembers(), HttpStatus.OK);
    }

    @GetMapping("/D1/{idx}")
    public ResponseEntity<CompanyMemberDto> getOneCompanyMember(@PathVariable int idx){
        CompanyMemberDto companyMemberDto = companyMemberService.getOneCompanyMember(idx);
        return new ResponseEntity<CompanyMemberDto>(companyMemberDto,HttpStatus.OK);
    }

    @PostMapping("/D0")
    public String signUp(@RequestBody CompanyMemberDto dto) throws Exception {
        companyMemberService.registerCompanymember(dto);
        return "기업회원 회원가입 성공";
    }
    @PostMapping("/photo")
    public ResponseEntity<String> uploadPhoto(@RequestBody MultipartFile upload, HttpSession session, HttpServletRequest request) {
        return new ResponseEntity<String>(companyMemberService.uploadPhoto(upload, session, request),HttpStatus.OK);
    }

    @PutMapping("/D1/photo/reset")
    public ResponseEntity<Void> resetPhoto(String photo, HttpSession session){
        companyMemberService.resetPhoto(photo, session);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/D1")
    public ResponseEntity<Void> updateCompanyMember(@RequestBody CompanyMemberDto dto) {
        companyMemberService.updateCompanyMember(escapeDto(dto));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/D0/regnum")
    public boolean isDuplicatedRegNum(@RequestBody JsonNode json) {
        return companyMemberService.isDuplicateRegNum(json.get("regnum").asText());
    }

    @PostMapping("/D0/email")
    public boolean isDuplicateEmail(@RequestBody JsonNode json) {
        String safeEmail = StringEscapeUtils.escapeHtml4(json.get("cm_email").asText());
        return companyMemberService.isDuplicateEmail(safeEmail);
    }

    @PostMapping("/D0/email/validation")
    public ResponseEntity<String> emailValidation(@RequestBody JsonNode json) throws Exception {
        String safeEmail = StringEscapeUtils.escapeHtml4(json.get("m_email").asText());
        return new ResponseEntity<String>(mailService.sendSimpleMessage(safeEmail),HttpStatus.OK);
    }

    @PostMapping("/D0/compname")
    public boolean isDuplicatedCompName(@RequestBody JsonNode json) throws Exception {
        String safeCompName = StringEscapeUtils.escapeHtml4(json.get("companyName").asText());
        return companyMemberService.isDuplicatedCompName(safeCompName);
    }

    @PostMapping("/D0/hp")
    public boolean isDuplicatedHp(@RequestBody JsonNode json) throws Exception {
        return companyMemberService.isDuplicateHp(json.get("hp").asText());
    }

    @GetMapping("/D1/logout")
    public String logOut(@RequestHeader(name = "Authorization")String token) {
        companyMemberService.logout(token);

        return "로그아웃 성공";
    }

    @PatchMapping("/D1")
    public ResponseEntity<String> confirmRole(@RequestBody JsonNode json, HttpServletRequest request) {
        return new ResponseEntity<String>(companyMemberService.confirmRole(request,json.get("sign").asBoolean()),HttpStatus.OK);
    }

    @PostMapping("/D0/sms")
    public ResponseEntity<String> message(@RequestBody JsonNode json) throws UnsupportedEncodingException, NoSuchAlgorithmException, URISyntaxException, InvalidKeyException, JsonProcessingException {
        String checkNumber = messageService.sendSms(json.get("number").asText());
        return new ResponseEntity<String>(checkNumber,HttpStatus.OK);
    }

    @PostMapping("/D0/find/email")
    public ResponseEntity<String> findId(@RequestBody JsonNode json) {
        String returnText = companyMemberService.findId(json.get("number").asText());
        if(returnText.startsWith("해")) {
            return new ResponseEntity<String>(returnText,HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<String>(returnText,HttpStatus.OK);
        }
    }

    @PostMapping("/D0/password")
    public ResponseEntity<String> resetPassword(@RequestBody JsonNode json) {
        String returnText = companyMemberService.resetPass(json.get("number").asText(),json.get("password").asText());
        if(returnText.startsWith("해")) {
            return new ResponseEntity<String>(returnText,HttpStatus.NOT_FOUND);
        } else {
            return new ResponseEntity<String>(returnText,HttpStatus.OK);
        }
    }

    @DeleteMapping("/D1")
    public ResponseEntity<String> signoutCompMember(HttpServletRequest request) {
        return new ResponseEntity<String>(companyMemberService.deleteCompMember(request),HttpStatus.OK);
    }

    public CompanyMemberDto escapeDto(CompanyMemberDto dto) {

        dto.setCm_email(StringEscapeUtils.escapeHtml4(dto.getCm_email()));
        dto.setCm_addr(StringEscapeUtils.escapeHtml4(dto.getCm_addr()));
        dto.setCm_compname(StringEscapeUtils.escapeHtml4(dto.getCm_compname()));
        dto.setCm_tele(StringEscapeUtils.escapeHtml4(dto.getCm_tele()));
        dto.setCm_pass(StringEscapeUtils.escapeHtml4(dto.getCm_pass()));
        dto.setCm_name(StringEscapeUtils.escapeHtml4(dto.getCm_name()));
        dto.setCm_cp(StringEscapeUtils.escapeHtml4(dto.getCm_cp()));
        dto.setCm_post(StringEscapeUtils.escapeHtml4(dto.getCm_post()));
        dto.setCm_reg(StringEscapeUtils.escapeHtml4(dto.getCm_reg()));

        return dto;
    }
}
