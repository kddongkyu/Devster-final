package data.controller;

import java.util.List;
import java.util.Map;

import data.dto.*;
import data.entity.ReviewCommentlikeEntity;
import data.service.ReviewCommentService;
import data.service.ReviewService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import static data.dto.ReviewCommentlikeDto.toReviewCommentlikeEntity;

@RestController
@CrossOrigin
@RequestMapping("/api/review")
public class ReviewController {

    private final ReviewService reviewService;

    private final ReviewCommentService reviewCommentService;

    private final Logger logger = LoggerFactory.getLogger(ReviewService.class);

    @Autowired
    public ReviewController(ReviewService reviewService,ReviewCommentService reviewCommentService) {
        this.reviewService = reviewService;
        this.reviewCommentService = reviewCommentService;
    }

@GetMapping("/D1")
public ResponseEntity<Map<String, Object>> getPagedReviews(
        @RequestParam(defaultValue = "0") int page,
        @RequestParam(defaultValue = "5") int size,
        @RequestParam(defaultValue = "RBwriteday") String sortProperty,
        @RequestParam(defaultValue = "DESC") String sortDirection,
        @RequestParam(required = false) String keyword) {

    return new ResponseEntity<>(reviewService.getPagedReviews(page, size, sortProperty, sortDirection, keyword), HttpStatus.OK);
}


    @PostMapping("/D1")
    public ResponseEntity<ReviewDto> insertReview(@RequestBody ReviewDto dto) {
        return new ResponseEntity<ReviewDto>(reviewService.insertReview(dto),HttpStatus.OK);
    }

    @GetMapping("/D1/{rb_idx}")
    public ResponseEntity<Map<String, Object>> getOneReview(@PathVariable int rb_idx) {
        return new ResponseEntity<>(reviewService.getOneReview(rb_idx), HttpStatus.OK);
    }

    @DeleteMapping("/D1/{rb_idx}")
    public ResponseEntity<Void> deleteById(@PathVariable int rb_idx) {
        reviewService.deleteById(rb_idx);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @PutMapping("/D1/{rb_idx}")
    public ResponseEntity<ReviewDto> updateReview(@PathVariable int rb_idx, @RequestBody ReviewDto dto){
        reviewService.updateReview(rb_idx, dto);
        return new ResponseEntity<ReviewDto>(HttpStatus.OK);
    }

    @PostMapping("/D1/{m_idx}/like/{rb_idx}")
    public ResponseEntity<ReviewDto> likeReview(@PathVariable int rb_idx, @PathVariable int m_idx) {
        reviewService.like(m_idx, rb_idx);
        // 좋아요 처리 후, 필요한 데이터를 ReviewBoardDto로 변환하여 생성
        ReviewDto reviewBoardDto = new ReviewDto();  // 적절한 ReviewBoardDto 생성 방식으로 변경
        return ResponseEntity.ok(reviewBoardDto);

    }

    @PostMapping("/D1/{m_idx}/dislike/{rb_idx}")
    public ResponseEntity<ReviewDto> dislikeReview(@PathVariable int rb_idx, @PathVariable int m_idx) {
        reviewService.dislike(m_idx, rb_idx);
        // 좋아요 처리 후, 필요한 데이터를 ReviewBoardDto로 변환하여 생성
        ReviewDto reviewBoardDto = new ReviewDto();  // 적절한 ReviewBoardDto 생성 방식으로 변경
        return ResponseEntity.ok(reviewBoardDto);

    }

    @GetMapping("/D1/{m_idx}/checkGood/{rb_idx}")
    public ResponseEntity<Boolean> checkGood(@PathVariable int m_idx, @PathVariable int rb_idx) {
        boolean isGood = reviewService.isAlreadyAddGoodRp(m_idx, rb_idx);
        return ResponseEntity.ok(isGood);
    }

    @GetMapping("/D1/{m_idx}/checkBad/{rb_idx}")
    public ResponseEntity<Boolean> checkBad(@PathVariable int m_idx, @PathVariable int rb_idx) {
        boolean isBad = reviewService.isAlreadyAddBadRp(m_idx, rb_idx);
        return ResponseEntity.ok(isBad);
    }


    @GetMapping("/D1/search")
    public ResponseEntity<List<CompanyInfoDto>> searchCompany(@RequestParam String keyword) {
//        System.out.println(keyword+"key");
        return new ResponseEntity<List<CompanyInfoDto>>(reviewService.getsearchCompanyname(keyword),HttpStatus.OK);
    }

    @GetMapping("/D0/comment/{rb_idx}")
    public ResponseEntity<ReviewCommentResponseDto> comment (@PathVariable int rb_idx){
        return new ResponseEntity<ReviewCommentResponseDto>(reviewCommentService.getAllCommentList(rb_idx),HttpStatus.OK);
    }

    @PostMapping("/D1/comment")
    public ResponseEntity<String> insertComment(@RequestBody ReviewCommentDto dto) {
        return new ResponseEntity<>(reviewCommentService.insert(dto),HttpStatus.OK);
    }

    @DeleteMapping("/D1/comment/{rbc_idx}")
    public ResponseEntity<String> deleteComment(@PathVariable int rbc_idx) {
        boolean returnResult = reviewCommentService.delete(rbc_idx);
        if(returnResult) {
            return new ResponseEntity<>("Review" + rbc_idx + "번 댓글 삭제완료",HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Review" + rbc_idx + "번 댓글이 존재하지 않습니다.",HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/D1/comment/{rbc_idx}")
    public ResponseEntity<String> updateComment(@RequestBody ReviewCommentDto dto) {
        boolean returnResult = reviewCommentService.update(dto);
        if(returnResult) {
            return new ResponseEntity<>("Review" + dto.getRbc_idx() + "번 댓글 업데이트 완료",HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Review" + dto.getRbc_idx() + "번 댓글이 존재하지 않습니다.",HttpStatus.BAD_REQUEST);
        }
    }

//    @PostMapping("/D1/comment/{m_idx}/like/{rbc_idx}")
//    public ResponseEntity<ReviewCommentlikeDto> likeReviewcomment(@PathVariable int rbc_idx, @PathVariable int m_idx) {
//        ReviewCommentlikeEntity reviewCommentlikeEntity = reviewCommentService.like(m_idx, rbc_idx);
//        // 좋아요 처리 후, 필요한 데이터를 ReviewBoardDto로 변환하여 생성
//        ReviewCommentlikeDto reviewCommentDto = toReviewCommentlikeEntity(reviewCommentlikeEntity);
//        return ResponseEntity.ok(reviewCommentDto);
//    }
@PostMapping("/D1/comment/{m_idx}/like/{rbc_idx}")
public ResponseEntity<ReviewCommentlikeResponseDto> likeReviewcomment(@PathVariable int rbc_idx, @PathVariable int m_idx) {
    // like 메서드는 이제 ReviewCommentlikeResponseDto를 반환합니다.
    ReviewCommentlikeResponseDto reviewCommentlikeResponseDto = reviewCommentService.like(m_idx, rbc_idx);
    return ResponseEntity.ok(reviewCommentlikeResponseDto);
}


    @PostMapping("/D1/comment/{m_idx}/dislike/{rbc_idx}")
    public ResponseEntity<ReviewCommentlikeResponseDto> dislikeReviewcomment(@PathVariable int rbc_idx, @PathVariable int m_idx) {

        ReviewCommentlikeResponseDto reviewCommentlikeResponseDto = reviewCommentService.dislike(m_idx, rbc_idx);
        return ResponseEntity.ok(reviewCommentlikeResponseDto);

    }
    @GetMapping("/D0/comment/{m_idx}/checkGood/{rbc_idx}")
    public ResponseEntity<Boolean> checkGoodcomment(@PathVariable int m_idx, @PathVariable int rbc_idx) {
        boolean isGood = reviewCommentService.isAlreadyAddGoodRp(m_idx, rbc_idx);
        return ResponseEntity.ok(isGood);
    }

    @GetMapping("/D0/comment/{m_idx}/checkBad/{rbc_idx}")
    public ResponseEntity<Boolean> checkBadcomment(@PathVariable int m_idx, @PathVariable int rbc_idx) {
        boolean isBad = reviewCommentService.isAlreadyAddBadRp(m_idx, rbc_idx);
        return ResponseEntity.ok(isBad);
    }


}
