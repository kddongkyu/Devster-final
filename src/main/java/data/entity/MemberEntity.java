package data.entity;

import data.dto.MemberDto;
import jwt.setting.config.Role;
import jwt.setting.config.SocialType;
import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;

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

    @Column(name = "m_socialid")
    private String MSocialid;

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

    @Column(name = "m_filename")
    private String MFilename;

    @Column(name = "ai_name")
    private String AIname;

    private String salt;

    @Column(name = "m_refreshtoken")
    private String MRefreshtoken;

    @Column(name = "m_type")
    private int MType;

    @Column(name = "m_date", insertable = false)
    private Timestamp MDate;

    @Enumerated(EnumType.STRING)
    private Role MRole;

    @Enumerated(EnumType.STRING)
    private SocialType MSocialType;

    public void authorizeUser() {
        this.MRole = Role.USER;
    }

    public void passwordEncode(PasswordEncoder passwordEncoder) {
        this.MPass = passwordEncoder.encode(this.MPass);
    }

    public void updateNickname(String updateNickname) {
        this.MNickname = updateNickname;
    }

    public void updatePassword(String updatePassword, PasswordEncoder passwordEncoder) {
        this.MPass = passwordEncoder.encode(updatePassword);
    }

    public void updateRefreshToken(String updateRefreshToken) {
        this.MRefreshtoken = updateRefreshToken;
    }

    public static MemberEntity toMemberEntity(MemberDto dto){
        return MemberEntity.builder()
                .MName(dto.getM_name())
                .MId(dto.getM_id())
                .MSocialid(dto.getM_socialid())
                .MEmail(dto.getM_email())
                .MPass(dto.getM_pass())
                .MTele(dto.getM_tele())
                .AIidx(dto.getAi_idx())
                .MNickname(dto.getM_nickname())
                .MPhoto(dto.getM_photo())
                .MFilename(dto.getM_filename())
                .AIname(dto.getAi_name())
                .salt(dto.getSalt())
                .MRefreshtoken(dto.getM_refreshtoken())
                .MDate(dto.getM_date())
                .MRole(dto.getM_role())
                .MSocialType(dto.getM_socialtype())
                .build();
    }
}
