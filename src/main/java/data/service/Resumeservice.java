package data.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import data.dto.Re_carDto;
import data.dto.Re_licDto;
import data.dto.ResumeDto;
import data.mapper.ResumeMapper;

@Service
public class Resumeservice implements Resumserviceinter {
	
	@Autowired
    ResumeMapper resumeMapper;

	@Override
	public ResumeDto getDataresume(int m_idx) {
		return resumeMapper.getDataresume(m_idx);
	}

	@Override
	public List<Re_licDto> getDatare_lic(int m_idx) {
		return resumeMapper.getDatare_lic(m_idx);
	}

	@Override
	public List<Re_carDto> getDatare_car(int m_idx) {
		return resumeMapper.getDatare_car(m_idx);
	}

	@Override
	public List<Map<String, Object>> getFullData(int m_idx) {
		return resumeMapper.getFullData(m_idx);
	}

}
