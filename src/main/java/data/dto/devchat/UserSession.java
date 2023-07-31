package data.dto.devchat;

public class UserSession {
    private String sessionId;
    private String roomId;
    private String userName;
    private String userProfile;

    public UserSession(String sessionId, String roomId, String userName, String userProfile){
        this.sessionId = sessionId;
        this.roomId = roomId;
        this.userName = userName;
        this.userProfile = userProfile;
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

    public String getUserProfile() {
        return userProfile;
    }
}
