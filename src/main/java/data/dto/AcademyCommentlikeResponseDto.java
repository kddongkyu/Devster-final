package data.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class AcademyCommentlikeResponseDto {
    private AcademyCommentLikeDto academyCommentLikeDto;
    private int likeCount;
}
