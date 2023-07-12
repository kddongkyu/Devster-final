package data.entity;

import data.dto.FreeBoardDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Entity(name = "freeboard")
@Builder
public class FreeBoardEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "fb_idx")
    private int FBidx;

    @Column(name = "m_idx")
    private int MIdx;

    @Column(name = "fb_subject")
    private String FBsubject;

    @Column(name = "fb_content")
    private String FBcontent;

    @Column(name = "fb_photo")
    private String FBphoto;

    @Column(name = "fb_readcount")
    private int FBreadCount;

    @Column(name = "fb_like")
    private int FBlikeCount;

    @Column(name = "fb_dislike")
    private int FBdislikeCount;

    @Column(name = "fb_writeday")
    private Timestamp FBwriteDay;

    public static FreeBoardEntity toFreeBoardEntity(FreeBoardDto dto) {
        return FreeBoardEntity.builder()
                .FBidx(dto.getFb_idx())
                .MIdx(dto.getM_idx())
                .FBsubject(dto.getFb_subject())
                .FBcontent(dto.getFb_content())
                .FBphoto(dto.getFb_photo())
                .FBreadCount(dto.getFb_readcount())
                .FBlikeCount(dto.getFb_like())
                .FBdislikeCount(dto.getFb_dislike())
                .FBwriteDay(dto.getFb_writeday())
                .build();
    }
}
