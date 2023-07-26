package data.service;

import data.dto.FreeBoardDto;
import data.entity.FreeBoardEntity;
import data.entity.FreeBoardLikeEntity;
import data.entity.MemberEntity;
import data.entity.ReviewEntity;
import data.repository.FreeBoardLikeRepository;
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
import javax.servlet.http.HttpSession;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Slf4j
public class FreeBoardService {


    private final FreeBoardRepository freeBoardRepository;
    private final MemberRepository memberRepository;
    private final FreeBoardLikeRepository freeBoardLikeRepository;
    private final NcpObjectStorageService storageService;

    @Autowired
    public FreeBoardService(FreeBoardRepository freeBoardRepository,  MemberRepository memberRepository, FreeBoardLikeRepository freeBoardLikeRepository,NcpObjectStorageService storageService) {
        this.freeBoardRepository = freeBoardRepository;
        this.memberRepository = memberRepository;
        this.freeBoardLikeRepository = freeBoardLikeRepository;
        this.storageService = storageService;
    }

    @Value("${aws.s3.bucketName}")
    private String bucketName;

    public FreeBoardDto insertFreeBoard(FreeBoardDto dto, HttpSession session){
        try {
            if(session.getAttribute("photo")!=null){
                dto.setFb_photo(session.getAttribute("photo").toString());
            }
            FreeBoardEntity freeBoard = FreeBoardEntity.toFreeBoardEntity(dto);
            freeBoardRepository.save(freeBoard);
            session.removeAttribute("photo");
            return dto;
        } catch (Exception e){
            log.error("insert FreeBoard Error",e);
            throw  e;
        }
    }

    public List<String> uploadPhoto(List<MultipartFile> upload, HttpSession session){
        List<String> fullPhoto = new ArrayList<>();

        for(MultipartFile photo : upload ) {
            fullPhoto.add(storageService.uploadFile(bucketName,"devster/fboard",photo));
        }

        if(session.getAttribute("photo") != null) {
            storageService.deleteFile(bucketName,"devster/fboard",session.getAttribute("photo").toString());
        }

        session.setAttribute("photo",String.join(",",fullPhoto));
        log.info("FreeBoard 사진 업로드 완료");
        return fullPhoto;
    }

    public void resetPhoto(String photo) {
        storageService.deleteFile(bucketName,"devster/fboard",photo);
        log.info("FreeBoard 사진 초기화 완료");
    }

    public Map<String, Object> getPagedFboard(int page, int size, String sortProperty, String sortDirection, String keyword) {

        Sort.Direction direction = Sort.Direction.fromString(sortDirection);
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortProperty));
        Page<FreeBoardEntity> result;

        if (keyword != null && !keyword.trim().isEmpty()) {
            result = freeBoardRepository.findByFBsubjectContainingOrFBcontentContaining(keyword, pageable);
            log.info("Keyword: " + keyword);
        } else {
            result = freeBoardRepository.findAll(pageable);
        }

      List<Map<String, Object>> freeBoardList = result
                .getContent()
                .stream()
                .map(freeBoardEntity -> {
                    MemberEntity memberInfo = memberRepository.findById(freeBoardEntity.getMIdx()).orElse(null);
                    Map<String, Object> fboardMemberInfo = new HashMap<>();
                    fboardMemberInfo.put("fboard", FreeBoardDto.toFreeBoardDto(freeBoardEntity));

                    if (memberInfo != null) {
                        fboardMemberInfo.put("mPhoto", memberInfo.getMPhoto());
                        fboardMemberInfo.put("mNicname", memberInfo.getMNickname());
                    }
                    return fboardMemberInfo;
                })
                .collect(Collectors.toList());


        Map<String, Object> response = new HashMap<>();
        response.put("freeBoardList", freeBoardList);
        response.put("totalElements", result.getTotalElements());
        response.put("totalPages", result.getTotalPages());
        response.put("currentPage", result.getNumber() + 1);
        response.put("hasNext", result.hasNext());

        return response;
    }


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
                existingEntity.setFBphoto(dto.getFb_photo());

                freeBoardRepository.save(existingEntity);
            }

        } catch (Exception e) {
            log.error("update FreeBoard Error", e);
            throw e;
        }
    }

public String updatePhoto(Integer fb_idx, List<MultipartFile> uploads) {
      List<String> uploadedFileNames = new ArrayList<>();

        for(MultipartFile files : uploads) {
            uploadedFileNames.add(storageService.uploadFile(bucketName, "devster/fboard", files));
        }
        log.info(fb_idx + " FreeBoard 사진 업데이트 완료");
        return String.join(",", uploadedFileNames);
}

    public void deletePhoto(Integer fb_idx, String imageFileName) {
        // Step 1: FreeBoardEntity를 fb_idx를 기준으로 데이터베이스에서 조회합니다.
        Optional<FreeBoardEntity> entityOptional = freeBoardRepository.findById(fb_idx);

        // Step 2: 조회된 entity가 존재하는지 확인합니다.
        if (entityOptional.isPresent()) {
            FreeBoardEntity entity = entityOptional.get();

            // Step 3: 기존 사진 파일명들을 가져옵니다.
            String existingPhotos = entity.getFBphoto();
            List<String> existingPhotosList = Arrays.asList(existingPhotos.split(","));

            // Step 4: 이미지 파일명을 DB에서 삭제합니다.
            List<String> updatedPhotosList = new ArrayList<>();
            for (String photo : existingPhotosList) {
                if (!photo.equals(imageFileName)) {
                    updatedPhotosList.add(photo);
                }
            }
            entity.setFBphoto(String.join(",", updatedPhotosList));
            freeBoardRepository.save(entity);

            // Step 5: 버킷에서 이미지 파일을 삭제합니다.
            storageService.deleteFile(bucketName, "devster/fboard", imageFileName);

            // Step 6: 삭제가 완료되면 로그를 남깁니다.
            log.info(fb_idx + " FreeBoard 이미지 삭제 완료");
        } else {
            // Step 7: fb_idx에 해당하는 FreeBoardEntity가 존재하지 않는 경우, 오류 처리 또는 예외 처리를 수행할 수 있습니다.
            // 여기서는 오류 처리를 생략하고 로그만 남깁니다.
            log.error("FreeBoardEntity with fb_idx " + fb_idx + " not found.");
        }
    }




    // 좋아요 싫어요 관련 로직
    private FreeBoardLikeEntity findOrCreateFBoardLike(int MIdx, int FBidx){
        return freeBoardLikeRepository.findByMIdxAndFBidx(MIdx,FBidx)
                .orElse(new FreeBoardLikeEntity(MIdx,FBidx));
    }

     public boolean isAlreadyAddGoodRp(int MIdx, int FBidx){
     FreeBoardLikeEntity fboardlikeEntity=findOrCreateFBoardLike(MIdx, FBidx);
     return fboardlikeEntity.getLikestatus()==1;
 }

     public boolean isAlreadyAddBadRp(int MIdx, int FBidx){
         FreeBoardLikeEntity fboardlikeEntity=findOrCreateFBoardLike(MIdx, FBidx);
         return fboardlikeEntity.getLikestatus()==2;
     }

    public void like(int MIdx, int FBidx) {
        try {
            FreeBoardLikeEntity freeBoardLikeEntity = findOrCreateFBoardLike(MIdx,FBidx);
            if (freeBoardLikeEntity.getLikestatus() == 1) {
                freeBoardLikeEntity.setLikestatus(0);
                freeBoardLikeRepository.save(freeBoardLikeEntity);
                FreeBoardEntity freeBoardEntity = freeBoardRepository.findById(FBidx)
                        .orElseThrow(()-> new IllegalArgumentException("해당하는 fbidx를 찾지 못했습니다(fb_like-1)"));
                freeBoardEntity.setFBlikeCount(freeBoardEntity.getFBlikeCount()-1);
                freeBoardRepository.save(freeBoardEntity);
            } else if (freeBoardLikeEntity.getLikestatus() == 2) {
                throw new IllegalArgumentException("이미 싫어요가 눌려 있습니다");
            } else {
                freeBoardLikeEntity.setLikestatus(1);
                freeBoardLikeRepository.save(freeBoardLikeEntity);

                // FreeBoardEntity의 fb_like 필드 업데이트
                FreeBoardEntity freeBoardEntity = freeBoardRepository.findById(FBidx)
                        .orElseThrow(() -> new IllegalArgumentException("해당하는 fbidx를 찾지 못했습니다(fb_like+1): " + FBidx));
                freeBoardEntity.setFBlikeCount(freeBoardEntity.getFBlikeCount() + 1);
                freeBoardRepository.save(freeBoardEntity);
            }
        } catch (IllegalArgumentException e) {
            log.error("fboard like Error(Ill)", e);
        } catch (Exception e) {
            log.error("fboard like Error(Exce)", e);
        }
    }
    public void dislike(int MIdx, int FBidx) {
        try {
            FreeBoardLikeEntity freeBoardLikeEntity = findOrCreateFBoardLike(MIdx, FBidx);

            if(freeBoardLikeEntity.getLikestatus() == 1) {
                throw new IllegalArgumentException("이미 좋아요가 눌려 있습니다");
            } else if (freeBoardLikeEntity.getLikestatus() == 2) {
                freeBoardLikeEntity.setLikestatus(0);
                freeBoardLikeRepository.save(freeBoardLikeEntity);
                FreeBoardEntity freeBoardEntity = freeBoardRepository.findById(FBidx)
                        .orElseThrow(() -> new IllegalArgumentException("해당하는 fbidx를 찾지 못했습니다(fb_dislike-1)"));
                freeBoardEntity.setFBdislikeCount(freeBoardEntity.getFBdislikeCount()-1);
                freeBoardRepository.save(freeBoardEntity);
            } else {
                freeBoardLikeEntity.setLikestatus(2);
                freeBoardLikeRepository.save(freeBoardLikeEntity);

                // freeBoardEntity fb_dislike 필드 업데이트
                FreeBoardEntity freeBoardEntity = freeBoardRepository.findById(FBidx)
                        .orElseThrow(() -> new IllegalArgumentException("해당하는 Fbidx를 찾지 못했습니다(fb_dislike+1): " + FBidx));
                freeBoardEntity.setFBdislikeCount(freeBoardEntity.getFBdislikeCount() + 1);
                freeBoardRepository.save(freeBoardEntity);
            }
        } catch (IllegalArgumentException e) {
            log.error("fboard like Error(Ill)", e);
        } catch (Exception e) {
            log.error("fboard like Error(Exce)", e);
        }
    }


}
