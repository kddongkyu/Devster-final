package jwt.setting.handler;

import data.repository.MemberRepository;
import jwt.setting.settings.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


@Slf4j
@RequiredArgsConstructor
public class LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    private final JwtService jwtService;
    private final MemberRepository memberRepository;

    @Value("${jwt.access.expiration}")
    private String accessTokenExpiration;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        String id = extractUsername(authentication);
        String accessToken = jwtService.generateAccessToken(id);
        String refreshToken = jwtService.generateRefreshToken();

        jwtService.sendAccessAndRefreshToken(response,accessToken,refreshToken);

        memberRepository.findByMId(id)
                .ifPresent(member -> {
                    member.setMRefreshtoken(refreshToken);
                    memberRepository.saveAndFlush(member);
                });
        log.info("로그인에 성공하였습니다. 아이디 : {}", id);
        log.info("로그인에 성공하였습니다. AccessToken : {}", accessToken);
        log.info("발급된 AccessToken 만료 기간 : {}", accessTokenExpiration);
    }

    private String extractUsername(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return userDetails.getUsername();
    }

}
