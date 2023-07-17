package data.dto.resume;

import data.entity.resume.ResumeCareerEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class ResumeCareerDto {
    private int recar_idx;
    private int m_idx;
    private Timestamp r_carstartdate;
    private Timestamp r_carenddate;
    private String r_company;
    private String r_department;
    private String r_position;

    public static ResumeCareerDto toResumeCareerDto(ResumeCareerEntity entity) {
        return ResumeCareerDto.builder()
                .recar_idx(entity.getRecarIdx())
                .m_idx(entity.getMIdx())
                .r_carstartdate(entity.getRCarStartdate())
                .r_carenddate(entity.getRCarEnddate())
                .r_company(entity.getRCompany())
                .r_department(entity.getRDepartment())
                .r_position(entity.getRPosition())
                .build();
    }
}
