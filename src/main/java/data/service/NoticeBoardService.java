package data.service;

import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

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


    public Map<String, Object> getPagedNboard(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("NBwriteDay").descending());
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


}
