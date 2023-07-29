package data.controller;

import com.fasterxml.jackson.databind.JsonNode;
import data.dto.resume.ResumeWrapper;
import data.service.ResumeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


@RestController
@CrossOrigin
@RequestMapping("/api/resume")
public class ResumeController {

    private final ResumeService resumeService;

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @PostMapping("/D1")
    public ResponseEntity<String> insertResume(@RequestBody ResumeWrapper resumeWrapper, HttpSession session) {
        return new ResponseEntity<String>(resumeService.insertResume(resumeWrapper.getResumeDto(),resumeWrapper.getResumeCareerDtoList(), resumeWrapper.getResumeLicenseDtoList(),session), HttpStatus.OK);
    }

    @PostMapping("/D1/file")
    public ResponseEntity<String> uploadFile(@RequestBody MultipartFile upload, HttpSession session) {
        return new ResponseEntity<String>(resumeService.uploadFile(upload,session), HttpStatus.OK);
    }

    @PostMapping("/D1/refile")
    public ResponseEntity<String> uploadRefile(@RequestBody MultipartFile upload, HttpSession session) {
        return new ResponseEntity<String>(resumeService.uploadReFile(upload,session), HttpStatus.OK);
    }

    @GetMapping("/D1/alllist")
    public ResponseEntity<List<ResumeWrapper>> getAllResume() {
        return new ResponseEntity<List<ResumeWrapper>>(resumeService.getAllResume(), HttpStatus.OK);
    }

    @GetMapping("/D1/{m_idx}")
    public ResponseEntity<ResumeWrapper> getOneResume(@PathVariable int m_idx) {
        ResumeWrapper resumeWrapper = resumeService.getOneResume(m_idx);
        return new ResponseEntity<ResumeWrapper>(resumeService.getOneResume(m_idx),HttpStatus.OK);
    }

    @DeleteMapping("/D1")
    public ResponseEntity<String> deleteResume(HttpServletRequest request) {
        return new ResponseEntity<String>(resumeService.deleteResume(request),HttpStatus.OK);
    }

    @PutMapping("/D1")
    public ResponseEntity<String> updateResume(@RequestBody ResumeWrapper resumeWrapper, HttpSession session) {
        return new ResponseEntity<String>(resumeService.updateResume(resumeWrapper.getResumeDto(),resumeWrapper.getResumeCareerDtoList(), resumeWrapper.getResumeLicenseDtoList(),session), HttpStatus.OK);
    }

     @PostMapping("/D1/translate")
     public ResponseEntity<String> translate(@RequestBody JsonNode jsonNode) throws IOException {
         return new ResponseEntity<String>(resumeService.translateResume(jsonNode.get("text").asText()),HttpStatus.OK);
     }


}
