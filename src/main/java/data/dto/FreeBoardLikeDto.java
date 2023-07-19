package data.dto;

import data.entity.FreeBoardEntity;
import data.entity.FreeBoardLikeEntity;
import data.entity.ReviewlikeEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class FreeBoardLikeDto {
    private int fb_like_idx;
    private int m_idx;
    private int fb_idx;
    private int likestatus;

    public static FreeBoardLikeDto toFboardlikeDto(FreeBoardLikeEntity entity){

        return FreeBoardLikeDto.builder()
                .fb_like_idx(entity.getFBlikeidx())
                .m_idx(entity.getMIdx())
                .fb_idx(entity.getFBidx())
                .likestatus(entity.getLikestatus())
                .build();
    }
}
