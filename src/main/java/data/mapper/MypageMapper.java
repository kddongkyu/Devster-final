package data.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import data.dto.HireBoardDto;

@Mapper
public interface MypageMapper {
	public List<HireBoardDto> getHireBookmarkList(int m_idx);
}
