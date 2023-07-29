package data.service;

import java.util.Map;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import data.dto.NoticeBoardDto;
import data.entity.MemberEntity;
import data.entity.NoticeBoardEntity;
import data.repository.MemberRepository;
import data.repository.NoticeBoardRepository;
import lombok.extern.slf4j.Slf4j;
import naver.cloud.NcpObjectStorageService;
import java.util.*;

@Service
@Slf4j
public class NoticeBoardService {
    private final NoticeBoardRepository noticeBoardRepository;
    private final MemberRepository memberRepository;
    private final NcpObjectStorageService storageService;

    @Autowired
    public NoticeBoardService(NoticeBoardRepository noticeBoardRepository, MemberRepository memberRepository, NcpObjectStorageService storageService) {
        this.noticeBoardRepository = noticeBoardRepository;
        this.memberRepository = memberRepository;
        this.storageService = storageService;
    }
    

    @Value("${aws.s3.bucketName}")
    private String bucketName;


    public Map<String, Object> getNewestNboard(){
        List<NoticeBoardEntity> nboardlist = noticeBoardRepository.findAll();
        
        try{
            NoticeBoardEntity lastElement = nboardlist.get(nboardlist.size()-1);    
            Map<String, Object> newestNboardInfo = new HashMap<>();
            newestNboardInfo.put("nboard",NoticeBoardDto.toNoticeBoardDto(lastElement));

            return newestNboardInfo;

        } catch (Exception e) {
            log.error("Error finding newest Notice Article", e);
            throw e;
        }
    }


    public Map<String, Object> getPagedNboard(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("NBwriteday").descending());
        Page<NoticeBoardEntity> result = noticeBoardRepository.findAll(pageable);

        List<Map<String, Object>> noticeBoardList = result
                .getContent()
                .stream()
                .map(noticeBoardEntity -> {
                    Map<String, Object> nboardMemberInfo = new HashMap<>();
                    nboardMemberInfo.put("nboard", NoticeBoardDto.toNoticeBoardDto(noticeBoardEntity));

                    return nboardMemberInfo;
                })
                .collect(Collectors.toList());


        Map<String, Object> response = new HashMap<>();
        response.put("noticeBoardList", noticeBoardList);
        response.put("totalElements", result.getTotalElements());
        response.put("totalPages", result.getTotalPages());
        response.put("currentPage", result.getNumber() + 1);
        response.put("hasNext", result.hasNext());

        return response;
    }    

    public NoticeBoardDto insertNoticeBoard(NoticeBoardDto dto, HttpSession session){
        try {
            NoticeBoardEntity noticeBoard = NoticeBoardEntity.toNoticeBoardEntity(dto);
            noticeBoardRepository.save(noticeBoard);
            return dto;
        } catch (Exception e){
            log.error("insert FreeBoard Error",e);
            throw  e;
        }
    }

    public List<String> uploadPhoto(List<MultipartFile> upload, HttpSession session){
        List<String> fullPhoto = new ArrayList<>();

        for(MultipartFile photo : upload ) {
            fullPhoto.add(storageService.uploadFile(bucketName,"devster/nboard",photo));
        }

        if(session.getAttribute("photo") != null) {
            storageService.deleteFile(bucketName,"devster/nboard",session.getAttribute("photo").toString());
        }

        session.setAttribute("photo",String.join(",",fullPhoto));
        log.info("NoticeBoard 사진 업로드 완료");

        log.info("fullPhoto: " + fullPhoto);

        return fullPhoto;
    }

    public void resetPhoto(String photo) {
        storageService.deleteFile(bucketName,"devster/nboard",photo);
        log.info("NoticeBoard 사진 초기화 완료");
    }

    public Map<String, Object> getOneNboard(Integer nb_idx) {
        try {
            
            NoticeBoardEntity nboard = noticeBoardRepository.findById(nb_idx)
                    .orElseThrow(() -> new EntityNotFoundException("해당 nb_idx 는 없습니다: " + nb_idx));
            nboard.setNBreadcount(nboard.getNBreadcount() +1);
            noticeBoardRepository.save(nboard);

            Map<String, Object> nboardWithAdditionalInfo = new HashMap<>();
            nboardWithAdditionalInfo.put("nboard", NoticeBoardDto.toNoticeBoardDto(nboard));

            return nboardWithAdditionalInfo;

        } catch (Exception e) {
            log.error("Error finding one fboard", e);
            throw e;
        }
    }

    public void deleteById(int nb_idx){
        try {
            noticeBoardRepository.deleteById(nb_idx);
        } catch (Exception e) {
            log.error("delete NoticeBoard Error",e);
            throw e;
        }
    }

    public void updateNoticeBoard(int nb_idx, NoticeBoardDto dto){
        try {
            Optional<NoticeBoardEntity> e = noticeBoardRepository.findById(nb_idx);

            if(e.isPresent()) {
                NoticeBoardEntity existingEntity = e.get();
                existingEntity.setNBsubject(dto.getNb_subject());
                existingEntity.setNBcontent(dto.getNb_content());

                noticeBoardRepository.save(existingEntity);
            }

        } catch (Exception e) {
            log.error("update FreeBoard Error", e);
            throw e;
        }
    }

//    public void updatePhoto(Integer nb_idx , MultipartFile upload ) {
//        Optional<NoticeBoardEntity> entity = noticeBoardRepository.findById(nb_idx);
//        storageService.deleteFile(bucketName,"devster/nboard",entity.get().getNBphoto());
//        entity.get().setNBphoto(storageService.uploadFile(bucketName,"devster/nboard",upload));
//        noticeBoardRepository.save(entity.get());
//
//        log.info(nb_idx+" NoticeBoard 사진업데이트 완료");
//    }

//    public String updatePhoto(Integer nb_idx , MultipartFile upload ) {
//        Optional<NoticeBoardEntity> entity = noticeBoardRepository.findById(nb_idx);
//        storageService.deleteFile(bucketName,"devster/nboard",entity.get().getNBphoto());
//        String fileName = storageService.uploadFile(bucketName,"devster/nboard",upload);
//        entity.get().setNBphoto(fileName);
//        noticeBoardRepository.save(entity.get());
//
//        log.info(nb_idx+" NoticeBoard 사진업데이트 완료");
//        return fileName;
//    }

    public List<String> updatePhotos(Integer nb_idx , List<MultipartFile> uploads ) {
        Optional<NoticeBoardEntity> entity = noticeBoardRepository.findById(nb_idx);
        if(entity.isPresent()){
            List<String> fileNames = new ArrayList<>();
            for (MultipartFile upload : uploads) {
                String fileName = storageService.uploadFile(bucketName,"devster/nboard",upload);
                fileNames.add(fileName);
            }
            String photoNames = String.join(",", fileNames);
            log.info("photoNames: " + photoNames);  // Log the photoNames string
            entity.get().setNBphoto(photoNames);
            noticeBoardRepository.save(entity.get());
            log.info(nb_idx + " NoticeBoard 사진들 업데이트 완료");
            return fileNames;
        }else{
            throw new EntityNotFoundException("NoticeBoardEntity with id " + nb_idx + " not found.");
        }
    }





}
