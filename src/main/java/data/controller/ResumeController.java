package data.controller;

import data.dto.resume.ResumeWrapper;
import data.service.ResumeService;
import org.apache.ibatis.annotations.Update;
import org.apache.ibatis.javassist.bytecode.Mnemonic;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.servlet.http.HttpSession;


@RestController
@CrossOrigin
@RequestMapping("/resume")
public class ResumeController {

    private final ResumeService resumeService;

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @PostMapping
    public ResponseEntity<String> insertResume(@RequestBody ResumeWrapper resumeWrapper, HttpSession session) {
        return new ResponseEntity<String>(resumeService.insertResume(resumeWrapper.getResumeDto(),resumeWrapper.getResumeCareerDtoList(), resumeWrapper.getResumeLicenseDtoList(),session), HttpStatus.OK);
    }

    @PostMapping("/file")
    public ResponseEntity<String> uploadFile(@RequestBody MultipartFile upload, HttpSession session) {
        return new ResponseEntity<String>(resumeService.uploadFile(upload,session), HttpStatus.OK);
    }

    @PostMapping("/refile")
    public ResponseEntity<String> uploadRefile(@RequestBody MultipartFile upload, HttpSession session) {
        return new ResponseEntity<String>(resumeService.uploadReFile(upload,session), HttpStatus.OK);
    }

    @GetMapping("/{m_idx}")
    public ResponseEntity<ResumeWrapper> getOneResume(@PathVariable int m_idx) {
        return new ResponseEntity<ResumeWrapper>(resumeService.getOneResume(m_idx),HttpStatus.OK);
    }

    @DeleteMapping("/{m_idx}")
    public ResponseEntity<String> deleteResume(@PathVariable int m_idx) {
        return new ResponseEntity<String>(resumeService.deleteResume(m_idx),HttpStatus.OK);
    }

    @PutMapping
    public ResponseEntity<String> updateResume(@RequestBody ResumeWrapper resumeWrapper, HttpSession session) {
        return new ResponseEntity<String>(resumeService.updateResume(resumeWrapper.getResumeDto(),resumeWrapper.getResumeCareerDtoList(), resumeWrapper.getResumeLicenseDtoList(),session), HttpStatus.OK);
    }
}
