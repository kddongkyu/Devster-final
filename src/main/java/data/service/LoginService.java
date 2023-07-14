package data.service;

import data.entity.CompanyMemberEntity;
import data.entity.MemberEntity;
import data.repository.CompanyMemberRepository;
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
    private final CompanyMemberRepository companyMemberRepository;

    @Override
    public UserDetails loadUserByUsername (String id) throws UsernameNotFoundException {
        if(id.contains("@")) {
            CompanyMemberEntity compMember = companyMemberRepository.findByCMemail(id)
                    .orElseThrow(()-> new UsernameNotFoundException("해당 이메일이 존재하지 않습니다."));

            return org.springframework.security.core.userdetails.User.builder()
                    .username(compMember.getCMemail())
                    .password(compMember.getCMpass())
                    .roles(compMember.getCMrole().name())
                    .build();
        } else {
            MemberEntity member = memberRepository.findByMId(id)
                    .orElseThrow(()-> new UsernameNotFoundException("해당 아이디가 존재하지 않습니다."));

            return org.springframework.security.core.userdetails.User.builder()
                    .username(member.getMId())
                    .password(member.getMPass())
                    .roles(member.getMRole().name())
                    .build();
        }
    }
}
