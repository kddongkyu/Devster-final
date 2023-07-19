package data.entity;

import javax.persistence.*;

import data.dto.HireBookmarkDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@AllArgsConstructor
@Data
@RequiredArgsConstructor
@Entity(name = "hirebookmark")
@Builder
public class HireBookmarkEntity {



    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "hb_bmk_idx")
    private int HBbmkidx;

    @Column(name = "m_idx")
    private int MIdx;

    @Column(name = "hb_idx")
    private int HBidx;

    @Column(name = "bkmk", insertable = false)
    private int Bkmk;


    public HireBookmarkEntity(int HBidx,int MIdx){
        this.HBidx = HBidx;
        this.MIdx = MIdx;
        this.Bkmk = Bkmk;
    }


    public static HireBookmarkEntity toHireBookmarkEntity(HireBookmarkDto dto){
        return HireBookmarkEntity.builder()
            .MIdx(dto.getM_idx())
            .HBidx(dto.getHb_idx())
            .Bkmk(dto.getBkmk())
            .build();
    }

}

