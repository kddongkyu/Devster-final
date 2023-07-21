package data.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import data.dto.HireBoardDto;

@Mapper
public interface AcademyBoardMapper {
    public void updateReadCount(int ab_idx);

    public String selectNickNameOfMidx(int ab_idx); 
    
    public String selectPhotoOfMidx(int ab_idx);



}


