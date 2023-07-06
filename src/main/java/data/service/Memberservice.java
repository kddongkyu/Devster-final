package data.service;

import data.dto.MemberDto;
import data.entity.MemberEntity;
import data.repository.MemberRepository;
import naver.cloud.NcpObjectStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
public class Memberservice {

    private final Logger logger = LoggerFactory.getLogger(Memberservice.class);

    private final MemberRepository memberRepository;

    @Autowired
    private NcpObjectStorageService storageService;

    @Value("${aws.s3.bucketName}")
    private String bucketName;

    String photo = null;

    public Memberservice(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public String uploadPhoto(MultipartFile upload){
        try {
            if(photo != null) {
                storageService.deleteFile(bucketName,"devster/member",photo);
            }
            photo = storageService.uploadFile(bucketName,"devster/member",upload);
            return photo;
        } catch (Exception e){
            logger.error("Error occurred while uploading photo", e);
            throw e;
        }
    }

    public void resetPhoto(String photo) {
        try {
            storageService.deleteFile(bucketName,"devster/member",photo);
        } catch (NullPointerException e){
            logger.error("Error occurred while resetting photo", e);
            throw e;
        }
    }

    public MemberDto insertMember(MemberDto dto) {
        try {
            dto.setM_photo(photo);
            Map<String,String> map = encryptPass(dto.getM_pass());
            dto.setM_pass(map.get("password"));
            dto.setSalt(map.get("salt"));

            MemberEntity member = MemberEntity.toMemberEntity(dto);
            memberRepository.save(member);
            photo = null;
            logger.info("회원 가입 완료.");
            return dto;
        } catch (Exception e) {
            logger.error("Error occurred while inserting member", e);
            throw e;
        }
    }

    public List<MemberDto> getAllMembers() {
        try {
            List<MemberDto> list = new ArrayList<>();
            for (MemberEntity entity : memberRepository.findAll()) {
                list.add(MemberDto.toMemberDto(entity));
            }
            
            logger.info("가입자 정보 출력 완료");
            return list;
        } catch (Exception e) {
            logger.error("Error occurred while getting all members", e);
            throw e;
        }
    }

    public MemberDto getOneMember(int idx) {
        try {
            MemberEntity member = memberRepository.findById((Integer) idx)
                    .orElseThrow(() -> new EntityNotFoundException("해당 idx 는 존재하지 않습니다. " + idx));
            
             logger.info("m_idx" + idx + "정보 출력 완료");

            return MemberDto.toMemberDto(member);
        } catch (EntityNotFoundException e) {
            logger.error("Error occurred while getting a member", e);
            throw e;
        }
    }

    public void updateMember(MemberDto dto) {
        try {
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
             
                logger.info("회원정보 업데이트 완료");
            }
        } catch (Exception e) {
            logger.error("Error occurred while updating member", e);
            throw e;
        }
    }

    public void updatePhoto( Integer m_idx , MultipartFile upload ) {
        try {
            Optional<MemberEntity> entity = memberRepository.findById(m_idx);
            storageService.deleteFile(bucketName,"devster/member",entity.get().getMPhoto());
            entity.get().setMPhoto(storageService.uploadFile(bucketName,"devster/member",upload));
            memberRepository.save(entity.get());
            
            logger.info(m_idx+"회원 프로필 사진 업데이트 완료");
        }catch (Exception e) {
            logger.error("Error occurred while updating photo", e);
            throw e;
        }
    }

    public boolean isDuplicateEmail(String m_email) {
        try {
            return memberRepository.existsByMEmail(m_email);
        } catch (NullPointerException e){
            logger.error("Error occurred while check duplicate email");
            throw e;
        }
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

