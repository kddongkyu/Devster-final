package jwt.setting.handler;

import data.repository.CompanyMemberRepository;
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
    private final CompanyMemberRepository companyMemberRepository;

    @Value("${jwt.access.expiration}")
    private String accessTokenExpiration;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        String uri = request.getRequestURI();
        String[] uriParts = uri.split("/");

        if (uriParts.length > 1) {
            String prefix = uriParts[1];

            if (prefix.equals("member")) {
                isNormalMember(request, response, authentication);
            } else if (prefix.equals("compmember")) {
                isCompanyMember(request, response, authentication);
            } else {
                log.info(" 로그인 타입 오류 ");
            }
        }
    }

    private void isNormalMember(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        String id = extractUsername(authentication);
        int m_idx = memberRepository.findByMId(id).get().getMIdx();
        String accessToken = jwtService.generateAccessToken(m_idx,"normal");
        String refreshToken = jwtService.generateRefreshToken("normal");

        jwtService.sendAccessAndRefreshToken(response,accessToken,refreshToken);

        memberRepository.findByMId(id)
                .ifPresent(member -> {
                    member.updateRefreshToken(refreshToken);
                    memberRepository.saveAndFlush(member);
                });
        log.info("로그인에 성공하였습니다. 회원 인덱스 번호 : {}", m_idx);
        log.info("로그인에 성공하였습니다. AccessToken : {}", accessToken);
        log.info("발급된 AccessToken 만료 기간 : {}", accessTokenExpiration);
    }

    private void isCompanyMember(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        String id = extractUsername(authentication);
        int cm_idx = companyMemberRepository.findByCMemail(id).get().getCMidx();
        String accessToken = jwtService.generateAccessToken(cm_idx,"company");
        String refreshToken = jwtService.generateRefreshToken("company");

        jwtService.sendAccessAndRefreshToken(response,accessToken,refreshToken);

        companyMemberRepository.findByCMemail(id)
                .ifPresent(companyMember -> {
                    companyMember.setCMrefreshtoken(refreshToken);
                    companyMemberRepository.saveAndFlush(companyMember);
                });
        log.info("로그인에 성공하였습니다. 회원 인덱스 번호 : {}", cm_idx);
        log.info("로그인에 성공하였습니다. AccessToken : {}", accessToken);
        log.info("발급된 AccessToken 만료 기간 : {}", accessTokenExpiration);
    }

    private String extractUsername(Authentication authentication) {
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        return userDetails.getUsername();
    }


}
