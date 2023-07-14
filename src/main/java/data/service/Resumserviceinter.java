package data.service;

import java.util.List;
import java.util.Map;

import data.dto.Re_carDto;
import data.dto.Re_licDto;
import data.dto.ResumeDto;

public interface Resumserviceinter {
	 public ResumeDto getDataresume(int m_idx);
	 public List<Re_licDto> getDatare_lic(int m_idx);
	 public List<Re_carDto> getDatare_car(int m_idx);
	 public List<Map<String, Object>> getFullData(int m_idx);
}
