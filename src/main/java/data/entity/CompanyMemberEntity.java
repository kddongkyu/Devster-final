package data.entity;

import data.dto.CompanyMemberDto;
import jwt.setting.config.Role;
import lombok.*;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.sql.Timestamp;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Entity(name = "companymember")
@Builder
public class CompanyMemberEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cm_idx")
    private int CMidx;

    @Column(name = "cm_email")
    private String CMemail;

    @Column(name = "cm_pass")
    private String CMpass;

    @Column(name = "cm_tele")
    private String CMtele;

    @Column(name = "cm_addr")
    private String CMaddr;

    @Column(name = "cm_compname")
    private String CMcompname;

    @Column(name = "cm_filename", insertable = false)
    private String CMfilename;

    @Enumerated(EnumType.STRING)
    @Column(name = "cm_role", insertable = false)
    private Role CMrole;

    @Column(name = "cm_post")
    private String CMpost;

    @Column(name = "cm_refreshtoken")
    private String CMrefreshtoken;

    @Column(name = "cm_name")
    private String CMname;

    @Column(name = "cm_cp")
    private String CMcp;

    @Column(name = "cm_date", insertable = false)
    private Timestamp CMdate;

    @Column(name = "cm_reg")
    private String CMreg;

    public void authorizeUser() {
        this.CMrole = Role.USER;
    }

    public void passwordEncode(PasswordEncoder passwordEncoder) {
        this.CMpass = passwordEncoder.encode(this.CMpass);
    }

    public void updatePassword(String updatePassword, PasswordEncoder passwordEncoder) {
        this.CMpass = passwordEncoder.encode(updatePassword);
    }

    public void updateRefreshToken(String updateRefreshToken) {
        this.CMrefreshtoken = updateRefreshToken;
    }


    public static CompanyMemberEntity toCompanyMemberEntity(CompanyMemberDto dto){
        return CompanyMemberEntity.builder()
                .CMidx(dto.getCm_idx())
                .CMemail(dto.getCm_email())
                .CMpass(dto.getCm_pass())
                .CMtele(dto.getCm_tele())
                .CMaddr(dto.getCm_addr())
                .CMcompname(dto.getCm_compname())
                .CMfilename(dto.getCm_filename())
                .CMpost(dto.getCm_post())
                .CMname(dto.getCm_name())
                .CMcp(dto.getCm_cp())
                .CMdate(dto.getCm_date())
                .CMreg(dto.getCm_reg())
                .build();
    }

}
