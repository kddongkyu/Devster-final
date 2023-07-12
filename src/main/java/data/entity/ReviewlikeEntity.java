package data.entity;

import data.dto.ReviewlikeDto;
import lombok.*;
import javax.persistence.*;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Entity(name = "rboard_like")
@Builder
public class ReviewlikeEntity {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rb_like_idx")
    private int RBlikeidx;

    @Column(name = "m_idx")
    private int MIdx;

    @Column(name = "rb_idx")
    private int RBidx;

    @Column(name = "likestatus")
    private int likestatus;

    public ReviewlikeEntity(int MIdx, int RBidx) {
        this.MIdx = MIdx;
        this.RBidx = RBidx;
        this.likestatus = likestatus; // 혹은 기본 likeStatus
    }

    public static ReviewlikeEntity toReviewlikeEntity(ReviewlikeDto dto){

        return ReviewlikeEntity.builder()
                .RBlikeidx(dto.getRb_like_idx())
                .MIdx(dto.getM_idx())
                .RBidx(dto.getRb_idx())
                .likestatus(dto.getLikestatus())
                .build();
    }


}
