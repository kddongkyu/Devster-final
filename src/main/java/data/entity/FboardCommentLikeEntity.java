package data.entity;

import data.dto.fboard.FboardCommentLikeDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Entity(name = "fboard_comment_like")
@Builder
public class FboardCommentLikeEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fbc_like_idx")
    private int FBclikeidx;

    @Column(name = "m_idx")
    private int MIdx;

    @Column(name = "fbc_idx")
    private int FBcidx;

    @Column(name = "likestatus")
    private int likestatus;

    public FboardCommentLikeEntity(int MIdx, int FBcidx) {
        this.MIdx = MIdx;
        this.FBcidx = FBcidx;
        this.likestatus = likestatus;
    }

    public static FboardCommentLikeEntity toFboardCommentLikeEntity(FboardCommentLikeDto dto) {
        return  FboardCommentLikeEntity.builder()
                .FBclikeidx(dto.getFbc_like_idx())
                .MIdx(dto.getM_idx())
                .FBcidx(dto.getFbc_idx())
                .likestatus(dto.getLikestatus())
                .build();
    }


}
