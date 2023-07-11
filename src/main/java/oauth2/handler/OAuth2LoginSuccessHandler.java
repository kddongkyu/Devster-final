//package oauth2.handler;
//
//import data.repository.MemberRepository;
//import jwt.setting.config.Role;
//import jwt.setting.settings.JwtService;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import oauth2.CustomOAuth2User;
//import org.springframework.security.core.Authentication;
//import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
//import org.springframework.stereotype.Component;
//
//import javax.servlet.ServletException;
//import javax.servlet.http.HttpServletRequest;
//import javax.servlet.http.HttpServletResponse;
//import java.io.IOException;
//
//@Slf4j
//@Component
//@RequiredArgsConstructor
//public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {
//
//    private final JwtService jwtService;
//    private final MemberRepository memberRepository;
//    @Override
//    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
//        log.info("OAuth2 Login 성공!");
//
//        try {
//            CustomOAuth2User oAuth2User = (CustomOAuth2User) authentication.getPrincipal();
//
//            if(oAuth2User.getRole() == Role.GUEST) {
////                String accessToken = jwtService.generateAccessToken(oAuth2User.getEmail());
////                response.addHeader(jwtService.getAccessHeader(),"Bearer " + accessToken);
//                response.sendRedirect("/oauth2/sign-up"); // 프론트의 회원가입 추가 정보 입력 폼으로 리다이렉트
//
//                jwtService.sendAccessAndRefreshToken(response,accessToken,null);
//
////                MemberEntity findMember = memberRepository.findByMId(oAuth2User.getId())
////                                .orElseThrow(() -> new IllegalArgumentException("아이디에 해당하는 유저가 없습니다."));
////                findMember.authorizeUser();
//            } else {
//                loginSuccess(response,oAuth2User);
//            }
//        } catch (Exception e) {
//            throw e;
//        }
//    }
//
//    private void loginSuccess(HttpServletResponse response, CustomOAuth2User oAuth2User) throws IOException {
////        String accessToken = jwtService.generateAccessToken(oAuth2User.getEmail());
//        String refreshToken = jwtService.generateRefreshToken();
////        response.addHeader(jwtService.getAccessHeader(), "Bearer " + accessToken);
//        response.addHeader(jwtService.getRefreshHeader(), "Bearer " + refreshToken);
//
////        jwtService.sendAccessAndRefreshToken(response, accessToken, refreshToken);
////        jwtService.saveRefreshToken(oAuth2User.getEmail(), refreshToken);
//    }
//}
