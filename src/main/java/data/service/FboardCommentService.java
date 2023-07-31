package data.service;

import data.dto.fboard.*;
import data.entity.FboardCommentEntity;
import data.entity.FboardCommentLikeEntity;
import data.entity.MemberEntity;
import data.repository.FboardCommentLikeRepository;
import data.repository.FboardCommentRepository;
import data.repository.MemberRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class FboardCommentService {

    private final FboardCommentRepository fboardCommentRepository;
    private final FboardCommentLikeRepository fboardCommentLikeRepository;
    private final MemberRepository memberRepository;


    public FboardCommentService(FboardCommentRepository fboardCommentRepository,
                                FboardCommentLikeRepository fboardCommentLikeRepository,
                                MemberRepository memberRepository) {
        this.fboardCommentRepository = fboardCommentRepository;
        this.fboardCommentLikeRepository = fboardCommentLikeRepository;
        this.memberRepository = memberRepository;
    }
    public FboardCommentResponseDto getAllCommentList(int fb_idx) {
        List<FboardCommentEntity> fboardCommentEntityList = fboardCommentRepository.findAllByFBidxAndFBcrefEqualsOrderByFBcwritedayDesc(fb_idx,0);
        log.info(fb_idx+ "번 게시글 댓글리스트 가져오기 완료.");

        List<FboardCommentDetailDto> fboardCommentDetailDtoList = new ArrayList<>();
        int totalCount = fboardCommentRepository.countAllByFBidx(fb_idx);
        log.info("totalCount 가져오기 완료.");
        
        for(FboardCommentEntity entity : fboardCommentEntityList) {
            FboardCommentDetailDto dto = new FboardCommentDetailDto();

            int likeDislikeDifference = entity.getFBclike() - entity.getFBcdislike();
            dto.setLikeDislikeDifference(likeDislikeDifference);
            log.info("좋아요 싫어요 가져오기");
            
            dto.setFboardcommentdto(FboardCommentDto.toFboardCommentDto(entity));
            log.info("댓글 정보 입력완료");
            
            MemberEntity memberInfo = memberRepository.findById(entity.getMIdx()).get();
            log.info("작성자 정보 가져오기 완료");

            dto.setPhoto(memberInfo.getMPhoto());
            dto.setNickname(memberInfo.getMNickname());
            dto.setReplyConut(fboardCommentRepository.countAllByFBcref(entity.getFBcidx()));
            log.info("작성자 정보 입력완료");

            List<FboardCommentEntity> replyEntityList = fboardCommentRepository.findAllByFBcrefOrderByFBcwritedayDesc(entity.getFBcidx());
            List<FboardCommentDetailDto> replyDtoList = new ArrayList<>();

            for(FboardCommentEntity entity1 : replyEntityList) {
                FboardCommentDetailDto dto1 = new FboardCommentDetailDto();

                likeDislikeDifference = entity1.getFBclike() - entity1.getFBcdislike();
                dto1.setLikeDislikeDifference(likeDislikeDifference);
                log.info("좋아요 싫어요 가져오기");

                dto1.setFboardcommentdto((FboardCommentDto.toFboardCommentDto(entity1)));

                MemberEntity memberInfoEntity2 = memberRepository.findById(entity1.getMIdx()).get();
                dto1.setPhoto(memberInfoEntity2.getMPhoto());
                dto1.setNickname(memberInfoEntity2.getMNickname());
                replyDtoList.add(dto1);
            }
            log.info("대댓글 정보 가져오기 완료");
            dto.setReplyList(replyDtoList);
            log.info("대댓글 정보 입력완료");
            fboardCommentDetailDtoList.add(dto);
            
        }
        return new FboardCommentResponseDto(fboardCommentDetailDtoList,totalCount);
    }

    public String insert(FboardCommentDto dto) {
        fboardCommentRepository.save(FboardCommentEntity.toFboardCommentEntity(dto));
        log.info("Fboard 댓글 입력완료");
        return "Fboard 댓글 입력완료";
    }

    @Transactional
    public Boolean delete(int fbc_idx) {
        if(fboardCommentRepository.existsById(fbc_idx)) {
            fboardCommentRepository.deleteAllByFBcref(fbc_idx);
            fboardCommentRepository.deleteById(fbc_idx);
            log.info("fboard" + fbc_idx + "번 댓글 삭제완료");
            return true;
        } else {
            log.info("fboard" + fbc_idx + "번 댓글이 존재하지 않습니다.");
            return false;
        }
    }

    public Boolean update(FboardCommentDto dto) {
        if(fboardCommentRepository.existsById(dto.getFbc_idx())) {
            FboardCommentEntity entity = fboardCommentRepository.findById(dto.getFbc_idx()).get();
            entity.setFBccontent(dto.getFbc_content());
            fboardCommentRepository.save(entity);
            log.info("Fboard" + dto.getFbc_idx() + "번 댓글 업데이트 완료");
            return true;
        } else {
            log.info("Fboard" + dto.getFbc_idx() + "번 댓글이 존재하지 않습니다.");
            return false;
        }
    }


    //좋아요 싫어요
    private FboardCommentLikeEntity findOrCreateFboardcommentLike(int Midx, int FBcidx){
        return fboardCommentLikeRepository.findByMIdxAndFBcidx(Midx,FBcidx)
                .orElse(new FboardCommentLikeEntity(Midx,FBcidx));
    }

    public boolean isAlreadyAddGoodRp(int MIdx, int Fbcidx){
        FboardCommentLikeEntity FboardCommentLikeEntity=findOrCreateFboardcommentLike(MIdx, Fbcidx);
        return FboardCommentLikeEntity.getLikestatus()==1;
    }

    public boolean isAlreadyAddBadRp(int MIdx, int Fbcidx){
        FboardCommentLikeEntity FboardCommentLikeEntity=findOrCreateFboardcommentLike(MIdx, Fbcidx);
        return FboardCommentLikeEntity.getLikestatus()==2;
    }


    public FboardCommentLikeResponseDto like(int MIdx, int Fbcidx) {
        FboardCommentLikeEntity fboardCommentLikeEntity = null;

        try {
            fboardCommentLikeEntity = findOrCreateFboardcommentLike(MIdx, Fbcidx);
            int likeCount = 0;

            if (fboardCommentLikeEntity.getLikestatus() == 1) {
                fboardCommentLikeEntity.setLikestatus(0);
                fboardCommentLikeRepository.save(fboardCommentLikeEntity);

                FboardCommentEntity fboardCommentEntity = fboardCommentRepository.findById(Fbcidx)
                        .orElseThrow(() -> new IllegalArgumentException("해당하는 게시물을 찾지 못했습니다(fb_like-1)"));
                fboardCommentEntity.setFBclike(fboardCommentEntity.getFBclike() - 1);
                fboardCommentRepository.save(fboardCommentEntity);
                likeCount = fboardCommentEntity.getFBclike();

            } else if (fboardCommentLikeEntity.getLikestatus() == 2) {
                throw new IllegalArgumentException("이미 싫어요가 눌려 있습니다");
            } else {
                fboardCommentLikeEntity.setLikestatus(1);
                fboardCommentLikeRepository.save(fboardCommentLikeEntity);

                FboardCommentEntity fboardCommentEntity = fboardCommentRepository.findById(Fbcidx)
                        .orElseThrow(() -> new IllegalArgumentException("해당하는 게시물을 찾지 못했습니다(fb_like+1): " + Fbcidx));
                fboardCommentEntity.setFBclike(fboardCommentEntity.getFBclike() + 1);
                fboardCommentRepository.save(fboardCommentEntity);
                likeCount = fboardCommentEntity.getFBclike();
            }

            FboardCommentLikeDto fboardCommentLikeDto = new FboardCommentLikeDto(
                    fboardCommentLikeEntity.getFBclikeidx(),
                    fboardCommentLikeEntity.getMIdx(),
                    fboardCommentLikeEntity.getFBcidx(),
                    fboardCommentLikeEntity.getLikestatus());

            FboardCommentLikeResponseDto fboardCommentLikeResponseDto = new FboardCommentLikeResponseDto(fboardCommentLikeDto, likeCount);

            return fboardCommentLikeResponseDto;

        } catch (IllegalArgumentException e) {
            log.error("fboard like Error(Ill)", e);
            throw e;
        } catch (Exception e) {
            log.error("fboard like Error(Exce)", e);
            throw e;
        }
    }

    public FboardCommentLikeResponseDto dislike(int MIdx, int Fbcidx) {
        FboardCommentLikeEntity fboardCommentLikeEntity = null;

        try {
            fboardCommentLikeEntity = findOrCreateFboardcommentLike(MIdx, Fbcidx);
            int likeCount = 0;

            if (fboardCommentLikeEntity.getLikestatus() == 2) {
                fboardCommentLikeEntity.setLikestatus(0);
                fboardCommentLikeRepository.save(fboardCommentLikeEntity);


                FboardCommentEntity fboardCommentEntity = fboardCommentRepository.findById(Fbcidx)
                        .orElseThrow(() -> new IllegalArgumentException("해당하는 게시물을 찾지 못했습니다(fb_like-1)"));
                fboardCommentEntity.setFBcdislike(fboardCommentEntity.getFBcdislike() - 1);
                fboardCommentRepository.save(fboardCommentEntity);
                likeCount = fboardCommentEntity.getFBclike()-fboardCommentEntity.getFBcdislike();

            } else if (fboardCommentLikeEntity.getLikestatus() == 1) {
                throw new IllegalArgumentException("이미 좋아요가 눌려 있습니다");

            }else{
                fboardCommentLikeEntity.setLikestatus(2);
                fboardCommentLikeRepository.save(fboardCommentLikeEntity);

                FboardCommentEntity fboardCommentEntity = fboardCommentRepository.findById(Fbcidx)
                        .orElseThrow(() -> new IllegalArgumentException("해당하는 게시물을 찾지 못했습니다(fb_dislike+1): " + Fbcidx));
                fboardCommentEntity.setFBcdislike(fboardCommentEntity.getFBcdislike() + 1);
                fboardCommentRepository.save(fboardCommentEntity);
                likeCount = fboardCommentEntity.getFBclike()-fboardCommentEntity.getFBcdislike();
            }

            FboardCommentLikeDto fboardCommentLikeDto = new FboardCommentLikeDto(
                    fboardCommentLikeEntity.getFBclikeidx(),
                    fboardCommentLikeEntity.getMIdx(),
                    fboardCommentLikeEntity.getFBcidx(),
                    fboardCommentLikeEntity.getLikestatus());

            FboardCommentLikeResponseDto fboardCommentLikeResponseDto = new FboardCommentLikeResponseDto(fboardCommentLikeDto, likeCount);
            return fboardCommentLikeResponseDto;

        } catch (IllegalArgumentException e) {
            log.error("fboard dislike Error(Ill)", e);
            throw e;
        } catch (Exception e) {
            log.error("fboard dislike Error(Exce)", e);
            throw e;
        }
    }




}
