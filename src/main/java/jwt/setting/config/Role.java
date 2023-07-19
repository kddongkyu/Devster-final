package jwt.setting.config;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum Role {

    GUEST("GUEST"), USER("USER"), ADMIN("ADMIN");

    private final String key;
}
