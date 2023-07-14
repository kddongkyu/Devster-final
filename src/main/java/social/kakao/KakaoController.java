package social.kakao;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import data.entity.MemberEntity;
import data.repository.MemberRepository;
import jwt.setting.config.SocialType;
import jwt.setting.settings.JwtService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;
import social.naver.NaverReturnData;

import javax.persistence.Column;

@RestController
@Slf4j
@CrossOrigin
public class KakaoController {

    @Value("${kakao.client_id}")
    private String client_id;

    private final MemberRepository memberRepository;
    private final JwtService jwtService;

    public KakaoController(MemberRepository memberRepository, JwtService jwtService) {
        this.memberRepository = memberRepository;
        this.jwtService = jwtService;
    }

    @GetMapping("/oauth2/callback/kakao")
    private ResponseEntity<String> kakaoCallBack(String code) {

        // POST 방식으로 key=value 데이터를 요청 (카카오쪽으로)
        // 이 때 필요한 라이브러리가 RestTemplate, 얘를 쓰면 http 요청을 편하게 할 수 있다.
        RestTemplate rt = new RestTemplate();

        // HTTP POST를 요청할 때 보내는 데이터(body)를 설명해주는 헤더도 만들어 같이 보내줘야 한다.
        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

        // body 데이터를 담을 오브젝트인 MultiValueMap를 만들어보자
        // body는 보통 key, value의 쌍으로 이루어지기 때문에 자바에서 제공해주는 MultiValueMap 타입을 사용한다.
        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("grant_type", "authorization_code");
        params.add("client_id", client_id);
        params.add("redirect_uri", "https://localhost:443/oauth2/callback/kakao");
        params.add("code", code);

        // 요청하기 위해 헤더(Header)와 데이터(Body)를 합친다.
        // kakaoTokenRequest는 데이터(Body)와 헤더(Header)를 Entity가 된다.
        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(params, headers);

        // POST 방식으로 Http 요청한다. 그리고 response 변수의 응답 받는다.
        ResponseEntity<String> response = rt.exchange(
                "https://kauth.kakao.com/oauth/token", // https://{요청할 서버 주소}
                HttpMethod.POST, // 요청할 방식
                kakaoTokenRequest, // 요청할 때 보낼 데이터
                String.class // 요청 시 반환되는 데이터 타입
        );

        ObjectMapper objectMapper = new ObjectMapper();

        KakaoToken kakaoToken = null;

        try {
            kakaoToken = objectMapper.readValue(response.getBody(), KakaoToken.class);
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }

        return kakaoData(kakaoToken.getAccess_token());
    }

    private ResponseEntity<String> kakaoData(String accessToken) {
        RestTemplate rt = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        headers.add("Authorization", "Bearer " + accessToken);

        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(headers);

        ResponseEntity<String> response = rt.exchange(
                "https://kapi.kakao.com/v2/user/me", // https://{요청할 서버 주소}
                HttpMethod.GET, // 요청할 방식
                kakaoTokenRequest, // 요청할 때 보낼 데이터
                String.class // 요청 시 반환되는 데이터 타입
        );


        MemberEntity returnMember = getUser(response.getBody());

        log.info(returnMember.toString());

        deleteToken(accessToken);

        int m_idx = returnMember.getMIdx();

        String accessTokenKakao = jwtService.generateAccessToken(m_idx,"normal");
        String refreshTokenKakao = jwtService.generateRefreshToken("normal");

        HttpHeaders responseHeaders = new HttpHeaders();
        responseHeaders.add("Authorization", "Bearer " + accessTokenKakao);
        responseHeaders.add("Authorization-Refresh", refreshTokenKakao);

        log.info("로그인에 성공하였습니다. 회원 인덱스 번호 : {}", m_idx);
        log.info("로그인에 성공하였습니다. AccessToken : {}", accessTokenKakao);

        memberRepository.findById(m_idx)
                .ifPresent(member -> {
                    member.setMRefreshtoken(refreshTokenKakao);
                    memberRepository.saveAndFlush(member);
                });

        // 클라이언트에게 보낼 응답 바디. 필요한 정보가 있다면 이 부분 수정
        String responseBody = "카카오 로그인 accessToken, refreshToken 발급";

        // ResponseEntity 객체 반환
        return new ResponseEntity<>(responseBody, responseHeaders, HttpStatus.OK);
    }

   private MemberEntity getUser(String data) {
    ObjectMapper objectMapper = new ObjectMapper();
    JsonNode jsonNode;
    try {
        jsonNode = objectMapper.readTree(data);
    } catch (JsonProcessingException e) {
        throw new RuntimeException("getUser : JSON 변환 중 에러 발생");
    }

       KakaoReturnData kakaoReturnData = new KakaoReturnData();
        kakaoReturnData.setId(jsonNode.path("id").asText());
        kakaoReturnData.setNickname(jsonNode.path("properties").path("nickname").asText());
        kakaoReturnData.setEmail(jsonNode.path("kakao_account").path("email").asText());

    MemberEntity findUser = memberRepository.findByMSocialTypeAndMSocialid(SocialType.KAKAO, kakaoReturnData.getId()).orElse(null);

    if(findUser == null) {
        log.info("카카오 신규 회원가입 요청");
        return saveUser(kakaoReturnData);
    }
    log.info("카카오 기존 회원 정보 반환");
    return findUser;
}

    private MemberEntity saveUser(KakaoReturnData kakaoReturnData) {
        MemberEntity savedMember = memberRepository.save(
                MemberEntity.builder()
                        .MId("Kakao-"+kakaoReturnData.getEmail())
                        .MSocialid(kakaoReturnData.getId())
                        .MSocialType(SocialType.KAKAO)
                        .MEmail(kakaoReturnData.getEmail())
                        .MName(kakaoReturnData.getNickname())
                        .AIidx(100)
                        .AIname("카카오 코딩 스쿨")
                        .MNickname("카카오 가입 테스트 닉네임")
                        .build()
        );

        log.info("카카오 신규 회원가입 성공");

        return savedMember;
    }

    private void deleteToken(String accessToken) {
        RestTemplate rt = new RestTemplate();

        HttpHeaders headers = new HttpHeaders();
        headers.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");
        headers.add("Authorization", "Bearer " + accessToken);

        HttpEntity<MultiValueMap<String, String>> kakaoTokenRequest = new HttpEntity<>(headers);

        ResponseEntity<String> response = rt.exchange(
                "https://kapi.kakao.com/v1/user/logout", // https://{요청할 서버 주소}
                HttpMethod.POST, // 요청할 방식
                kakaoTokenRequest, // 요청할 때 보낼 데이터
                String.class // 요청 시 반환되는 데이터 타입
        );

        log.info("카카오 accessToken 삭제완료");
    }

}
