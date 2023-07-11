package data.entity;

import data.dto.ReviewDto;
import lombok.*;

import java.sql.Timestamp;

import javax.persistence.*;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Entity(name = "reviewboard")
@Builder
public class ReviewEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "rb_idx")
    private Integer RBidx;

    @Column(name = "m_idx")
    private Integer MIdx;

    @Column(name = "ci_idx")
    private Integer CIidx;

    @Column(name = "rb_type")
    private Integer RBtype;

    @Column(name = "rb_subject")
    private String RBsubject;

    @Column(name = "rb_content")
    private String RBcontent;

    @Column(name = "rb_like",insertable = false)
    private Integer RBlike ;

    @Column(name = "rb_dislike",insertable = false)
    private Integer RBdislike  ;

    @Column(name = "rb_readcount",insertable = false)
    private Integer RBreadcount ;

    @Column(name = "rb_star")
    private Integer RBstar;

    @Column(name = "rb_writeday",insertable = false)
    private Timestamp RBwriteday;

    public static ReviewEntity toReviewEntity(ReviewDto dto) {

        return ReviewEntity.builder()
                .RBidx(dto.getRb_idx())
                .RBsubject(dto.getRb_subject())
                .RBcontent(dto.getRb_content())
                .RBstar(dto.getRb_star())
                .RBtype(dto.getRb_type())
                .RBlike(dto.getRb_like())
                .RBdislike(dto.getRb_dislike())
                .RBwriteday(dto.getRb_writeday())
                .MIdx(dto.getM_idx())
                .CIidx(dto.getCi_idx())
                .build();
    }

}
