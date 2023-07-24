package data.service;

import data.dto.qboard.*;
import data.entity.MemberEntity;
import data.entity.QboardCommentEntity;
import data.repository.MemberRepository;
import data.repository.board.qboard.QboardCommentRespository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    public QboardCommentResponseDto getAllCommentList(int qb_idx){
        List<QboardCommentEntity> qboardEntityList = qboardCommentRespository.findAllByQBidxAndQBcrefEqualsOrderByQBcwritedayDesc(qb_idx,0);
        log.info(qb_idx + "번 게시글 댓글 리스트 가져오기 완료");
        List<QboardCommentDetailDto> qboardCommentDetailDtoList = new ArrayList<>();
        int totalCount = qboardCommentRespository.countAllByQBidx(qb_idx);
        log.info("totalCount 가져오기 완료.");

        for(QboardCommentEntity entity : qboardEntityList){
            QboardCommentDetailDto dto = new QboardCommentDetailDto();
//            SimpleDateFormat sdf = new SimpleDateFormat("yy-MM-dd HH:mm");
//            String formattedDate = sdf.format(entity.getQBcwriteday());

            dto.setQboardCommentDto(QboardCommentDto.toQboardCommentDto(entity));
            log.info("댓글 정보 입력완료");

            MemberEntity memberInfo = memberRepository.findById(entity.getMIdx()).get();
            log.info("작성자 정보 가져오기 완료");

            dto.setPhoto(memberInfo.getMPhoto());
            dto.setNickname(memberInfo.getMNickname());
            dto.setReplyCount(qboardCommentRespository.countAllByQBcref(entity.getQBcidx()));
            log.info("작성자 정보 입력완료");
            List<QboardCommentEntity> replyEntityList = qboardCommentRespository.findAllByQBcrefOrderByQBcwritedayDesc(entity.getQBcidx());
            List<QboardCommentDetailDto> replyDtoList = new ArrayList<>();
            for(QboardCommentEntity entity1 : replyEntityList) {
                QboardCommentDetailDto dto1 = new QboardCommentDetailDto();
                dto1.setQboardCommentDto((QboardCommentDto.toQboardCommentDto(entity1)));

                MemberEntity memberInfoEntity2 = memberRepository.findById(entity1.getMIdx()).get();
                dto1.setPhoto(memberInfoEntity2.getMPhoto());
                dto1.setNickname(memberInfoEntity2.getMNickname());
                replyDtoList.add(dto1);
            }
            log.info("대댓글 정보 가져오기 완료");
            dto.setReplyList(replyDtoList);
            log.info("대댓글 정보 입력완료");
            qboardCommentDetailDtoList.add(dto);
        }
        return new QboardCommentResponseDto(qboardCommentDetailDtoList,totalCount);
    }
    
    public String insert(QboardCommentDto dto) {
        qboardCommentRespository.save(QboardCommentEntity.toQboardCommentEntity(dto));
        log.info("Qboard 댓글 입력완료");
        return "Qboard 댓글 입력완료";
    }

    @Transactional
    public Boolean delete(int qbc_idx) {
        // 엔티티가 존재하는지 확인
        if(qboardCommentRespository.existsById(qbc_idx)) {
            qboardCommentRespository.deleteAllByQBcref(qbc_idx);
            qboardCommentRespository.deleteById(qbc_idx);
            log.info("Qboard" + qbc_idx + "번 댓글 삭제완료");
            return true;
        } else {
            // 존재하지 않는 엔티티에 대한 처리
            log.info("Qboard" + qbc_idx + "번 댓글이 존재하지 않습니다.");
            return false;
        }
    }

    public Boolean update(QboardCommentDto dto) {
        // 엔티티가 존재하는지 확인
        if(qboardCommentRespository.existsById(dto.getQbc_idx())) {
            QboardCommentEntity entity = qboardCommentRespository.findById(dto.getQbc_idx()).get();
            entity.setQBccontent(dto.getQbc_content());
            qboardCommentRespository.save(entity);
            log.info("Qboard" + dto.getQbc_idx() + "번 댓글 업데이트 완료");
            return true;
        } else {
            // 존재하지 않는 엔티티에 대한 처리
            log.info("Qboard" + dto.getQbc_idx() + "번 댓글이 존재하지 않습니다.");
            return false;
        }
    }

}
