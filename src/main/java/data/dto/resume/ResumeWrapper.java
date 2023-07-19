package data.dto.resume;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ResumeWrapper {
    private ResumeDto resumeDto;
    private List<ResumeCareerDto> resumeCareerDtoList;  // 수정한 부분
    private List<ResumeLicenseDto> resumeLicenseDtoList;
}
