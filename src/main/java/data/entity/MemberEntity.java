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

    @Column(name = "ai_idx")
    private int AIidx;

    @Column(name = "m_nickname")
    private String MNickname;

    @Column(name = "m_photo", insertable = false)
    private String MPhoto;

    @Column(name = "m_filename", insertable = false)
    private String MFilename;

    @Column(name = "ai_name")
    private String AIname;

    @Column(name = "m_refreshtoken")
    private String MRefreshtoken;

    @Column(name = "m_date", insertable = false)
    private Timestamp MDate;

    @Enumerated(EnumType.STRING)
    @Column(name = "m_role", insertable = false)
    private Role MRole;

    @Enumerated(EnumType.STRING)
    @Column(name = "m_socialtype")
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
                .AIidx(dto.getAi_idx())
                .MNickname(dto.getM_nickname())
                .MPhoto(dto.getM_photo())
                .MFilename(dto.getM_filename())
                .AIname(dto.getAi_name())
                .MRefreshtoken(dto.getM_refreshtoken())
                .MDate(dto.getM_date())
                .MRole(dto.getM_role())
                .MSocialType(dto.getM_socialtype())
                .build();
    }
}
