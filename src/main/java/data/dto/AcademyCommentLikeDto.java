package data.dto;

import data.entity.AcademyCommentLikeEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class AcademyCommentLikeDto {
    
    private int abc_like_idx;
    private int m_idx;
    private int abc_idx;
    private int likestatus;
    private int ab_idx;

    public static AcademyCommentLikeDto toAcademyCommentLikeDto(AcademyCommentLikeEntity entity){

        return AcademyCommentLikeDto.builder()
        .abc_like_idx(entity.getABclikeidx())
        .m_idx(entity.getMIdx())
        .abc_idx(entity.getABcidx())
        .likestatus(entity.getLikestatus())
        .ab_idx(entity.getABidx())
        .build();
    }


}
