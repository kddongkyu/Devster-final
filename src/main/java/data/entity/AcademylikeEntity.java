package data.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import data.dto.AcademylikeDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Entity(name = "academy_like")
@Builder
public class AcademylikeEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ab_like_idx")
    private int ABlikeidx;

    @Column(name="m_idx")
    private int MIdx;

    @Column(name="ab_idx")
    private int ABidx;

    @Column(name="likestatus")
    private int likestatus;

    public AcademylikeEntity(int ABidx, int MIdx){
        this.ABidx = ABidx;
        this.MIdx = MIdx;
        this.likestatus = likestatus;
    }


    public AcademylikeEntity toAcademylikeEntity(AcademylikeDto dto){

        return AcademylikeEntity.builder()
            .ABlikeidx(dto.getAb_like_idx())
            .MIdx(dto.getM_idx())
            .ABidx(dto.getAb_idx())
            .likestatus(dto.getLikestatus())
            .build();
    }
}

