package data.dto;

import data.entity.FreeBoardEntity;
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
@Alias("FreeBoardDto")
public class FreeBoardDto {
    private int m_idx;
    private int fb_idx;
    private String fb_subject;
    private String fb_content;
    private String fb_photo;
    private int fb_readcount;
    private int fb_like;
    private int fb_dislike;
    private Timestamp fb_writeday;

    public static FreeBoardDto toFreeBoardDto(FreeBoardEntity entity) {
        return FreeBoardDto.builder()
                .fb_idx(entity.getFBidx())
                .m_idx(entity.getMIdx())
                .fb_subject(entity.getFBsubject())
                .fb_content(entity.getFBcontent())
                .fb_photo(entity.getFBphoto())
                .fb_readcount(entity.getFBreadCount())
                .fb_like(entity.getFBlikeCount())
                .fb_dislike(entity.getFBdislikeCount())
                .fb_writeday(entity.getFBwriteDay())
                .build();
    }
}
