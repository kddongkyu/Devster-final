package data.dto.PostMessage;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.RequiredArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@RequiredArgsConstructor
public class PostMessageRespnoseDto {
    private List<PostMessageDetailDto> list;
    private int totalPages;
}
