package data.dto.fboard;

import data.entity.FboardCommentLikeEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class FboardCommentLikeDto {
    private int fbc_like_idx;
    private int m_idx;
    private int fbc_idx;
    private int likestatus;

    public static FboardCommentLikeDto toFboardCommentLikeEntity (FboardCommentLikeEntity entity) {
        return FboardCommentLikeDto.builder()
                .fbc_like_idx(entity.getFBclikeidx())
                .m_idx(entity.getMIdx())
                .fbc_idx(entity.getFBcidx())
                .likestatus(entity.getLikestatus())
                .build();
    }
}
