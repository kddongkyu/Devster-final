package data.controller;

import com.fasterxml.jackson.databind.JsonNode;
import data.dto.CompanyMemberDto;
import data.service.CompanyMemberService;
import data.service.MailService;
import org.apache.commons.text.StringEscapeUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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


    @PostMapping
    public ResponseEntity<CompanyMemberDto> insert(@RequestBody CompanyMemberDto dto) {
        return new ResponseEntity<CompanyMemberDto>(companyMemberService.insertCompanyMember(escapeDto(dto)), HttpStatus.OK);
    }

    @PostMapping("/photo")
    public ResponseEntity<String> uploadPhoto(@RequestBody MultipartFile upload) {
        return new ResponseEntity<String>(companyMemberService.uploadPhoto(upload),HttpStatus.OK);
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

    @PostMapping("/email")
    public boolean isDuplicateEmail(@RequestBody JsonNode jsonNode) {
        String safeEmail = StringEscapeUtils.escapeHtml4(jsonNode.get("cm_email").asText());
        return companyMemberService.isDuplicateEmail(safeEmail);
    }

    @PostMapping("/email/validation")
    public ResponseEntity<String> emailValidation(@RequestBody JsonNode jsonNode) throws Exception {
        String safeEmail = StringEscapeUtils.escapeHtml4(jsonNode.get("m_email").asText());
        return new ResponseEntity<String>(mailService.sendSimpleMessage(safeEmail),HttpStatus.OK);
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
