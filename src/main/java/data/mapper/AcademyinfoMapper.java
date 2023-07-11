package data.mapper;

import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface AcademyinfoMapper {
    public String getRoomName(int ai_idx);
}
