package data.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class AcademyCommentResponseDto {
    private List<AcademyCommentDetailDto> academyCommentDetailDtoList;
    private int totalCount;
}
