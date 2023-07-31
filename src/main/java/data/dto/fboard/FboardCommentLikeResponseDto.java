package data.dto.fboard;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class FboardCommentLikeResponseDto {
    private FboardCommentLikeDto fboardCommentlikeDto;
    private int likeCount;
}
