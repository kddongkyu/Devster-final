package data.entity;

import data.dto.MemberDto;
import lombok.*;

import javax.persistence.*;
import java.sql.Timestamp;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Entity(name = "member")
@Builder
public class MemberEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int m_idx;

    private String m_name;
    private String m_email;
    private String m_pass;
    @Column(insertable = false)
    private int m_state;
    private String m_tele;
    private int ai_idx;
    private String m_nickname;
    private String m_photo;
    @Column(insertable = false)
    private int m_point;
    private String m_filename;
    @Column(insertable = false)
    private int m_new;
    private String ai_name;
    private String salt;
    private int m_type;
    @Column(insertable = false)
    private Timestamp m_date;

    public static MemberEntity toMemberEntity(MemberDto dto){
        return MemberEntity.builder()
                .m_name(dto.getM_name())
                .m_email(dto.getM_email())
                .m_pass(dto.getM_pass())
                .m_state(dto.getM_state())
                .m_tele(dto.getM_tele())
                .ai_idx(dto.getAi_idx())
                .m_nickname(dto.getM_nickname())
                .m_photo(dto.getM_photo())
                .m_point(dto.getM_point())
                .m_filename(dto.getM_filename())
                .m_new(dto.getM_new())
                .ai_name(dto.getAi_name())
                .salt(dto.getSalt())
                .m_type(dto.getM_type())
                .m_date(dto.getM_date())
                .build();
    }
}
