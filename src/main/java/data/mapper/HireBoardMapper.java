package data.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import data.dto.HireBoardDto;

@Mapper
public interface HireBoardMapper {

    public int getTotalCount();
    public List<HireBoardDto> getPagingList(Map<String, Integer> map);
    
}