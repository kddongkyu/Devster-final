package data.service;

import data.dto.CompanyInfoDto;
import data.dto.ReviewDto;
import data.entity.CompanyInfoEntity;
import data.entity.ReviewEntity;
import data.entity.ReviewlikeEntity;
import data.mapper.ReviewMapper;
import data.repository.CompanyInfoRepository;
import data.repository.ReviewRepository;
import data.repository.ReviewlikeRepository;
import org.springframework.stereotype.Service;


import org.springframework.beans.factory.annotation.Autowired;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import javax.persistence.EntityNotFoundException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
@Service
public class ReviewService {
    private final Logger logger = LoggerFactory.getLogger(ReviewService.class);

    @Autowired
    private final ReviewRepository reviewRepository;
    private final ReviewlikeRepository ReviewlikeRepository;
    private final CompanyInfoRepository CompanyInfoRepository;

    private final ReviewMapper reviewMapper;



    public ReviewService(ReviewRepository reviewRepository, ReviewlikeRepository ReviewlikeRepository, CompanyInfoRepository companyInfoRepository, ReviewMapper reviewMapper)  {
        this.reviewRepository = reviewRepository;
        this.ReviewlikeRepository=ReviewlikeRepository;
        this.CompanyInfoRepository=companyInfoRepository;
        this.reviewMapper = reviewMapper;
    }

    public ReviewDto insertReview(ReviewDto dto) {
        try {
            ReviewEntity review = ReviewEntity.toReviewEntity(dto);
            reviewRepository.save(review);

            CompanyInfoEntity companyInfo = CompanyInfoRepository.findById(dto.getCi_idx()).orElse(null);

            if (companyInfo == null) {
                // Create new company info
                CompanyInfoEntity newCompanyInfo = new CompanyInfoEntity();
                newCompanyInfo.setCIidx(dto.getCi_idx());
                newCompanyInfo.setCIstar((double) dto.getRb_star());
                // Set other fields if required
                CompanyInfoRepository.save(newCompanyInfo);
            } else {
                // Update existing company info
                Double averageRating = reviewMapper.calculateAverageRatingByCIIdx(dto.getCi_idx());
                if (averageRating != null) {
                    companyInfo.setCIstar(averageRating);
                } else {
                    companyInfo.setCIstar((double) dto.getRb_star());
                }
                // Set other fields if required
                CompanyInfoRepository.save(companyInfo);
            }

            return dto;
        } catch (Exception e) {
            logger.error("insert review Error", e);
            throw e;
        }
    }


    public List<ReviewDto> getAllReviews(){
        try {
            List<ReviewEntity> entityList = reviewRepository.findAll();
            List<ReviewDto> dtoList = new ArrayList<>();

            for (ReviewEntity entity : entityList) {
                dtoList.add(ReviewDto.toReviewDto(entity));
            }
            return dtoList;
        } catch (Exception e) {
            logger.error("find All review Error", e);
            throw e;
        }
    }

    public ReviewDto getOneReview(Integer rb_idx){
        try {
            ReviewEntity review = reviewRepository.findById((Integer)rb_idx)
                    .orElseThrow(() -> new EntityNotFoundException("해당 rb_idx 는 없습니다: " + rb_idx));
            return ReviewDto.toReviewDto(review);
        } catch (Exception e) {
            logger.error("find one review Error", e);
            throw e;
        }
    }

    public void deleteById(int rb_idx){
        try {
            reviewRepository.deleteById(rb_idx);
        } catch (Exception e) {
            logger.error("delete review Error", e);
            throw e;
        }
    }
    public void updateReview(int rb_idx, ReviewDto dto){
        try {
            Optional<ReviewEntity> e = reviewRepository.findById(rb_idx);

            if(e.isPresent()) {
                ReviewEntity existingEntity = e.get();
                existingEntity.setCIidx(dto.getCi_idx());
                existingEntity.setRBsubject(dto.getRb_subject());
                existingEntity.setRBcontent(dto.getRb_content());
                existingEntity.setRBstar(dto.getRb_star());
                existingEntity.setRBtype(dto.getRb_type());

                // Update the existing entity
                reviewRepository.save(existingEntity);
            }
        } catch (Exception e) {
            logger.error("update review Error", e);
            throw e;
        }
    }

    // 좋아요 싫어요 기능

    private ReviewlikeEntity findOrCreateRBoardLike(int MIdx, int RBidx){
        return ReviewlikeRepository.findByMIdxAndRBidx(MIdx, RBidx)
                .orElse(new ReviewlikeEntity(MIdx,RBidx));
    }

//현재 로직에선 필요가 없는데 출력하는 로직에서 필요한지 고민 필요
// public boolean isAlreadyAddGoodRp(int MIdx, int RBidx){
//     RboardlikeEntity rboardlikeEntity=findOrCreateRBoardLike(MIdx, RBidx);
//     return rboardlikeEntity.getLikestatus()==1;
// }

// public boolean isAlreadyAddBadRp(int MIdx, int RBidx){
//     RboardlikeEntity rboardlikeEntity=findOrCreateRBoardLike(MIdx, RBidx);
//     return rboardlikeEntity.getLikestatus()==2;
// }


    public void like(int MIdx, int RBidx) {
        try {
            ReviewlikeEntity ReviewlikeEntity = findOrCreateRBoardLike(MIdx, RBidx);

            if (ReviewlikeEntity.getLikestatus() == 1) {
                //throw new IllegalArgumentException("이미 좋아요가 눌려 있습니다");
                ReviewlikeEntity.setLikestatus(0);
                ReviewlikeRepository.save(ReviewlikeEntity);

                ReviewEntity ReviewEntity = reviewRepository.findById(RBidx)
                        .orElseThrow(()-> new IllegalArgumentException("해당하는 리뷰 보드를 찾지 못했습니다(rb_like-1)"));
                ReviewEntity.setRBlike(ReviewEntity.getRBlike()-1);
                reviewRepository.save(ReviewEntity);

            } else if (ReviewlikeEntity.getLikestatus() == 2) {
                throw new IllegalArgumentException("이미 싫어요가 눌려 있습니다");
            } else {
                ReviewlikeEntity.setLikestatus(1);
                ReviewlikeRepository.save(ReviewlikeEntity);

                // ReviewBoardEntity의 rb_like 필드 업데이트
                ReviewEntity ReviewEntity = reviewRepository.findById(RBidx)
                        .orElseThrow(() -> new IllegalArgumentException("해당하는 리뷰 보드를 찾지 못했습니다(rb_like+1): " + RBidx));
                ReviewEntity.setRBlike(ReviewEntity.getRBlike() + 1);
                reviewRepository.save(ReviewEntity);
            }
        } catch (IllegalArgumentException e) {
            logger.error("review like Error(Ill)", e);
        } catch (Exception e) {
            logger.error("review like Error(Exce)", e);
        }
    }



    public void dislike(int MIdx, int RBidx) {
        try {
            ReviewlikeEntity ReviewlikeEntity = findOrCreateRBoardLike(MIdx, RBidx);

            if (ReviewlikeEntity.getLikestatus() == 1) {
                throw new IllegalArgumentException("이미 좋아요가 눌려 있습니다");
            } else if (ReviewlikeEntity.getLikestatus() == 2) {
                //throw new IllegalArgumentException("이미 싫어요가 눌려 있습니다");
                ReviewlikeEntity.setLikestatus(0);
                ReviewlikeRepository.save(ReviewlikeEntity);

                ReviewEntity ReviewEntity = reviewRepository.findById(RBidx)
                        .orElseThrow(()-> new IllegalArgumentException("해당하는 리뷰 보드를 찾지 못했습니다(rb_dislike-1)"));
                ReviewEntity.setRBdislike(ReviewEntity.getRBdislike()-1);
                reviewRepository.save(ReviewEntity);

            } else {
                ReviewlikeEntity.setLikestatus(2);
                ReviewlikeRepository.save(ReviewlikeEntity);

                // ReviewBoardEntity의 rb_like 필드 업데이트
                ReviewEntity ReviewEntity = reviewRepository.findById(RBidx)
                        .orElseThrow(() -> new IllegalArgumentException("해당하는 리뷰 보드를 찾지 못했습니다(rb_dislike+1): " + RBidx));
                ReviewEntity.setRBdislike(ReviewEntity.getRBdislike() + 1);
                reviewRepository.save(ReviewEntity);
            }
        } catch (IllegalArgumentException e) {
            logger.error("review like Error(Ill)", e);
        } catch (Exception e) {
            logger.error("review like Error(Exce)", e);
        }
    }

    public List<CompanyInfoDto> getsearchCompanyname(String keyword){
        try {
            List<CompanyInfoEntity>entityList=CompanyInfoRepository.findByCInameContaining(keyword);
            List<CompanyInfoDto>dtoList=new ArrayList<>();

//            logger.info("Keyword: " + keyword);
            for(CompanyInfoEntity entity:entityList){
                dtoList.add(CompanyInfoDto.toCompanyInfoDto(entity));
            }
            return dtoList;
        }catch(Exception e){
            logger.error("search company name",e);
            throw e;
        }
    }




}
