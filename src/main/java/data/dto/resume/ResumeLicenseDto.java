package data.dto.resume;

import data.entity.resume.ResumeLicenseEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class ResumeLicenseDto {
    private int relic_idx;
    private int m_idx;
    private Timestamp r_licdate;
    private String r_licname;

    public static ResumeLicenseDto toResumeLicenseDto(ResumeLicenseEntity entity) {
        return ResumeLicenseDto.builder()
                .relic_idx(entity.getRElicidx())
                .m_idx(entity.getMIdx())
                .r_licdate(entity.getRLicdate())
                .r_licname(entity.getRLicname())
                .build();
    }
}
