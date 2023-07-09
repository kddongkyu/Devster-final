package data.dto;

import lombok.Data;
import lombok.ToString;

import java.util.UUID;

@Data
@ToString
public class RoomDto {
    private String roomId;
    private String roomName;

    public static RoomDto create(String name) {
        RoomDto r = new RoomDto();
        r.roomId=name;
        r.roomName = name;

        return r;
    }
}
