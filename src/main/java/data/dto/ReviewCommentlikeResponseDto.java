package data.dto;

import data.entity.ReviewCommentlikeEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class ReviewCommentlikeResponseDto {
    private ReviewCommentlikeDto reviewCommentlikeDto;
    private int likeCount;
}
