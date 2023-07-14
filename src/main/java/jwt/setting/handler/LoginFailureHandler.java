package jwt.setting.handler;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import jwt.setting.settings.JwtService;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;

@Slf4j
public class LoginFailureHandler implements AuthenticationFailureHandler {

    private JwtService jwtService;

    public LoginFailureHandler(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    @Override
    public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response, AuthenticationException exception) throws IOException {
        response.setCharacterEncoding("UTF-8");
        response.setContentType("text/plain;charset=UTF-8");

        Optional<String> accessTokenOpt = jwtService.extractAccessToken(request);

        if (accessTokenOpt.isPresent()) {
            String accessToken = accessTokenOpt.get();
            if (!jwtService.isTokenValid(accessToken)) {
                // When the token is expired
                response.setStatus(HttpServletResponse.SC_FORBIDDEN);
                response.getWriter().write("토큰이 만료되었습니다. refreshToken을 사용해주세요.");
                return;  // Only exit here if there is an invalid token
            }
        }

        // When authentication fails for other reasons (including no token)
        response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
        response.getWriter().write("로그인 실패! 아이디나 비밀번호를 확인해주세요!");

        log.info("로그인에 실패했습니다. 메시지 : {}", exception.getMessage());
    }



}
