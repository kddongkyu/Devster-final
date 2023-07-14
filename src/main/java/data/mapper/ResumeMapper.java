package data.mapper;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Mapper;

import data.dto.Re_carDto;
import data.dto.Re_licDto;
import data.dto.ResumeDto;

@Mapper
public interface ResumeMapper {
	public ResumeDto getDataresume(int m_idx);
	public List<Re_licDto> getDatare_lic(int m_idx);
	public List<Re_carDto> getDatare_car(int m_idx);
	public List<Map<String, Object>> getFullData(int m_idx);
}
