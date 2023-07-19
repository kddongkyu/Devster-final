package data.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import data.dto.AcademyCommentDto;
import data.entity.AcademyCommentEntity;
import data.entity.AcademyCommentLikeEntity;
import data.entity.MemberEntity;
import data.mapper.AcademyCommentMapper;
import data.repository.AcademyCommentLikeRepository;
import data.repository.AcademyCommentRepository;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityNotFoundException;
import javax.transaction.Transactional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;





@Service
public class AcademyCommentService {
    private final Logger logger = LoggerFactory.getLogger(HireBoardService.class);

    @Autowired 
    private AcademyCommentRepository academyCommentRepository;



    @Autowired
    private AcademyCommentMapper academyCommentMapper;

    // @Autowired
    // private AcademyCommentEntity academyCommentEntity;
    

    @Autowired
    private AcademyCommentLikeRepository academyCommentLikeRepository;



   public List<Map<String,Object>> getAllCommentList(int ab_idx){
        List<AcademyCommentDto> list = academyCommentMapper.getAllCommentList(ab_idx);
        List<Map<String,Object>> fullList = new ArrayList<>();
        int totalCount = academyCommentMapper.getTotalComment(ab_idx);

        for(AcademyCommentDto dto : list){
            Map<String,Object>map = new HashMap<>();
            SimpleDateFormat sdf = new SimpleDateFormat("yy-MM-dd HH:mm");
            String formattedDate = sdf.format(dto.getAbc_writeday());

            map.put("m_photo",academyCommentMapper.selectPhotoOfAbc_idx(dto.getAbc_idx()));
            map.put("nickname",academyCommentMapper.selectNickNameOfAbc_idx(dto.getAbc_idx()));
            map.put("replyCnt", academyCommentMapper.countReply(dto.getAbc_idx()));

            map.put("abc_content",dto.getAbc_content());
            map.put("abc_idx",dto.getAbc_idx());
            map.put("m_idx",dto.getM_idx());
            map.put("abc_ref",dto.getAbc_ref());
            map.put("abc_writeday",formattedDate);
            map.put("totalCount",totalCount);

            fullList.add(map);
        }
        System.out.println(fullList);
        return fullList;
   }     



    public AcademyCommentDto insertAcademyComment(AcademyCommentDto dto){  
        try {
            AcademyCommentEntity entity = AcademyCommentEntity.toAcademyCommentEntity(dto);
            academyCommentRepository.save(entity);
            return dto;
        } catch (Exception e) {
            logger.error("Error occurred while inserting academyBoardComment",e);
            throw e;
        }
    }


    public void deleteAcademyComment(Integer idx){
        try {
            academyCommentRepository.deleteById(idx);
        } catch (Exception e) {
            logger.error("Error occurred while deleting a academyComment",e);
        }
    }


    // public AcademyCommentDto getAcademyComment(int abc_idx){
    //         return academyCommentMapper.getAcademyComment(abc_idx);    
    // } 


    public void updateAcademyComment(AcademyCommentDto dto){
        try {
            AcademyCommentEntity entity = AcademyCommentEntity.toAcademyCommentEntity(dto);
            
            //수정 시간 업데이트 
            Date date = new Date();
            Timestamp timestamp = new Timestamp(date.getTime());
            entity.setABcwriteday(timestamp);

            academyCommentRepository.save(entity);
        } catch (Exception e) {
            logger.error("Error occurred while updating academyBoardComment",e);
            throw e;
        }
    }


    public AcademyCommentDto insertAcademyReply(AcademyCommentDto dto){  
        try {
            AcademyCommentEntity entity = AcademyCommentEntity.toAcademyCommentEntity(dto);
            academyCommentRepository.save(entity);
            return dto;
        } catch (Exception e) {
            logger.error("Error occurred while inserting academyBoardComment",e);
            throw e;
        }
    }


    public List<Map<String,Object>> getReplyOfAbcIdx(int abc_idx){
        List<AcademyCommentDto> list = academyCommentMapper.getAllReplyComment(abc_idx);

        List<Map<String,Object>> fullList = new ArrayList<>(); 

        try{
            for(AcademyCommentDto dto : list){
                Map<String, Object> map = new HashMap<>();

                SimpleDateFormat sdf = new SimpleDateFormat("yy-MM-dd HH:mm");
                String formattedDate = sdf.format(dto.getAbc_writeday());

                {
                map.put("m_photo",academyCommentMapper.selectPhotoOfAbc_idx(dto.getAbc_idx()));
                map.put("nickname",academyCommentMapper.selectNickNameOfAbc_idx(dto.getAbc_idx()));
                map.put("abc_content",dto.getAbc_content());
                map.put("abc_idx",dto.getAbc_idx());
                map.put("m_idx",dto.getM_idx());
                map.put("abc_like",dto.getAbc_like());
                map.put("abc_writeday",formattedDate);

                fullList.add(map);
                }
            }
            return fullList;
        } catch(Exception e){
            logger.error("Error occurred while getting all academyComment data", e);
            throw e;
        }
    } 

    
    
    
    @Transactional
    private AcademyCommentLikeEntity findOrCreateABoardCommentLike(int ABcidx,int MIdx){
            return academyCommentLikeRepository.findByABcidxAndMIdx(ABcidx,MIdx)
                .orElse(new AcademyCommentLikeEntity(ABcidx,MIdx));
    }  
    
    
    public void like(int ABcidx, int MIdx){
        try {           
            AcademyCommentLikeEntity academyCommentLikeEntity = findOrCreateABoardCommentLike(ABcidx,MIdx);
            
            if (academyCommentLikeEntity.getLikestatus() == 1) {
                //throw new IllegalArgumentException("이미 좋아요가 눌려 있습니다");
                academyCommentLikeEntity.setLikestatus(0);
                academyCommentLikeRepository.save(academyCommentLikeEntity);
    
                AcademyCommentEntity academyCommentEntity = academyCommentRepository.findById(ABcidx)
                    .orElseThrow(()-> new IllegalArgumentException("해당하는 댓글을 찾지 못했습니다(ab_like-1)"));
                academyCommentEntity.setABclike(academyCommentEntity.getABclike() - 1);
                academyCommentRepository.save(academyCommentEntity);
    
            } else {
                academyCommentLikeEntity.setLikestatus(1);
                academyCommentLikeRepository.save(academyCommentLikeEntity);
    
                // AcademyCommentEntity의 abc_like 필드 업데이트
                AcademyCommentEntity academyCommentEntity = academyCommentRepository.findById(ABcidx)
                        .orElseThrow(() -> new IllegalArgumentException("해당하는 댓글을 찾지 못했습니다(ab_like+1): " + ABcidx));
                academyCommentEntity.setABclike(academyCommentEntity.getABclike() + 1);
                academyCommentRepository.save(academyCommentEntity);
            }
        } catch (IllegalArgumentException e) {
            logger.error("review like Error(Ill)", e);
        } catch (Exception e) {
         logger.error("review like Error(Exce)", e);
        }
    }


}


