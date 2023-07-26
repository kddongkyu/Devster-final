package data.dto;

import data.entity.ReviewCommentlikeEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class ReviewCommentlikeDto {

    private int rbc_like_idx;
    private int m_idx;
    private int rbc_idx;
    private int likestatus;

    public static ReviewCommentlikeDto toReviewCommentlikeEntity(ReviewCommentlikeEntity entity){

        return ReviewCommentlikeDto.builder()
                .rbc_like_idx(entity.getRBclikeidx())
                .m_idx(entity.getMIdx())
                .rbc_idx(entity.getRBcidx())
                .likestatus(entity.getLikestatus())
                .build();
    }
}
