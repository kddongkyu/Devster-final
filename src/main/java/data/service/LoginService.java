package data.service;

import data.entity.MemberEntity;
import data.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class LoginService implements UserDetailsService {

    private final MemberRepository memberRepository;

    @Override
    public UserDetails loadUserByUsername (String id) throws UsernameNotFoundException {
        MemberEntity member = memberRepository.findByMId(id)
                .orElseThrow(()-> new UsernameNotFoundException("해당 아이디가 존재하지 않습니다."));

        String role = "";
        if(member.getMType() == 0) {
            role = "GUEST";
        } else if (member.getMType() == 1) {
            role = "USER";
        } else {
            role = "GUEST";
        }

        return org.springframework.security.core.userdetails.User.builder()
                .username(member.getMId())
                .password(member.getMPass())
                .roles(role)
                .build();
    }
}
