package data.service;

import data.dto.qboard.*;
import data.entity.MemberEntity;
import data.entity.QboardCommentEntity;
import data.repository.MemberRepository;
import data.repository.board.qboard.QboardCommentRespository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

@Service
@Slf4j
public class QboardCommentService {
    private final QboardCommentRespository qboardCommentRespository;
    private final MemberRepository memberRepository;

    public QboardCommentService(QboardCommentRespository qboardCommentRespository, MemberRepository memberRepository) {
        this.qboardCommentRespository = qboardCommentRespository;
        this.memberRepository = memberRepository;
    }

//    public List<QboardCommentResponseDto> getAllCommentList(int qb_idx){
//        List<QboardCommentEntity> qboardEntityList = qboardCommentRespository.findAllByQBidx(qb_idx);
//        List<QboardCommentDetailDto> qboardCommentDetailDtoList = new ArrayList<>();
//        int totalCount = qboardCommentRespository.countAllByQBidx(qb_idx);
//
//        for(QboardCommentEntity entity : qboardEntityList){
//            QboardCommentDetailDto dto = new QboardCommentDetailDto();
//            SimpleDateFormat sdf = new SimpleDateFormat("yy-MM-dd HH:mm");
//            String formattedDate = sdf.format(entity.getQBcwriteday());
//
//            dto.setQboardCommentDto(QboardCommentDto.toQboardCommentDto(entity));
//
//            MemberEntity memberInfo = memberRepository.findById(entity.getMIdx()).get();
//
//            dto.setPhoto(memberInfo.getMPhoto());
//            dto.setNickname(memberInfo.getMNickname());
//            dto.setReplyCount(qboardCommentRespository.countAllByQBcref(entity.getQBcref()));
//            qboardCommentDetailDtoList.add(dto);
//        }
//        return ;
//    }return
}
