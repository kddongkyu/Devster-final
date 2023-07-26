package data.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class ReviewCommentResponseDto {
    private List<ReviewCommentDetailDto> reviewCommentDetailDtoList;
    private int totalCount;
}
