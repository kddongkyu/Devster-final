package jwt.setting.filter;
import data.entity.CompanyMemberEntity;
import data.entity.MemberEntity;
import data.repository.CompanyMemberRepository;
import data.repository.MemberRepository;
import jwt.setting.settings.JwtService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.mapping.GrantedAuthoritiesMapper;
import org.springframework.security.core.authority.mapping.NullAuthoritiesMapper;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;
import java.util.UUID;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationProcessingFilter extends OncePerRequestFilter {
    private static final String[] NO_CHECK_URLS = {"/api/member/login","/api/compmember/login","/api/member/login/kakao","/api/member/naver"};
    private static final Pattern PERMIT_ALL_PATTERN = Pattern.compile("^/api/.*?/D0(/.*)?$");
    private final JwtService jwtService;
    private final MemberRepository memberRepository;
    private final CompanyMemberRepository companyMemberRepository;
    private GrantedAuthoritiesMapper authoritiesMapper = new NullAuthoritiesMapper();
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if (!request.getRequestURI().startsWith("/api")) {
            filterChain.doFilter(request, response);
            return;
        } else {
            Matcher matcher = PERMIT_ALL_PATTERN.matcher(request.getRequestURI());
            if (matcher.matches()) {
                filterChain.doFilter(request, response);
                return;
            }
            for (String url : NO_CHECK_URLS) {
                if (request.getRequestURI().equals(url)) {
                    filterChain.doFilter(request, response);
                    return;
                }
            }
            String refreshToken = jwtService.extractRefreshToken(request)
                    .filter(jwtService::isTokenValid)
                    .orElse(null);
            if (refreshToken != null) {
                Optional<String> optionalType = jwtService.extractType(refreshToken);
                if (optionalType.isPresent()) {
                    String type = optionalType.get();
                    if (type.equals("company")) {
                        checkRefreshTokenAndReIssueAccessTokenComp(response, refreshToken);
                        return;
                    } else {
                        checkRefreshTokenAndReIssueAccessToken(response, refreshToken);
                        return;
                    }
                } else {
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "토큰의 유형이 없습니다.");
                    return;
                }
            }
            Optional<String> optionalAccessToken = jwtService.extractAccessToken(request)
                    .filter(jwtService::isTokenValid);
            if(optionalAccessToken.isPresent()) {
                String accessToken = optionalAccessToken.get();
                Optional<String> optionalType = jwtService.extractType(accessToken);
                if (optionalType.isPresent()) {
                    String type = optionalType.get();
                    log.info(type);
                    if (type.equals("company")) {
                        checkAccessTokenAndAuthenticationComp(request, response, filterChain);
                    } else {
                        checkAccessTokenAndAuthentication(request, response, filterChain);
                    }
                } else {
                    log.error("토큰의 유형이 없습니다.");
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "토큰의 유형이 없습니다.");
                }
            } else {
                log.error("유효한 액세스 토큰이 없습니다.");
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "유효한 액세스 토큰이 없습니다.");
            }
        }
    }
    public void checkRefreshTokenAndReIssueAccessToken(HttpServletResponse response, String refreshToken) {
        Optional<MemberEntity> optionalMemberEntity = memberRepository.findByMRefreshtoken(refreshToken);
        if (optionalMemberEntity.isPresent()) {
            MemberEntity memberEntity = optionalMemberEntity.get();
            String reIssuedRefreshToken = reIssueRefreshToken(memberEntity);
            jwtService.sendAccessAndRefreshToken(response, jwtService.generateAccessToken(memberEntity.getMIdx(),"normal",memberEntity.getMRole().toString()),
                    reIssuedRefreshToken);
        } else {
            try {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "일치하는 리프레시 토큰이 데이터베이스에 없습니다.");
            } catch (IOException e) {
                log.error("일치하는 리프레시 토큰이 데이터베이스에 없습니다.");
            }
        }
    }
    public void checkRefreshTokenAndReIssueAccessTokenComp(HttpServletResponse response, String refreshToken) {
        Optional<CompanyMemberEntity> optionalCompanyMemberEntity = companyMemberRepository.findByCMrefreshtoken(refreshToken);
        if (optionalCompanyMemberEntity.isPresent()) {
            CompanyMemberEntity companyMemberEntity = optionalCompanyMemberEntity.get();
            String reIssuedRefreshToken = reIssueRefreshTokenComp(companyMemberEntity);
            jwtService.sendAccessAndRefreshToken(response, jwtService.generateAccessToken(companyMemberEntity.getCMidx(),"company",companyMemberEntity.getCMrole().toString()),
                    reIssuedRefreshToken);
        } else {
            try {
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "일치하는 리프레시 토큰이 데이터베이스에 없습니다.");
            } catch (IOException e) {
                log.error("일치하는 리프레시 토큰이 데이터베이스에 없습니다.");
            }
        }
    }
    private String reIssueRefreshToken(MemberEntity member) {
        String reIssuedRefreshToken = jwtService.generateRefreshToken("normal");
        member.setMRefreshtoken(reIssuedRefreshToken);
        memberRepository.saveAndFlush(member);
        return reIssuedRefreshToken;
    }
    private String reIssueRefreshTokenComp(CompanyMemberEntity companyMember) {
        String reIssuedRefreshToken = jwtService.generateRefreshToken("company");
        companyMember.setCMrefreshtoken(reIssuedRefreshToken);
        companyMemberRepository.saveAndFlush(companyMember);
        return reIssuedRefreshToken;
    }
    public void checkAccessTokenAndAuthentication(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException,IOException {
        log.info("checkAccessTokenAndAuthentication() 호출");
        jwtService.extractAccessToken(request)
                .filter(jwtService::isTokenValid)
                .ifPresent(accessToken -> jwtService.extractIdx(accessToken)
                        .ifPresent(m_idx -> memberRepository.findById(m_idx)
                                .ifPresent(this::saveAuthentication)));
        filterChain.doFilter(request,response);
    }
    public void checkAccessTokenAndAuthenticationComp(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException,IOException {
        log.info("checkAccessTokenAndAuthenticationComp() 호출");
        jwtService.extractAccessToken(request)
                .filter(jwtService::isTokenValid)
                .ifPresent(accessToken -> jwtService.extractIdx(accessToken)
                        .ifPresent(cm_idx -> companyMemberRepository.findById(cm_idx)
                                .ifPresent(this::saveAuthenticationComp)));
        filterChain.doFilter(request,response);
    }
    public void saveAuthentication(MemberEntity member) {
        String password = member.getMPass();
        if (password == null) { // 소셜 로그인 유저의 비밀번호 임의로 설정 하여 소셜 로그인 유저도 인증 되도록 설정
            password = UUID.randomUUID().toString();
        }
        UserDetails userDetailsUser = org.springframework.security.core.userdetails.User.builder()
                .username(member.getMId())
                .password(password)
                .roles(member.getMRole().getKey())
                .build();
        Authentication authentication =
                new UsernamePasswordAuthenticationToken(userDetailsUser, null,
                        authoritiesMapper.mapAuthorities(userDetailsUser.getAuthorities()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
    public void saveAuthenticationComp(CompanyMemberEntity companyMember) {
        String password = companyMember.getCMpass();
        UserDetails userDetailsUser = org.springframework.security.core.userdetails.User.builder()
                .username(companyMember.getCMemail())
                .password(password)
                .roles(companyMember.getCMrole().getKey())
                .build();
        Authentication authentication =
                new UsernamePasswordAuthenticationToken(userDetailsUser, null,
                        authoritiesMapper.mapAuthorities(userDetailsUser.getAuthorities()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
    }
}