package data.entity;

import data.dto.CompanyMemberDto;
import lombok.*;

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

    @Column(name = "cm_new")
    private int CMnew;

    @Column(name = "cm_post")
    private String CMpost;

    @Column(name = "cm_name")
    private String CMname;

    @Column(name = "cm_cp")
    private String CMcp;

    private String salt;

    @Column(name = "cm_date", insertable = false)
    private Timestamp CMdate;

    @Column(name = "cm_reg")
    private String CMreg;

    public static CompanyMemberEntity toCompanyMemberEntity(CompanyMemberDto dto){
        return CompanyMemberEntity.builder()
                .CMidx(dto.getCm_idx())
                .CMemail(dto.getCm_email())
                .CMpass(dto.getCm_pass())
                .CMtele(dto.getCm_tele())
                .CMaddr(dto.getCm_addr())
                .CMcompname(dto.getCm_compname())
                .CMfilename(dto.getCm_filename())
                .CMnew(dto.getCm_new())
                .CMpost(dto.getCm_post())
                .CMname(dto.getCm_name())
                .CMcp(dto.getCm_cp())
                .salt(dto.getSalt())
                .CMdate(dto.getCm_date())
                .CMreg(dto.getCm_reg())
                .build();
    }

}
