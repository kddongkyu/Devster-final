package data.repository;

import data.entity.MemberEntity;
import jwt.setting.config.SocialType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface MemberRepository extends JpaRepository<MemberEntity, Integer> {
    boolean existsByMEmail(String m_email);
    boolean existsByMId(String id);
    boolean existsByMNickname(String nickname);
    Optional<MemberEntity> findByMId(String id);
    Optional<MemberEntity> findByMEmail(String m_email);
    Optional<MemberEntity> findByMNickname(String m_nickname);
    Optional<MemberEntity> findByMRefreshtoken(String m_refreshtoken);
    Optional<MemberEntity> findByMTypeAndMSocialid(SocialType socialType, String m_socialid);
}
