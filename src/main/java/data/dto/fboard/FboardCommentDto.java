package data.dto.fboard;

import data.entity.FboardCommentEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class FboardCommentDto {
    private int fbc_idx;
    private int fb_idx;
    private int m_idx;
    private String fbc_content;
    private Timestamp fbc_writeday;
    private int fbc_ref;
    private int fbc_like;
    private int fbc_dislike;

    public static FboardCommentDto toFboardCommentDto(FboardCommentEntity entity){
        return FboardCommentDto.builder()
                .fbc_idx(entity.getFBcidx())
                .fb_idx(entity.getFBidx())
                .m_idx(entity.getMIdx())
                .fbc_content(entity.getFBccontent())
                .fbc_like(entity.getFBclike())
                .fbc_dislike(entity.getFBcdislike())
                .fbc_writeday(entity.getFBcwriteday())
                .fbc_ref(entity.getFBcref())
                .build();
    }
}
