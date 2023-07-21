package data.entity;

import data.dto.QboardLikeDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Entity(name = "qboard_like")
@Builder
public class QboardLikeEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "qb_like_idx")
    private int QBlikeidx;

    @Column(name = "m_idx")
    private int MIdx;

    @Column(name = "qb_idx")
    private int QBidx;

    @Column(name = "likestatus")
    private int likestatus;

    public  QboardLikeEntity(int MIdx, int QBidx) {
        this.MIdx = MIdx;
        this.QBidx = QBidx;
        this.likestatus = likestatus;
    }

    public static QboardLikeEntity toQboardLikelikeEntity(QboardLikeDto dto){

        return QboardLikeEntity.builder()
                .QBlikeidx(dto.getQb_like_idx())
                .MIdx(dto.getM_idx())
                .QBidx(dto.getQb_idx())
                .likestatus(dto.getLikestatus())
                .build();
    }
}
