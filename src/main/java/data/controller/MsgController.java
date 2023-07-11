package data.controller;

import data.dto.MsgDto;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class MsgController {

    private final SimpMessageSendingOperations sendingOperations;
    private Map<String, Integer> pplCounts = new HashMap<>();

    @MessageMapping("/msg")
    public void msg(MsgDto msg) {
        String roomId = msg.getRoomId();
        switch (msg.getType()) {
            case "ENTER":
                msg.setMsg(msg.getUserName() + "님이 접속하였습니다.");
                pplCounts.compute(roomId, (k, v) -> v == null ? 1 : v + 1);
                sendingOperations.convertAndSend("/sub/devchat/" + msg.getRoomId() + "/ppl", pplCounts.get(roomId));
                break;

            case "CHAT":
                break;

            case "EXIT":
//                pplCounts.compute(roomId, (k, v) -> (v == null || v == 0 ? 0 : v - 1));
//                sendingOperations.convertAndSend("/sub/devchat/" + msg.getRoomId() + "/disppl", pplCounts.get(roomId));
                break;

            default:
                break;
        }
        sendingOperations.convertAndSend("/sub/devchat/" + msg.getRoomId(), msg);
    }
}
