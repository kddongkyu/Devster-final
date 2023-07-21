package data.service;

import data.mapper.AcademyInfoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoomService implements RoomServiceInter{

    @Autowired
    private AcademyInfoMapper academyinfoMapper;

    @Override
    public String getRoomName(int ai_idx) {
        return academyinfoMapper.getRoomName(ai_idx);
    }
}
