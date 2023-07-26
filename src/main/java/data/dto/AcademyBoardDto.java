package data.dto;

import java.sql.Timestamp;

import org.apache.ibatis.type.Alias;

import com.fasterxml.jackson.annotation.JsonFormat;

import data.entity.AcademyBoardEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@Alias("AcademyBoardDto")
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
public class AcademyBoardDto {
    private int ab_idx;
    private int m_idx;
    private String ab_subject; 
    private String ab_content;
    private String ab_photo; 
    private int ab_readcount;
    private int ab_like;
    private int ab_dislike;
    // @JsonFormat(pattern = "yyyy-MM-dd HH:mm",timezone = "Asia/Seoul")
    private Timestamp ab_writeday;
    private int ai_idx;

    public static AcademyBoardDto toAcademyBoardDto(AcademyBoardEntity entity){

        return AcademyBoardDto.builder()
            .ab_idx(entity.getABidx())
            .m_idx(entity.getMIdx())
            .ab_subject(entity.getABsubject())
            .ab_content(entity.getABcontent())
            .ab_photo(entity.getABphoto())
            .ab_readcount(entity.getABreadcount())
            .ab_like(entity.getABlike())
            .ab_dislike(entity.getABdislike())
            .ab_writeday(entity.getABwriteday())
            .ai_idx(entity.getAIidx())
            .build();
    }
}



