package data.service;

import data.dto.PostMessage.PostMessageDetailDto;
import data.dto.PostMessage.PostMessageDto;
import data.dto.PostMessage.PostMessageRespnoseDto;
import data.entity.PostMessageEntity;
import data.repository.MemberRepository;
import data.repository.PostMessageRepository;
import jwt.setting.settings.JwtService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class PostMessageService {

    private final MemberRepository memberRepository;
    private final PostMessageRepository postMessageRepository;
    private final JwtService jwtService;

    public PostMessageService(MemberRepository memberRepository, PostMessageRepository postMessageRepository, JwtService jwtService) {
        this.memberRepository = memberRepository;
        this.postMessageRepository = postMessageRepository;
        this.jwtService = jwtService;
    }

    public PostMessageRespnoseDto getAllPostMessages(HttpServletRequest request, int currentPage) {
        int m_idx = jwtService.extractIdx(jwtService.extractAccessToken(request).get()).get();
        String nickName = memberRepository.findById(m_idx).get().getMNickname();

        Pageable pageable = PageRequest.of(currentPage,7, Sort.by("SENDtime").descending());

        List<PostMessageEntity> entityList = postMessageRepository.findAllByRECVnick(nickName,pageable).getContent();
        List<PostMessageDetailDto> dtoList = new ArrayList<>();
        for(PostMessageEntity entity : entityList) {
            dtoList.add(toPostMessageDetialDto(entity));
        }
        long totalMessageCount = postMessageRepository.countByRECVnick(nickName);
        int totalPages = (int) Math.ceil((double) totalMessageCount / 7);

        PostMessageRespnoseDto dto = new PostMessageRespnoseDto(dtoList,totalPages);
        return dto;
    }

    public PostMessageRespnoseDto getSearchList(HttpServletRequest request, String keyword) {
        int m_idx = jwtService.extractIdx(jwtService.extractAccessToken(request).get()).get();
        String nickName = memberRepository.findById(m_idx).get().getMNickname();

        List<PostMessageEntity> entityList = postMessageRepository.findAllByRECVnickAndContentContaining(nickName,keyword);
        List<PostMessageDetailDto> dtoList = new ArrayList<>();
        for(PostMessageEntity entity : entityList) {
            dtoList.add(toPostMessageDetialDto(entity));
        }
        PostMessageRespnoseDto dto = new PostMessageRespnoseDto(dtoList,0);
        return dto;
    }

    public PostMessageDetailDto getOnePostMessage(int idx) {
        PostMessageEntity entity = postMessageRepository.findById(idx).get();
        return toPostMessageDetialDto(entity);
    }

    public String sendPostMessage(PostMessageDto dto) {
        postMessageRepository.save(PostMessageEntity.toPostMessageEntity(dto));
        log.info(dto.getSend_nick() + " -> " + dto.getRecv_nick() + " 쪽지 발송 완료.");
        return dto.getSend_nick() + " -> " + dto.getRecv_nick() + " 쪽지 발송 완료.";
    }

    @Transactional
    public String deleteAllPostMessages(HttpServletRequest request) {
        int m_idx = jwtService.extractIdx(jwtService.extractAccessToken(request).get()).get();
        String recv_nick = memberRepository.findById(m_idx).get().getMNickname();
        postMessageRepository.deleteAllByRECVnick(recv_nick);
        log.info(recv_nick + "의 쪽지 전체 삭제 완료.");
        return recv_nick + "의 쪽지 전체 삭제 완료.";
    }
    
    public boolean deletePostMessage(int idx) {
        if(postMessageRepository.existsById(idx)) {
            postMessageRepository.deleteById(idx);
            log.info(idx + "번 쪽지 삭제 완료.");
            return true;
        } else {
            log.info(idx + "번 쪽지가 존재하지 않습니다.");
            return false;
        }
    }

    private PostMessageDetailDto toPostMessageDetialDto(PostMessageEntity entity) {

        // Timestamp를 LocalDateTime 객체로 변환
        LocalDateTime ldt = entity.getSENDtime().toLocalDateTime();

        // LocalDateTime 객체를 원하는 형식의 문자열로 변환
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm");
        String formattedTime = ldt.format(formatter);


        PostMessageDetailDto detailDto = new PostMessageDetailDto();
        detailDto.setMes_idx(entity.getMESidx());
        detailDto.setSubject(entity.getSubject());
        detailDto.setContent(entity.getContent());
        detailDto.setSend_nick(entity.getSENDnick());
        detailDto.setSend_nick_photo(memberRepository.findByMNickname(entity.getSENDnick()).get().getMPhoto());
        detailDto.setSend_time(formattedTime);

        return detailDto;
    }

}
