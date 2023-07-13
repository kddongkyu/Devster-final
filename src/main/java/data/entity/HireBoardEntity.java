package data.entity;

import javax.persistence.*;

import data.dto.HireBoardDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.sql.Timestamp;

@AllArgsConstructor
@Data
@RequiredArgsConstructor
@Entity(name = "hireboard")
@Builder
public class HireBoardEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hb_idx")
    private int HBidx;
    @Column(name = "cm_idx")
    private int CMidx;
    @Column(name = "hb_subject")
    private String HBsubject;
    @Column(name = "hb_content")
    private String HBcontent;
    @Column(name = "hb_photo")
    private String HBphoto;
    @Column(name="hb_readcount",insertable = false)
    private int HBreadcount;
    @Column(name="hb_writeday",insertable = false)
    private Timestamp HBwriteday;

    public static HireBoardEntity toHireBoardEntity(HireBoardDto dto){
        return HireBoardEntity.builder()
            .HBcontent(dto.getHb_content())
            .HBphoto(dto.getHb_photo())
            .HBsubject(dto.getHb_subject())
            .HBwriteday(dto.getHb_writeday())
            .HBreadcount(dto.getHb_readcount())
            .HBidx(dto.getHb_idx())
            .CMidx(dto.getCm_idx())
            .build();
    }
}

