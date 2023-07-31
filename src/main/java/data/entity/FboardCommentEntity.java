package data.entity;

import data.dto.fboard.FboardCommentDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Entity(name = "freecomment")
@Builder
public class FboardCommentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fbc_idx")
    private int FBcidx;

    @Column(name="FB_idx")
    private int FBidx;

    @Column(name="m_idx")
    private int MIdx;

    @Column(name="fbc_content")
    private String FBccontent;

    @Column(name="fbc_writeday",insertable = false)
    private Timestamp FBcwriteday;

    @Column(name="fbc_ref")
    private int FBcref;

    @Column(name="fbc_dislike")
    private int FBcdislike;

    @Column(name="fbc_like")
    private int FBclike;

    public static FboardCommentEntity toFboardCommentEntity (FboardCommentDto dto) {
        return FboardCommentEntity.builder()
                .FBcidx(dto.getFbc_idx())
                .FBidx(dto.getFb_idx())
                .MIdx(dto.getM_idx())
                .FBccontent(dto.getFbc_content())
                .FBclike(dto.getFbc_like())
                .FBcdislike(dto.getFbc_dislike())
                .FBcref(dto.getFbc_ref())
                .FBcwriteday(dto.getFbc_writeday())
                .build();
    }
}
