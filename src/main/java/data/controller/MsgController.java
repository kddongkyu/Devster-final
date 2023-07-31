package data.controller;

import data.dto.devchat.MsgDto;
import data.service.MsgService;
import lombok.RequiredArgsConstructor;

import org.springframework.context.event.EventListener;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.socket.messaging.SessionConnectEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class MsgController {
    private final MsgService msgService;

    @EventListener
    public void onDisconnect(SessionDisconnectEvent e) {
        msgService.handleSessionDisconnect(e);
    }

    @MessageMapping("/msg")
    public void msg(MsgDto msg, StompHeaderAccessor headerAccessor) {
        msgService.handleMessage(msg, headerAccessor);
    }

    @PostMapping("/api/devchat/D1/upload")
    public List<String> uploadImg(List<MultipartFile> upload) {
        return msgService.handleImageUpload(upload);
    }
}
