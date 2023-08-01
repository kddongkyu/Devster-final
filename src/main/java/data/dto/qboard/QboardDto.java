package data.dto.qboard;

import data.entity.QboardEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.sql.Timestamp;

import org.apache.ibatis.type.Alias;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@Alias("QboardDto")
public class QboardDto {
    private int m_idx;
    private int qb_idx;
    private String qb_subject;
    private String qb_content;
    private String qb_photo;
    private int qb_readcount;
    private int qb_like;
    private int qb_dislike;
    private Timestamp qb_writeday;

    public static QboardDto toQboardDto(QboardEntity entity) {
        return QboardDto.builder()
                .qb_idx(entity.getQBidx())
                .m_idx(entity.getMIdx())
                .qb_subject(entity.getQBsubject())
                .qb_content(entity.getQBcontent())
                .qb_photo(entity.getQBphoto())
                .qb_readcount(entity.getQBreadCount())
                .qb_like(entity.getQBlikeCount())
                .qb_dislike(entity.getQBdislikeCount())
                .qb_writeday(entity.getQBwriteDay())
                .build();
    }
}
