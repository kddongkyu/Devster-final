package data.dto;

import data.entity.CompanyInfoEntity;
import lombok.*;
@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class CompanyInfoDto {

    private int ci_idx;
    private String ci_name;
    private int ci_ppl;
    private String ci_sale;
    private String ci_photo;
    private int ci_sal;
    private double ci_star;

    public static CompanyInfoDto toCompanyInfoDto(CompanyInfoEntity entity){
        return CompanyInfoDto.builder()
                .ci_idx(entity.getCIidx())
                .ci_name(entity.getCIname())
                .ci_ppl(entity.getCIppl())
                .ci_sale(entity.getCIsale())
                .ci_photo(entity.getCIphoto())
                .ci_sal(entity.getCIsal())
                .ci_star(entity.getCIstar())
                .build();
    }
}
