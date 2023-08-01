package data.service;

import data.dto.CompanyMemberDto;
import data.dto.PostMessage.PostMessageDto;
import data.entity.CompanyMemberEntity;
import data.entity.MemberEntity;
import data.repository.CompanyMemberRepository;
import data.repository.MemberRepository;
import jwt.setting.settings.JwtService;
import lombok.extern.slf4j.Slf4j;
import naver.cloud.NcpObjectStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;



@Service
@Slf4j
public class CompanyMemberService {

    private final CompanyMemberRepository companyMemberRepository;
    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final PostMessageService postMessageService;

    public CompanyMemberService(CompanyMemberRepository companyMemberRepository, MemberRepository memberRepository, PasswordEncoder passwordEncoder, JwtService jwtService, PostMessageService postMessageService) {
        this.companyMemberRepository = companyMemberRepository;
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.postMessageService = postMessageService;
    }

    @Autowired
    private NcpObjectStorageService storageService;

    @Value("${aws.s3.bucketName}")
    private String bucketName;

    public String uploadPhoto(MultipartFile upload, HttpSession session, HttpServletRequest request){
        int cm_idx = jwtService.extractIdx(jwtService.extractAccessToken(request).get()).get();

        String photo = storageService.uploadFile(bucketName,"devster/companymember",upload);

        if(session.getAttribute("photo") != null) {
            storageService.deleteFile(bucketName,"devster/companymember",session.getAttribute("photo").toString());
        }

        session.setAttribute("photo",photo);

        CompanyMemberEntity companyMember = companyMemberRepository.findById(cm_idx).orElseThrow(() -> new EntityNotFoundException("해당 idx 는 존재하지 않습니다. " + cm_idx));
        companyMember.setCMfilename(photo);
        companyMemberRepository.save(companyMember);

        log.info(" 기업회원 사진 업로드 완료");
        session.removeAttribute("photo");
        return photo;
    }

    public void resetPhoto(String photo, HttpSession session) {
        storageService.deleteFile(bucketName,"devster/companymember",photo);
        session.removeAttribute("photo");
        log.info("기업회원 사진 초기화 완료");
    }

    public void registerCompanymember(CompanyMemberDto dto) throws Exception {
        if(companyMemberRepository.existsByCMemail(dto.getCm_email())) {
            throw new Exception("이미 존재하는 이메일입니다.");
        }
        //기업회원 가입 로직
        CompanyMemberEntity companyMember = CompanyMemberEntity.toCompanyMemberEntity(dto);
        companyMember.passwordEncode(passwordEncoder);
        companyMemberRepository.save(companyMember);
        log.info("기업회원 가입 성공.");

        //기업회원 더미 가입 로직.
        MemberEntity member = new MemberEntity();
        member.setMPass(companyMember.getCMpass());
        member.setMEmail(companyMember.getCMcompname() + companyMember.getCMemail());
        member.setAIidx(0);
        member.setAIname("기타");
        member.setMId(companyMember.getCMcompname() + companyMember.getCMreg());
        member.setMName(companyMember.getCMcompname());
        member.setMPhoto("no");
        member.setMNickname(companyMember.getCMcompname());
        memberRepository.save(member);
        log.info("기업회원용 더미 일반회원 가입 성공");

    }
    public List<CompanyMemberDto> getAllCompanyMembers() {
        List<CompanyMemberDto> list = new ArrayList<>();
        for (CompanyMemberEntity companyMemberEntity : companyMemberRepository.findAll()) {
            list.add(CompanyMemberDto.toCompanyMemberDto(companyMemberEntity));
        }

        log.info("모든 기업회원 정보 출력 완료");
        return list;
    }

    public CompanyMemberDto getOneCompanyMember(int idx) {
        CompanyMemberEntity companyMemberEntity = companyMemberRepository.findById((Integer) idx)
                .orElseThrow(() -> new EntityNotFoundException("해당 idx 는 존재하지 않습니다. " + idx));
        log.info("cm_idx" + idx + "정보 출력 완료");

        return CompanyMemberDto.toCompanyMemberDto(companyMemberEntity);
    }

    public void updateCompanyMember(CompanyMemberDto dto) {
        Optional<CompanyMemberEntity> companyMemberEntity = companyMemberRepository.findById(dto.getCm_idx());

        if(companyMemberEntity.isPresent()){
            CompanyMemberEntity entityForUpdate = companyMemberEntity.get();
            entityForUpdate.setCMaddr(dto.getCm_addr());
            entityForUpdate.setCMtele(dto.getCm_tele());
            entityForUpdate.setCMpost(dto.getCm_post());
            entityForUpdate.setCMname(dto.getCm_name());
            entityForUpdate.setCMcp(dto.getCm_cp());
            entityForUpdate.setCMcompname(dto.getCm_compname());
            companyMemberRepository.save(entityForUpdate);

            log.info("기업회원정보 업데이트 완료");
        }
    }

    public boolean isDuplicateRegNum(String regNum) {
        boolean isDuplicate = companyMemberRepository.existsByCMreg(regNum);
        log.info("기업회원 사업자 등록번호 중복확인 완료");
        return isDuplicate;
    }

    public boolean isDuplicateHp(String hp) {
        boolean isDuplicate = companyMemberRepository.existsByCMcp(hp);
        log.info("기업회원 담당자 휴대폰 번호 중복확인 완료");
        return isDuplicate;
    }

    public boolean isDuplicatedCompName(String companyName) {
        boolean isDuplicate = companyMemberRepository.existsByCMcompname(companyName);
        log.info("기업회원 기업명 중복확인 완료");
        return isDuplicate;
    }

    public boolean isDuplicateEmail(String cm_email) {
        boolean isDuplicate = companyMemberRepository.existsByCMemail(cm_email);
        log.info("기업회원 이메일 중복확인 완료");
        return isDuplicate;
    }

    public void logout(String token) {
        jwtService.removeRefreshTokenComp(token.substring(7));
    }

    public String confirmRole(int cm_idx, boolean sign) {
        CompanyMemberEntity companyMember = companyMemberRepository.findById(cm_idx).orElseThrow(()-> new EntityNotFoundException("해당 cm_idx 는 존재하지않습니다. " + cm_idx));
        PostMessageDto postMessageDto = new PostMessageDto();

        if(sign) {
            storageService.deleteFile(bucketName,"devster/companymember",companyMember.getCMfilename());
            companyMember.authorizeUser();
            companyMember.setCMfilename("no");
            companyMemberRepository.save(companyMember);
            log.info("기업 회원 USER 승급 승인");

            //승급 성공후 쪽지 발송 로직
            postMessageDto.setSend_nick("관리자");
            postMessageDto.setSubject("사업자 인증 승인");
            postMessageDto.setContent("사업자 인증이 승인되었습니다. \n 이제부터 이력서 조회와 쪽지 기능을 사용할 수 있습니다!");
            postMessageDto.setRecv_nick(companyMember.getCMcompname());
            postMessageService.sendPostMessage(postMessageDto);
            log.info(postMessageDto.getRecv_nick() + " 사업자 인증 승인 쪽지 발송 성공");
            return "기업 회원 USER 승급 승인";
        } else {
            storageService.deleteFile(bucketName,"devster/companymember",companyMember.getCMfilename());
            companyMember.setCMfilename("no");
            companyMemberRepository.save(companyMember);
            log.info("기업 회원 USER 승급 반려");

            //승급 성공후 쪽지 발송 로직
            postMessageDto.setSend_nick("관리자");
            postMessageDto.setSubject("사업자 인증 반려");
            postMessageDto.setContent("사업자 인증이 반려되었습니다. \n 사업자 인증 사진을 확인 후 다시 올려주세요!");
            postMessageDto.setRecv_nick(companyMember.getCMcompname());
            postMessageService.sendPostMessage(postMessageDto);
            log.info(postMessageDto.getRecv_nick() + " 사업자 인증 반려 쪽지 발송 성공");
            return "기업 회원 USER 승급 반려";
        }
    }

    public String findId(String number) {
        Optional<CompanyMemberEntity> optionalCompanyMember = companyMemberRepository.findByCMcp(number);
        if (optionalCompanyMember.isPresent()) {
            return optionalCompanyMember.get().getCMemail(); // 가정: MemberEntity에 getId() 메서드가 존재함
        } else {
            log.info("해당 email 로 가입된 회원은 존재하지 않습니다." + number);
            return "해당 email 로 가입된 회원은 존재하지 않습니다. " + number;
        }
    }

    public String resetPass(String number,String password) {
        Optional<CompanyMemberEntity> optionalCompanyMember = companyMemberRepository.findByCMcp(number);
        if (optionalCompanyMember.isPresent()) {
            optionalCompanyMember.get().setCMpass(passwordEncoder.encode(password));
            companyMemberRepository.save(optionalCompanyMember.get());
            log.info("비밀번호 초기화 및 재설정 완료");
            return "비밀번호 초기화 및 재설정 완료";
        } else {
            return "해당 email 로 가입된 회원은 존재하지 않습니다. " + number;
        }
    }

    public String deleteCompMember(HttpServletRequest request) {
        int cm_idx = jwtService.extractIdx(jwtService.extractAccessToken(request).get()).get();
        
        //멤버 더미 데이터 삭제
        memberRepository.delete(memberRepository.findByMNickname(companyMemberRepository.findById(cm_idx).get().getCMcompname()).get());
        log.info("기업회원용 일반회원 더미 데이터 삭제 완료");
        
        companyMemberRepository.delete(companyMemberRepository.findById(cm_idx).get());
        log.info("기업회원 탈퇴 성공");

        return "기업회원 탈퇴 성공";
    }



}
