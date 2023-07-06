package data.dto;

import data.entity.MemberEntity;
import lombok.*;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class MemberDto {
    private int m_idx;
    private String m_id;
    private String m_email;
    private String m_pass;
    private int m_state;
    private String m_tele;
    private int ai_idx;
    private String m_name;
    private String m_nickname;
    private String m_photo;
    private int m_point;
    private String m_filename;
    private int m_new;
    private String ai_name;
    private String salt;
    private int m_type;
    private Timestamp m_date;

    public static MemberDto toMemberDto(MemberEntity entity){
        return MemberDto.builder()
                .m_name(entity.getMName())
                .m_id(entity.getMId())
                .m_email(entity.getMEmail())
                .m_pass(entity.getMPass())
                .m_state(entity.getMState())
                .m_tele(entity.getMTele())
                .ai_idx(entity.getAIidx())
                .m_nickname(entity.getMNickname())
                .m_photo(entity.getMPhoto())
                .m_point(entity.getMPoint())
                .m_filename(entity.getMFilename())
                .m_new(entity.getMNew())
                .ai_name(entity.getAIname())
                .salt(entity.getSalt())
                .m_type(entity.getMType())
                .m_date(entity.getMDate())
                .build();
    }
}
