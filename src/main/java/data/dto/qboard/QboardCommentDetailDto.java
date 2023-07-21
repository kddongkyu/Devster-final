package data.dto.qboard;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class QboardCommentDetailDto {
    private QboardCommentDto qboardCommentDto;
    private String photo;
    private String nickname;
    private int replyCount;
}
