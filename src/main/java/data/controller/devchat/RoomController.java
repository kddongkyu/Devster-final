package data.controller.devchat;

import data.service.devchat.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/devchat")
public class RoomController {

    @Autowired
    private RoomService roomService;

    @GetMapping("/D1/{ai_idx}")
    public String getRoomName(@PathVariable int ai_idx) {
        return roomService.getRoomName(ai_idx);
    }
}
