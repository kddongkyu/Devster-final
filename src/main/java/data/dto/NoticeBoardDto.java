package data.dto;

import java.sql.Timestamp;

import data.entity.NoticeBoardEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class NoticeBoardDto {
    private int nb_idx; //pk
    private String nb_subject;
    private String nb_content;
    private String nb_photo;
    private int nb_readcount;
    private Timestamp nb_writeday;

    public static NoticeBoardDto toNoticeBoardDto(NoticeBoardEntity entity) {
        return NoticeBoardDto.builder()
                .nb_idx(entity.getNBidx())
                .nb_subject(entity.getNBsubject())
                .nb_content(entity.getNBcontent())
                .nb_photo(entity.getNBphoto())
                .nb_readcount(entity.getNBreadcount())
                .nb_writeday(entity.getNBwriteday())
                .build();
    }
}
