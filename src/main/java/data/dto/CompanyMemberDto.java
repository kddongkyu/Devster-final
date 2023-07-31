package data.dto;

import data.entity.CompanyMemberEntity;
import jwt.setting.config.Role;
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
    private String cm_post;
    private String cm_name;
    private String cm_cp;
    private String cm_refreshtoken;
    private Role cm_role;
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
                .cm_post(entity.getCMpost())
                .cm_role(entity.getCMrole())
                .cm_refreshtoken(entity.getCMrefreshtoken())
                .cm_name(entity.getCMname())
                .cm_cp(entity.getCMcp())
                .cm_date(entity.getCMdate())
                .cm_reg(entity.getCMreg())
                .build();
    }
}
