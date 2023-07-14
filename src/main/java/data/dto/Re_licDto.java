package data.dto;

import java.sql.Timestamp;

import org.apache.ibatis.type.Alias;

import lombok.Data;

@Data
@Alias("re_licDto")
public class Re_licDto {
	private int m_idx;
    private int relic_idx;
    private Timestamp r_licdate;
    private String   r_licname;
}
