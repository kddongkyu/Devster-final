package data.dto;

import data.entity.CompanyMemberEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class CompanyMemberDto {
    private int cm_idx;
    private String cm_email;
    private String cm_pass;
    private String cm_tele;
    private String cm_addr;
    private String cm_compname;
    private String cm_filename;
    private int cm_new;
    private String cm_post;
    private String cm_name;
    private String cm_cp;
    private String salt;
    private Timestamp cm_date;
    private String cm_reg;

    public static CompanyMemberDto toCompanyMemberDto(CompanyMemberEntity entity){
        return CompanyMemberDto.builder()
                .cm_idx(entity.getCMidx())
                .cm_email(entity.getCMemail())
                .cm_pass(entity.getCMpass())
                .cm_tele(entity.getCMtele())
                .cm_addr(entity.getCMaddr())
                .cm_compname(entity.getCMcompname())
                .cm_filename(entity.getCMfilename())
                .cm_new(entity.getCMnew())
                .cm_post(entity.getCMpost())
                .cm_name(entity.getCMcompname())
                .cm_cp(entity.getCMcp())
                .salt(entity.getSalt())
                .cm_date(entity.getCMdate())
                .cm_reg(entity.getCMreg())
                .build();
    }
}
