package jwt.setting.settings;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import data.repository.CompanyMemberRepository;
import data.repository.MemberRepository;
import lombok.Data;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Data
@Slf4j
public class JwtService {

    @Value("${jwt.secretKey}")
    private String secretKey;

    @Value("${jwt.access.expiration}")
    private Long accessTokenExpirationPeriod;

    @Value("${jwt.refresh.expiration}")
    private Long refreshTokenExpirationPeriod;

    @Value("${jwt.access.header}")
    private String accessHeader;

    @Value("${jwt.refresh.header}")
    private String refreshHeader;

    private static final String ACCESS_TOKEN_SUBJECT = "AccessToken";
    private static final String REFRESH_TOKEN_SUBJECT = "RefreshToken";
    private static final String IDX_CLAIM = "idx";
    private static final String TYPE_CLAIM = "type";
    private static final String BEARER = "Bearer ";

    private final MemberRepository memberRepository;
    private final CompanyMemberRepository companyMemberRepository;

    public String generateAccessToken(int idx,String type) {
        Date now = new Date();
            return JWT.create()
                    .withSubject(ACCESS_TOKEN_SUBJECT)
                    .withExpiresAt(new Date(now.getTime() + accessTokenExpirationPeriod))
                    .withClaim(IDX_CLAIM, idx)
                    .withClaim(TYPE_CLAIM, type)
                    .sign(Algorithm.HMAC512(secretKey));
    }

    /**
     * RefreshToken 생성
     * RefreshToken은 Claim에 email도 넣지 않으므로 withClaim() X
     */
    public String generateRefreshToken(String type) {
        Date now = new Date();
        return JWT.create()
                .withSubject(REFRESH_TOKEN_SUBJECT)
                .withExpiresAt(new Date(now.getTime() + refreshTokenExpirationPeriod))
                .withClaim(TYPE_CLAIM, type)
                .sign(Algorithm.HMAC512(secretKey));
    }

    public void sendAccessToken(HttpServletResponse response, String accessToken) {
        response.setStatus(HttpServletResponse.SC_OK);

        response.setHeader(accessHeader,accessToken);
        log.info("발급된 Access Token : {}",accessToken);
    }

    public void sendAccessAndRefreshToken(HttpServletResponse response, String accessToken, String refreshToken) {
        response.setStatus(HttpServletResponse.SC_OK);

        setAccessTokenHeader(response, accessToken);
        setRefreshTokenHeader(response, refreshToken);
        log.info("Access Token, Refresh Token 헤더 설정 완료");
    }


    /**
     * 헤더에서 RefreshToken 추출
     * 토큰 형식 : Bearer XXX에서 Bearer를 제외하고 순수 토큰만 가져오기 위해서
     * 헤더를 가져온 후 "Bearer"를 삭제(""로 replace)
     */
    public Optional<String> extractRefreshToken(HttpServletRequest request) {
        return Optional.ofNullable(request.getHeader(refreshHeader))
                .filter(refreshToken -> refreshToken.startsWith(BEARER))
                .map(refreshToken -> refreshToken.replace(BEARER,""));
    }
    // 상기 동일
    public Optional<String> extractAccessToken(HttpServletRequest request) {
        return Optional.ofNullable(request.getHeader(accessHeader))
                .filter(refreshToken -> refreshToken.startsWith(BEARER))
                .map(refreshToken -> refreshToken.replace(BEARER,""));
    }

    /**
     * AccessToken에서 Email 추출
     * 추출 전에 JWT.require()로 검증기 생성
     * verify로 AceessToken 검증 후
     * 유효하다면 getClaim()으로 이메일 추출
     * 유효하지 않다면 빈 Optional 객체 반환
     */
    public Optional<Integer> extractIdx(String accessToken) {
        try {
            return Optional.ofNullable(JWT.require(Algorithm.HMAC512(secretKey))
                    .build()
                    .verify(accessToken)
                    .getClaim(IDX_CLAIM)
                    .asInt());

        } catch (Exception e){
            log.error(" 토큰이 유효하지 않습니다. ");
            return Optional.empty();
        }
    }

    public Optional<String> extractType(String token) {
        try {
            return Optional.ofNullable(JWT.require(Algorithm.HMAC512(secretKey))
                    .build()
                    .verify(token)
                    .getClaim(TYPE_CLAIM)
                    .asString());

        } catch (Exception e){
            log.error(" 토큰이 유효하지 않습니다. ");
            log.error(e.getMessage());
            return Optional.empty();
        }
    }

    /**
     * AccessToken 헤더 설정
     */
    public void setAccessTokenHeader(HttpServletResponse response, String accessToken) {
        response.setHeader(accessHeader, accessToken);
    }

    /**
     * RefreshToken 헤더 설정
     */
    public void setRefreshTokenHeader(HttpServletResponse response, String refreshToken) {
        response.setHeader(refreshHeader, refreshToken);
    }

    public void saveRefreshToken(int m_idx , String refreshToken) {
        memberRepository.findById(m_idx)
                .ifPresentOrElse(
                        member -> member.setMRefreshtoken(refreshToken),
                        () -> new Exception(" 일치하는 회원이 없습니다. ")
                );
    }

    public void removeRefreshToken(String accessToken) {
        Optional<Integer> m_idx = extractIdx(accessToken);

        if (m_idx.isPresent()) {
            memberRepository.findById(m_idx.get())
                    .ifPresentOrElse(
                            member -> {
                                member.setMRefreshtoken(null);
                                memberRepository.save(member); // 변경 사항 저장
                            },
                            () -> new Exception(" 일치하는 회원이 없습니다. ")
                    );
        } else {
            new Exception(" 일치하는 회원이 없습니다. ");
        }
    }

    public void removeRefreshTokenComp(String accessToken) {
        Optional<Integer> cm_idx = extractIdx(accessToken);

        if (cm_idx.isPresent()) {
            companyMemberRepository.findById(cm_idx.get())
                    .ifPresentOrElse(
                            companyMember -> {
                                companyMember.setCMrefreshtoken(null);
                                companyMemberRepository.save(companyMember); // 변경 사항 저장
                            },
                            () -> new Exception(" 일치하는 회원이 없습니다. ")
                    );
        } else {
            new Exception(" 일치하는 회원이 없습니다. ");
        }
    }


    public boolean isTokenValid(String token) {
        try {
            JWT.require(Algorithm.HMAC512(secretKey)).build().verify(token);
            return true;
        } catch (Exception e) {
            log.error("유효하지 않은 토큰입니다. {}", e.getMessage());
            return false;
        }
    }
}
