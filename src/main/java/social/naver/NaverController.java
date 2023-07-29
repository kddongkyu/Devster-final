package social.naver;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import data.entity.MemberEntity;
import data.repository.MemberRepository;
import jwt.setting.config.SocialType;
import jwt.setting.settings.JwtService;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.session.StandardSession;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import javax.servlet.http.HttpSession;
import java.lang.reflect.Member;
import java.util.Optional;

@RestController
@Slf4j
@CrossOrigin
public class NaverController {

    @Value("${naver.login.client_id}")
    private String client_id;

    @Value("${naver.login.client_secret}")
    private String client_secret;

    private final MemberRepository memberRepository;
    private final JwtService jwtService;

    public NaverController(MemberRepository memberRepository, JwtService jwtService) {
        this.memberRepository = memberRepository;
        this.jwtService = jwtService;
    }

    @GetMapping("/oauth2/authorization/naver")
    public void api(){

    }

    @GetMapping("/oauth2/callback/naver")
    private ResponseEntity<?> naverCallBack(String code){
        RestTemplate rt = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", client_id);
        params.add("redirect_uri", "https://localhost:443/oauth2/callback/naver");
        params.add("client_secret", client_secret);
        params.add("code", code);

        HttpEntity<MultiValueMap<String, String>> naverTokenRequest = new HttpEntity<>(params, headers);

        ResponseEntity<String> response = rt.exchange(
                "https://nid.naver.com/oauth2.0/token", // https://{요청할 서버 주소}
                HttpMethod.POST, // 요청할 방식
                naverTokenRequest, // 요청할 때 보낼 데이터
                String.class // 요청 시 반환되는 데이터 타입
        );

        ObjectMapper objectMapper = new ObjectMapper();

        NaverToken naverToken = null;
        try {
            naverToken = objectMapper.readValue(response.getBody(), NaverToken.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        return naverData(naverToken.getAccess_token());
    }

    private ResponseEntity<?> naverData(String accessToken) {
        RestTemplate rt = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        headers.add("Authorization", "Bearer " + accessToken);

        HttpEntity<MultiValueMap<String, String>> naverTokenRequest = new HttpEntity<>(headers);

        ResponseEntity<String> response = rt.exchange(
                "https://openapi.naver.com/v1/nid/me", // https://{요청할 서버 주소}
                HttpMethod.GET, // 요청할 방식
                naverTokenRequest, // 요청할 때 보낼 데이터
                String.class // 요청 시 반환되는 데이터 타입
        );

        ObjectMapper objectMapper = new ObjectMapper();
        NaverReturnData naverReturnData = null;

        try {
            JsonNode jsonNode = objectMapper.readTree(response.getBody());
            naverReturnData = objectMapper.treeToValue(jsonNode.get("response"), NaverReturnData.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException("getUser : JSON 변환중 에러발생");
        }

        Optional<MemberEntity> optionalReturnMember = memberRepository.findByMSocialTypeAndMSocialid(SocialType.KAKAO, naverReturnData.getId());
        Optional<MemberEntity> optionalReturnMember2 = memberRepository.findByMEmail(naverReturnData.getEmail());


        log.info(optionalReturnMember.toString());

        if(optionalReturnMember.isPresent()) {
            MemberEntity returnMember = optionalReturnMember.get();
            
            deleteToken(accessToken);

            int m_idx = returnMember.getMIdx();

            String accessTokenNaver = jwtService.generateAccessToken(m_idx,"normal");
            String refreshTokenNaver = jwtService.generateRefreshToken("normal");

            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.add("Authorization", "Bearer " + accessTokenNaver);
            responseHeaders.add("Authorization-Refresh", refreshTokenNaver);

            log.info("로그인에 성공하였습니다. 회원 인덱스 번호 : {}", m_idx);
            log.info("로그인에 성공하였습니다. AccessToken : {}", accessTokenNaver);

            memberRepository.findById(m_idx)
                    .ifPresent(member -> {
                        member.setMRefreshtoken(refreshTokenNaver);
                        memberRepository.saveAndFlush(member);
                    });

            // 클라이언트에게 보낼 응답 바디. 필요한 정보가 있다면 이 부분 수정
            String responseBody = "네이버 로그인 accessToken, refreshToken 발급";

            // ResponseEntity 객체 반환
            log.info("네이버 계정 있음.");
            return new ResponseEntity<>(responseBody, responseHeaders, HttpStatus.OK);
        } else if(optionalReturnMember2.isPresent()) {
            log.info("이미 사용중인 이메일");
            String socialType = String.valueOf(optionalReturnMember2.get().getMSocialType());
            if(socialType.equals("KAKAO")) {
                log.info("카카오로 이미 가입된 이메일.");
                return new ResponseEntity<>("이미 카카오로 가입된 이메일 입니다.",HttpStatus.IM_USED);
            } else {
                log.info("일반회원으로 이미 가입된 이메일");
                return new ResponseEntity<>("이미 일반회원으로 가입된 이메일입니다.",HttpStatus.IM_USED);
            }
        } else {
            log.info("네이버 계정 없음.");
            log.info(naverReturnData.toString());
            return new ResponseEntity<>(naverReturnData,HttpStatus.NO_CONTENT);
        }
        
    }

    private void deleteToken(String accessToken) {
        RestTemplate rt = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "delete");
        params.add("client_id", client_id);
        params.add("client_secret", client_secret);
        params.add("access_token", accessToken);
        params.add("service_provider","NAVER");

        HttpEntity<MultiValueMap<String, String>> naverTokenRequest = new HttpEntity<>(params, headers);

        ResponseEntity<String> response = rt.exchange(
                "https://nid.naver.com/oauth2.0/token", // https://{요청할 서버 주소}
                HttpMethod.POST, // 요청할 방식
                naverTokenRequest, // 요청할 때 보낼 데이터
                String.class // 요청 시 반환되는 데이터 타입
        );
        
        log.info("네이버 accessToken 삭제완료");
    }

}
