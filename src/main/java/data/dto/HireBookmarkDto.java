package data.dto;

import data.entity.HireBookmarkEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HireBookmarkDto {
    private int m_idx;
    private int hb_idx;
    private int bkmk;

    public static HireBookmarkDto toHireBookmarkDto(HireBookmarkEntity entity){
        return HireBookmarkDto.builder()
        .m_idx(entity.getMIdx())
        .hb_idx(entity.getHBidx())
        .bkmk(entity.getBkmk())
        .build();
    }
}


