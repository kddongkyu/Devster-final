package data.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import data.dto.HireBoardDto;
import data.mapper.MypageMapper;

@Service
public class MyPageService implements MyPageServiceInter {
	
	@Autowired
    MypageMapper mypageMapper;

	@Override
	public List<HireBoardDto> getHireBookmarkList(int m_idx) {
		// TODO Auto-generated method stub
		return mypageMapper.getHireBookmarkList(m_idx);
	}

}
