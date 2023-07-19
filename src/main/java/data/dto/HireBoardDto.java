package data.dto;

<<<<<<< HEAD
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

=======
>>>>>>> a5b8dd57d05ab43c0dbad67e9314cac840d9062f
import java.sql.Timestamp;

import org.apache.ibatis.type.Alias;

import com.fasterxml.jackson.annotation.JsonFormat;

<<<<<<< HEAD
import data.entity.HireBoardEntity;

@Data
@Alias("HireBoardDto")
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HireBoardDto {
    private int cm_idx;
=======
import lombok.Data;

@Data
@Alias("HireBoardDto")
public class HireBoardDto {
	private int cm_idx;
>>>>>>> a5b8dd57d05ab43c0dbad67e9314cac840d9062f
    private int hb_idx;
    private String hb_subject;
    private String hb_content;
    private String hb_photo;
    private int hb_readcount;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm",timezone = "Asia/Seoul")
    private Timestamp hb_writeday;
<<<<<<< HEAD

    public static HireBoardDto toHireBoardDto(HireBoardEntity entity){
        return HireBoardDto.builder()
            .hb_subject(entity.getHBsubject())
            .hb_content(entity.getHBcontent())
            .hb_photo(entity.getHBphoto())
            .hb_readcount(entity.getHBreadcount())
            .hb_writeday(entity.getHBwriteday())
            .hb_idx(entity.getHBidx())
            .cm_idx(entity.getCMidx())
            .build();
    }
}

=======
}
>>>>>>> a5b8dd57d05ab43c0dbad67e9314cac840d9062f
