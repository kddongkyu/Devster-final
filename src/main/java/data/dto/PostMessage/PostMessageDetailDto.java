package data.dto.PostMessage;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class PostMessageDetailDto {
    private int mes_idx;
    private String subject;
    private String content;
    private String send_nick;
    private String send_nick_photo;
    private Timestamp send_time;
}
