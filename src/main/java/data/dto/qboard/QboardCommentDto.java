package data.dto.qboard;

import data.entity.QboardCommentEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class QboardCommentDto {

    private int qbc_idx;
    private int qb_idx;
    private int m_idx;
    private String qbc_content;
    private Timestamp qbc_writeday;
    private int qbc_ref;

    public static QboardCommentDto toQboardCommentDto(QboardCommentEntity entity) {

        return QboardCommentDto.builder()
                .qbc_idx(entity.getQBcidx())
                .qb_idx(entity.getQBidx())
                .m_idx(entity.getMIdx())
                .qbc_content(entity.getQBccontent())
                .qbc_writeday(entity.getQBcwriteday())
                .qbc_ref(entity.getQBcref())
                .build();
    }
}



