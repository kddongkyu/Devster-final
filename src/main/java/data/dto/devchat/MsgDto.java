package data.dto.devchat;

import lombok.Data;
import lombok.ToString;

@Data
@ToString
public class MsgDto {
    private String sessionId;
    private String type;
    private String roomId;
    private String userName;
    private String msg;
    private int ppl;

    public String getSessionId() {
        return this.sessionId;
    }

    public void setSessionId(String sessionId) {
        this.sessionId = sessionId;
    }

    public String getType() {
        return this.type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getRoomId() {
        return this.roomId;
    }

    public void setRoomId(String roomId) {
        this.roomId = roomId;
    }

    public String getUserName() {
        return this.userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getMsg() {
        return this.msg;
    }

    public void setMsg(String msg) {
        this.msg = msg;
    }

    public int getPpl() {
        return this.ppl;
    }

    public void setPpl(int ppl) {
        this.ppl = ppl;
    }


}
