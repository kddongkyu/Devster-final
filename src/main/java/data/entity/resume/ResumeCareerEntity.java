package data.entity.resume;

import data.dto.resume.ResumeCareerDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Entity(name = "re_car")
@Builder
public class ResumeCareerEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recar_idx")
    private int RecarIdx;

    @Column(name = "m_idx")
    private int MIdx;

    @Column(name = "r_carstartdate")
    private Timestamp RCarStartdate;

    @Column(name = "r_carenddate")
    private Timestamp RCarEnddate;

    @Column(name = "r_company")
    private String RCompany;

    @Column(name = "r_department")
    private String RDepartment;

    @Column(name = "r_position")
    private String RPosition;

    public static ResumeCareerEntity toResumeCareerEntity(ResumeCareerDto dto) {
        ResumeCareerEntity entity = new ResumeCareerEntity();
        entity.setRecarIdx(dto.getRecar_idx());
        entity.setMIdx(dto.getM_idx());
        entity.setRCarStartdate(dto.getR_carstartdate());
        entity.setRCarEnddate(dto.getR_carenddate());
        entity.setRCompany(dto.getR_company());
        entity.setRDepartment(dto.getR_department());
        entity.setRPosition(dto.getR_position());
        return entity;
    }

    public void updateResumeCareerEntity(ResumeCareerDto dto) {
        this.MIdx = dto.getM_idx();
        this.RCarStartdate = dto.getR_carstartdate();
        this.RCarEnddate = dto.getR_carenddate();
        this.RCompany = dto.getR_company();
        this.RDepartment = dto.getR_department();
        this.RPosition = dto.getR_position();
    }
}
