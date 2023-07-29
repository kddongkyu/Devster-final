package data.controller.devchat;

import data.dto.devchat.MsgDto;
import data.dto.devchat.UserSession;
import lombok.RequiredArgsConstructor;

import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.security.Principal;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequiredArgsConstructor
public class MsgController {

    private final SimpMessageSendingOperations sendingOperations;
    private Map<String, Integer> pplCounts = new ConcurrentHashMap<>();
    private Map<String, UserSession> sessionIds = new ConcurrentHashMap<>();

    @EventListener
    public void onDisconnect(SessionDisconnectEvent e) {
        StompHeaderAccessor headers=StompHeaderAccessor.wrap(e.getMessage());
        String sessionId = headers.getSessionId();
        UserSession userSession = sessionIds.get(sessionId);
        if(userSession != null){
            MsgDto msgDto = new MsgDto();
            msgDto.setType("EXIT");
            msgDto.setRoomId(userSession.getRoomId());
            msgDto.setUserName(userSession.getUserName());
            String roomId = msgDto.getRoomId();
            msgDto.setMsg(msgDto.getUserName() + "님이 퇴장하셨습니다.");
            pplCounts.compute(roomId, (k, v) -> (v == null || v == 0 ? 0 : v - 1));
            sendingOperations.convertAndSend("/sub/"+ msgDto.getRoomId() + "/ppl", pplCounts.get(roomId));
            sendingOperations.convertAndSend("/sub/" + msgDto.getRoomId(), msgDto);
            sessionIds.remove(sessionId);
        }
    }

    @MessageMapping("/msg")
    public void msg(MsgDto msg, StompHeaderAccessor headerAccessor) {
        String sessionId = headerAccessor.getSessionId();
        System.out.println(sessionId);
        String roomId = msg.getRoomId();
        String userName=msg.getUserName();
        switch (msg.getType()) {
            case "ENTER":
                msg.setMsg(msg.getUserName() + "님이 접속하였습니다.");
                pplCounts.compute(roomId, (k, v) -> (v == null || v == 0 ? 1 : v + 1));
                sendingOperations.convertAndSend("/sub/" + msg.getRoomId() + "/ppl", pplCounts.get(roomId));
                UserSession userSession = new UserSession(sessionId, roomId, userName);
                sessionIds.put(sessionId, userSession);
                System.out.println(sessionIds);
                break;

            case "CHAT":
                break;
            
            default:
                throw new IllegalArgumentException("Invalid message type:" + msg.getType());
        }
        sendingOperations.convertAndSend("/sub/" + msg.getRoomId(), msg);
    }
}
