package data.entity;

import data.dto.PostMessage.PostMessageDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
@Entity(name = "message")
public class PostMessageEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mes_idx")
    private int MESidx;

    @Column(name = "send_nick")
    private String SENDnick;

    @Column(name = "recv_nick")
    private String RECVnick;

    @Column(name = "send_time", insertable = false)
    private Timestamp SENDtime;

    private String content;

    private String subject;

    public static PostMessageEntity toPostMessageEntity(PostMessageDto dto){
        return PostMessageEntity.builder()
                .MESidx(dto.getMes_idx())
                .SENDnick(dto.getSend_nick())
                .RECVnick(dto.getRecv_nick())
                .SENDtime(dto.getSend_time())
                .content(dto.getContent())
                .subject(dto.getSubject())
                .build();
    }
}
