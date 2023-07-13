package data.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import data.dto.AcademyCommentDto;
import data.entity.AcademyCommentEntity;
import data.entity.MemberEntity;
import data.repository.AcademyCommentRepository;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.persistence.EntityNotFoundException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class AcademyCommentService {
    private final Logger logger = LoggerFactory.getLogger(HireBoardService.class);

    @Autowired 
    private AcademyCommentRepository academyCommentRepository;

    // @Autowired
    // private AcademyCommentEntity academyCommentEntity;
    
    // public List<Map<String,Object>> getAllCommentList(int ab_idx){
    //     List<AcademyCommentDto> list = new ArrayList<>(); 
    //     List<Map<String,Object>> fullList = new ArrayList<>(); 
    //     List<AcademyCommentEntity> entity = new ArrayList<>();
    //     int totalCount = academyCommentRepository.countBy();
    //     int replyCnt=0;
    //     try{
        
    //         for(AcademyCommentEntity sc : entity){
    //             Map<String, Object> map = new HashMap<>();
    //             SimpleDateFormat sdf = new SimpleDateFormat("yy-MM-dd HH:mm");
    //             String formattedDate = sdf.format(sc.getABcwriteday());
                
    //             // map.put("m_photo",selectPhotoOfAbc_idx(dto.getAbc_idx()))
    //                 //member 통합 후 추가할 항목 
    //             // map.put("nickname",selectNickNameOfAbc_idx(dto.getAbc_idx()))
    //                 //member 통합 후 추가할 항목 
                
    //             MemberEntity memberEntity = academyCommentEntity.getMemberEntity();
    //             String mphoto = memberEntity.getMphoto();
    //             map.put("m_photo", sc.getMemberEntity().getMphoto());

    //             for(AcademyCommentDto adto : list){
    //                 if(adto.getAbc_depth()==1)
    //                     replyCnt+=1;
    //             }
    //             map.put("replyCnt",replyCnt);
    //             map.put("abc_content",sc.getABccontent());
    //             map.put("abc_idx",sc.getABcidx());
    //             map.put("m_idx",sc.getMIdx());
    //             map.put("abc_depth",sc.getABcdepth());
    //             map.put("abc_like",sc.getABclike());
    //             map.put("abc_writeday",formattedDate);
    //             map.put("totalCount",totalCount);

    //             fullList.add(map);
                
    //         }
    //         return fullList;
    //     } catch(Exception e){
    //         logger.error("Error occurred while getting all academyComment data", e);
    //         throw e;
    //     }
    // }   


    public AcademyCommentDto insertAcademyComment(AcademyCommentDto dto){  
        try {
            dto.setAbc_depth(0);
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


    public AcademyCommentDto getAcademyComment(int abc_idx){
        try {
            AcademyCommentEntity entity = academyCommentRepository.findById(abc_idx)
                .orElseThrow(() -> new EntityNotFoundException("해당 idx는 존재하지 않습니다." + abc_idx));
            return AcademyCommentDto.toAcademyCommentDto(entity);    
        } catch (EntityNotFoundException e) {
            logger.error("Error occurred while getting a entity", e);
            throw e;
        }
    } 


    public void updateAcademyComment(AcademyCommentDto dto){
        try {
            AcademyCommentEntity entity = AcademyCommentEntity.toAcademyCommentEntity(dto);
            academyCommentRepository.save(entity);
        } catch (Exception e) {
            logger.error("Error occurred while updating academyBoardComment",e);
            throw e;
        }
    }


    public List<Map<String,Object>> getReplyOfAbcIdx(int abc_idx){
        List<AcademyCommentDto> list = new ArrayList<>(); 
        List<Map<String,Object>> fullList = new ArrayList<>(); 
        List<AcademyCommentEntity> entity = new ArrayList<>();
        try{
            for(AcademyCommentDto dto : list){
                Map<String, Object> map = new HashMap<>();

                SimpleDateFormat sdf = new SimpleDateFormat("yy-MM-dd HH:mm");
                String formattedDate = sdf.format(dto.getAbc_writeday());

                if(dto.getAbc_depth()==1){
                // map.put("m_photo",selectPhotoOfAbc_idx(dto.getAbc_idx()))
                    //member 통합 후 추가할 항목 
                // map.put("nickname",selectNickNameOfAbc_idx(dto.getAbc_idx()))
                    //member 통합 후 추가할 항목 

                map.put("abc_content",dto.getAbc_content());
                map.put("abc_idx",dto.getAbc_idx());
                map.put("m_idx",dto.getM_idx());
                map.put("abc_depth",dto.getAbc_depth());
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


    public AcademyCommentDto insertAcademyReply(AcademyCommentDto dto){  
        try {
            dto.setAbc_depth(1);
            AcademyCommentEntity entity = AcademyCommentEntity.toAcademyCommentEntity(dto);
            academyCommentRepository.save(entity);
            return dto;
        } catch (Exception e) {
            logger.error("Error occurred while inserting academyBoardComment",e);
            throw e;
        }
    }

}


