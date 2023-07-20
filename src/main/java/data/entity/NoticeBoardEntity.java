package data.entity;

import java.sql.Timestamp;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import data.dto.NoticeBoardDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Entity(name = "noticeboard")
@Builder
public class NoticeBoardEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "nb_idx")
    private int NBidx;

    @Column(name = "m_state")
    private int MState;
    
    @Column(name = "nb_subject")
    private String NBsubject;

    @Column(name = "nb_content")
    private String NBcontent;

    @Column(name = "nb_photo")
    private String NBphoto;

    @Column(name = "nb_readcount")
    private int NBreadcount;

    @Column(name = "nb_writeday")
    private Timestamp NBwriteday;

    public static NoticeBoardEntity toNoticeBoardEntity(NoticeBoardDto dto){
        return NoticeBoardEntity.builder()
            .NBidx(dto.getNb_idx())
            .MState(dto.getM_state())
            .NBsubject(dto.getNb_subject())
            .NBcontent(dto.getNb_content())
            .NBphoto(dto.getNb_photo())
            .NBreadcount(dto.getNb_readcount())
            .NBwriteday(dto.getNb_writeday())
            .build();
    }
}
