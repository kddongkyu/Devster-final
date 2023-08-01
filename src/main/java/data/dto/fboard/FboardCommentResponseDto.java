package data.dto.fboard;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class FboardCommentResponseDto {
    private List<FboardCommentDetailDto> fboardCommentDetailDtoList;
    private int totalCount;
}
