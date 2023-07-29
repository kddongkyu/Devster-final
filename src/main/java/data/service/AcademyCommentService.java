package data.service;

import data.dto.*;
import data.entity.*;
import data.repository.MemberRepository;
import org.springframework.stereotype.Service;

import data.repository.AcademyCommentLikeRepository;
import data.repository.AcademyCommentRepository;

import java.util.ArrayList;
import java.util.List;

import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;





@Service
public class AcademyCommentService {
    private final Logger logger = LoggerFactory.getLogger(HireBoardService.class);

    private final AcademyCommentRepository academyCommentRepository;
    private final AcademyCommentLikeRepository academyCommentLikeRepository;
    private final MemberRepository memberRepository;

    public AcademyCommentService(
            AcademyCommentRepository academyCommentRepository,
            AcademyCommentLikeRepository academyCommentLikeRepository,
            MemberRepository memberRepository
    ){
        this.academyCommentRepository =academyCommentRepository;
        this.academyCommentLikeRepository = academyCommentLikeRepository;
        this.memberRepository = memberRepository;
    }

    public AcademyCommentResponseDto getAllCommentList(int ab_idx){
        List<AcademyCommentEntity> academytEntityList = academyCommentRepository.findALLByABidxAndABcrefEqualsOrderByABcwritedayDesc(ab_idx,0);
        logger.info(ab_idx+"번 게시글 댓글 리스트 가져오기 완료");
        List<AcademyCommentDetailDto> AcademyCommentDetailDtoList = new ArrayList<>();
        int totalCount = academyCommentRepository.countAllByABidx(ab_idx);
        logger.info("totalCount 가져오기 완료");

        for (AcademyCommentEntity entity : academytEntityList){
            AcademyCommentDetailDto dto = new AcademyCommentDetailDto();
            int likeDislikeDifference = entity.getABclike() - entity.getABcdislike();
            dto.setLikeDislikeDifference(likeDislikeDifference);
            logger.info("좋아요 싫어요 가져오기");

            dto.setAcademyCommentDto(AcademyCommentDto.toAcademyCommentDto(entity));
            logger.info("댓글 정보 입력완료");

            MemberEntity memberInfo = memberRepository.findById(entity.getMIdx()).get();
            logger.info("작성자 정보 가져오기 완료");

            dto.setPhoto(memberInfo.getMPhoto());
            dto.setNickname(memberInfo.getMNickname());
            dto.setReplyCount(academyCommentRepository.countAllByABcref(entity.getABcidx()));
            logger.info("작성자 정보 입력 완료");

            List<AcademyCommentEntity> replyEntityList = academyCommentRepository.findAllByABcrefOrderByABcwritedayDesc(entity.getABcidx());
            List<AcademyCommentDetailDto> replyDtoList = new ArrayList<>();
            for(AcademyCommentEntity entity1 : replyEntityList) {
                AcademyCommentDetailDto dto1 = new AcademyCommentDetailDto();
                likeDislikeDifference = entity1.getABclike() - entity1.getABcdislike();
                dto1.setLikeDislikeDifference(likeDislikeDifference);
                logger.info("좋아요 싫어요 가져오기");

                dto1.setAcademyCommentDto((AcademyCommentDto.toAcademyCommentDto(entity1)));

                MemberEntity memberInfoEntity2 = memberRepository.findById(entity1.getMIdx()).get();
                dto1.setPhoto(memberInfoEntity2.getMPhoto());
                dto1.setNickname(memberInfoEntity2.getMNickname());
                replyDtoList.add(dto1);
            }
            logger.info("대댓글 정보 가져오기 완료");
            dto.setReplyList(replyDtoList);
            logger.info("대댓글 정보 입력완료");
            AcademyCommentDetailDtoList.add(dto);

        }
        return new AcademyCommentResponseDto(AcademyCommentDetailDtoList,totalCount);
    }


     public String insert(AcademyCommentDto dto){
        academyCommentRepository.save(AcademyCommentEntity.toAcademyCommentEntity(dto));
        logger.info("aboard 댓글 입력 완료");
        return "aboard 댓글 입력 완료";
    }
    @Transactional
    public Boolean delete (int abc_idx){
        //엔터티가 존재하는지 확인
        if(academyCommentRepository.existsById(abc_idx)){
            academyCommentRepository.deleteAllByABcref(abc_idx);
            academyCommentRepository.deleteById(abc_idx);
            logger.info("aboard"+abc_idx+"번 댓글 삭제 완료");
            return true;
        }else {
            //존재하지 않는 엔터이에 대한 처리
            logger.info("aboard"+abc_idx+"번 댓글이 존재하지 않습니다");
            return false;
        }
    }

    public Boolean update (AcademyCommentDto dto){
        //업데이트가 존재하는지 확인
        if(academyCommentRepository.existsById(dto.getAbc_idx())){
            AcademyCommentEntity entity = academyCommentRepository.findById(dto.getAbc_idx()).get();
            entity.setABccontent(dto.getAbc_content());
            academyCommentRepository.save(entity);
            logger.info("aboard"+dto.getAbc_idx()+"번 댓글 업데이트 돤료");
            return true;
        }else {
            //존재하지 않는 엔티티에 대한 처리
            logger.info("aboard"+dto.getAbc_idx()+"번 댓글이 존재하지 않습니다");
            return false;
        }
    }

    private AcademyCommentLikeEntity findOrCreateAboardcommentLike(int Midx, int ABcidx){
        return academyCommentLikeRepository.findByABcidxAndMIdx(Midx,ABcidx)
                .orElse(new AcademyCommentLikeEntity(Midx,ABcidx));
    }


    public boolean isAlreadyAddGoodRp(int ABcidx, int MIdx){
        AcademyCommentLikeEntity academyCommentLikeEntity=findOrCreateAboardcommentLike(ABcidx,MIdx);
        return academyCommentLikeEntity.getLikestatus()==1;
    }

    public boolean isAlreadyAddBadRp(int ABcidx, int MIdx){
        AcademyCommentLikeEntity academyCommentLikeEntity=findOrCreateAboardcommentLike(ABcidx, MIdx);
        return academyCommentLikeEntity.getLikestatus()==2;
    }

    public AcademyCommentlikeResponseDto like(int Midx, int ABcidx){
        AcademyCommentLikeEntity academyCommentLikeEntity = null;
        try {
            academyCommentLikeEntity =findOrCreateAboardcommentLike(Midx,ABcidx);
            int likeCount=0;

            if(academyCommentLikeEntity.getLikestatus() ==1){
                academyCommentLikeEntity.setLikestatus(0);
                academyCommentLikeRepository.save(academyCommentLikeEntity);

                AcademyCommentEntity academyCommentEntity = academyCommentRepository.findById(ABcidx)
                        .orElseThrow(() -> new IllegalArgumentException("해당하는 리뷰 보드를 찾지 못했습니다"));
                academyCommentEntity.setABclike(academyCommentEntity.getABclike()-1);
                academyCommentRepository.save(academyCommentEntity);
                likeCount = academyCommentEntity.getABclike();
            }else if (academyCommentLikeEntity.getLikestatus()==2){
                throw new IllegalArgumentException("이미 싫어요가 눌려 있습니다");
            }else {
                academyCommentLikeEntity.setLikestatus(1);
                academyCommentLikeRepository.save(academyCommentLikeEntity);

                AcademyCommentEntity academyCommentEntity = academyCommentRepository.findById(ABcidx)
                        .orElseThrow(() -> new IllegalArgumentException("해당하는 리뷰 보드를 찾지 못했습니다"));
                academyCommentEntity.setABclike(academyCommentEntity.getABclike() + 1);
                academyCommentRepository.save(academyCommentEntity);
                likeCount = academyCommentEntity.getABclike();
            }
                AcademyCommentLikeDto academyCommentLikeDto = new AcademyCommentLikeDto(
                        academyCommentLikeEntity.getABclikeidx(),
                        academyCommentLikeEntity.getMIdx(),
                        academyCommentLikeEntity.getABcidx(),
                        academyCommentLikeEntity.getLikestatus());
                AcademyCommentlikeResponseDto academyCommentlikeResponseDto = new AcademyCommentlikeResponseDto(academyCommentLikeDto,likeCount);

                return academyCommentlikeResponseDto;
            }catch (IllegalArgumentException e){
                logger.error("aboard 좋아요 에러 "+e);
                throw e;
            }catch (Exception e){
            logger.error("aboard 좋아요 에러 "+e);
            throw e;
        }
    }
    public AcademyCommentlikeResponseDto dislike(int MIdx, int ABcidx) {
        AcademyCommentLikeEntity academyCommentLikeEntity = null;

        try {
            academyCommentLikeEntity = findOrCreateAboardcommentLike(MIdx, ABcidx);
            int likeCount = 0;

            if (academyCommentLikeEntity.getLikestatus() == 2) {
                academyCommentLikeEntity.setLikestatus(0);
                academyCommentLikeRepository.save(academyCommentLikeEntity);


                AcademyCommentEntity academyCommentEntity = academyCommentRepository.findById(ABcidx)
                        .orElseThrow(() -> new IllegalArgumentException("해당하는 리뷰 보드를 찾지 못했습니다("));
                academyCommentEntity.setABcdislike(academyCommentEntity.getABcdislike() - 1);
                academyCommentRepository.save(academyCommentEntity);
                likeCount = academyCommentEntity.getABclike()-academyCommentEntity.getABcdislike();

            } else if (academyCommentLikeEntity.getLikestatus() == 1) {
                throw new IllegalArgumentException("이미 좋아요가 눌려 있습니다");

            }else{
                // 싫어요 상태가 아닌 경우, 싫어요를 누른 것으로 처리하고 댓글의 싫어요 개수를 증가시킨다.
                academyCommentLikeEntity.setLikestatus(2);
                academyCommentLikeRepository.save(academyCommentLikeEntity);

                AcademyCommentEntity academyCommentEntity = academyCommentRepository.findById(ABcidx)
                        .orElseThrow(() -> new IllegalArgumentException("해당하는 리뷰 보드를 찾지 못했습니다(): " ));
                academyCommentEntity.setABcdislike(academyCommentEntity.getABcdislike() + 1);
                academyCommentRepository.save(academyCommentEntity);
                likeCount = academyCommentEntity.getABclike()-academyCommentEntity.getABcdislike();
            }



            // Transform the ReviewCommentlikeEntity to ReviewCommentlikeDto
            AcademyCommentLikeDto academyCommentLikeDto = new AcademyCommentLikeDto(
                    academyCommentLikeEntity.getABclikeidx(),
                    academyCommentLikeEntity.getMIdx(),
                    academyCommentLikeEntity.getABcidx(),
                    academyCommentLikeEntity.getLikestatus());

            AcademyCommentlikeResponseDto academyCommentlikeResponseDto = new AcademyCommentlikeResponseDto(academyCommentLikeDto, likeCount);
            return academyCommentlikeResponseDto;

        } catch (IllegalArgumentException e) {
            logger.error("abord dislike Error(Ill)", e);
            throw e;
        } catch (Exception e) {
            logger.error("abord dislike Error(Exce)", e);
            throw e;
        }
    }



}


