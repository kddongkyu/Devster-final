package data.dto;

import data.entity.ReviewlikeEntity;
import lombok.*;


@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class ReviewlikeDto {

    private int rb_like_idx;
    private int m_idx;
    private int rb_idx;
    private int likestatus;

    public static ReviewlikeDto torReviewlikeEntity(ReviewlikeEntity entity){

        return ReviewlikeDto.builder()
                .rb_like_idx(entity.getRBlikeidx())
                .m_idx(entity.getMIdx())
                .rb_idx(entity.getRBidx())
                .likestatus(entity.getLikestatus())
                .build();
    }
}
