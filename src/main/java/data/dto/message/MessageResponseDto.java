package data.dto.message;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class MessageResponseDto {

    private String statusCode;
    private String statusName;
    private String requestId;
    private Timestamp requestTime;

}
