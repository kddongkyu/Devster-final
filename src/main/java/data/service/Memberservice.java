package data.service;

import data.dto.MemberDto;
import data.entity.MemberEntity;
import data.repository.MemberRepository;
import naver.cloud.NcpObjectStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.multipart.MultipartFile;

@Service
public class Memberservice {

    private final Logger logger = LoggerFactory.getLogger(Memberservice.class);

    private final MemberRepository memberRepository;

    @Autowired
    private NcpObjectStorageService storageService;

    private final String bucketName = "bit701.bucket.102";

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
                entityForUpdate.setM_nickname(dto.getM_nickname());
                entityForUpdate.setM_tele(dto.getM_tele());
                entityForUpdate.setM_pass(dto.getM_pass());
                entityForUpdate.setSalt(dto.getSalt());
                entityForUpdate.setAi_idx(dto.getAi_idx());
                entityForUpdate.setAi_name(dto.getAi_name());
                memberRepository.save(entityForUpdate);
            }
        } catch (Exception e) {
            logger.error("Error occurred while updating member", e);
            throw e;
        }
    }

    public void updatePhoto( Integer m_idx , MultipartFile upload ) {
        try {
            Optional<MemberEntity> entity = memberRepository.findById(m_idx);
            storageService.deleteFile(bucketName,"devster/member",entity.get().getM_photo());
            entity.get().setM_photo(storageService.uploadFile(bucketName,"devster/member",upload));
            memberRepository.save(entity.get());
        }catch (Exception e) {
            logger.error("Error occurred while updating photo", e);
            throw e;
        }
    }
}

