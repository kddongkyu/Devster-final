package data.mapper;

import org.apache.ibatis.annotations.Mapper;

import data.dto.qboard.QboardDto;

@Mapper
public interface QboardMapper {
    public QboardDto getHottestQboard();
}
