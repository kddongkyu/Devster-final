package data.entity;

import data.dto.ReviewCommentDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Entity(name = "reviewcomment")
@Builder
public class ReviewCommentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rbc_idx")
    private int RBcidx;

    @Column(name="rb_idx")
    private int RBidx;

    @Column(name="m_idx")
    private int MIdx;

    @Column(name="rbc_content")
    private String RBccontent;

    @Column(name="rbc_writeday",insertable = false)
    private Timestamp RBcwriteday;

    @Column(name="rbc_ref")
    private int RBcref;

    @Column(name="rbc_dislike")
    private int RBcdislike;

    @Column(name="rbc_like")
    private int RBclike;

    public static ReviewCommentEntity toReviewCommentEntity(ReviewCommentDto dto){
        return ReviewCommentEntity.builder()
                .RBcidx(dto.getRbc_idx())
                .RBidx(dto.getRb_idx())
                .MIdx(dto.getM_idx())
                .RBccontent(dto.getRbc_content())
                .RBclike(dto.getRbc_like())
                .RBcwriteday(dto.getRbc_writeday())
                .RBcref(dto.getRbc_ref())
               .RBcdislike(dto.getRbc_dislike())
                .build();
    }

}
