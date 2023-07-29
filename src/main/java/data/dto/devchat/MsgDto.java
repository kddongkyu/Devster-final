package data.dto.devchat;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class MsgDto {
    private String type;
    private String roomId;
    private String userName;
    private String msg;
    private int ppl;
}
