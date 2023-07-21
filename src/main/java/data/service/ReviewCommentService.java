package data.service;


import data.dto.ReviewCommentDto;

import data.entity.ReviewCommentEntity;
import data.mapper.ReviewCommentMapper;
import data.repository.ReviewCommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class ReviewCommentService {

    private final Logger logger =  LoggerFactory.getLogger(ReviewService.class);

    @Autowired
    private ReviewCommentRepository reviewcommentRepository;

    @Autowired
    private ReviewCommentMapper reviewCommentMapper;

    public List<Map<String,Object>> getAllCommentList(int rb_idx){
        List<ReviewCommentDto> list = reviewCommentMapper.getAllCommentList(rb_idx);
        List<Map<String,Object>> fullList = new ArrayList<>();
        int totalCount = reviewCommentMapper.getTotalComment(rb_idx);

        for(ReviewCommentDto dto : list){
            Map<String,Object>map = new HashMap<>();

            map.put("m_photo",reviewCommentMapper.selectPhotoOfRbc_idx(dto.getRbc_idx()));
            map.put("nickname",reviewCommentMapper.selectNickNameOfRbc_idx(dto.getRbc_idx()));
            map.put("replyCnt", reviewCommentMapper.countReply(dto.getRbc_idx()));

            map.put("rbc_content",dto.getRbc_content());
            map.put("rbc_idx",dto.getRbc_idx());
            map.put("m_idx",dto.getM_idx());
            map.put("rbc_ref",dto.getRbc_ref());
            map.put("rbc_writeday",dto.getRbc_writeday());
            map.put("totalCount",totalCount);

            fullList.add(map);
        }
        System.out.println("reviewcomment"+fullList);
        return fullList;
    }

    public ReviewCommentDto insertReviewComment(ReviewCommentDto dto){
        try {
            ReviewCommentEntity entity = ReviewCommentEntity.toReviewCommentEntity(dto);
            reviewcommentRepository.save(entity);
            return dto;
        } catch (Exception e) {
            logger.error("Error occurred while inserting ReviewBoardComment",e);
            throw e;
        }

    }

    public void deleteReviewComment(Integer idx){
        try {
            reviewcommentRepository.deleteById(idx);
        } catch (Exception e) {
            logger.error("Error occurred while deleting a ReviewComment",e);
        }
    }


    public void updateReviewComment(ReviewCommentDto dto){
        try {
            ReviewCommentEntity entity = ReviewCommentEntity.toReviewCommentEntity(dto);

            //수정 시간 업데이트
            Date date = new Date();
            Timestamp timestamp = new Timestamp(date.getTime());
            entity.setRBcwriteday(timestamp);

            reviewcommentRepository.save(entity);
        } catch (Exception e) {
            logger.error("Error occurred while updating ReviewBoardComment",e);
            throw e;
        }
    }

    public ReviewCommentDto insertReviewReply(ReviewCommentDto dto){
        try {
            ReviewCommentEntity entity = ReviewCommentEntity.toReviewCommentEntity(dto);
            reviewcommentRepository.save(entity);
            return dto;
        } catch (Exception e) {
            logger.error("Error occurred while inserting ReviewBoardComment",e);
            throw e;
        }
    }

    public List<Map<String,Object>> getReplyOfRbcIdx(int rbc_idx){
        List<ReviewCommentDto> list = reviewCommentMapper.getAllReplyComment(rbc_idx);

        List<Map<String,Object>> fullList = new ArrayList<>();

        try{
            for(ReviewCommentDto dto : list){
                Map<String, Object> map = new HashMap<>();

                SimpleDateFormat sdf = new SimpleDateFormat("yy-MM-dd HH:mm");
                String formattedDate = sdf.format(dto.getRbc_writeday());

                {
                    map.put("m_photo",reviewCommentMapper.selectPhotoOfRbc_idx(dto.getRbc_idx()));
                    map.put("nickname",reviewCommentMapper.selectNickNameOfRbc_idx(dto.getRbc_idx()));
                    map.put("rbc_content",dto.getRbc_content());
                    map.put("rbc_idx",dto.getRbc_idx());
                    map.put("m_idx",dto.getM_idx());
                    map.put("rbc_like",dto.getRbc_like());
                    map.put("rbc_writeday",formattedDate);

                    fullList.add(map);
                }
            }
            return fullList;
        } catch(Exception e){
            logger.error("Error occurred while getting all ReviewComment data", e);
            throw e;
        }
    }



}
