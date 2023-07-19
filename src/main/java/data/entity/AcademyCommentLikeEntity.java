package data.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import data.dto.AcademyCommentLikeDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Entity(name = "aboard_comment_like")
@Builder
public class AcademyCommentLikeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)

    @Column(name = "abc_like_idx")
    private int ABclikeidx;

    @Column(name="m_idx")
    private int MIdx;

    @Column(name="abc_idx")
    private int ABcidx;

    @Column(name="likestatus")
    private int likestatus;

    @Column(name="ab_idx")
    private int ABidx;

    public AcademyCommentLikeEntity(int ABcidx, int MIdx){
        this.ABcidx = ABcidx;
        this.MIdx = MIdx;
        this.likestatus = likestatus;
    }

    public AcademyCommentLikeEntity toAcademyCommentLikeEntity(AcademyCommentLikeDto dto){

        return AcademyCommentLikeEntity.builder()
            .ABclikeidx(dto.getAbc_like_idx())
            .MIdx(dto.getM_idx())
            .ABcidx(dto.getAbc_idx())
            .likestatus(dto.getLikestatus())
            .ABidx(dto.getAb_idx())
            .build();
    }

}
