package data.entity;

import data.dto.ReviewCommentlikeDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Entity(name = "rboard_comment_like")
@Builder
public class ReviewCommentlikeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rbc_like_idx")
    private int RBclikeidx;

    @Column(name = "m_idx")
    private int MIdx;

    @Column(name = "rbc_idx")
    private int RBcidx;

    @Column(name = "likestatus")
    private int likestatus;

    public ReviewCommentlikeEntity(int MIdx, int RBcidx) {
        this.MIdx = MIdx;
        this.RBcidx = RBcidx;
        this.likestatus = likestatus; // 혹은 기본 likeStatus
    }

    public static ReviewCommentlikeEntity toReviewCommentlikeEntity(ReviewCommentlikeDto dto){

        return ReviewCommentlikeEntity.builder()
                .RBclikeidx(dto.getRbc_like_idx())
                .MIdx(dto.getM_idx())
                .RBcidx(dto.getRbc_idx())
                .likestatus(dto.getLikestatus())
                .build();
    }
}
