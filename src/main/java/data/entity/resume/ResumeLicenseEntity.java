package data.entity.resume;

import data.dto.resume.ResumeLicenseDto;
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
@Entity(name = "re_lic")
public class ResumeLicenseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "relic_idx")
    private int RElicidx;

    @Column(name = "m_idx")
    private int MIdx;

    @Column(name = "r_licdate")
    private Timestamp RLicdate;

    @Column(name = "r_licname")
    private String RLicname;

    public static ResumeLicenseEntity toResumeLicenseEntity(ResumeLicenseDto dto) {
        return ResumeLicenseEntity.builder()
                .RElicidx(dto.getRelic_idx())
                .MIdx(dto.getM_idx())
                .RLicdate(dto.getR_licdate())
                .RLicname(dto.getR_licname())
                .build();
    }

    public void updateResumeLicenseEntity(ResumeLicenseDto dto) {
        this.MIdx = dto.getM_idx();
        this.RLicdate = dto.getR_licdate();
        this.RLicname = dto.getR_licname();
    }
}
