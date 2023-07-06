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
    @Column(name = "m_idx")
    private int MIdx;

    @Column(name = "m_id")
    private String MId;

    @Column(name = "m_name")
    private String MName;

    @Column(name = "m_email")
    private String MEmail;

    @Column(name = "m_pass")
    private String MPass;

    @Column(name = "m_state", insertable = false)
    private int MState;

    @Column(name = "m_tele")
    private String MTele;

    @Column(name = "ai_idx")
    private int AIidx;

    @Column(name = "m_nickname")
    private String MNickname;

    @Column(name = "m_photo")
    private String MPhoto;

    @Column(name = "m_point",insertable = false)
    private int MPoint;

    @Column(name = "m_filename")
    private String MFilename;

    @Column(name = "m_new", insertable = false)
    private int MNew;

    @Column(name = "ai_name")
    private String AIname;

    private String salt;

    @Column(name = "m_type")
    private int MType;

    @Column(name = "m_date", insertable = false)
    private Timestamp MDate;

    public static MemberEntity toMemberEntity(MemberDto dto){
        return MemberEntity.builder()
                .MName(dto.getM_name())
                .MId(dto.getM_id())
                .MEmail(dto.getM_email())
                .MPass(dto.getM_pass())
                .MState(dto.getM_state())
                .MTele(dto.getM_tele())
                .AIidx(dto.getAi_idx())
                .MNickname(dto.getM_nickname())
                .MPhoto(dto.getM_photo())
                .MPoint(dto.getM_point())
                .MFilename(dto.getM_filename())
                .MNew(dto.getM_new())
                .AIname(dto.getAi_name())
                .salt(dto.getSalt())
                .MType(dto.getM_type())
                .MDate(dto.getM_date())
                .build();
    }
}
