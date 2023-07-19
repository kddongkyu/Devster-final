package data.dto;

import java.sql.Timestamp;
import data.entity.AcademyCommentEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class AcademyCommentDto {
    private int abc_idx;
    private int ab_idx;
    private int m_idx;
    private String abc_content;
    private int abc_like;
    private Timestamp abc_writeday;
    private int abc_ref;

    public static AcademyCommentDto toAcademyCommentDto(AcademyCommentEntity entity){

        return AcademyCommentDto.builder()
        .abc_idx(entity.getABcidx())
        .ab_idx(entity.getABidx())
        .m_idx(entity.getMIdx())
        .abc_content(entity.getABccontent())
        .abc_like(entity.getABclike())
        .abc_writeday(entity.getABcwriteday())
        .abc_ref(entity.getABcref())
        .build();
    }
}


