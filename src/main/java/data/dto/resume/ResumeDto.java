package data.dto.resume;

import data.entity.resume.ResumeEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class ResumeDto {
    private int r_idx;
    private int m_idx;
    private String r_self;
    private String r_pos;
    private String r_skill;
    private String r_link;
    private Timestamp r_gradestart;
    private Timestamp r_gradeend;
    private String r_gradecom;
    private String r_sta;
    private String r_file;
    private String r_reffile;
    private int r_status;
    private Timestamp r_ldate;

    public static ResumeDto toResumeDto(ResumeEntity entity) {
        return ResumeDto .builder()
                .r_idx(entity.getRIdx())
                .m_idx(entity.getMIdx())
                .r_self(entity.getRSelf())
                .r_pos(entity.getRPos())
                .r_skill(entity.getRSkill())
                .r_link(entity.getRLink())
                .r_gradestart(entity.getRGradestart())
                .r_gradeend(entity.getRGradeend())
                .r_gradecom(entity.getRGradecom())
                .r_sta(entity.getRSta())
                .r_file(entity.getRFile())
                .r_reffile(entity.getRReffile())
                .r_status(entity.getRStatus())
                .r_ldate(entity.getRLdate())
                .build();
    }



}
