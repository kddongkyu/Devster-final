package data.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
<<<<<<< HEAD

=======
>>>>>>> de597ed6408fe72a57157fb99b665c5c74e24fc7
import java.sql.Timestamp;
import org.apache.ibatis.type.Alias;
import com.fasterxml.jackson.annotation.JsonFormat;
<<<<<<< HEAD

=======
>>>>>>> de597ed6408fe72a57157fb99b665c5c74e24fc7
import data.entity.HireBoardEntity;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class HireBoardDto {
    private int cm_idx;
    private int hb_idx;
    private String hb_subject;
    private String hb_content;
    private String hb_photo;
    private int hb_readcount;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm",timezone = "Asia/Seoul")
    private Timestamp hb_writeday;

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
<<<<<<< HEAD
}

=======
}
>>>>>>> de597ed6408fe72a57157fb99b665c5c74e24fc7
