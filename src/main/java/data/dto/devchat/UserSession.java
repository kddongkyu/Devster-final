package data.dto.devchat;

public class UserSession {
    private String sessionId;
    private String roomId;
    private String userName;

    public UserSession(String sessionId, String roomId, String userName){
        this.sessionId = sessionId;
        this.roomId = roomId;
        this.userName = userName;
    }

    public String getSessionId() {
        return sessionId;
    }

    public String getRoomId() {
        return roomId;
    }

    public String getUserName() {
        return userName;
    }
}
