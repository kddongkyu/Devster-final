package data.dto;

import java.sql.Timestamp;

import org.apache.ibatis.type.Alias;

import lombok.Data;
import lombok.ToString;

@Data
@Alias("re_carDto")
@ToString
public class Re_carDto {
	private Timestamp r_carstartdate;
    private Timestamp r_carenddate;
    private String r_company;
    private String r_department;
    private String r_position;
    private int m_idx;
    private int recar_idx;
}
