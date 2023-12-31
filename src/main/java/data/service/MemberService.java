package data.service;

import data.dto.MemberDto;
import data.dto.PostMessage.PostMessageDto;
import data.entity.AcademyInfoEntity;
import data.entity.MemberEntity;
import data.repository.AcademyInfoRepository;
import data.repository.MemberRepository;
import jwt.setting.settings.JwtService;
import lombok.extern.slf4j.Slf4j;
import naver.cloud.NcpObjectStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.*;

import org.springframework.web.multipart.MultipartFile;

@Service
@Slf4j
public class MemberService {


    private final MemberRepository memberRepository;
    private final AcademyInfoRepository academyInfoRepository;
    private final PasswordEncoder passwordEncoder;
    private final PostMessageService postMessageService;

    private final JwtService jwtService;

    @Autowired
    private NcpObjectStorageService storageService;

    @Value("${aws.s3.bucketName}")
    private String bucketName;

    public MemberService(MemberRepository memberRepository, AcademyInfoRepository academyInfoRepository, PasswordEncoder passwordEncoder, PostMessageService postMessageService, JwtService jwtService) {
        this.memberRepository = memberRepository;
        this.academyInfoRepository = academyInfoRepository;
        this.passwordEncoder = passwordEncoder;
        this.postMessageService = postMessageService;
        this.jwtService = jwtService;
    }

    public String uploadPhoto(MultipartFile upload, HttpSession session){
        String photo = storageService.uploadFile(bucketName,"devster/member",upload);
        if(session.getAttribute("photo") != null) {
            storageService.deleteFile(bucketName,"devster/member",session.getAttribute("photo").toString());
        }
        session.setAttribute("photo", photo);
        log.info("일반회원 업로드 완료");
        return photo;
    }

    public void resetPhoto(String photo, HttpSession session) {
        storageService.deleteFile(bucketName,"devster/member",photo);
        session.removeAttribute("photo");
        log.info("일반회원 사진 초기화 완료");
    }

    public void registerMember(MemberDto dto,HttpSession session) throws Exception {
        if(memberRepository.existsByMEmail(dto.getM_email())) {
            throw new Exception("이미 존재하는 이메일입니다.");
        }

        if(memberRepository.existsByMId(dto.getM_id())) {
            throw new Exception("이미 존재하는 아이디 입니다.");
        }

        if(memberRepository.existsByMNickname(dto.getM_nickname())) {
            throw new Exception("이미 존재하는 닉네임 입니다.");
        }

        String photo = (String) session.getAttribute("photo");
        if(photo != null) {
            dto.setM_photo(photo);
        }

        MemberEntity member = MemberEntity.toMemberEntity(dto);
        member.passwordEncode(passwordEncoder);
        memberRepository.save(member);
        log.info("일반회원 회원가입 완료");

        session.removeAttribute("photo");
    }



    public List<MemberDto> getAllMembers() {
        List<MemberDto> list = new ArrayList<>();
        for (MemberEntity entity : memberRepository.findAll()) {
            list.add(MemberDto.toMemberDto(entity));
        }

        log.info("일반회원정보 출력 완료");
        return list;
    }

    public MemberDto getOneMember(int idx) {
        MemberEntity member = memberRepository.findById(idx)
                .orElseThrow(() -> new EntityNotFoundException("해당 idx 는 존재하지 않습니다. " + idx));

        log.info("m_idx " + idx + " 정보 출력 완료");

        return MemberDto.toMemberDto(member);
    }

    public void updateMember(MemberDto dto) {
        Optional<MemberEntity> entity = memberRepository.findById(dto.getM_idx());

        if(entity.isPresent()){
            MemberEntity entityForUpdate = entity.get();
            entityForUpdate.setMNickname(dto.getM_nickname());
            //비밀번호 암호화후 재 삽입
//            entityForUpdate.setMEmail(dto.getM_email());
//            entityForUpdate.passwordEncode(passwordEncoder);
            memberRepository.save(entityForUpdate);

            log.info("일반회원정보 업데이트 완료");
        }
    }

    public void updatePhoto(MultipartFile upload, HttpServletRequest request) {
        int m_idx = jwtService.extractIdx(jwtService.extractAccessToken(request).get()).get();

        Optional<MemberEntity> entity = memberRepository.findById(m_idx);
        storageService.deleteFile(bucketName,"devster/member",entity.get().getMPhoto());
        entity.get().setMPhoto(storageService.uploadFile(bucketName,"devster/member",upload));
        memberRepository.save(entity.get());

        log.info(m_idx+" 회원 프로필 사진 업데이트 완료");
    }

    public boolean isDuplicateEmail(String m_email) {
        log.info("일반회원 이메일 중복확인 완료");
        return memberRepository.existsByMEmail(m_email);
    }

    public List<AcademyInfoEntity> academyNameSearch(String name) {
        log.info("일반회원 학원명 검색 완료");
        return academyInfoRepository.findAllByAInameContains(name);
    }

    public String academyName(int ai_idx) {
        return academyInfoRepository.findById(ai_idx).get().getAIname();
    }

    public boolean isDuplicateId(String id) {
        log.info("일반회원 아이디 중복확인 완료");
        return memberRepository.existsByMId(id);
    }
    
    public boolean isDuplicateNickname(String nickname) {
        log.info("일반회원 닉네임 중복확인 완료");
        return memberRepository.existsByMNickname(nickname);
    }

    public void logout(String token) {
        jwtService.removeRefreshToken(token.substring(7));
    }

    public String checkPhoto(MultipartFile upload, HttpServletRequest request){
        int m_idx = jwtService.extractIdx(jwtService.extractAccessToken(request).get()).get();
        Optional<MemberEntity> entity = memberRepository.findById(m_idx);
        String photo = storageService.uploadFile(bucketName,"devster/member/checkphoto",upload);

        entity.get().setMFilename(photo);
        memberRepository.save(entity.get());
        log.info("일반회원 인증사진 업로드 완료");
        return photo;
    }

    public String confirmRole(int m_idx,boolean sign) {
        MemberEntity member = memberRepository.findById(m_idx).get();
        PostMessageDto postMessageDto = new PostMessageDto();

        if(sign) {
            storageService.deleteFile(bucketName,"devster/member",member.getMFilename());
            member.authorizeUser();
            member.setMFilename("no");
            memberRepository.save(member);
            log.info("일반 회원 USER 승급 승인");
            
            //승급 성공후 쪽지 발송 로직
            postMessageDto.setSend_nick("관리자");
            postMessageDto.setSubject("학원 인증 승인");
            postMessageDto.setContent("학원 인증이 승인되었습니다. \n 이제부터 게시판을 자유롭게 이용하실 수 있습니다!");
            postMessageDto.setRecv_nick(member.getMNickname());
            postMessageService.sendPostMessage(postMessageDto);
            log.info(postMessageDto.getRecv_nick() + " 회원 학원 인증 승인 쪽지 발송 성공");
            return "일반 회원 USER 승급 승인";
        } else {
            storageService.deleteFile(bucketName,"devster/member",member.getMFilename());
            member.setMFilename("no");
            memberRepository.save(member);
            log.info("일반 회원 USER 승급 반려");

            //승급 성공후 쪽지 발송 로직
            postMessageDto.setSend_nick("관리자");
            postMessageDto.setSubject("학원 인증 반려");
            postMessageDto.setContent("학원 인증이 반려되었습니다. \n 학원 인증 사진을 확인 후 다시 올려주세요!");
            postMessageDto.setRecv_nick(member.getMNickname());
            postMessageService.sendPostMessage(postMessageDto);
            log.info(postMessageDto.getRecv_nick() + " 회원 학원 인증 반려 쪽지 발송 성공");
            return "일반 회원 USER 승급 반려";
        }
    }

    public String findId(String email) {
        Optional<MemberEntity> optionalMember = memberRepository.findByMEmail(email);
        if (optionalMember.isPresent()) {
            return optionalMember.get().getMId(); // 가정: MemberEntity에 getId() 메서드가 존재함
        } else {
            log.info("해당 email 로 가입된 회원은 존재하지 않습니다." + email);
            return "해당 email 로 가입된 회원은 존재하지 않습니다. " + email;
        }
    }
    
    public String resetPass(String email,String password) {
        Optional<MemberEntity> optionalMember = memberRepository.findByMEmail(email);
        if (optionalMember.isPresent()) {
            optionalMember.get().setMPass(passwordEncoder.encode(password));
            memberRepository.save(optionalMember.get());
            log.info("비밀번호 초기화 완료");
            return "비밀번호 초기화 완료";
        } else {
            return "해당 email 로 가입된 회원은 존재하지 않습니다. " + email;
        }
    }
    
    public String deleteMember(HttpServletRequest request) {
        int m_idx = jwtService.extractIdx(jwtService.extractAccessToken(request).get()).get();
        memberRepository.delete(memberRepository.findById(m_idx).get());
        log.info("회원 탈퇴 성공");
        return "회원 탈퇴 성공";
    }


}

