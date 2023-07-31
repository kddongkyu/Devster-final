package data.dto.fboard;

import data.entity.FreeBoardLikeEntity;
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
