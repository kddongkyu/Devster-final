package data.service;

import data.dto.FreeBoardDto;
import data.entity.FreeBoardEntity;
import data.entity.MemberEntity;
import data.repository.FreeBoardRepository;
import data.repository.MemberRepository;
import lombok.extern.slf4j.Slf4j;
import naver.cloud.NcpObjectStorageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
public class FreeBoardService {


    @Autowired
    private final FreeBoardRepository freeBoardRepository;
    @Autowired
    private final MemberRepository memberRepository;

    @Autowired
    public FreeBoardService(FreeBoardRepository freeBoardRepository,  MemberRepository memberRepository) {
        this.freeBoardRepository = freeBoardRepository;
        this.memberRepository = memberRepository;
    }

    @Autowired
    private NcpObjectStorageService storageService;

    @Value("${aws.s3.bucketName}")
    private String bucketName;

    String photo = null;

    public FreeBoardDto insertFreeBoard(FreeBoardDto dto){
        try {
            FreeBoardEntity freeBoard = FreeBoardEntity.toFreeBoardEntity(dto);
            freeBoardRepository.save(freeBoard);
            return dto;
        } catch (Exception e){
            log.error("insert FreeBoard Error",e);
            throw  e;
        }
    }

    public String uploadPhoto(MultipartFile upload){
        if(photo != null) {
            storageService.deleteFile(bucketName,"devster/fboard",photo);
        }
        photo = storageService.uploadFile(bucketName,"devster/fboard",upload);
        log.info("FreeBoard 사진 업로드 완료");
        return photo;
    }

    public void resetPhoto(String photo) {
        storageService.deleteFile(bucketName,"devster/fboard",photo);
        log.info("FreeBoard 사진 초기화 완료");
    }

//    public List<FreeBoardDto> getAllFboard(){
//        try {
//            List<FreeBoardEntity>  entityList = freeBoardRepository.findAll();
//            List<FreeBoardDto> dtoList = new ArrayList<>();
//
//            for(FreeBoardEntity entity : entityList) {
//                dtoList.add(FreeBoardDto.toFreeBoardDto(entity));
//            }
//
//            return dtoList;
//        } catch (Exception e){
//            log.error("findAll FreeBoardList Error", e);
//            throw e;
//        }
//    }

    public Map<String, Object> getPagedFboard(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("FBwriteDay").descending());
        Page<FreeBoardEntity> result = freeBoardRepository.findAll(pageable);

        List<FreeBoardDto> freeBoardList = result
                .getContent()
                .stream()
                .map(FreeBoardDto::toFreeBoardDto)
                .collect(Collectors.toList());

        Map<String, Object> response = new HashMap<>();
        response.put("freeBoardList", freeBoardList);
        response.put("totalElements", result.getTotalElements());
        response.put("totalPages", result.getTotalPages());
        response.put("currentPage", result.getNumber() + 1);
        response.put("hasNext", result.hasNext());

        return response;
    }


//    public FreeBoardDto getOneFboard(Integer fb_idx){
//        try {
//            FreeBoardEntity freeBoard = freeBoardRepository.findById((Integer) fb_idx)
//                    .orElseThrow(()->new EntityNotFoundException("존재하지 않는 fb_idx : " + fb_idx));
//
//            return  FreeBoardDto.toFreeBoardDto(freeBoard);
//        } catch (Exception e){
//            log.error("findById getOneFreeBoard Error", e);
//            throw e;
//        }
//    }

    public Map<String, Object> getOneFboard(Integer fb_idx) {
        try {
            FreeBoardEntity fboard = freeBoardRepository.findById(fb_idx)
                    .orElseThrow(() -> new EntityNotFoundException("해당 fb_idx 는 없습니다: " + fb_idx));
            fboard.setFBreadCount(fboard.getFBreadCount() +1);
            freeBoardRepository.save(fboard);

            MemberEntity memberInfo = memberRepository.findById(fboard.getMIdx()).orElse(null);

            Map<String, Object> fboardWithAdditionalInfo = new HashMap<>();
            fboardWithAdditionalInfo.put("fboard", FreeBoardDto.toFreeBoardDto(fboard));

            if (memberInfo != null) {
                fboardWithAdditionalInfo.put("mPhoto", memberInfo.getMPhoto());
                fboardWithAdditionalInfo.put("mNicname", memberInfo.getMNickname());
            }

            return fboardWithAdditionalInfo;

        } catch (Exception e) {
            log.error("Error finding one fboard", e);
            throw e;
        }
    }
    public void deleteById(int fb_idx){
        try {
            freeBoardRepository.deleteById(fb_idx);
        } catch (Exception e) {
            log.error("delete FreeBoard Error",e);
            throw e;
        }
    }

    public void updateFreeBoard(int fb_idx, FreeBoardDto dto){
        try {
            Optional<FreeBoardEntity> e = freeBoardRepository.findById(fb_idx);

            if(e.isPresent()) {
                FreeBoardEntity existingEntity = e.get();
                existingEntity.setFBsubject(dto.getFb_subject());
                existingEntity.setFBcontent(dto.getFb_content());
//                existingEntity.setFBphoto(dto.getFb_photo());
                freeBoardRepository.save(existingEntity);
            }

        } catch (Exception e) {
            log.error("update FreeBoard Error", e);
            throw e;
        }
    }

    public void updatePhoto(Integer fb_idx , MultipartFile upload ) {
        Optional<FreeBoardEntity> entity = freeBoardRepository.findById(fb_idx);
        storageService.deleteFile(bucketName,"devster/fboard",entity.get().getFBphoto());
        entity.get().setFBphoto(storageService.uploadFile(bucketName,"devster/fboard",upload));
        freeBoardRepository.save(entity.get());

        log.info(fb_idx+" FreeBoard 사진업데이트 완료");
    }

}
