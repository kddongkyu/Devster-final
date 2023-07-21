package data.entity;

import data.dto.qboard.QboardCommentDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Entity(name = "qboardcomment")
@Builder
public class QboardCommentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "qbc_idx")
    private int QBcidx;

    @Column(name="qb_idx")
    private int QBidx;

    @Column(name="m_idx")
    private int MIdx;

    @Column(name="qbc_content")
    private String QBccontent;

    @Column(name="qbc_writeday",insertable = false)
    private Timestamp QBcwriteday;

    @Column(name="qbc_ref")
    private int QBcref;

    public static QboardCommentEntity toQboardCommentEntity(QboardCommentDto dto){
        return QboardCommentEntity.builder()
                .QBcidx(dto.getQbc_idx())
                .QBidx(dto.getQb_idx())
                .MIdx(dto.getM_idx())
                .QBccontent(dto.getQbc_content())
                .QBcwriteday(dto.getQbc_writeday())
                .QBcref(dto.getQbc_ref())
                .build();
    }
}
