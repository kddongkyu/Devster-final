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
                .m_name(entity.getM_name())
                .m_email(entity.getM_email())
                .m_pass(entity.getM_pass())
                .m_state(entity.getM_state())
                .m_tele(entity.getM_tele())
                .ai_idx(entity.getAi_idx())
                .m_nickname(entity.getM_nickname())
                .m_photo(entity.getM_photo())
                .m_point(entity.getM_point())
                .m_filename(entity.getM_filename())
                .m_new(entity.getM_new())
                .ai_name(entity.getAi_name())
                .salt(entity.getSalt())
                .m_type(entity.getM_type())
                .m_date(entity.getM_date())
                .build();
    }
}
