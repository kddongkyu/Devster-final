package data.service;

import data.dto.ReviewCommentDetailDto;
import data.dto.ReviewCommentDto;
import data.dto.ReviewCommentResponseDto;
import data.entity.MemberEntity;
import data.entity.ReviewCommentEntity;
import data.repository.MemberRepository;
import data.repository.ReviewCommentRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;


@Service
public class ReviewCommentService {
    private final Logger log =  LoggerFactory.getLogger(ReviewService.class);

    private final ReviewCommentRepository reviewcommentRepository;
    private final MemberRepository memberRepository;

    public ReviewCommentService(ReviewCommentRepository reviewcommentRepository,MemberRepository memberRepository)
    {
        this.reviewcommentRepository =reviewcommentRepository;
        this.memberRepository = memberRepository;
    }

    public ReviewCommentResponseDto getAllCommentList(int rb_idx){
        List<ReviewCommentEntity> reviewdEntityList = reviewcommentRepository.findALLByRBidxAndRBcrefEquals(rb_idx,0);
        log.info(rb_idx + "번 게시글 댓글 리스트 가져오기 완료");
        List<ReviewCommentDetailDto> reviewCommentDetailDtoList = new ArrayList<>();
        int totalCount = reviewcommentRepository.countAllByRBidx(rb_idx);
        log.info("totalCount 가져오기 완료.");

        for(ReviewCommentEntity entity : reviewdEntityList){
            ReviewCommentDetailDto dto = new ReviewCommentDetailDto();

            dto.setReviewcommentdto(ReviewCommentDto.toReviewCommentDto(entity));
            log.info("댓글 정보 입력완료");

            MemberEntity memberInfo = memberRepository.findById(entity.getMIdx()).get();
            log.info("작성자 정보 가져오기 완료");

            dto.setPhoto(memberInfo.getMPhoto());
            dto.setNickname(memberInfo.getMNickname());
            dto.setReplyConut(reviewcommentRepository.countAllByRBcref(entity.getRBcidx()));
            log.info("작성자 정보 입력완료");
            List<ReviewCommentEntity> replyEntityList = reviewcommentRepository.findAllByRBcref(entity.getRBcidx());
            List<ReviewCommentDto> replyDtoList = new ArrayList<>();
            for(ReviewCommentEntity entity1 : replyEntityList) {
                replyDtoList.add(ReviewCommentDto.toReviewCommentDto(entity1));
            }
            log.info("대댓글 정보 가져오기 완료");
            dto.setReplyList(replyDtoList);
            log.info("대댓글 정보 입력완료");
            reviewCommentDetailDtoList.add(dto);
        }
        return new ReviewCommentResponseDto(reviewCommentDetailDtoList,totalCount);
    }

    public String insert(ReviewCommentDto dto) {

        reviewcommentRepository.save(ReviewCommentEntity.toReviewCommentEntity(dto));
        log.info("Qboard 댓글 입력완료");
        return "Qboard 댓글 입력완료";
    }

    @Transactional
    public Boolean delete(int rbc_idx) {
        // 엔티티가 존재하는지 확인
        if(reviewcommentRepository.existsById(rbc_idx)) {
            reviewcommentRepository.deleteAllByRBcref(rbc_idx);
            reviewcommentRepository.deleteById(rbc_idx);
            log.info("review" + rbc_idx + "번 댓글 삭제완료");
            return true;
        } else {
            // 존재하지 않는 엔티티에 대한 처리
            log.info("Review" + rbc_idx + "번 댓글이 존재하지 않습니다.");
            return false;
        }
    }

    public Boolean update(ReviewCommentDto dto) {
        // 엔티티가 존재하는지 확인
        if(reviewcommentRepository.existsById(dto.getRbc_idx())) {
            ReviewCommentEntity entity = reviewcommentRepository.findById(dto.getRbc_idx()).get();
            entity.setRBccontent(dto.getRbc_content());
            reviewcommentRepository.save(entity);
            log.info("Review" + dto.getRbc_idx() + "번 댓글 업데이트 완료");
            return true;
        } else {
            // 존재하지 않는 엔티티에 대한 처리
            log.info("Review" + dto.getRbc_idx() + "번 댓글이 존재하지 않습니다.");
            return false;
        }
    }

}
