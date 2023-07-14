package data.service;

import data.dto.CompanyMemberDto;
import data.entity.CompanyMemberEntity;
import data.repository.CompanyMemberRepository;
import jwt.setting.settings.JwtService;
import naver.cloud.NcpObjectStorageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;



@Service
public class CompanyMemberService {
    private final Logger logger = LoggerFactory.getLogger(CompanyMemberService.class);

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

    String photo = null;

    public String uploadPhoto(MultipartFile upload){
        if(photo != null) {
            storageService.deleteFile(bucketName,"devster/companymember",photo);
        }
        photo = storageService.uploadFile(bucketName,"devster/companymember",upload);
        logger.info(" 기업회원 사진 업로드 완료");
        return photo;
    }

    public void resetPhoto(String photo) {
        storageService.deleteFile(bucketName,"devster/companymember",photo);
        logger.info("기업회원 사진 초기화 완료");
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

        logger.info("모든 기업회원 정보 출력 완료");
        return list;
    }

    public CompanyMemberDto getOneCompanyMember(int idx) {
        CompanyMemberEntity companyMemberEntity = companyMemberRepository.findById((Integer) idx)
                .orElseThrow(() -> new EntityNotFoundException("해당 idx 는 존재하지 않습니다. " + idx));
        logger.info("cm_idx" + idx + "정보 출력 완료");

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

            logger.info("기업회원정보 업데이트 완료");
        }
    }

    public boolean isDuplicatedCompName(String companyName) {
        boolean isDuplicate = companyMemberRepository.existsByCMcompname(companyName);
        logger.info("기업회원 기업명 중복확인 완료");
        return isDuplicate;
    }

    public boolean isDuplicateEmail(String cm_email) {
        boolean isDuplicate = companyMemberRepository.existsByCMemail(cm_email);
        logger.info("기업회원 이메일 중복확인 완료");
        return isDuplicate;
    }

    public void logout(String token) {
        jwtService.removeRefreshTokenComp(token.substring(7));
    }



}
