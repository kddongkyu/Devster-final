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
import org.springframework.security.core.parameters.P;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

@RequiredArgsConstructor
@Slf4j
public class JwtAuthenticationProcessingFilter extends OncePerRequestFilter {

    private static final String NO_CHECK_URL_MEMBER = "/member/login";
    private static final String NO_CHECK_URL_COMPANYMEMBER = "/compmember/login";
    private final JwtService jwtService;
    private final MemberRepository memberRepository;
    private final CompanyMemberRepository companyMemberRepository;

    private GrantedAuthoritiesMapper authoritiesMapper = new NullAuthoritiesMapper();

    private String refreshToken;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        if (request.getRequestURI().equals(NO_CHECK_URL_MEMBER)) {
            filterChain.doFilter(request, response); // "/login" 요청이 들어오면, 다음 필터 호출
            return; // return으로 이후 현재 필터 진행 막기 (안해주면 아래로 내려가서 계속 필터 진행시킴)
        } else if(request.getRequestURI().equals(NO_CHECK_URL_COMPANYMEMBER)) {
            filterChain.doFilter(request, response); // "/login" 요청이 들어오면, 다음 필터 호출
            return; // return으로 이후 현재 필터 진행 막기 (안해주면 아래로 내려가서 계속 필터 진행시킴)
        } else {
            String uri = request.getRequestURI();
            String[] uriParts = uri.split("/");

            // 사용자 요청 헤더에서 RefreshToken 추출
            // -> RefreshToken이 없거나 유효하지 않다면(DB에 저장된 RefreshToken과 다르다면) null을 반환
            // 사용자의 요청 헤더에 RefreshToken이 있는 경우는, AccessToken이 만료되어 요청한 경우밖에 없다.
            // 따라서, 위의 경우를 제외하면 추출한 refreshToken은 모두 null
            String refreshToken = jwtService.extractRefreshToken(request)
                    .filter(jwtService::isTokenValid)
                    .orElse(null);

            if (uriParts.length > 1) {
                String prefix = uriParts[1];

                if (prefix.equals("member")) {
                    // member에 대한 처리

                    // 리프레시 토큰이 요청 헤더에 존재했다면, 사용자가 AccessToken이 만료되어서
                    // RefreshToken까지 보낸 것이므로 리프레시 토큰이 DB의 리프레시 토큰과 일치하는지 판단 후,
                    // 일치한다면 AccessToken을 재발급해준다.
                    if (refreshToken != null) {
                        checkRefreshTokenAndReIssueAccessToken(response, refreshToken);
                        return; // RefreshToken을 보낸 경우에는 AccessToken을 재발급 하고 인증 처리는 하지 않게 하기위해 바로 return으로 필터 진행 막기
                    }

                    // RefreshToken이 없거나 유효하지 않다면, AccessToken을 검사하고 인증을 처리하는 로직 수행
                    // AccessToken이 없거나 유효하지 않다면, 인증 객체가 담기지 않은 상태로 다음 필터로 넘어가기 때문에 403 에러 발생
                    // AccessToken이 유효하다면, 인증 객체가 담긴 상태로 다음 필터로 넘어가기 때문에 인증 성공
                    if (refreshToken == null) {
                        checkAccessTokenAndAuthentication(request, response, filterChain);
                    }
                } else if (prefix.equals("compmember")) {
                    // compmember에 대한 처리

                    // 리프레시 토큰이 요청 헤더에 존재했다면, 사용자가 AccessToken이 만료되어서
                    // RefreshToken까지 보낸 것이므로 리프레시 토큰이 DB의 리프레시 토큰과 일치하는지 판단 후,
                    // 일치한다면 AccessToken을 재발급해준다.
                    if (refreshToken != null) {
                        checkRefreshTokenAndReIssueAccessTokenComp(response, refreshToken);
                        return; // RefreshToken을 보낸 경우에는 AccessToken을 재발급 하고 인증 처리는 하지 않게 하기위해 바로 return으로 필터 진행 막기
                    }

                    // RefreshToken이 없거나 유효하지 않다면, AccessToken을 검사하고 인증을 처리하는 로직 수행
                    // AccessToken이 없거나 유효하지 않다면, 인증 객체가 담기지 않은 상태로 다음 필터로 넘어가기 때문에 403 에러 발생
                    // AccessToken이 유효하다면, 인증 객체가 담긴 상태로 다음 필터로 넘어가기 때문에 인증 성공
                    if (refreshToken == null) {
                        checkAccessTokenAndAuthenticationComp(request, response, filterChain);
                    }
                } else {
                    if (refreshToken != null) {
                        if(jwtService.extractType(refreshToken).get().equals("company")) {
                            checkRefreshTokenAndReIssueAccessTokenComp(response, refreshToken);
                            return; // RefreshToken을 보낸 경우에는 AccessToken을 재발급 하고 인증 처리는 하지 않게 하기위해 바로 return으로 필터 진행 막기
                        } else {
                            checkRefreshTokenAndReIssueAccessToken(response, refreshToken);
                            return; // RefreshToken을 보낸 경우에는 AccessToken을 재발급 하고 인증 처리는 하지 않게 하기위해 바로 return으로 필터 진행 막기
                        }
                    }

                    // RefreshToken이 없거나 유효하지 않다면, AccessToken을 검사하고 인증을 처리하는 로직 수행
                    // AccessToken이 없거나 유효하지 않다면, 인증 객체가 담기지 않은 상태로 다음 필터로 넘어가기 때문에 403 에러 발생
                    // AccessToken이 유효하다면, 인증 객체가 담긴 상태로 다음 필터로 넘어가기 때문에 인증 성공
                    if (refreshToken == null) {
                        String accessToken = jwtService.extractAccessToken(request)
                                                        .filter(jwtService::isTokenValid)
                                                        .orElse(null);

                        String type = jwtService.extractType(accessToken).toString();
                        if(type.equals("company")){
                            checkAccessTokenAndAuthenticationComp(request, response, filterChain);
                        } else {
                            checkAccessTokenAndAuthentication(request,response,filterChain);
                        }
                    }
                }
            } else {

            }
        }
    }

    public void checkRefreshTokenAndReIssueAccessToken(HttpServletResponse response, String refreshToken) {
        Optional<MemberEntity> optionalMemberEntity = memberRepository.findByMRefreshtoken(refreshToken);

        if (optionalMemberEntity.isPresent()) {
            MemberEntity memberEntity = optionalMemberEntity.get();
            String reIssuedRefreshToken = reIssueRefreshToken(memberEntity);
            jwtService.sendAccessAndRefreshToken(response, jwtService.generateAccessToken(memberEntity.getMIdx(),"normal"),
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
            jwtService.sendAccessAndRefreshToken(response, jwtService.generateAccessToken(companyMemberEntity.getCMidx(),"company"),
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
