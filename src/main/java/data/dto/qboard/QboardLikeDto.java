package data.dto.qboard;

import data.entity.QboardLikeEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class QboardLikeDto {
    private int qb_like_idx;
    private int m_idx;
    private int qb_idx;
    private int likestatus;

    public static QboardLikeDto toQboardlikeDto(QboardLikeEntity entity){

        return QboardLikeDto.builder()
                .qb_like_idx(entity.getQBlikeidx())
                .m_idx(entity.getMIdx())
                .qb_idx(entity.getQBidx())
                .likestatus(entity.getLikestatus())
                .build();
    }
}
