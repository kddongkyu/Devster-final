package data.service;

import data.dto.MemberDto;
import data.entity.MemberEntity;
import data.repository.MemberRepository;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;
import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Service
public class Memberservice {

    private final Logger logger = LoggerFactory.getLogger(Memberservice.class);

    private final MemberRepository memberRepository;

    public Memberservice(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public MemberDto insertMember(MemberDto dto) {
        try {
            MemberEntity member = MemberEntity.toMemberEntity(dto);
            memberRepository.save(member);

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

    }
}

