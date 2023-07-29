package data.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class AcademyCommentDetailDto {
    private AcademyCommentDto academyCommentDto;
    private String photo;
    private String nickname;
    private int replyCount;
    private List<AcademyCommentDetailDto> replyList;
    private int likeDislikeDifference;
}
