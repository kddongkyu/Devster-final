package data.dto;

import data.entity.AcademylikeEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class AcademylikeDto {
    
    private int ab_like_idx;
    private int m_idx;
    private int ab_idx;
    private int likestatus;

    public static AcademylikeDto toAcademylikeDto(AcademylikeEntity entity){

        return AcademylikeDto.builder()
        .ab_like_idx(entity.getABlikeidx())
        .m_idx(entity.getMIdx())
        .ab_idx(entity.getABidx())
        .likestatus(entity.getLikestatus())
        .build();
    }
}

