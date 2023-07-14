package data.entity;

import data.dto.CompanyInfoDto;
import lombok.*;
import javax.persistence.*;


@Entity(name = "companyinfo")
@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class CompanyInfoEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "ci_idx")
    private int CIidx;

    @Column(name = "ci_name")
    private String CIname;

    @Column(name = "ci_ppl")
    private int CIppl;

    @Column(name = "ci_sale")
    private String CIsale;

    @Column(name = "ci_photo")
    private String CIphoto;

    @Column(name = "ci_sal")
    private int CIsal;

    @Column(name = "ci_star")
    private Double CIstar;

    public Double getCIstar() {
        if (this.CIstar == null) {
            return 0.0;
        }
        return this.CIstar;
    }


    public static CompanyInfoEntity toCompanyInfoEntity(CompanyInfoDto dto){
        return CompanyInfoEntity.builder()
                .CIidx(dto.getCi_idx())
                .CIname(dto.getCi_name())
                .CIppl(dto.getCi_ppl())
                .CIsale(dto.getCi_sale())
                .CIphoto(dto.getCi_photo())
                .CIsal(dto.getCi_sal())
                .CIstar(dto.getCi_star())
                .build();
    }

    public void setCIstar(Double CIstar) {
        this.CIstar = CIstar;
    }
}
