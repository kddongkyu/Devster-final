package data.dto.PostMessage;

import data.entity.PostMessageEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.sql.Timestamp;

@Data
@Builder
@AllArgsConstructor
@RequiredArgsConstructor
public class PostMessageDto {

    private int mes_idx;
    private String send_nick;
    private String recv_nick;
    private Timestamp send_time;
    private String subject;
    private String content;

    public static PostMessageDto toPostMessageDto(PostMessageEntity entity) {
        return PostMessageDto.builder()
                .mes_idx(entity.getMESidx())
                .send_nick(entity.getSENDnick())
                .recv_nick(entity.getRECVnick())
                .send_time(entity.getSENDtime())
                .content(entity.getContent())
                .subject(entity.getSubject())
                .build();
    }
}
