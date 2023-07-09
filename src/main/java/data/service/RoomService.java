package data.service;

import data.dto.RoomDto;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.*;

@Service
public class RoomService {

    private Map<String, RoomDto> rooms;

    @PostConstruct
    private void init() {
        rooms = new LinkedHashMap<>();
    }

    public List<RoomDto> getAll() {
        List<RoomDto> res = new ArrayList<>(rooms.values());
        Collections.reverse(res);

        return res;
    }

    public RoomDto createRoom(String name) {
        RoomDto r = RoomDto.create(name);
        rooms.put(r.getRoomId(), r);

        return r;
    }

    public RoomDto getRoom(String roomId) {
        return rooms.get(roomId);
    }
}
