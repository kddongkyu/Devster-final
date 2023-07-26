package data.dto.qboard;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class QboardDetailDto {
    private QboardDto qboardDto;
    private String photo;
    private String nickname;
    private int totalcommentCount;
}
