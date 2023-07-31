package data.dto.fboard;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class FboardCommentDetailDto {
    private FboardCommentDto fboardcommentdto;
    private String photo;
    private String nickname;
    private int replyConut;
    private List<FboardCommentDetailDto> replyList;
    private int likeDislikeDifference;
}

