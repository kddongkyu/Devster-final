package data.controller.devchat;

import data.dto.devchat.MsgDto;
import lombok.RequiredArgsConstructor;

import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@RestController
@RequiredArgsConstructor
public class MsgController {

    private final SimpMessageSendingOperations sendingOperations;
    private Map<String, Integer> pplCounts = new ConcurrentHashMap<>();

    // @EventListener
    // public void onConnect(SessionConnectedEvent e) {
    //     StompHeaderAccessor headers=StompHeaderAccessor.wrap(e.getMessage());
    //     System.out.println(headers);
    // }

    // @EventListener
    // public void onDisconnect(SessionDisconnectEvent e) {
    //     System.out.println(e.toString());
    // }

    @MessageMapping("/msg")
    public void msg(MsgDto msg) {
        String roomId = msg.getRoomId();
        switch (msg.getType()) {
            case "ENTER":
                msg.setMsg(msg.getUserName() + "님이 접속하였습니다.");
                pplCounts.compute(roomId, (k, v) -> (v == null || v == 0 ? 1 : v + 1));
                sendingOperations.convertAndSend("/sub/" + msg.getRoomId() + "/ppl", pplCounts.get(roomId));
                break;

            case "CHAT":
                break;
            
            case "EXIT":
                msg.setMsg(msg.getUserName() + "님이 퇴장하셨습니다.");
                pplCounts.compute(roomId, (k, v) -> (v == null || v == 0 ? 0 : v - 1));
                sendingOperations.convertAndSend("/sub/"+ msg.getRoomId() + "/ppl", pplCounts.get(roomId));
                break;

            default:
                throw new IllegalArgumentException("Invalid message type:" + msg.getType());
        }
        sendingOperations.convertAndSend("/sub/" + msg.getRoomId(), msg);
    }
}
