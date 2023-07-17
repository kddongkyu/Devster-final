package data.controller;

import com.fasterxml.jackson.databind.JsonNode;
import data.dto.CompanyMemberDto;
import data.dto.MemberDto;
import data.service.CompanyMemberService;
import data.service.MailService;
import org.apache.commons.text.StringEscapeUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/compmember")
public class CompanyMemberController {

    private final CompanyMemberService companyMemberService;

    private final MailService mailService;

    public CompanyMemberController(CompanyMemberService companyMemberService, MailService mailService) {
        this.companyMemberService = companyMemberService;
        this.mailService = mailService;
    }

    @GetMapping
    public ResponseEntity<List<CompanyMemberDto>> getAllCompanyMembers(){
        return new ResponseEntity<List<CompanyMemberDto>>(companyMemberService.getAllCompanyMembers(), HttpStatus.OK);
    }

    @GetMapping("/{idx}")
    public ResponseEntity<CompanyMemberDto> getOneCompanyMember(@PathVariable int idx){
        CompanyMemberDto companyMemberDto = companyMemberService.getOneCompanyMember(idx);
        return new ResponseEntity<CompanyMemberDto>(companyMemberDto,HttpStatus.OK);
    }

    @PostMapping("/sign-up")
    public String signUp(@RequestBody CompanyMemberDto dto) throws Exception {
        companyMemberService.registerCompanymember(dto);
        return "기업회원 회원가입 성공";
    }
    @PostMapping("/photo/{cm_idx}")
    public ResponseEntity<String> uploadPhoto(@RequestBody MultipartFile upload, HttpSession session, @PathVariable int cm_idx) {
        return new ResponseEntity<String>(companyMemberService.uploadPhoto(upload, session, cm_idx),HttpStatus.OK);
    }

    @PutMapping("/photo/reset")
    public ResponseEntity<Void> resetPhoto(String photo){
        companyMemberService.resetPhoto(photo);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<Void> updateCompanyMember(@RequestBody CompanyMemberDto dto) {
        companyMemberService.updateCompanyMember(escapeDto(dto));
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PostMapping("/sign-up/email")
    public boolean isDuplicateEmail(@RequestBody JsonNode jsonNode) {
        String safeEmail = StringEscapeUtils.escapeHtml4(jsonNode.get("cm_email").asText());
        return companyMemberService.isDuplicateEmail(safeEmail);
    }

    @PostMapping("/sign-up/email/validation")
    public ResponseEntity<String> emailValidation(@RequestBody JsonNode jsonNode) throws Exception {
        String safeEmail = StringEscapeUtils.escapeHtml4(jsonNode.get("m_email").asText());
        return new ResponseEntity<String>(mailService.sendSimpleMessage(safeEmail),HttpStatus.OK);
    }

    @PostMapping("/sign-up/compname")
    public boolean isDuplicatedCompName(@RequestBody JsonNode jsonNode) throws Exception {
        String safeCompName = StringEscapeUtils.escapeHtml4(jsonNode.get("companyName").asText());
        return companyMemberService.isDuplicatedCompName(safeCompName);
    }

    @GetMapping("/logout")
    public String logOut(@RequestHeader(name = "Authorization")String token) {
        companyMemberService.logout(token);

        return "로그아웃 성공";
    }

    @PatchMapping("/{cm_idx}")
    public ResponseEntity<String> confirmRole(@PathVariable int cm_idx,@RequestBody JsonNode jsonNode) {
        return new ResponseEntity<String>(companyMemberService.confirmRole(cm_idx,jsonNode.get("sign").asBoolean()),HttpStatus.OK);
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
