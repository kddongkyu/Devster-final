package data.service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import data.dto.devchat.MsgDto;
import data.dto.devchat.UserSession;
import lombok.RequiredArgsConstructor;
import naver.cloud.NcpObjectStorageService;

@Service
@RequiredArgsConstructor
public class MsgService {
    private final SimpMessageSendingOperations sendingOperations;

    private final NcpObjectStorageService storageService;
    @Value("${aws.s3.bucketName}")
    private String bucketName;

    private Map<String, Integer> pplCounts = new ConcurrentHashMap<>();
    private Map<String, UserSession> sessionIds = new ConcurrentHashMap<>();

    private List<UserSession> filterSessionsByRoomId(String roomId) {
        return sessionIds.values().stream()
                .filter(session -> session.getRoomId().equals(roomId))
                .collect(Collectors.toList());
    }

    public void handleSessionDisconnect(SessionDisconnectEvent e) {
        StompHeaderAccessor headers = StompHeaderAccessor.wrap(e.getMessage());
        String sessionId = headers.getSessionId();
        UserSession userSession = sessionIds.get(sessionId);
        if (userSession != null) {
            MsgDto msgDto = new MsgDto();
            msgDto.setType("EXIT");
            msgDto.setRoomId(userSession.getRoomId());
            msgDto.setUserName(userSession.getUserName());
            msgDto.setUserProfile(userSession.getUserProfile());
            String roomId = msgDto.getRoomId();
            msgDto.setMsg(msgDto.getUserName() + "님이 퇴장하셨습니다.");
//            msgDto.setUserStats(msgDto.getUserName()+"님이 퇴장하셨습니다");
            pplCounts.compute(roomId, (k, v) -> (v == null || v == 0 ? 0 : v - 1));
            sendingOperations.convertAndSend("/sub/" + roomId + "/ppl", pplCounts.get(roomId));
//            sendingOperations.convertAndSend("/sub/"+roomId+"/userstat",msgDto.getUserStats());
            sendingOperations.convertAndSend("/sub/" + roomId, msgDto);
            sessionIds.remove(sessionId);
            List<UserSession> sessionsInRoom = filterSessionsByRoomId(roomId);
            sendingOperations.convertAndSend("/sub/" + roomId + "/users", sessionsInRoom);
        }
    }

    public void handleMessage(MsgDto msg, StompHeaderAccessor headerAccessor) {
        String sessionId = headerAccessor.getSessionId();
        String roomId = msg.getRoomId();
        String userName = msg.getUserName();
        String userProfile = msg.getUserProfile();
        switch (msg.getType()) {
            case "ENTER":
                msg.setMsg(msg.getUserName() + "님이 접속하셨습니다.");
//                msg.setUserStats(msg.getUserName() + "님이 접속하셨습니다");
                pplCounts.compute(roomId, (k, v) -> (v == null || v == 0 ? 1 : v + 1));
                UserSession userSession = new UserSession(sessionId, roomId, userName, userProfile);
                sessionIds.put(sessionId, userSession);
                List<UserSession> sessionsInRoom = filterSessionsByRoomId(roomId);
                sendingOperations.convertAndSend("/sub/" + roomId + "/users", sessionsInRoom);
                sendingOperations.convertAndSend("/sub/" + roomId + "/ppl", pplCounts.get(roomId));
//                sendingOperations.convertAndSend("/sub/"+roomId+"/userstat",msg.getUserStats());
                break;

            case "CHAT":
                break;

            case "EXIT":
                break;

            default:
                throw new IllegalArgumentException("Invalid message type:" + msg.getType());
        }
        sendingOperations.convertAndSend("/sub/" + roomId, msg);
    }

    public List<String> handleImageUpload(List<MultipartFile> upload) {
        List<String> chatImg = new ArrayList<>();
        DateTimeFormatter dtf = DateTimeFormatter.ofPattern("yyyyMMdd");
        String today = LocalDate.now().format(dtf);
        if (upload != null) {
            for (MultipartFile photo : upload) {
                chatImg.add(storageService.uploadFile(bucketName, "devchat/" + today, photo));
            }
        }
        return chatImg;
    }
}
