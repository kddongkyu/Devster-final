package data.service;

import data.dto.MemberDto;
import data.entity.AcademyInfoEntity;
import data.entity.MemberEntity;
import data.repository.AcademyInfoRepository;
import data.repository.MemberRepository;
import naver.cloud.NcpObjectStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.util.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

@Service
public class MemberService {

    private final Logger logger = LoggerFactory.getLogger(MemberService.class);

    private final MemberRepository memberRepository;
    private final AcademyInfoRepository academyInfoRepository;

    private final PasswordEncoder passwordEncoder;

    @Autowired
    private NcpObjectStorageService storageService;

    @Value("${aws.s3.bucketName}")
    private String bucketName;

    String photo = null;

    public MemberService(MemberRepository memberRepository, AcademyInfoRepository academyInfoRepository, PasswordEncoder passwordEncoder) {
        this.memberRepository = memberRepository;
        this.academyInfoRepository = academyInfoRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public String uploadPhoto(MultipartFile upload){
        if(photo != null) {
            storageService.deleteFile(bucketName,"devster/member",photo);
        }
        photo = storageService.uploadFile(bucketName,"devster/member",upload);
        logger.info("일반회원 사진 업로드 완료");
        return photo;
    }

    public void resetPhoto(String photo) {
        storageService.deleteFile(bucketName,"devster/member",photo);
        logger.info("일반회원 사진 초기화 완료");
    }

    public MemberDto insertMember(MemberDto dto) {
        dto.setM_photo(photo);
        Map<String,String> map = encryptPass(dto.getM_pass());
        dto.setM_pass(map.get("password"));
        dto.setSalt(map.get("salt"));

        MemberEntity member = MemberEntity.toMemberEntity(dto);
        memberRepository.save(member);
        photo = null;
        logger.info("일반회원 회원가입 완료.");
        return dto;
    }

    public void registerMember(MemberDto dto) throws Exception {
        if(memberRepository.existsByMEmail(dto.getM_email())) {
            throw new Exception("이미 존재하는 이메일입니다.");
        }

        if(memberRepository.existsByMId(dto.getM_id())) {
            throw new Exception("이미 존재하는 아이디 입니다.");
        }

        if(memberRepository.existsByMNickname(dto.getM_nickname())) {
            throw new Exception("이미 존재하는 닉네임 입니다.");
        }

        dto.setM_photo(photo);
        MemberEntity member = MemberEntity.toMemberEntity(dto);
        member.passwordEncode(passwordEncoder);
        memberRepository.save(member);

    }



    public List<MemberDto> getAllMembers() {
        List<MemberDto> list = new ArrayList<>();
        for (MemberEntity entity : memberRepository.findAll()) {
            list.add(MemberDto.toMemberDto(entity));
        }

        logger.info("일반회원정보 출력 완료");
        return list;
    }

    public MemberDto getOneMember(int idx) {
        MemberEntity member = memberRepository.findById((Integer) idx)
                .orElseThrow(() -> new EntityNotFoundException("해당 idx 는 존재하지 않습니다. " + idx));

        logger.info("m_idx " + idx + " 정보 출력 완료");

        return MemberDto.toMemberDto(member);
    }

    public void updateMember(MemberDto dto) {
        Optional<MemberEntity> entity = memberRepository.findById(dto.getM_idx());

        if(entity.isPresent()){
            MemberEntity entityForUpdate = entity.get();
            entityForUpdate.setMNickname(dto.getM_nickname());
            entityForUpdate.setMTele(dto.getM_tele());

            //비밀번호 암호화후 재 삽입
            Map<String,String> encryptedMap = encryptPass(dto.getM_pass());
            entityForUpdate.setMPass(encryptedMap.get("password"));
            entityForUpdate.setSalt(encryptedMap.get("salt"));

            entityForUpdate.setAIidx(dto.getAi_idx());
            entityForUpdate.setAIname(dto.getAi_name());
            memberRepository.save(entityForUpdate);

            logger.info("일반회원정보 업데이트 완료");
        }
    }

    public void updatePhoto( Integer m_idx , MultipartFile upload ) {
        Optional<MemberEntity> entity = memberRepository.findById(m_idx);
        storageService.deleteFile(bucketName,"devster/member",entity.get().getMPhoto());
        entity.get().setMPhoto(storageService.uploadFile(bucketName,"devster/member",upload));
        memberRepository.save(entity.get());

        logger.info(m_idx+" 회원 프로필 사진 업데이트 완료");
    }

    public boolean isDuplicateEmail(String m_email) {
        logger.info("일반회원 이메일 중복확인 완료");
        return memberRepository.existsByMEmail(m_email);
    }

    public List<AcademyInfoEntity> academyNameSearch(String name) {
        logger.info("일반회원 학원명 검색 완료");
        return academyInfoRepository.findAllByAInameContains(name);
    }

    public boolean isDuplicateId(String id) {
        logger.info("일반회원 아이디 중복확인 완료");
        return memberRepository.existsByMId(id);
    }

    public static Map<String,String> encryptPass(String password) {
        SecureRandom random = new SecureRandom();
        byte[] salt = new byte[20];
        random.nextBytes(salt);

        StringBuffer sb = new StringBuffer();
        for(byte b : salt) {
            sb.append(String.format("%02x",b));
        }

        try {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            md.update((password+sb.toString()).getBytes());
            byte[] pwdsalt = md.digest();

            StringBuffer sb2 = new StringBuffer();
            for(byte b : pwdsalt) {
                sb2.append(String.format("%02x",b));
            }
            Map<String,String > map = new HashMap<>();
            map.put("password",sb2.toString());
            map.put("salt",sb.toString());
            return map;
        } catch (NoSuchAlgorithmException e) {
            throw new RuntimeException(e);
        }
    }
}

