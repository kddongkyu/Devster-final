package data.entity;

import data.dto.QboardDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Entity(name = "qboard")
@Builder
public class QboardEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "qb_idx")
    private int QBidx;

    @Column(name = "m_idx")
    private int MIdx;

    @Column(name = "qb_subject")
    private String QBsubject;

    @Column(name = "qb_content")
    private String QBcontent;

    @Column(name = "qb_photo")
    private String QBphoto;

    @Column(name = "qb_readcount")
    private int QBreadCount;

    @Column(name = "qb_like")
    private int QBlikeCount;

    @Column(name = "qb_dislike")
    private int QBdislikeCount;

    @Column(name = "qb_writeday", insertable = false)
    private Timestamp QBwriteDay;

    public static QboardEntity toQboardEntity(QboardDto dto) {
        return QboardEntity.builder()
                .QBidx(dto.getQb_idx())
                .MIdx(dto.getM_idx())
                .QBsubject(dto.getQb_subject())
                .QBcontent(dto.getQb_content())
                .QBphoto(dto.getQb_photo())
                .QBreadCount(dto.getQb_readcount())
                .QBlikeCount(dto.getQb_like())
                .QBdislikeCount(dto.getQb_dislike())
                .QBwriteDay(dto.getQb_writeday())
                .build();
    }
}
