package data.mapper;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import data.dto.AcademyCommentDto;
import data.dto.HireBoardDto;

@Mapper
public interface AcademyCommentMapper {
    public List<AcademyCommentDto> getAllCommentList(int ab_idx);
    public int getTotalComment(int ab_idx);
    public String selectPhotoOfAbc_idx(int abc_idx);
    public String selectNickNameOfAbc_idx(int abc_idx);
    public int countReply(int abc_idx);

    public AcademyCommentDto getAcademyComment(int abc_idx);
    public List<AcademyCommentDto> getAllReplyComment(int ab_idx);
    
}
