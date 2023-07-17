package data.dto;

import data.entity.ReviewEntity;
import lombok.*;

import java.sql.Timestamp;


@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class ReviewDto {
    private int m_idx;
    private int ci_idx;
    private int rb_idx;
    private int rb_type;
    private String rb_subject;
    private String rb_content;
    private int rb_like;
    private int rb_dislike;
    private int rb_readcount;
    private Integer rb_star;
    private Timestamp rb_writeday;

    public static ReviewDto toReviewDto(ReviewEntity entity) {

        return ReviewDto.builder()
                .rb_idx(entity.getRBidx())
                .rb_subject(entity.getRBsubject())
                .rb_content(entity.getRBcontent())
                .rb_star(entity.getRBstar())
                .rb_type(entity.getRBtype())
                .rb_like(entity.getRBlike())
                .rb_dislike(entity.getRBdislike())
                .rb_writeday(entity.getRBwriteday())
                .rb_readcount(entity.getRBreadcount())
                .m_idx(entity.getMIdx())
                .ci_idx(entity.getCIidx())
                .build();
    }

}
