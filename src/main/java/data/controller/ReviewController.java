package data.controller;

import java.util.List;

import data.dto.CompanyInfoDto;
import data.dto.ReviewDto;
import data.service.ReviewService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping("/review")
public class ReviewController {

    private final ReviewService reviewService;

    private final Logger logger = LoggerFactory.getLogger(ReviewService.class);

    @Autowired
    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @GetMapping
    public ResponseEntity<List<ReviewDto>> getAllReviews() {
        return new ResponseEntity<List<ReviewDto>>(reviewService.getAllReviews(), HttpStatus.OK);
    }
    @PostMapping
    public ResponseEntity<ReviewDto> insertReview(@RequestBody ReviewDto dto) {
        return new ResponseEntity<ReviewDto>(reviewService.insertReview(dto),HttpStatus.OK);
    }
//@PostMapping
//public ResponseEntity<ReviewDto> insertReview(@RequestBody ReviewDto dto) {
//    try {
//        ReviewDto insertedReview = reviewService.insertReview(dto);
//        return ResponseEntity.ok(insertedReview);
//    } catch (Exception e) {
//        logger.error("insert review Error", e);
//        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
//    }
//}


    @GetMapping("/{rb_idx}")
    public ResponseEntity<ReviewDto> getOneReview(@PathVariable int rb_idx) {
        return new ResponseEntity<ReviewDto>(reviewService.getOneReview(rb_idx),HttpStatus.OK);
    }

    @DeleteMapping("/{rb_idx}")
    public ResponseEntity<Void> deleteById(@PathVariable int rb_idx) {
        reviewService.deleteById(rb_idx);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/{rb_idx}")
    public ResponseEntity<ReviewDto> updateReview(@PathVariable int rb_idx, @RequestBody ReviewDto dto){
        reviewService.updateReview(rb_idx, dto);
        return new ResponseEntity<ReviewDto>(HttpStatus.OK);
    }

    @PostMapping("/{m_idx}/like/{rb_idx}")
    public ResponseEntity<ReviewDto> likeReview(@PathVariable int rb_idx, @PathVariable int m_idx) {
        reviewService.like(m_idx, rb_idx);
        // 좋아요 처리 후, 필요한 데이터를 ReviewBoardDto로 변환하여 생성
        ReviewDto reviewBoardDto = new ReviewDto();  // 적절한 ReviewBoardDto 생성 방식으로 변경
        return ResponseEntity.ok(reviewBoardDto);

    }

    @PostMapping("/{m_idx}/dislike/{rb_idx}")
    public ResponseEntity<ReviewDto> dislikeReview(@PathVariable int rb_idx, @PathVariable int m_idx) {
        reviewService.dislike(m_idx, rb_idx);
        // 좋아요 처리 후, 필요한 데이터를 ReviewBoardDto로 변환하여 생성
        ReviewDto reviewBoardDto = new ReviewDto();  // 적절한 ReviewBoardDto 생성 방식으로 변경
        return ResponseEntity.ok(reviewBoardDto);

    }

    @GetMapping("/search")
    public ResponseEntity<List<CompanyInfoDto>> searchCompany(@RequestParam String keyword) {
//        System.out.println(keyword+"key");
        return new ResponseEntity<List<CompanyInfoDto>>(reviewService.getsearchCompanyname(keyword),HttpStatus.OK);
    }



}
