package data.controller;

import data.dto.RoomDto;
import data.service.RoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/lobby")
public class LobbyController {

    @Autowired
    private RoomService roomService;

    @GetMapping("/list")
    public List<RoomDto> getList() {
        return roomService.getAll();
    }

    @PostMapping("/create")
    public RoomDto postCreate(@RequestBody Map<String, Object> data) {
        return roomService.createRoom(data.get("name").toString());
    }
}
