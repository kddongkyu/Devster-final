package data.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

// import data.dto.FreeBoardDto;

@Mapper
public interface FreeBoardMapper {
    // public FreeBoardDto getHottestFboard();
    public String getMphoto(int fb_idx);
    public String getMNickname(int fb_idx);
}
