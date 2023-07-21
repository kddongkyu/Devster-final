package data.dto.qboard;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class QboardResponseDto {
    private List<QboardDetailDto> qboardDetailDtoList;
    private int totalCount;
    private int totalPages;
    private int currentPage;
    private boolean hasNext;
}
