package data.controller;

import data.dto.MsgDto;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MsgController {

    private final SimpMessageSendingOperations sendingOperations;

    @MessageMapping("/msg")
    public void msg(MsgDto msg) {
        switch (msg.getType()) {
            case "ENTER":
                msg.setMsg(msg.getUserName() + "님이 접속하였습니다.");
                break;

            case "CHAT":
                break;

            default:
                break;
        }
        sendingOperations.convertAndSend("/sub/room/" + msg.getRoomId(), msg);
    }
}
