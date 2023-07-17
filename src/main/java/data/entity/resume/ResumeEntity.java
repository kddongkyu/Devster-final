package data.entity.resume;

import data.dto.resume.ResumeDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.sql.Timestamp;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Entity(name = "resume")
@Builder
public class ResumeEntity {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "r_idx")
        private int RIdx;

        @Column(name = "m_idx")
        private int MIdx;

        @Column(name = "r_self")
        private String RSelf;

        @Column(name = "r_pos")
        private String RPos;

        @Column(name = "r_skill")
        private String RSkill;

        @Column(name = "r_link")
        private String RLink;

        @Column(name = "r_gradestart")
        private Timestamp RGradestart;

        @Column(name = "r_gradeend")
        private Timestamp RGradeend;

        @Column(name = "r_gradecom")
        private String RGradecom;

        @Column(name = "r_sta")
        private String RSta;

        @Column(name = "r_file")
        private String RFile;

        @Column(name = "r_refile")
        private String RReffile;

        @Column(name = "r_status")
        private int RStatus;

        @Column(name = "r_ldate", insertable = false)
        private Timestamp RLdate;

    public ResumeEntity toResumeEntity(ResumeDto dto) {
        ResumeEntity entity = new ResumeEntity();
        entity.setRIdx(dto.getR_idx());
        entity.setMIdx(dto.getM_idx());
        entity.setRSelf(dto.getR_self());
        entity.setRPos(dto.getR_pos());
        entity.setRSkill(dto.getR_skill());
        entity.setRLink(dto.getR_link());
        entity.setRGradestart(dto.getR_gradestart());
        entity.setRGradeend(dto.getR_gradeend());
        entity.setRGradecom(dto.getR_gradecom());
        entity.setRSta(dto.getR_sta());
        entity.setRFile(dto.getR_file());
        entity.setRReffile(dto.getR_reffile());
        entity.setRStatus(dto.getR_status());
        entity.setRLdate(dto.getR_ldate());
        return entity;
    }

    public void updateResumeEntity(ResumeDto dto) {
        this.MIdx = dto.getM_idx();
        this.RSelf = dto.getR_self();
        this.RPos = dto.getR_pos();
        this.RSkill = dto.getR_skill();
        this.RLink = dto.getR_link();
        this.RGradestart = dto.getR_gradestart();
        this.RGradeend = dto.getR_gradeend();
        this.RGradecom = dto.getR_gradecom();
        this.RSta = dto.getR_sta();
        this.RFile = dto.getR_file();
        this.RReffile = dto.getR_reffile();
        this.RStatus = dto.getR_status();
    }



}
