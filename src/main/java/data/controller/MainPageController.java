package data.controller;

import java.util.List;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import data.service.FreeBoardService;
import data.service.HireBoardService;
import data.service.QboardService;
import data.service.ReviewService;

@RestController
@CrossOrigin
@RequestMapping("/api/mainpage")
public class MainPageController {

    private final FreeBoardService freeBoardService;
    private final QboardService qboardService;
    private final HireBoardService hireBoardService;
    private final ReviewService reviewService;

    public MainPageController(FreeBoardService freeBoardService, QboardService qboardService,
    HireBoardService hireBoardService, ReviewService reviewService) {
        this.freeBoardService = freeBoardService;
        this.qboardService = qboardService;
        this.hireBoardService = hireBoardService;
        this.reviewService = reviewService;

    }

    @GetMapping("/D0/fboard")
    public ResponseEntity<List<Map<String,Object>>> getNewestFboard(){
        return new ResponseEntity<>(freeBoardService.getNewestFboard(), HttpStatus.OK);
    }

    @GetMapping("/D0/qboard")
    public ResponseEntity<List<Map<String,Object>>> getNewestQboard(){
        return new ResponseEntity<>(qboardService.getNewestQboard(), HttpStatus.OK);
    }

    @GetMapping("/D0/hboard")
    public ResponseEntity<List<Map<String,Object>>> getNewestHboard(){
        return new ResponseEntity<>(hireBoardService.getNewestHboard(), HttpStatus.OK);
    }

    @GetMapping("/D0/rboard")
    public ResponseEntity<List<Map<String,Object>>> getNewestRboard(){
        return new ResponseEntity<>(reviewService.getNewestRboard(), HttpStatus.OK);
    }

    @GetMapping("/D0/popularFarticle")
    public ResponseEntity<List<Map<String, Object>>> getHottestFboard(){
        return new ResponseEntity<>(freeBoardService.getHottestFboard(), HttpStatus.OK);
    }  

    @GetMapping("/D0/popularQarticle")
    public ResponseEntity<List<Map<String, Object>>> getHottestQboard(){
        return new ResponseEntity<>(qboardService.getHottestQboard(), HttpStatus.OK);
    }  

}
