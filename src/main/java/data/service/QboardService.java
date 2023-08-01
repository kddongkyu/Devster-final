package data.service;

import data.dto.qboard.QboardDetailDto;
import data.dto.qboard.QboardDto;
import data.dto.qboard.QboardResponseDto;
import data.entity.FreeBoardEntity;
import data.entity.MemberEntity;
import data.entity.QboardEntity;
import data.repository.MemberRepository;
import data.repository.board.qboard.QboardCommentRespository;
import data.repository.board.qboard.QboardRepository;
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
import data.mapper.QboardMapper;

@Service
@Slf4j
public class QboardService {

    @Autowired   
    private final QboardMapper qboardMapper;
    private final QboardRepository qboardRepository;
    private final QboardCommentRespository qboardCommentRespository;
    private final MemberRepository memberRepository;
    private final NcpObjectStorageService storageService;

    public QboardService(QboardMapper qboardMapper, QboardRepository qboardRepository, QboardCommentRespository qboardCommentRespository, MemberRepository memberRepository, NcpObjectStorageService storageService) {
        this.qboardMapper = qboardMapper;
        this.qboardRepository = qboardRepository;
        this.qboardCommentRespository = qboardCommentRespository;
        this.memberRepository = memberRepository;
        this.storageService = storageService;
    }

    @Value("${aws.s3.bucketName}")
    private String bucketName;

    public QboardDto insertQboard(QboardDto dto, HttpSession session){
        try {
            if(dto.getQb_photo().equals("")) {
                dto.setQb_photo(null);
            }
            QboardEntity entity = QboardEntity.toQboardEntity(dto);
            qboardRepository.save(entity);
            return dto;
        } catch (Exception e){
            log.error("insert Qboard Error",e);
            throw  e;
        }
    }

    public String uploadPhoto(List<MultipartFile> upload, HttpSession session){
        List<String> fullPhoto = new ArrayList<>();

        for(MultipartFile photo : upload ) {
            fullPhoto.add(storageService.uploadFile(bucketName,"devster/qboard",photo));
        }

        log.info("Qboard 사진 업로드 완료");
        return String.join(",",fullPhoto);
    }

    public void deletePhoto(String imageFileName) {
            storageService.deleteFile(bucketName, "devster/qboard", imageFileName);
            log.info(" QBoard 이미지 삭제 완료");
    }

    public void resetPhoto(String photo) {
        storageService.deleteFile(bucketName,"devster/qboard",photo);
        log.info("Qboard 사진 초기화 완료");
    }

    public QboardResponseDto getPagedQboard(int page, int size,  String sortProperty, String sortDirection, String keyword) {

        Sort.Direction direction = Sort.Direction.fromString(sortDirection);
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, sortProperty));
        Page<QboardEntity> result;

        if (keyword != null && !keyword.trim().isEmpty()) {
            result = qboardRepository.findByQBsubjectContainingOrQBcontentContaining(keyword, pageable);
            log.info("Keyword: " + keyword);
        } else {
            result = qboardRepository.findAll(pageable);
        }

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
                    detailDto.setTotalcommentCount(qboardCommentRespository.countAllByQBidx(qboardEntity.getQBidx()));
                    detailDto.setQboardDto(QboardDto.toQboardDto(qboardEntity));
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

                if(dto.getQb_photo().equals("")) {
                    dto.setQb_photo(null);
                }
                existingEntity.setQBphoto(dto.getQb_photo());

                qboardRepository.save(existingEntity);
            }

        } catch (Exception e) {
            log.error("update Qboard Error", e);
            throw e;
        }
    }

    public String updatePhoto(Integer qb_idx, List<MultipartFile> uploads) {
        List<String> uploadedFileNames = new ArrayList<>();
        for (MultipartFile files : uploads) {
            uploadedFileNames.add(storageService.uploadFile(bucketName, "devster/qboard", files));
        }
        log.info(qb_idx + " QBoard 사진 업데이트 완료");
        return String.join(",", uploadedFileNames);
    }

    public List<Map<String, Object>> getHottestQboard(){
        try{
            List<Map<String, Object>> qboardList = new ArrayList<>();
            QboardEntity qboardEntity = qboardRepository.findTopByOrderByQbLikeDesc();
            Map<String,Object> hottsetQboardInfo = new HashMap<>();
            MemberEntity memberInfo = memberRepository.findById(qboardEntity.getMIdx()).orElse(null);
            if(memberInfo !=null) {
                hottsetQboardInfo.put("mPhoto",memberInfo.getMPhoto());
                hottsetQboardInfo.put("mNicname",memberInfo.getMNickname());
            }
            hottsetQboardInfo.put("qboardHotArticle",qboardEntity);
            qboardList.add(hottsetQboardInfo);
            return qboardList;
        } catch (Exception e) {
            log.error("Error finding hottest freeboard Article", e);
            throw e;
        }
    }

    public List<Map<String, Object>> getNewestQboard(){
        try{
            List<QboardEntity> qboardEntities = qboardRepository.findTop3ByOrderByQbwriteDayDesc();
            List<Map<String, Object>> qboardList = new ArrayList<>();
    
            for (QboardEntity qboardEntity : qboardEntities) {
                MemberEntity memberInfo = memberRepository.findById(qboardEntity.getMIdx()).orElse(null);
               int qboardCommentCount= qboardCommentRespository.countAllByQBidx(qboardEntity.getQBidx());
                Map<String, Object> qboardMemberInfo = new HashMap<>();
                qboardMemberInfo.put("qboard", QboardDto.toQboardDto(qboardEntity));
                qboardMemberInfo.put("qboardCommentCount",qboardCommentCount);
                if (memberInfo != null) {
                    qboardMemberInfo.put("mPhoto", memberInfo.getMPhoto());
                    qboardMemberInfo.put("mNicname", memberInfo.getMNickname());
                }

                qboardList.add(qboardMemberInfo);
            }
    
            return qboardList;
        } catch (Exception e) {
            log.error("Error finding newest qboard Articles", e);
            throw e;
        }
    }



}
