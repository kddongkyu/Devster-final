package data.dto.qboard;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class QboardCommentResponseDto {
    private List<QboardCommentDetailDto> qboardCommentDetailDtoList;
    private int totalCount;
}
