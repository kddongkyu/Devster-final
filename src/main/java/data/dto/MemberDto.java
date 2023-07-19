package data.dto;

import data.entity.MemberEntity;
import jwt.setting.config.Role;
import jwt.setting.config.SocialType;
import lombok.*;

import java.sql.Timestamp;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
@Builder
public class MemberDto {
    private int m_idx;
    private String m_id;
    private String m_socialid;
    private String m_email;
    private String m_pass;
    private Role m_role;
    private int ai_idx;
    private String m_name;
    private String m_nickname;
    private String m_photo;
    private String m_filename;
    private String ai_name;
    private String m_refreshtoken;
    private SocialType m_socialtype;
    private Timestamp m_date;

    public static MemberDto toMemberDto(MemberEntity entity){
        return MemberDto.builder()
        		.m_idx(entity.getMIdx())
                .m_name(entity.getMName())
                .m_id(entity.getMId())
                .m_email(entity.getMEmail())
                .m_pass(entity.getMPass())
                .m_role(entity.getMRole())
                .ai_idx(entity.getAIidx())
                .m_nickname(entity.getMNickname())
                .m_photo(entity.getMPhoto())
                .m_filename(entity.getMFilename())
                .ai_name(entity.getAIname())
                .m_socialtype(entity.getMSocialType())
                .m_date(entity.getMDate())
                .build();
    }

}
