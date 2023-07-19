package data.entity;
import javax.persistence.*;

import data.dto.AcademyBoardDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.sql.Timestamp;


@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Entity(name = "academyboard")
@Builder
public class AcademyBoardEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ab_idx")
    private int ABidx;
    @Column(name = "m_idx")
    private int MIdx;
    @Column(name = "ab_subject")
    private String ABsubject;
    @Column(name = "ab_content")
    private String ABcontent;
    @Column(name = "ab_photo")
    private String ABphoto;
    @Column(name = "ab_readcount",insertable = false)
    private int ABreadcount;
    @Column(name = "ab_like")
    private int ABlike;
    @Column(name = "ab_dislike")
    private int ABdislike;
    @Column(name = "ab_writeday",insertable = false)
    private Timestamp ABwriteday;
    @Column(name = "ai_idx")
    private int AIidx;

    public static AcademyBoardEntity toAcademyBoardEntity(AcademyBoardDto dto){
        return AcademyBoardEntity.builder()
            .ABidx(dto.getAb_idx())
            .MIdx(dto.getM_idx())
            .ABsubject(dto.getAb_subject())
            .ABcontent(dto.getAb_content())
            .ABphoto(dto.getAb_photo())
            .ABreadcount(dto.getAb_readcount())
            .ABlike(dto.getAb_like())
            .ABdislike(dto.getAb_dislike())
            .ABwriteday(dto.getAb_writeday())
            .ABidx(dto.getAi_idx())
            .build();
    }
}