package data.entity;

import data.dto.FreeBoardLikeDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Entity(name = "fboard_like")
@Builder
public class FreeBoardLikeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fb_like_idx")
    private int FBlikeidx;

    @Column(name = "m_idx")
    private int MIdx;

    @Column(name = "fb_idx")
    private int FBidx;

    @Column(name = "likestatus")
    private int likestatus;

    public FreeBoardLikeEntity(int MIdx, int FBidx) {
        this.MIdx = MIdx;
        this.FBidx = FBidx;
        this.likestatus = likestatus;
    }

    public static FreeBoardLikeEntity toFreeBoardLikelikeEntity(FreeBoardLikeDto dto){

        return FreeBoardLikeEntity.builder()
                .FBlikeidx(dto.getFb_like_idx())
                .MIdx(dto.getM_idx())
                .FBidx(dto.getFb_idx())
                .likestatus(dto.getLikestatus())
                .build();
    }
}
