package data.dto;

import data.entity.ReviewCommentEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class ReviewCommentDto {
    private int rbc_idx;
    private int rb_idx;
    private int m_idx;
    private String rbc_content;
    private Timestamp rbc_writeday;
    private int rbc_ref;
    //  private int rbc_like;
   // private int rbc_dislike;

    public static ReviewCommentDto toReviewCommentDto(ReviewCommentEntity entity){

        return ReviewCommentDto.builder()
                .rbc_idx(entity.getRBcidx())
                .rb_idx(entity.getRBidx())
                .m_idx(entity.getMIdx())
                .rbc_content(entity.getRBccontent())
                // .rbc_like(entity.getRBclike())
                .rbc_writeday(entity.getRBcwriteday())
                .rbc_ref(entity.getRBcref())
            //    .rbc_dislike(entity.getRBcdislike())
                .build();
    }
}
