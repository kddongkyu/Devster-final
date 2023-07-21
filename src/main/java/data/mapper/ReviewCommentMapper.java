package data.mapper;

import data.dto.ReviewCommentDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface ReviewCommentMapper {

    public List<ReviewCommentDto> getAllCommentList(int rb_idx);

    public int getTotalComment(int rb_idx);
    public String selectPhotoOfRbc_idx(int rbc_idx);
    public String selectNickNameOfRbc_idx(int rbc_idx);
    public int countReply(int rbc_idx);

    public List<ReviewCommentDto> getAllReplyComment(int rb_idx);
}
