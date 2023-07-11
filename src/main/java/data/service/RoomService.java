package data.service;

import data.mapper.AcademyinfoMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.*;

@Service
public class RoomService implements RoomServiceInter{

    @Autowired
    private AcademyinfoMapper academyinfoMapper;

    @Override
    public String getRoomName(int ai_idx) {
        return academyinfoMapper.getRoomName(ai_idx);
    }
}
