package data.service;

import data.dto.CompanyMemberDto;
import data.entity.CompanyMemberEntity;
import data.entity.MemberEntity;
import data.repository.CompanyMemberRepository;
import jwt.setting.settings.JwtService;
import lombok.extern.slf4j.Slf4j;
import naver.cloud.NcpObjectStorageService;
import org.hibernate.Session;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;


    public CompanyMemberService(CompanyMemberRepository companyMemberRepository, PasswordEncoder passwordEncoder, JwtService jwtService) {
        this.companyMemberRepository = companyMemberRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
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

        CompanyMemberEntity companyMember = CompanyMemberEntity.toCompanyMemberEntity(dto);
        companyMember.passwordEncode(passwordEncoder);
        companyMemberRepository.save(companyMember);

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

            companyMemberRepository.save(entityForUpdate);

            log.info("기업회원정보 업데이트 완료");
        }
    }

    public boolean isDuplicateRegNum(String regNum) {
        boolean isDuplicate = companyMemberRepository.existsByCMreg(regNum);
        log.info("기업회원 사업자 등록번호 중복확인 완료");
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

    public String confirmRole(HttpServletRequest request, boolean sign) {
        int cm_idx = jwtService.extractIdx(jwtService.extractAccessToken(request).get()).get();
        CompanyMemberEntity companyMember = companyMemberRepository.findById(cm_idx).orElseThrow(()-> new EntityNotFoundException("해당 cm_idx 는 존재하지않습니다. " + cm_idx));

        if(sign) {
            storageService.deleteFile(bucketName,"devster/companymember",companyMember.getCMfilename());
            companyMember.authorizeUser();
            companyMember.setCMfilename("no");
            companyMemberRepository.save(companyMember);
            log.info("기업 회원 USER 승급 승인");
            return "기업 회원 USER 승급 승인";
        } else {
            storageService.deleteFile(bucketName,"devster/companymember",companyMember.getCMfilename());
            companyMember.setCMfilename("no");
            companyMemberRepository.save(companyMember);
            log.info("기업 회원 USER 승급 반려");
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

        companyMemberRepository.delete(companyMemberRepository.findById(cm_idx).get());
        log.info("기업회원 탈퇴 성공");
        return "기업회원 탈퇴 성공";
    }



}
