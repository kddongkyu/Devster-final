package data.service;

import data.dto.CompanyMemberDto;
import data.entity.CompanyMemberEntity;
import data.repository.CompanyMemberRepository;
import naver.cloud.NcpObjectStorageService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import static data.service.MemberService.encryptPass;


@Service
public class CompanyMemberService {
    private final Logger logger = LoggerFactory.getLogger(CompanyMemberService.class);

    private final CompanyMemberRepository companyMemberRepository;

    public CompanyMemberService(CompanyMemberRepository companyMemberRepository) {
        this.companyMemberRepository = companyMemberRepository;
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

    public CompanyMemberDto insertCompanyMember(CompanyMemberDto dto) {

        dto.setCm_filename(photo);
        Map<String,String> map = encryptPass(dto.getCm_pass());
        dto.setCm_pass(map.get("password"));
        dto.setSalt(map.get("salt"));

        CompanyMemberEntity companyMemberEntity = CompanyMemberEntity.toCompanyMemberEntity(dto);
        companyMemberRepository.save(companyMemberEntity);
        photo = null;
        logger.info("기업회원 가입 완료.");
        return dto;
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

            //비밀번호 암호화후 재 삽입
            Map<String,String> encryptedMap = encryptPass(dto.getCm_pass());
            entityForUpdate.setCMpass(encryptedMap.get("password"));
            entityForUpdate.setSalt(encryptedMap.get("salt"));
            companyMemberRepository.save(entityForUpdate);

            logger.info("기업회원정보 업데이트 완료");
        }
    }

    public boolean isDuplicateEmail(String cm_email) {
        boolean isDuplicate = companyMemberRepository.existsByCMemail(cm_email);
        logger.info("기업회원 이메일 중복확인 완료");
        return isDuplicate;
    }

}
