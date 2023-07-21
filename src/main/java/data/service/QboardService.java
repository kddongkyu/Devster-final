package data.service;

import data.dto.qboard.QboardDetailDto;
import data.dto.qboard.QboardDto;
import data.dto.qboard.QboardResponseDto;
import data.entity.MemberEntity;
import data.entity.QboardEntity;
import data.repository.MemberRepository;
import data.repository.board.qboard.QboardRepository;
import lombok.extern.slf4j.Slf4j;
import naver.cloud.NcpObjectStorageService;
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
public class QboardService {

    private final QboardRepository qboardRepository;
    private final MemberRepository memberRepository;
    private final NcpObjectStorageService storageService;

    public QboardService(QboardRepository qboardRepository, MemberRepository memberRepository, NcpObjectStorageService storageService) {
        this.qboardRepository = qboardRepository;
        this.memberRepository = memberRepository;
        this.storageService = storageService;
    }

    @Value("${aws.s3.bucketName}")
    private String bucketName;

    public QboardDto insertQboard(QboardDto dto, HttpSession session){
        try {
            QboardEntity entity = QboardEntity.toQboardEntity(dto);
            qboardRepository.save(entity);
            return dto;
        } catch (Exception e){
            log.error("insert Qboard Error",e);
            throw  e;
        }
    }

    public List<String> uploadPhoto(List<MultipartFile> upload, HttpSession session){
        List<String> fullPhoto = new ArrayList<>();

        for(MultipartFile photo : upload ) {
            fullPhoto.add(storageService.uploadFile(bucketName,"devster/qboard",photo));
        }

        if(session.getAttribute("photo") != null) {
            storageService.deleteFile(bucketName,"devster/qboard",session.getAttribute("photo").toString());
        }

        session.setAttribute("photo",String.join(",",fullPhoto));
        log.info("Qboard 사진 업로드 완료");
        return fullPhoto;
    }

    public void resetPhoto(String photo) {
        storageService.deleteFile(bucketName,"devster/qboard",photo);
        log.info("Qboard 사진 초기화 완료");
    }

    public QboardResponseDto getPagedQboard(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("FBwriteDay").descending());
        Page<QboardEntity> result = qboardRepository.findAll(pageable);

        List<QboardDetailDto> qboardList = result
                .getContent()
                .stream()
                .map(qboardEntity -> {
                    MemberEntity memberInfo = memberRepository.findById(qboardEntity.getMIdx()).orElse(null);
                    QboardDetailDto detailDto = new QboardDetailDto();
                    if (memberInfo != null) {
                        detailDto.setPhoto(memberInfo.getMPhoto());
                        detailDto.setNickname(memberInfo.getMNickname());
                    }
                    return detailDto;
                })
                .collect(Collectors.toList());

        QboardResponseDto qboardResponseDto = new QboardResponseDto();
        qboardResponseDto.setQboardDetailDtoList(qboardList);
        qboardResponseDto.setTotalCount((int)result.getTotalElements());
        qboardResponseDto.setTotalPages(result.getTotalPages());
        qboardResponseDto.setCurrentPage(result.getNumber() + 1);
        qboardResponseDto.setHasNext(result.hasNext());

        return qboardResponseDto;
    }

    public QboardDetailDto getOneQboard(Integer qb_idx) {
        try {
            QboardEntity qboard = qboardRepository.findById(qb_idx)
                    .orElseThrow(() -> new EntityNotFoundException("해당 qb_idx 는 없습니다: " + qb_idx));
            qboard.setQBreadCount(qboard.getQBreadCount() +1);
            qboardRepository.save(qboard);

            MemberEntity memberInfo = memberRepository.findById(qboard.getMIdx()).orElse(null);

            QboardDetailDto detailDto = new QboardDetailDto();
            detailDto.setQboardDto(QboardDto.toQboardDto(qboard));

            if (memberInfo != null) {
                detailDto.setPhoto(memberInfo.getMPhoto());
                detailDto.setNickname(memberInfo.getMNickname());
            }

            return detailDto;

        } catch (Exception e) {
            log.error("Error finding one qboard", e);
            throw e;
        }
    }

    public void deleteById(int qb_idx){
        try {
            qboardRepository.deleteById(qb_idx);
        } catch (Exception e) {
            log.error("delete Qboard Error",e);
            throw e;
        }
    }

    public void updateQboard(int qb_idx, QboardDto dto){
        try {
            Optional<QboardEntity> entity = qboardRepository.findById(qb_idx);

            if(entity.isPresent()) {
                QboardEntity existingEntity = entity.get();
                existingEntity.setQBsubject(dto.getQb_subject());
                existingEntity.setQBcontent(dto.getQb_content());
//                existingEntity.setFBphoto(dto.getFb_photo());
                qboardRepository.save(existingEntity);
            }

        } catch (Exception e) {
            log.error("update Qboard Error", e);
            throw e;
        }
    }

    public void updatePhoto(Integer qb_idx , MultipartFile upload ) {
        Optional<QboardEntity> entity = qboardRepository.findById(qb_idx);
        storageService.deleteFile(bucketName,"devster/qboard",entity.get().getQBphoto());
        entity.get().setQBphoto(storageService.uploadFile(bucketName,"devster/qboard",upload));
        qboardRepository.save(entity.get());

        log.info(qb_idx+" Qboard 사진업데이트 완료");
    }
}
