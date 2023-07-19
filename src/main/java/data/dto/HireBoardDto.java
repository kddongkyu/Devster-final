package data.dto;

import java.sql.Timestamp;

import org.apache.ibatis.type.Alias;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data
@Alias("HireBoardDto")
public class HireBoardDto {
	private int cm_idx;
    private int hb_idx;
    private String hb_subject;
    private String hb_content;
    private String hb_photo;
    private int hb_readcount;
    @JsonFormat(pattern = "yyyy-MM-dd HH:mm",timezone = "Asia/Seoul")
    private Timestamp hb_writeday;
}
