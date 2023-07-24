package data.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class ReviewCommentDetailDto {
    private ReviewCommentDto reviewcommentdto;
    private String photo;
    private String nickname;
    private int replyConut;
    private List<ReviewCommentDto> replyList;

}
